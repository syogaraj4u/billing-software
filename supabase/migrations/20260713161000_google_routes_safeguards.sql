create table if not exists public.billing_pin_distance_cache (
  route_key text primary key,
  pin_low text not null,
  pin_high text not null,
  distance_km integer not null check (distance_km between 1 and 4000),
  distance_meters bigint not null default 0 check (distance_meters >= 0),
  duration text not null default '',
  source text not null default 'manual-confirmed',
  confidence text not null default 'confirmed',
  use_count bigint not null default 0,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_used_at timestamptz not null default now(),
  constraint billing_pin_distance_cache_pin_low_check check (pin_low ~ '^[0-9]{6}$'),
  constraint billing_pin_distance_cache_pin_high_check check (pin_high ~ '^[0-9]{6}$'),
  constraint billing_pin_distance_cache_order_check check (pin_low <= pin_high),
  constraint billing_pin_distance_cache_key_check check (route_key = pin_low || '-' || pin_high)
);

create table if not exists public.billing_google_routes_usage (
  request_token uuid primary key default gen_random_uuid(),
  route_key text not null,
  status text not null default 'reserved' check (status in ('reserved', 'success', 'failed')),
  source text not null default 'google-routes',
  error_message text not null default '',
  requested_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists public.billing_google_route_locks (
  route_key text primary key,
  request_token uuid not null unique,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null
);

create index if not exists billing_pin_distance_cache_pins_idx
  on public.billing_pin_distance_cache(pin_low, pin_high);
create index if not exists billing_google_routes_usage_requested_idx
  on public.billing_google_routes_usage(requested_at desc);
create index if not exists billing_google_routes_usage_route_idx
  on public.billing_google_routes_usage(route_key, requested_at desc);
create index if not exists billing_google_route_locks_expiry_idx
  on public.billing_google_route_locks(expires_at);

alter table public.billing_pin_distance_cache enable row level security;
alter table public.billing_google_routes_usage enable row level security;
alter table public.billing_google_route_locks enable row level security;

drop policy if exists "Authenticated users can read shared PIN distances" on public.billing_pin_distance_cache;
create policy "Authenticated users can read shared PIN distances"
  on public.billing_pin_distance_cache
  for select
  to authenticated
  using (true);

create or replace function public.billing_normalize_pincode(value text)
returns text
language sql
immutable
set search_path = public
as $$
  with normalized as (
    select regexp_replace(coalesce(value, ''), '[^0-9]', '', 'g') as pin
  )
  select case when pin ~ '^[0-9]{6}$' then pin else '' end
  from normalized;
$$;

create or replace function public.billing_pin_route_key(from_pincode text, to_pincode text)
returns text
language sql
immutable
set search_path = public
as $$
  with pins as (
    select
      public.billing_normalize_pincode(from_pincode) as from_pin,
      public.billing_normalize_pincode(to_pincode) as to_pin
  )
  select case
    when from_pin = '' or to_pin = '' then ''
    else least(from_pin, to_pin) || '-' || greatest(from_pin, to_pin)
  end
  from pins;
$$;

create or replace function public.billing_google_route_usage_summary()
returns jsonb
language plpgsql
stable
security definer
set search_path = public, pg_temp
as $$
declare
  local_now timestamp := timezone('Asia/Kolkata', now());
  year_count bigint := 0;
  month_count bigint := 0;
  day_count bigint := 0;
begin
  select
    count(*) filter (
      where timezone('Asia/Kolkata', requested_at) >= date_trunc('year', local_now)
    ),
    count(*) filter (
      where timezone('Asia/Kolkata', requested_at) >= date_trunc('month', local_now)
    ),
    count(*) filter (
      where timezone('Asia/Kolkata', requested_at) >= date_trunc('day', local_now)
    )
  into year_count, month_count, day_count
  from public.billing_google_routes_usage;

  return jsonb_build_object(
    'year', year_count,
    'yearLimit', 60000,
    'yearRemaining', greatest(0, 60000 - year_count),
    'month', month_count,
    'monthLimit', 5000,
    'monthRemaining', greatest(0, 5000 - month_count),
    'day', day_count,
    'dayLimit', 150,
    'dayRemaining', greatest(0, 150 - day_count),
    'timezone', 'Asia/Kolkata'
  );
end;
$$;

create or replace function public.billing_prepare_google_route_request(
  p_from_pincode text,
  p_to_pincode text
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  route_key_value text := public.billing_pin_route_key(p_from_pincode, p_to_pincode);
  pin_low_value text;
  pin_high_value text;
  request_token_value uuid := gen_random_uuid();
  cached_row public.billing_pin_distance_cache%rowtype;
  local_now timestamp := timezone('Asia/Kolkata', now());
  year_count bigint := 0;
  month_count bigint := 0;
  day_count bigint := 0;
  limit_name text := '';
begin
  if route_key_value = '' then
    raise exception 'Two valid six-digit pincodes are required';
  end if;

  pin_low_value := split_part(route_key_value, '-', 1);
  pin_high_value := split_part(route_key_value, '-', 2);

  update public.billing_pin_distance_cache
  set use_count = use_count + 1,
      last_used_at = now()
  where route_key = route_key_value
  returning * into cached_row;

  if found then
    return jsonb_build_object(
      'action', 'cached',
      'routeKey', cached_row.route_key,
      'distanceKm', cached_row.distance_km,
      'distanceMeters', cached_row.distance_meters,
      'duration', cached_row.duration,
      'source', cached_row.source,
      'confidence', cached_row.confidence,
      'usage', public.billing_google_route_usage_summary()
    );
  end if;

  perform pg_advisory_xact_lock(hashtext('billing-google-routes-usage-limits'));

  update public.billing_pin_distance_cache
  set use_count = use_count + 1,
      last_used_at = now()
  where route_key = route_key_value
  returning * into cached_row;

  if found then
    return jsonb_build_object(
      'action', 'cached',
      'routeKey', cached_row.route_key,
      'distanceKm', cached_row.distance_km,
      'distanceMeters', cached_row.distance_meters,
      'duration', cached_row.duration,
      'source', cached_row.source,
      'confidence', cached_row.confidence,
      'usage', public.billing_google_route_usage_summary()
    );
  end if;

  insert into public.billing_google_route_locks(route_key, request_token, created_at, expires_at)
  values (route_key_value, request_token_value, now(), now() + interval '45 seconds')
  on conflict (route_key) do update
  set request_token = excluded.request_token,
      created_at = excluded.created_at,
      expires_at = excluded.expires_at
  where public.billing_google_route_locks.expires_at <= now();

  if not found then
    return jsonb_build_object(
      'action', 'wait',
      'routeKey', route_key_value,
      'retryAfterMs', 400,
      'usage', public.billing_google_route_usage_summary()
    );
  end if;

  if exists (
    select 1
    from public.billing_google_routes_usage
    where route_key = route_key_value
  ) then
    delete from public.billing_google_route_locks
    where route_key = route_key_value and request_token = request_token_value;

    return jsonb_build_object(
      'action', 'previous-attempt',
      'routeKey', route_key_value,
      'reason', 'Google Routes was already attempted for this PIN pair',
      'usage', public.billing_google_route_usage_summary()
    );
  end if;

  select
    count(*) filter (
      where timezone('Asia/Kolkata', requested_at) >= date_trunc('year', local_now)
    ),
    count(*) filter (
      where timezone('Asia/Kolkata', requested_at) >= date_trunc('month', local_now)
    ),
    count(*) filter (
      where timezone('Asia/Kolkata', requested_at) >= date_trunc('day', local_now)
    )
  into year_count, month_count, day_count
  from public.billing_google_routes_usage;

  if year_count >= 60000 then
    limit_name := 'annual';
  elsif month_count >= 5000 then
    limit_name := 'monthly';
  elsif day_count >= 150 then
    limit_name := 'daily';
  end if;

  if limit_name <> '' then
    delete from public.billing_google_route_locks
    where route_key = route_key_value and request_token = request_token_value;

    return jsonb_build_object(
      'action', 'limit-reached',
      'routeKey', route_key_value,
      'limit', limit_name,
      'usage', public.billing_google_route_usage_summary()
    );
  end if;

  insert into public.billing_google_routes_usage(request_token, route_key, status, source)
  values (request_token_value, route_key_value, 'reserved', 'google-routes');

  return jsonb_build_object(
    'action', 'call-google',
    'routeKey', route_key_value,
    'fromPincode', pin_low_value,
    'toPincode', pin_high_value,
    'requestToken', request_token_value,
    'usage', jsonb_build_object(
      'year', year_count + 1,
      'yearLimit', 60000,
      'yearRemaining', greatest(0, 60000 - year_count - 1),
      'month', month_count + 1,
      'monthLimit', 5000,
      'monthRemaining', greatest(0, 5000 - month_count - 1),
      'day', day_count + 1,
      'dayLimit', 150,
      'dayRemaining', greatest(0, 150 - day_count - 1),
      'timezone', 'Asia/Kolkata'
    )
  );
end;
$$;

create or replace function public.billing_complete_google_route_request(
  p_request_token uuid,
  p_from_pincode text,
  p_to_pincode text,
  p_distance_km integer,
  p_distance_meters bigint default 0,
  p_duration text default '',
  p_source text default 'google-routes'
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  route_key_value text := public.billing_pin_route_key(p_from_pincode, p_to_pincode);
  usage_row public.billing_google_routes_usage%rowtype;
  cached_row public.billing_pin_distance_cache%rowtype;
begin
  if route_key_value = '' or p_distance_km is null or p_distance_km not between 1 and 4000 then
    raise exception 'Valid pincodes and a distance from 1 to 4000 KM are required';
  end if;

  select * into usage_row
  from public.billing_google_routes_usage
  where request_token = p_request_token
  for update;

  if not found or usage_row.route_key <> route_key_value then
    raise exception 'Google route reservation was not found';
  end if;

  insert into public.billing_pin_distance_cache(
    route_key, pin_low, pin_high, distance_km, distance_meters, duration,
    source, confidence, use_count, updated_at, last_used_at
  ) values (
    route_key_value,
    split_part(route_key_value, '-', 1),
    split_part(route_key_value, '-', 2),
    p_distance_km,
    greatest(0, coalesce(p_distance_meters, 0)),
    left(coalesce(p_duration, ''), 80),
    case when p_source = 'google-routes' then p_source else 'google-routes' end,
    'high',
    1,
    now(),
    now()
  )
  on conflict (route_key) do update set
    distance_km = excluded.distance_km,
    distance_meters = excluded.distance_meters,
    duration = excluded.duration,
    source = excluded.source,
    confidence = excluded.confidence,
    use_count = public.billing_pin_distance_cache.use_count + 1,
    updated_at = now(),
    last_used_at = now()
  returning * into cached_row;

  update public.billing_google_routes_usage
  set status = 'success',
      completed_at = now(),
      error_message = ''
  where request_token = p_request_token;

  delete from public.billing_google_route_locks
  where route_key = route_key_value and request_token = p_request_token;

  return jsonb_build_object(
    'action', 'completed',
    'routeKey', cached_row.route_key,
    'distanceKm', cached_row.distance_km,
    'distanceMeters', cached_row.distance_meters,
    'duration', cached_row.duration,
    'source', cached_row.source,
    'confidence', cached_row.confidence
  );
end;
$$;

create or replace function public.billing_fail_google_route_request(
  p_request_token uuid,
  p_error_message text default ''
)
returns boolean
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  route_key_value text;
begin
  update public.billing_google_routes_usage
  set status = 'failed',
      error_message = left(coalesce(p_error_message, ''), 500),
      completed_at = now()
  where request_token = p_request_token
  returning route_key into route_key_value;

  if route_key_value is not null then
    delete from public.billing_google_route_locks
    where route_key = route_key_value and request_token = p_request_token;
  end if;

  return route_key_value is not null;
end;
$$;

create or replace function public.billing_save_pin_distance(
  p_from_pincode text,
  p_to_pincode text,
  p_distance_km integer,
  p_source text default 'manual-confirmed'
)
returns jsonb
language plpgsql
security definer
set search_path = public, auth, pg_temp
as $$
declare
  route_key_value text := public.billing_pin_route_key(p_from_pincode, p_to_pincode);
  cached_row public.billing_pin_distance_cache%rowtype;
begin
  if auth.uid() is null then
    raise exception 'Authentication is required';
  end if;
  if route_key_value = '' or p_distance_km is null or p_distance_km not between 1 and 4000 then
    raise exception 'Valid pincodes and a confirmed distance from 1 to 4000 KM are required';
  end if;

  insert into public.billing_pin_distance_cache(
    route_key, pin_low, pin_high, distance_km, distance_meters, duration, source, confidence,
    use_count, created_by, updated_at, last_used_at
  ) values (
    route_key_value,
    split_part(route_key_value, '-', 1),
    split_part(route_key_value, '-', 2),
    p_distance_km,
    p_distance_km * 1000,
    '',
    'manual-confirmed',
    'confirmed',
    1,
    auth.uid(),
    now(),
    now()
  )
  on conflict (route_key) do update set
    distance_km = excluded.distance_km,
    distance_meters = excluded.distance_meters,
    duration = '',
    source = 'manual-confirmed',
    confidence = 'confirmed',
    use_count = public.billing_pin_distance_cache.use_count + 1,
    updated_at = now(),
    last_used_at = now()
  returning * into cached_row;

  return jsonb_build_object(
    'routeKey', cached_row.route_key,
    'distanceKm', cached_row.distance_km,
    'source', cached_row.source,
    'confidence', cached_row.confidence
  );
end;
$$;

revoke all on function public.billing_normalize_pincode(text) from public;
revoke all on function public.billing_pin_route_key(text, text) from public;
revoke all on function public.billing_google_route_usage_summary() from public;
revoke all on function public.billing_prepare_google_route_request(text, text) from public;
revoke all on function public.billing_complete_google_route_request(uuid, text, text, integer, bigint, text, text) from public;
revoke all on function public.billing_fail_google_route_request(uuid, text) from public;
revoke all on function public.billing_save_pin_distance(text, text, integer, text) from public;

grant execute on function public.billing_google_route_usage_summary() to authenticated, service_role;
grant execute on function public.billing_prepare_google_route_request(text, text) to service_role;
grant execute on function public.billing_complete_google_route_request(uuid, text, text, integer, bigint, text, text) to service_role;
grant execute on function public.billing_fail_google_route_request(uuid, text) to service_role;
grant execute on function public.billing_save_pin_distance(text, text, integer, text) to authenticated;
