create extension if not exists pgcrypto;

create table if not exists public.billing_cloud_workspaces (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null default 'Main Business',
  member_emails text[] not null default '{}',
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists billing_cloud_workspaces_owner_id_idx
  on public.billing_cloud_workspaces(owner_id);

create unique index if not exists billing_cloud_workspaces_owner_name_unique_idx
  on public.billing_cloud_workspaces(owner_id, lower(name));

create index if not exists billing_cloud_workspaces_member_emails_idx
  on public.billing_cloud_workspaces using gin(member_emails);

alter table public.billing_cloud_workspaces enable row level security;

drop policy if exists "Workspace members can read" on public.billing_cloud_workspaces;
drop policy if exists "Users can create own workspaces" on public.billing_cloud_workspaces;
drop policy if exists "Workspace members can update" on public.billing_cloud_workspaces;
drop policy if exists "Owners can delete workspaces" on public.billing_cloud_workspaces;

create policy "Workspace members can read"
  on public.billing_cloud_workspaces
  for select
  to authenticated
  using (
    owner_id = auth.uid()
    or lower(auth.jwt() ->> 'email') = any(member_emails)
  );

create policy "Users can create own workspaces"
  on public.billing_cloud_workspaces
  for insert
  to authenticated
  with check (owner_id = auth.uid());

create policy "Workspace members can update"
  on public.billing_cloud_workspaces
  for update
  to authenticated
  using (
    owner_id = auth.uid()
    or lower(auth.jwt() ->> 'email') = any(member_emails)
  )
  with check (
    owner_id = auth.uid()
    or lower(auth.jwt() ->> 'email') = any(member_emails)
  );

create policy "Owners can delete workspaces"
  on public.billing_cloud_workspaces
  for delete
  to authenticated
  using (owner_id = auth.uid());

create or replace function public.can_access_billing_workspace(workspace_id text)
returns boolean
language sql
stable
security definer
set search_path = public, auth
as $$
  select exists (
    select 1
    from public.billing_cloud_workspaces workspace
    where workspace.id::text = workspace_id
      and (
        workspace.owner_id = auth.uid()
        or coalesce(lower(auth.jwt() ->> 'email'), '') in (
          select lower(member.email)
          from unnest(workspace.member_emails) as member(email)
        )
      )
  );
$$;

revoke all on function public.can_access_billing_workspace(text) from public;
grant execute on function public.can_access_billing_workspace(text) to authenticated;

create or replace function public.owns_billing_workspace(workspace_id text)
returns boolean
language sql
stable
security definer
set search_path = public, auth
as $$
  select exists (
    select 1
    from public.billing_cloud_workspaces workspace
    where workspace.id::text = workspace_id
      and workspace.owner_id = auth.uid()
  );
$$;

revoke all on function public.owns_billing_workspace(text) from public;
grant execute on function public.owns_billing_workspace(text) to authenticated;

insert into storage.buckets (id, name, public)
values ('purchase-invoices', 'purchase-invoices', false)
on conflict (id) do nothing;

drop policy if exists "Workspace members can read purchase invoices" on storage.objects;
drop policy if exists "Workspace members can upload purchase invoices" on storage.objects;
drop policy if exists "Workspace members can update purchase invoices" on storage.objects;
drop policy if exists "Workspace owners can delete purchase invoices" on storage.objects;

create policy "Workspace members can read purchase invoices"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'purchase-invoices'
    and public.can_access_billing_workspace((storage.foldername(name))[1])
  );

create policy "Workspace members can upload purchase invoices"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'purchase-invoices'
    and public.can_access_billing_workspace((storage.foldername(name))[1])
  );

create policy "Workspace members can update purchase invoices"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'purchase-invoices'
    and public.can_access_billing_workspace((storage.foldername(name))[1])
  )
  with check (
    bucket_id = 'purchase-invoices'
    and public.can_access_billing_workspace((storage.foldername(name))[1])
  );

create policy "Workspace owners can delete purchase invoices"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'purchase-invoices'
    and public.owns_billing_workspace((storage.foldername(name))[1])
  );

create table if not exists public.billing_parties (
  workspace_id uuid not null references public.billing_cloud_workspaces(id) on delete cascade,
  id text not null,
  name text not null default '',
  type text not null default '',
  gstin text not null default '',
  phone text not null default '',
  email text not null default '',
  place text not null default '',
  data jsonb not null default '{}'::jsonb,
  sync_status text not null default 'Synced',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id),
  last_synced_at timestamptz,
  primary key (workspace_id, id)
);

create table if not exists public.billing_items (
  workspace_id uuid not null references public.billing_cloud_workspaces(id) on delete cascade,
  id text not null,
  name text not null default '',
  hsn text not null default '',
  gst_rate numeric(8,2) not null default 0,
  sale_rate numeric(14,2) not null default 0,
  purchase_rate numeric(14,2) not null default 0,
  data jsonb not null default '{}'::jsonb,
  sync_status text not null default 'Synced',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id),
  last_synced_at timestamptz,
  primary key (workspace_id, id)
);

create table if not exists public.billing_sales (
  workspace_id uuid not null references public.billing_cloud_workspaces(id) on delete cascade,
  id text not null,
  profile_id text not null default '',
  party_id text not null default '',
  invoice_number text not null default '',
  invoice_date date,
  status text not null default '',
  taxable numeric(14,2) not null default 0,
  cgst numeric(14,2) not null default 0,
  sgst numeric(14,2) not null default 0,
  igst numeric(14,2) not null default 0,
  gst numeric(14,2) not null default 0,
  total numeric(14,2) not null default 0,
  cancelled boolean not null default false,
  data jsonb not null default '{}'::jsonb,
  sync_status text not null default 'Synced',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id),
  last_synced_at timestamptz,
  primary key (workspace_id, id)
);

create table if not exists public.billing_purchases (
  workspace_id uuid not null references public.billing_cloud_workspaces(id) on delete cascade,
  id text not null,
  profile_id text not null default '',
  party_id text not null default '',
  invoice_number text not null default '',
  invoice_date date,
  seller_gstin text not null default '',
  buyer_gstin text not null default '',
  review_status text not null default '',
  status text not null default '',
  taxable numeric(14,2) not null default 0,
  cgst numeric(14,2) not null default 0,
  sgst numeric(14,2) not null default 0,
  igst numeric(14,2) not null default 0,
  gst numeric(14,2) not null default 0,
  total numeric(14,2) not null default 0,
  data jsonb not null default '{}'::jsonb,
  sync_status text not null default 'Synced',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id),
  last_synced_at timestamptz,
  primary key (workspace_id, id)
);

alter table public.billing_purchases
  add column if not exists status text not null default '';

update public.billing_purchases
set status = coalesce(data ->> 'status', '')
where status = '' and coalesce(data ->> 'status', '') <> '';

create table if not exists public.billing_purchase_orders (
  workspace_id uuid not null references public.billing_cloud_workspaces(id) on delete cascade,
  id text not null,
  profile_id text not null default '',
  party_id text not null default '',
  po_number text not null default '',
  po_date date,
  status text not null default '',
  taxable numeric(14,2) not null default 0,
  cgst numeric(14,2) not null default 0,
  sgst numeric(14,2) not null default 0,
  igst numeric(14,2) not null default 0,
  gst numeric(14,2) not null default 0,
  total numeric(14,2) not null default 0,
  data jsonb not null default '{}'::jsonb,
  sync_status text not null default 'Synced',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id),
  last_synced_at timestamptz,
  primary key (workspace_id, id)
);

create table if not exists public.billing_sale_items (
  workspace_id uuid not null references public.billing_cloud_workspaces(id) on delete cascade,
  sale_id text not null,
  line_index integer not null,
  item_id text not null default '',
  item_name text not null default '',
  hsn text not null default '',
  qty numeric(14,3) not null default 0,
  rate numeric(14,2) not null default 0,
  gst_rate numeric(8,2) not null default 0,
  taxable numeric(14,2) not null default 0,
  gst numeric(14,2) not null default 0,
  total numeric(14,2) not null default 0,
  data jsonb not null default '{}'::jsonb,
  sync_status text not null default 'Synced',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id),
  last_synced_at timestamptz,
  primary key (workspace_id, sale_id, line_index)
);

create table if not exists public.billing_purchase_items (
  workspace_id uuid not null references public.billing_cloud_workspaces(id) on delete cascade,
  purchase_id text not null,
  line_index integer not null,
  item_id text not null default '',
  item_name text not null default '',
  hsn text not null default '',
  qty numeric(14,3) not null default 0,
  rate numeric(14,2) not null default 0,
  gross_rate numeric(14,2) not null default 0,
  gst_rate numeric(8,2) not null default 0,
  taxable numeric(14,2) not null default 0,
  gst numeric(14,2) not null default 0,
  total numeric(14,2) not null default 0,
  data jsonb not null default '{}'::jsonb,
  sync_status text not null default 'Synced',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id),
  last_synced_at timestamptz,
  primary key (workspace_id, purchase_id, line_index)
);

create table if not exists public.billing_purchase_order_items (
  workspace_id uuid not null references public.billing_cloud_workspaces(id) on delete cascade,
  purchase_order_id text not null,
  line_index integer not null,
  item_id text not null default '',
  item_name text not null default '',
  hsn text not null default '',
  qty numeric(14,3) not null default 0,
  rate numeric(14,2) not null default 0,
  gross_rate numeric(14,2) not null default 0,
  gst_rate numeric(8,2) not null default 0,
  taxable numeric(14,2) not null default 0,
  gst numeric(14,2) not null default 0,
  total numeric(14,2) not null default 0,
  data jsonb not null default '{}'::jsonb,
  sync_status text not null default 'Synced',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id),
  last_synced_at timestamptz,
  primary key (workspace_id, purchase_order_id, line_index)
);

create table if not exists public.billing_audit_logs (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.billing_cloud_workspaces(id) on delete cascade,
  entity_type text not null,
  entity_id text not null default '',
  action text not null,
  before_data jsonb,
  after_data jsonb,
  source text not null default 'web-app',
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table if not exists public.billing_cloud_backups (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.billing_cloud_workspaces(id) on delete cascade,
  backup_date date not null default current_date,
  data jsonb not null default '{}'::jsonb,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  unique (workspace_id, backup_date)
);

create index if not exists billing_sales_workspace_date_idx on public.billing_sales(workspace_id, invoice_date);
create index if not exists billing_purchases_workspace_date_idx on public.billing_purchases(workspace_id, invoice_date);
create index if not exists billing_purchase_orders_workspace_date_idx on public.billing_purchase_orders(workspace_id, po_date);
create index if not exists billing_parties_workspace_gstin_idx on public.billing_parties(workspace_id, gstin);
create index if not exists billing_parties_workspace_type_idx on public.billing_parties(workspace_id, type);
create index if not exists billing_items_workspace_name_idx on public.billing_items(workspace_id, lower(name));
create index if not exists billing_audit_workspace_created_idx on public.billing_audit_logs(workspace_id, created_at desc);
create index if not exists billing_backups_workspace_date_idx on public.billing_cloud_backups(workspace_id, backup_date desc);

alter table public.billing_parties enable row level security;
alter table public.billing_items enable row level security;
alter table public.billing_sales enable row level security;
alter table public.billing_purchases enable row level security;
alter table public.billing_purchase_orders enable row level security;
alter table public.billing_sale_items enable row level security;
alter table public.billing_purchase_items enable row level security;
alter table public.billing_purchase_order_items enable row level security;
alter table public.billing_audit_logs enable row level security;
alter table public.billing_cloud_backups enable row level security;

drop policy if exists "Workspace members can read billing rows" on public.billing_parties;
drop policy if exists "Workspace members can insert billing rows" on public.billing_parties;
drop policy if exists "Workspace members can update billing rows" on public.billing_parties;
drop policy if exists "Workspace members can delete billing rows" on public.billing_parties;

create policy "Workspace members can read billing rows" on public.billing_parties
  for select to authenticated using (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can insert billing rows" on public.billing_parties
  for insert to authenticated with check (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can update billing rows" on public.billing_parties
  for update to authenticated using (public.can_access_billing_workspace(workspace_id::text))
  with check (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can delete billing rows" on public.billing_parties
  for delete to authenticated using (public.can_access_billing_workspace(workspace_id::text));

drop policy if exists "Workspace members can read billing rows" on public.billing_items;
drop policy if exists "Workspace members can insert billing rows" on public.billing_items;
drop policy if exists "Workspace members can update billing rows" on public.billing_items;
drop policy if exists "Workspace members can delete billing rows" on public.billing_items;

create policy "Workspace members can read billing rows" on public.billing_items
  for select to authenticated using (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can insert billing rows" on public.billing_items
  for insert to authenticated with check (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can update billing rows" on public.billing_items
  for update to authenticated using (public.can_access_billing_workspace(workspace_id::text))
  with check (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can delete billing rows" on public.billing_items
  for delete to authenticated using (public.can_access_billing_workspace(workspace_id::text));

drop policy if exists "Workspace members can read billing rows" on public.billing_sales;
drop policy if exists "Workspace members can insert billing rows" on public.billing_sales;
drop policy if exists "Workspace members can update billing rows" on public.billing_sales;
drop policy if exists "Workspace members can delete billing rows" on public.billing_sales;

create policy "Workspace members can read billing rows" on public.billing_sales
  for select to authenticated using (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can insert billing rows" on public.billing_sales
  for insert to authenticated with check (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can update billing rows" on public.billing_sales
  for update to authenticated using (public.can_access_billing_workspace(workspace_id::text))
  with check (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can delete billing rows" on public.billing_sales
  for delete to authenticated using (public.can_access_billing_workspace(workspace_id::text));

drop policy if exists "Workspace members can read billing rows" on public.billing_purchases;
drop policy if exists "Workspace members can insert billing rows" on public.billing_purchases;
drop policy if exists "Workspace members can update billing rows" on public.billing_purchases;
drop policy if exists "Workspace members can delete billing rows" on public.billing_purchases;

create policy "Workspace members can read billing rows" on public.billing_purchases
  for select to authenticated using (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can insert billing rows" on public.billing_purchases
  for insert to authenticated with check (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can update billing rows" on public.billing_purchases
  for update to authenticated using (public.can_access_billing_workspace(workspace_id::text))
  with check (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can delete billing rows" on public.billing_purchases
  for delete to authenticated using (public.can_access_billing_workspace(workspace_id::text));

drop policy if exists "Workspace members can read billing rows" on public.billing_purchase_orders;
drop policy if exists "Workspace members can insert billing rows" on public.billing_purchase_orders;
drop policy if exists "Workspace members can update billing rows" on public.billing_purchase_orders;
drop policy if exists "Workspace members can delete billing rows" on public.billing_purchase_orders;

create policy "Workspace members can read billing rows" on public.billing_purchase_orders
  for select to authenticated using (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can insert billing rows" on public.billing_purchase_orders
  for insert to authenticated with check (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can update billing rows" on public.billing_purchase_orders
  for update to authenticated using (public.can_access_billing_workspace(workspace_id::text))
  with check (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can delete billing rows" on public.billing_purchase_orders
  for delete to authenticated using (public.can_access_billing_workspace(workspace_id::text));

drop policy if exists "Workspace members can read billing rows" on public.billing_sale_items;
drop policy if exists "Workspace members can insert billing rows" on public.billing_sale_items;
drop policy if exists "Workspace members can update billing rows" on public.billing_sale_items;
drop policy if exists "Workspace members can delete billing rows" on public.billing_sale_items;

create policy "Workspace members can read billing rows" on public.billing_sale_items
  for select to authenticated using (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can insert billing rows" on public.billing_sale_items
  for insert to authenticated with check (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can update billing rows" on public.billing_sale_items
  for update to authenticated using (public.can_access_billing_workspace(workspace_id::text))
  with check (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can delete billing rows" on public.billing_sale_items
  for delete to authenticated using (public.can_access_billing_workspace(workspace_id::text));

drop policy if exists "Workspace members can read billing rows" on public.billing_purchase_items;
drop policy if exists "Workspace members can insert billing rows" on public.billing_purchase_items;
drop policy if exists "Workspace members can update billing rows" on public.billing_purchase_items;
drop policy if exists "Workspace members can delete billing rows" on public.billing_purchase_items;

create policy "Workspace members can read billing rows" on public.billing_purchase_items
  for select to authenticated using (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can insert billing rows" on public.billing_purchase_items
  for insert to authenticated with check (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can update billing rows" on public.billing_purchase_items
  for update to authenticated using (public.can_access_billing_workspace(workspace_id::text))
  with check (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can delete billing rows" on public.billing_purchase_items
  for delete to authenticated using (public.can_access_billing_workspace(workspace_id::text));

drop policy if exists "Workspace members can read billing rows" on public.billing_purchase_order_items;
drop policy if exists "Workspace members can insert billing rows" on public.billing_purchase_order_items;
drop policy if exists "Workspace members can update billing rows" on public.billing_purchase_order_items;
drop policy if exists "Workspace members can delete billing rows" on public.billing_purchase_order_items;

create policy "Workspace members can read billing rows" on public.billing_purchase_order_items
  for select to authenticated using (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can insert billing rows" on public.billing_purchase_order_items
  for insert to authenticated with check (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can update billing rows" on public.billing_purchase_order_items
  for update to authenticated using (public.can_access_billing_workspace(workspace_id::text))
  with check (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can delete billing rows" on public.billing_purchase_order_items
  for delete to authenticated using (public.can_access_billing_workspace(workspace_id::text));

drop policy if exists "Workspace members can read audit logs" on public.billing_audit_logs;
drop policy if exists "Workspace members can insert audit logs" on public.billing_audit_logs;

create policy "Workspace members can read audit logs" on public.billing_audit_logs
  for select to authenticated using (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can insert audit logs" on public.billing_audit_logs
  for insert to authenticated with check (public.can_access_billing_workspace(workspace_id::text));

drop policy if exists "Workspace members can read cloud backups" on public.billing_cloud_backups;
drop policy if exists "Workspace members can insert cloud backups" on public.billing_cloud_backups;
drop policy if exists "Workspace members can update cloud backups" on public.billing_cloud_backups;
drop policy if exists "Workspace owners can delete cloud backups" on public.billing_cloud_backups;

create policy "Workspace members can read cloud backups" on public.billing_cloud_backups
  for select to authenticated using (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can insert cloud backups" on public.billing_cloud_backups
  for insert to authenticated with check (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can update cloud backups" on public.billing_cloud_backups
  for update to authenticated using (public.can_access_billing_workspace(workspace_id::text))
  with check (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace owners can delete cloud backups" on public.billing_cloud_backups
  for delete to authenticated using (public.owns_billing_workspace(workspace_id::text));

create or replace function public.billing_json_numeric(value jsonb, key text)
returns numeric
language sql
immutable
as $$
  with cleaned as (
    select regexp_replace(coalesce(value ->> key, ''), '[^0-9.-]', '', 'g') as raw_value
  )
  select case
    when raw_value ~ '^-?[0-9]+(\.[0-9]+)?$' then raw_value::numeric
    else 0
  end
  from cleaned;
$$;

create or replace function public.billing_json_date(value jsonb, key text)
returns date
language sql
immutable
as $$
  select case
    when coalesce(value ->> key, '') ~ '^\d{4}-\d{2}-\d{2}$' then (value ->> key)::date
    else null
  end;
$$;

insert into public.billing_parties (
  workspace_id, id, name, type, gstin, phone, email, place, data, sync_status,
  created_at, updated_at, created_by, last_synced_at
)
select
  workspace.id,
  party ->> 'id',
  coalesce(party ->> 'name', ''),
  coalesce(party ->> 'type', ''),
  coalesce(party ->> 'gstin', ''),
  coalesce(party ->> 'phone', ''),
  coalesce(party ->> 'email', ''),
  coalesce(party ->> 'place', ''),
  party,
  'Synced',
  workspace.created_at,
  workspace.updated_at,
  workspace.owner_id,
  workspace.updated_at
from public.billing_cloud_workspaces workspace
cross join lateral jsonb_array_elements(coalesce(workspace.data -> 'parties', '[]'::jsonb)) party
where coalesce(party ->> 'id', '') <> ''
on conflict (workspace_id, id) do update set
  name = excluded.name,
  type = excluded.type,
  gstin = excluded.gstin,
  phone = excluded.phone,
  email = excluded.email,
  place = excluded.place,
  data = excluded.data,
  sync_status = excluded.sync_status,
  updated_at = excluded.updated_at,
  last_synced_at = excluded.last_synced_at;

insert into public.billing_items (
  workspace_id, id, name, hsn, gst_rate, sale_rate, purchase_rate, data, sync_status,
  created_at, updated_at, created_by, last_synced_at
)
select
  workspace.id,
  item ->> 'id',
  coalesce(item ->> 'name', ''),
  coalesce(item ->> 'hsn', ''),
  public.billing_json_numeric(item, 'gstRate'),
  public.billing_json_numeric(item, 'saleRate'),
  public.billing_json_numeric(item, 'purchaseRate'),
  item,
  'Synced',
  workspace.created_at,
  workspace.updated_at,
  workspace.owner_id,
  workspace.updated_at
from public.billing_cloud_workspaces workspace
cross join lateral jsonb_array_elements(coalesce(workspace.data -> 'items', '[]'::jsonb)) item
where coalesce(item ->> 'id', '') <> ''
on conflict (workspace_id, id) do update set
  name = excluded.name,
  hsn = excluded.hsn,
  gst_rate = excluded.gst_rate,
  sale_rate = excluded.sale_rate,
  purchase_rate = excluded.purchase_rate,
  data = excluded.data,
  sync_status = excluded.sync_status,
  updated_at = excluded.updated_at,
  last_synced_at = excluded.last_synced_at;

insert into public.billing_sales (
  workspace_id, id, profile_id, party_id, invoice_number, invoice_date, status,
  taxable, cgst, sgst, igst, gst, total, cancelled, data, sync_status,
  created_at, updated_at, created_by, last_synced_at
)
select
  workspace.id,
  sale ->> 'id',
  coalesce(sale ->> 'profileId', ''),
  coalesce(sale ->> 'partyId', ''),
  coalesce(sale ->> 'number', ''),
  public.billing_json_date(sale, 'date'),
  coalesce(sale ->> 'status', ''),
  public.billing_json_numeric(sale, 'taxable'),
  public.billing_json_numeric(sale, 'cgst'),
  public.billing_json_numeric(sale, 'sgst'),
  public.billing_json_numeric(sale, 'igst'),
  public.billing_json_numeric(sale, 'gst'),
  public.billing_json_numeric(sale, 'total'),
  case when coalesce(sale ->> 'cancelled', '') in ('true', 'false') then (sale ->> 'cancelled')::boolean else false end,
  sale,
  'Synced',
  workspace.created_at,
  workspace.updated_at,
  workspace.owner_id,
  workspace.updated_at
from public.billing_cloud_workspaces workspace
cross join lateral jsonb_array_elements(coalesce(workspace.data -> 'sales', '[]'::jsonb)) sale
where coalesce(sale ->> 'id', '') <> ''
on conflict (workspace_id, id) do update set
  profile_id = excluded.profile_id,
  party_id = excluded.party_id,
  invoice_number = excluded.invoice_number,
  invoice_date = excluded.invoice_date,
  status = excluded.status,
  taxable = excluded.taxable,
  cgst = excluded.cgst,
  sgst = excluded.sgst,
  igst = excluded.igst,
  gst = excluded.gst,
  total = excluded.total,
  cancelled = excluded.cancelled,
  data = excluded.data,
  sync_status = excluded.sync_status,
  updated_at = excluded.updated_at,
  last_synced_at = excluded.last_synced_at;

insert into public.billing_purchases (
  workspace_id, id, profile_id, party_id, invoice_number, invoice_date,
  seller_gstin, buyer_gstin, review_status, taxable, cgst, sgst, igst, gst, total,
  data, sync_status, created_at, updated_at, created_by, last_synced_at
)
select
  workspace.id,
  purchase ->> 'id',
  coalesce(purchase ->> 'profileId', ''),
  coalesce(purchase ->> 'partyId', ''),
  coalesce(purchase ->> 'number', ''),
  public.billing_json_date(purchase, 'date'),
  coalesce(purchase ->> 'sellerGstin', ''),
  coalesce(purchase ->> 'buyerGstin', ''),
  coalesce(purchase ->> 'reviewStatus', ''),
  public.billing_json_numeric(purchase, 'taxable'),
  public.billing_json_numeric(purchase, 'cgst'),
  public.billing_json_numeric(purchase, 'sgst'),
  public.billing_json_numeric(purchase, 'igst'),
  public.billing_json_numeric(purchase, 'gst'),
  public.billing_json_numeric(purchase, 'total'),
  purchase,
  'Synced',
  workspace.created_at,
  workspace.updated_at,
  workspace.owner_id,
  workspace.updated_at
from public.billing_cloud_workspaces workspace
cross join lateral jsonb_array_elements(coalesce(workspace.data -> 'purchases', '[]'::jsonb)) purchase
where coalesce(purchase ->> 'id', '') <> ''
on conflict (workspace_id, id) do update set
  profile_id = excluded.profile_id,
  party_id = excluded.party_id,
  invoice_number = excluded.invoice_number,
  invoice_date = excluded.invoice_date,
  seller_gstin = excluded.seller_gstin,
  buyer_gstin = excluded.buyer_gstin,
  review_status = excluded.review_status,
  taxable = excluded.taxable,
  cgst = excluded.cgst,
  sgst = excluded.sgst,
  igst = excluded.igst,
  gst = excluded.gst,
  total = excluded.total,
  data = excluded.data,
  sync_status = excluded.sync_status,
  updated_at = excluded.updated_at,
  last_synced_at = excluded.last_synced_at;

insert into public.billing_purchase_orders (
  workspace_id, id, profile_id, party_id, po_number, po_date, status,
  taxable, cgst, sgst, igst, gst, total, data, sync_status,
  created_at, updated_at, created_by, last_synced_at
)
select
  workspace.id,
  po ->> 'id',
  coalesce(po ->> 'profileId', ''),
  coalesce(po ->> 'partyId', ''),
  coalesce(po ->> 'number', ''),
  public.billing_json_date(po, 'date'),
  coalesce(po ->> 'status', ''),
  public.billing_json_numeric(po, 'taxable'),
  public.billing_json_numeric(po, 'cgst'),
  public.billing_json_numeric(po, 'sgst'),
  public.billing_json_numeric(po, 'igst'),
  public.billing_json_numeric(po, 'gst'),
  public.billing_json_numeric(po, 'total'),
  po,
  'Synced',
  workspace.created_at,
  workspace.updated_at,
  workspace.owner_id,
  workspace.updated_at
from public.billing_cloud_workspaces workspace
cross join lateral jsonb_array_elements(coalesce(workspace.data -> 'purchaseOrders', '[]'::jsonb)) po
where coalesce(po ->> 'id', '') <> ''
on conflict (workspace_id, id) do update set
  profile_id = excluded.profile_id,
  party_id = excluded.party_id,
  po_number = excluded.po_number,
  po_date = excluded.po_date,
  status = excluded.status,
  taxable = excluded.taxable,
  cgst = excluded.cgst,
  sgst = excluded.sgst,
  igst = excluded.igst,
  gst = excluded.gst,
  total = excluded.total,
  data = excluded.data,
  sync_status = excluded.sync_status,
  updated_at = excluded.updated_at,
  last_synced_at = excluded.last_synced_at;

delete from public.billing_sale_items
where workspace_id in (select id from public.billing_cloud_workspaces);

insert into public.billing_sale_items (
  workspace_id, sale_id, line_index, item_id, item_name, hsn, qty, rate, gst_rate,
  taxable, gst, total, data, sync_status, created_at, updated_at, created_by, last_synced_at
)
select
  workspace.id,
  sale ->> 'id',
  line_no::integer - 1,
  coalesce(line ->> 'itemId', ''),
  coalesce(nullif(line ->> 'itemName', ''), nullif(line ->> 'name', ''), ''),
  coalesce(nullif(line ->> 'hsn', ''), nullif(line ->> 'hsnCode', ''), ''),
  public.billing_json_numeric(line, 'qty'),
  public.billing_json_numeric(line, 'rate'),
  public.billing_json_numeric(line, 'gstRate'),
  round(public.billing_json_numeric(line, 'qty') * public.billing_json_numeric(line, 'rate'), 2),
  round((public.billing_json_numeric(line, 'qty') * public.billing_json_numeric(line, 'rate')) * public.billing_json_numeric(line, 'gstRate') / 100, 2),
  round((public.billing_json_numeric(line, 'qty') * public.billing_json_numeric(line, 'rate')) * (1 + public.billing_json_numeric(line, 'gstRate') / 100), 2),
  line,
  'Synced',
  workspace.created_at,
  workspace.updated_at,
  workspace.owner_id,
  workspace.updated_at
from public.billing_cloud_workspaces workspace
cross join lateral jsonb_array_elements(coalesce(workspace.data -> 'sales', '[]'::jsonb)) sale
cross join lateral jsonb_array_elements(coalesce(sale -> 'lines', '[]'::jsonb)) with ordinality as sale_line(line, line_no)
where coalesce(sale ->> 'id', '') <> '';

delete from public.billing_purchase_items
where workspace_id in (select id from public.billing_cloud_workspaces);

insert into public.billing_purchase_items (
  workspace_id, purchase_id, line_index, item_id, item_name, hsn, qty, rate, gross_rate,
  gst_rate, taxable, gst, total, data, sync_status, created_at, updated_at, created_by, last_synced_at
)
select
  workspace.id,
  purchase ->> 'id',
  line_no::integer - 1,
  coalesce(line ->> 'itemId', ''),
  coalesce(nullif(line ->> 'itemName', ''), nullif(line ->> 'name', ''), ''),
  coalesce(nullif(line ->> 'hsn', ''), nullif(line ->> 'hsnCode', ''), ''),
  public.billing_json_numeric(line, 'qty'),
  public.billing_json_numeric(line, 'rate'),
  public.billing_json_numeric(line, 'grossRate'),
  public.billing_json_numeric(line, 'gstRate'),
  round(public.billing_json_numeric(line, 'qty') * public.billing_json_numeric(line, 'rate'), 2),
  case
    when public.billing_json_numeric(line, 'grossRate') > 0 then round((public.billing_json_numeric(line, 'qty') * public.billing_json_numeric(line, 'grossRate')) - (public.billing_json_numeric(line, 'qty') * public.billing_json_numeric(line, 'rate')), 2)
    else round((public.billing_json_numeric(line, 'qty') * public.billing_json_numeric(line, 'rate')) * public.billing_json_numeric(line, 'gstRate') / 100, 2)
  end,
  case
    when public.billing_json_numeric(line, 'grossRate') > 0 then round(public.billing_json_numeric(line, 'qty') * public.billing_json_numeric(line, 'grossRate'), 2)
    else round((public.billing_json_numeric(line, 'qty') * public.billing_json_numeric(line, 'rate')) * (1 + public.billing_json_numeric(line, 'gstRate') / 100), 2)
  end,
  line,
  'Synced',
  workspace.created_at,
  workspace.updated_at,
  workspace.owner_id,
  workspace.updated_at
from public.billing_cloud_workspaces workspace
cross join lateral jsonb_array_elements(coalesce(workspace.data -> 'purchases', '[]'::jsonb)) purchase
cross join lateral jsonb_array_elements(coalesce(purchase -> 'lines', '[]'::jsonb)) with ordinality as purchase_line(line, line_no)
where coalesce(purchase ->> 'id', '') <> '';

delete from public.billing_purchase_order_items
where workspace_id in (select id from public.billing_cloud_workspaces);

insert into public.billing_purchase_order_items (
  workspace_id, purchase_order_id, line_index, item_id, item_name, hsn, qty, rate, gross_rate,
  gst_rate, taxable, gst, total, data, sync_status, created_at, updated_at, created_by, last_synced_at
)
select
  workspace.id,
  po ->> 'id',
  line_no::integer - 1,
  coalesce(line ->> 'itemId', ''),
  coalesce(nullif(line ->> 'itemName', ''), nullif(line ->> 'name', ''), ''),
  coalesce(nullif(line ->> 'hsn', ''), nullif(line ->> 'hsnCode', ''), ''),
  public.billing_json_numeric(line, 'qty'),
  public.billing_json_numeric(line, 'rate'),
  public.billing_json_numeric(line, 'grossRate'),
  public.billing_json_numeric(line, 'gstRate'),
  round(public.billing_json_numeric(line, 'qty') * public.billing_json_numeric(line, 'rate'), 2),
  case
    when public.billing_json_numeric(line, 'grossRate') > 0 then round((public.billing_json_numeric(line, 'qty') * public.billing_json_numeric(line, 'grossRate')) - (public.billing_json_numeric(line, 'qty') * public.billing_json_numeric(line, 'rate')), 2)
    else round((public.billing_json_numeric(line, 'qty') * public.billing_json_numeric(line, 'rate')) * public.billing_json_numeric(line, 'gstRate') / 100, 2)
  end,
  case
    when public.billing_json_numeric(line, 'grossRate') > 0 then round(public.billing_json_numeric(line, 'qty') * public.billing_json_numeric(line, 'grossRate'), 2)
    else round((public.billing_json_numeric(line, 'qty') * public.billing_json_numeric(line, 'rate')) * (1 + public.billing_json_numeric(line, 'gstRate') / 100), 2)
  end,
  line,
  'Synced',
  workspace.created_at,
  workspace.updated_at,
  workspace.owner_id,
  workspace.updated_at
from public.billing_cloud_workspaces workspace
cross join lateral jsonb_array_elements(coalesce(workspace.data -> 'purchaseOrders', '[]'::jsonb)) po
cross join lateral jsonb_array_elements(coalesce(po -> 'lines', '[]'::jsonb)) with ordinality as po_line(line, line_no)
where coalesce(po ->> 'id', '') <> '';

insert into public.billing_cloud_backups (workspace_id, backup_date, data, created_by, created_at)
select id, current_date, data, owner_id, now()
from public.billing_cloud_workspaces
on conflict (workspace_id, backup_date) do update set
  data = excluded.data;
