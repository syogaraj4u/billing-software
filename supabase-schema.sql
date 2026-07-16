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

create table if not exists public.billing_credit_notes (
  workspace_id uuid not null references public.billing_cloud_workspaces(id) on delete cascade,
  id text not null,
  profile_id text not null default '',
  party_id text not null default '',
  credit_note_number text not null default '',
  credit_note_date date,
  original_sale_id text,
  original_invoice_number text not null default '',
  original_invoice_date date,
  seller_gstin text not null default '',
  buyer_gstin text not null default '',
  reason text not null default '',
  restock boolean not null default false,
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
  primary key (workspace_id, id),
  unique (workspace_id, profile_id, credit_note_number)
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

create table if not exists public.billing_purchase_returns (
  workspace_id uuid not null references public.billing_cloud_workspaces(id) on delete cascade,
  id text not null,
  profile_id text not null default '',
  party_id text not null default '',
  return_number text not null default '',
  return_date date,
  original_sale_id text,
  original_invoice_number text not null default '',
  original_invoice_date date,
  seller_gstin text not null default '',
  buyer_gstin text not null default '',
  reason text not null default '',
  restock boolean not null default false,
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
  primary key (workspace_id, id),
  unique (workspace_id, profile_id, return_number)
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

create table if not exists public.billing_credit_note_items (
  workspace_id uuid not null references public.billing_cloud_workspaces(id) on delete cascade,
  credit_note_id text not null,
  line_index integer not null,
  original_line_index integer not null default 0,
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
  primary key (workspace_id, credit_note_id, line_index)
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

create table if not exists public.billing_purchase_return_items (
  workspace_id uuid not null references public.billing_cloud_workspaces(id) on delete cascade,
  purchase_return_id text not null,
  line_index integer not null,
  original_line_index integer not null default 0,
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
  primary key (workspace_id, purchase_return_id, line_index)
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
create index if not exists billing_credit_notes_workspace_date_idx on public.billing_credit_notes(workspace_id, credit_note_date);
create index if not exists billing_purchases_workspace_date_idx on public.billing_purchases(workspace_id, invoice_date);
create index if not exists billing_purchase_returns_workspace_date_idx on public.billing_purchase_returns(workspace_id, return_date);
create index if not exists billing_purchase_orders_workspace_date_idx on public.billing_purchase_orders(workspace_id, po_date);
create index if not exists billing_parties_workspace_gstin_idx on public.billing_parties(workspace_id, gstin);
create index if not exists billing_parties_workspace_type_idx on public.billing_parties(workspace_id, type);
create index if not exists billing_items_workspace_name_idx on public.billing_items(workspace_id, lower(name));
create index if not exists billing_audit_workspace_created_idx on public.billing_audit_logs(workspace_id, created_at desc);
create index if not exists billing_backups_workspace_date_idx on public.billing_cloud_backups(workspace_id, backup_date desc);

alter table public.billing_parties enable row level security;
alter table public.billing_items enable row level security;
alter table public.billing_sales enable row level security;
alter table public.billing_credit_notes enable row level security;
alter table public.billing_purchases enable row level security;
alter table public.billing_purchase_returns enable row level security;
alter table public.billing_purchase_orders enable row level security;
alter table public.billing_sale_items enable row level security;
alter table public.billing_credit_note_items enable row level security;
alter table public.billing_purchase_items enable row level security;
alter table public.billing_purchase_return_items enable row level security;
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

drop policy if exists "Workspace members can read billing rows" on public.billing_credit_notes;
drop policy if exists "Workspace members can insert billing rows" on public.billing_credit_notes;
drop policy if exists "Workspace members can update billing rows" on public.billing_credit_notes;
drop policy if exists "Workspace members can delete billing rows" on public.billing_credit_notes;

create policy "Workspace members can read billing rows" on public.billing_credit_notes
  for select to authenticated using (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can insert billing rows" on public.billing_credit_notes
  for insert to authenticated with check (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can update billing rows" on public.billing_credit_notes
  for update to authenticated using (public.can_access_billing_workspace(workspace_id::text))
  with check (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can delete billing rows" on public.billing_credit_notes
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

drop policy if exists "Workspace members can read billing rows" on public.billing_purchase_returns;
drop policy if exists "Workspace members can insert billing rows" on public.billing_purchase_returns;
drop policy if exists "Workspace members can update billing rows" on public.billing_purchase_returns;
drop policy if exists "Workspace members can delete billing rows" on public.billing_purchase_returns;

create policy "Workspace members can read billing rows" on public.billing_purchase_returns
  for select to authenticated using (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can insert billing rows" on public.billing_purchase_returns
  for insert to authenticated with check (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can update billing rows" on public.billing_purchase_returns
  for update to authenticated using (public.can_access_billing_workspace(workspace_id::text))
  with check (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can delete billing rows" on public.billing_purchase_returns
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

drop policy if exists "Workspace members can read billing rows" on public.billing_credit_note_items;
drop policy if exists "Workspace members can insert billing rows" on public.billing_credit_note_items;
drop policy if exists "Workspace members can update billing rows" on public.billing_credit_note_items;
drop policy if exists "Workspace members can delete billing rows" on public.billing_credit_note_items;

create policy "Workspace members can read billing rows" on public.billing_credit_note_items
  for select to authenticated using (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can insert billing rows" on public.billing_credit_note_items
  for insert to authenticated with check (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can update billing rows" on public.billing_credit_note_items
  for update to authenticated using (public.can_access_billing_workspace(workspace_id::text))
  with check (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can delete billing rows" on public.billing_credit_note_items
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

drop policy if exists "Workspace members can read billing rows" on public.billing_purchase_return_items;
drop policy if exists "Workspace members can insert billing rows" on public.billing_purchase_return_items;
drop policy if exists "Workspace members can update billing rows" on public.billing_purchase_return_items;
drop policy if exists "Workspace members can delete billing rows" on public.billing_purchase_return_items;

create policy "Workspace members can read billing rows" on public.billing_purchase_return_items
  for select to authenticated using (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can insert billing rows" on public.billing_purchase_return_items
  for insert to authenticated with check (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can update billing rows" on public.billing_purchase_return_items
  for update to authenticated using (public.can_access_billing_workspace(workspace_id::text))
  with check (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can delete billing rows" on public.billing_purchase_return_items
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

-- Shared PIN-distance cache and Google Routes usage safeguards.
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

create table if not exists public.billing_payment_sources (
  workspace_id uuid not null references public.billing_cloud_workspaces(id) on delete cascade,
  id text not null,
  profile_id text not null default '',
  name text not null default '',
  type text not null default 'Bank Account',
  institution text not null default '',
  last4 text not null default '',
  account_name text not null default '',
  opening_balance numeric(16,2) not null default 0,
  statement_day integer not null default 0,
  due_day integer not null default 0,
  active boolean not null default true,
  system_default boolean not null default false,
  data jsonb not null default '{}'::jsonb,
  sync_status text not null default 'Synced',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id),
  last_synced_at timestamptz,
  primary key (workspace_id, id)
);

create table if not exists public.billing_bank_transactions (
  workspace_id uuid not null references public.billing_cloud_workspaces(id) on delete cascade,
  id text not null,
  profile_id text not null default '',
  payment_source_id text not null default '',
  transaction_date date,
  description text not null default '',
  reference text not null default '',
  debit numeric(16,2) not null default 0,
  credit numeric(16,2) not null default 0,
  balance numeric(16,2) not null default 0,
  status text not null default 'unmatched',
  match_entry_type text not null default '',
  match_entry_id text not null default '',
  suggested_entry_type text not null default '',
  suggested_entry_id text not null default '',
  matched_amount numeric(16,2) not null default 0,
  difference numeric(16,2) not null default 0,
  difference_accepted boolean not null default false,
  fingerprint text not null default '',
  import_batch_id text not null default '',
  source_file text not null default '',
  imported_at timestamptz,
  data jsonb not null default '{}'::jsonb,
  sync_status text not null default 'Synced',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id),
  last_synced_at timestamptz,
  primary key (workspace_id, id)
);

create index if not exists billing_payment_sources_workspace_profile_idx
  on public.billing_payment_sources(workspace_id, profile_id, active);
create index if not exists billing_bank_transactions_workspace_date_idx
  on public.billing_bank_transactions(workspace_id, profile_id, transaction_date desc);
create index if not exists billing_bank_transactions_source_status_idx
  on public.billing_bank_transactions(workspace_id, payment_source_id, status, transaction_date desc);
create unique index if not exists billing_bank_transactions_workspace_fingerprint_unique_idx
  on public.billing_bank_transactions(workspace_id, fingerprint)
  where fingerprint <> '';

alter table public.billing_payment_sources enable row level security;
alter table public.billing_bank_transactions enable row level security;

drop policy if exists "Workspace members can read billing rows" on public.billing_payment_sources;
drop policy if exists "Workspace members can insert billing rows" on public.billing_payment_sources;
drop policy if exists "Workspace members can update billing rows" on public.billing_payment_sources;
drop policy if exists "Workspace members can delete billing rows" on public.billing_payment_sources;
create policy "Workspace members can read billing rows" on public.billing_payment_sources
  for select to authenticated using (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can insert billing rows" on public.billing_payment_sources
  for insert to authenticated with check (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can update billing rows" on public.billing_payment_sources
  for update to authenticated using (public.can_access_billing_workspace(workspace_id::text))
  with check (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can delete billing rows" on public.billing_payment_sources
  for delete to authenticated using (public.can_access_billing_workspace(workspace_id::text));

drop policy if exists "Workspace members can read billing rows" on public.billing_bank_transactions;
drop policy if exists "Workspace members can insert billing rows" on public.billing_bank_transactions;
drop policy if exists "Workspace members can update billing rows" on public.billing_bank_transactions;
drop policy if exists "Workspace members can delete billing rows" on public.billing_bank_transactions;
create policy "Workspace members can read billing rows" on public.billing_bank_transactions
  for select to authenticated using (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can insert billing rows" on public.billing_bank_transactions
  for insert to authenticated with check (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can update billing rows" on public.billing_bank_transactions
  for update to authenticated using (public.can_access_billing_workspace(workspace_id::text))
  with check (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can delete billing rows" on public.billing_bank_transactions
  for delete to authenticated using (public.can_access_billing_workspace(workspace_id::text));

insert into public.billing_payment_sources (
  workspace_id, id, profile_id, name, type, institution, last4, account_name,
  opening_balance, statement_day, due_day, active, system_default, data
)
select workspace.id, source ->> 'id', coalesce(source ->> 'profileId', ''),
  coalesce(source ->> 'name', ''), coalesce(source ->> 'type', 'Bank Account'),
  coalesce(source ->> 'institution', ''), right(regexp_replace(coalesce(source ->> 'last4', ''), '[^0-9]', '', 'g'), 4),
  coalesce(source ->> 'accountName', ''),
  case when coalesce(source ->> 'openingBalance', '') ~ '^-?[0-9]+(\.[0-9]+)?$' then (source ->> 'openingBalance')::numeric else 0 end,
  case when coalesce(source ->> 'statementDay', '') ~ '^[0-9]+$' then least(31, (source ->> 'statementDay')::integer) else 0 end,
  case when coalesce(source ->> 'dueDay', '') ~ '^[0-9]+$' then least(31, (source ->> 'dueDay')::integer) else 0 end,
  lower(coalesce(source ->> 'active', 'true')) <> 'false',
  lower(coalesce(source ->> 'systemDefault', 'false')) = 'true', source
from public.billing_cloud_workspaces workspace
cross join lateral jsonb_array_elements(case when jsonb_typeof(workspace.data -> 'paymentSources') = 'array' then workspace.data -> 'paymentSources' else '[]'::jsonb end) as source
where coalesce(source ->> 'id', '') <> ''
on conflict (workspace_id, id) do update set
  profile_id = excluded.profile_id, name = excluded.name, type = excluded.type,
  institution = excluded.institution, last4 = excluded.last4, account_name = excluded.account_name,
  opening_balance = excluded.opening_balance, statement_day = excluded.statement_day,
  due_day = excluded.due_day, active = excluded.active, system_default = excluded.system_default,
  data = excluded.data, updated_at = now();

insert into public.billing_bank_transactions (
  workspace_id, id, profile_id, payment_source_id, transaction_date, description,
  reference, debit, credit, balance, status, match_entry_type, match_entry_id,
  suggested_entry_type, suggested_entry_id, matched_amount, difference,
  difference_accepted, fingerprint, import_batch_id, source_file, imported_at, data
)
select workspace.id, bank_tx ->> 'id', coalesce(bank_tx ->> 'profileId', ''),
  coalesce(bank_tx ->> 'paymentSourceId', ''),
  case when coalesce(bank_tx ->> 'date', '') ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$' then (bank_tx ->> 'date')::date else null end,
  coalesce(bank_tx ->> 'description', ''), coalesce(bank_tx ->> 'reference', ''),
  case when coalesce(bank_tx ->> 'debit', '') ~ '^-?[0-9]+(\.[0-9]+)?$' then (bank_tx ->> 'debit')::numeric else 0 end,
  case when coalesce(bank_tx ->> 'credit', '') ~ '^-?[0-9]+(\.[0-9]+)?$' then (bank_tx ->> 'credit')::numeric else 0 end,
  case when coalesce(bank_tx ->> 'balance', '') ~ '^-?[0-9]+(\.[0-9]+)?$' then (bank_tx ->> 'balance')::numeric else 0 end,
  coalesce(bank_tx ->> 'status', 'unmatched'), coalesce(bank_tx ->> 'matchEntryType', ''),
  coalesce(bank_tx ->> 'matchEntryId', ''), coalesce(bank_tx ->> 'suggestedEntryType', ''),
  coalesce(bank_tx ->> 'suggestedEntryId', ''),
  case when coalesce(bank_tx ->> 'matchedAmount', '') ~ '^-?[0-9]+(\.[0-9]+)?$' then (bank_tx ->> 'matchedAmount')::numeric else 0 end,
  case when coalesce(bank_tx ->> 'difference', '') ~ '^-?[0-9]+(\.[0-9]+)?$' then (bank_tx ->> 'difference')::numeric else 0 end,
  lower(coalesce(bank_tx ->> 'differenceAccepted', 'false')) = 'true',
  coalesce(bank_tx ->> 'fingerprint', ''), coalesce(bank_tx ->> 'importBatchId', ''),
  coalesce(bank_tx ->> 'sourceFile', ''),
  case when coalesce(bank_tx ->> 'importedAt', '') ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}T' then (bank_tx ->> 'importedAt')::timestamptz else null end,
  bank_tx
from public.billing_cloud_workspaces workspace
cross join lateral jsonb_array_elements(case when jsonb_typeof(workspace.data -> 'bankTransactions') = 'array' then workspace.data -> 'bankTransactions' else '[]'::jsonb end) as bank_tx
where coalesce(bank_tx ->> 'id', '') <> ''
on conflict (workspace_id, id) do update set
  profile_id = excluded.profile_id, payment_source_id = excluded.payment_source_id,
  transaction_date = excluded.transaction_date, description = excluded.description,
  reference = excluded.reference, debit = excluded.debit, credit = excluded.credit,
  balance = excluded.balance, status = excluded.status, match_entry_type = excluded.match_entry_type,
  match_entry_id = excluded.match_entry_id, suggested_entry_type = excluded.suggested_entry_type,
  suggested_entry_id = excluded.suggested_entry_id, matched_amount = excluded.matched_amount,
  difference = excluded.difference, difference_accepted = excluded.difference_accepted,
  fingerprint = excluded.fingerprint, import_batch_id = excluded.import_batch_id,
  source_file = excluded.source_file, imported_at = excluded.imported_at,
  data = excluded.data, updated_at = now();

create table if not exists public.billing_tally_sync_runs (
  workspace_id uuid not null references public.billing_cloud_workspaces(id) on delete cascade,
  id text not null,
  profile_id text not null default '',
  run_type text not null default 'vouchers-export',
  status text not null default 'Exported',
  file_name text not null default '',
  source_file text not null default '',
  from_date date,
  to_date date,
  document_count integer not null default 0,
  entry_refs text[] not null default '{}'::text[],
  counts jsonb not null default '{}'::jsonb,
  message text not null default '',
  data jsonb not null default '{}'::jsonb,
  sync_status text not null default 'Synced',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id),
  last_synced_at timestamptz,
  primary key (workspace_id, id)
);

create index if not exists billing_tally_sync_runs_workspace_profile_idx
  on public.billing_tally_sync_runs(workspace_id, profile_id, created_at desc);
create index if not exists billing_tally_sync_runs_status_idx
  on public.billing_tally_sync_runs(workspace_id, status, run_type);

alter table public.billing_tally_sync_runs enable row level security;

drop policy if exists "Workspace members can read billing rows" on public.billing_tally_sync_runs;
drop policy if exists "Workspace members can insert billing rows" on public.billing_tally_sync_runs;
drop policy if exists "Workspace members can update billing rows" on public.billing_tally_sync_runs;
drop policy if exists "Workspace members can delete billing rows" on public.billing_tally_sync_runs;
create policy "Workspace members can read billing rows" on public.billing_tally_sync_runs
  for select to authenticated using (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can insert billing rows" on public.billing_tally_sync_runs
  for insert to authenticated with check (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can update billing rows" on public.billing_tally_sync_runs
  for update to authenticated using (public.can_access_billing_workspace(workspace_id::text))
  with check (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can delete billing rows" on public.billing_tally_sync_runs
  for delete to authenticated using (public.can_access_billing_workspace(workspace_id::text));

insert into public.billing_tally_sync_runs (
  workspace_id, id, profile_id, run_type, status, file_name, source_file,
  from_date, to_date, document_count, entry_refs, counts, message, data,
  sync_status, created_at, updated_at, created_by, last_synced_at
)
select workspace.id, sync_run ->> 'id', coalesce(sync_run ->> 'profileId', ''),
  coalesce(sync_run ->> 'runType', 'vouchers-export'), coalesce(sync_run ->> 'status', 'Exported'),
  coalesce(sync_run ->> 'fileName', ''), coalesce(sync_run ->> 'sourceFile', ''),
  case when coalesce(sync_run ->> 'fromDate', '') ~ '^\d{4}-\d{2}-\d{2}$' then (sync_run ->> 'fromDate')::date else null end,
  case when coalesce(sync_run ->> 'toDate', '') ~ '^\d{4}-\d{2}-\d{2}$' then (sync_run ->> 'toDate')::date else null end,
  case when coalesce(sync_run ->> 'documentCount', '') ~ '^\d+$' then (sync_run ->> 'documentCount')::integer else 0 end,
  array(select jsonb_array_elements_text(case when jsonb_typeof(sync_run -> 'entryRefs') = 'array' then sync_run -> 'entryRefs' else '[]'::jsonb end)),
  case when jsonb_typeof(sync_run -> 'counts') = 'object' then sync_run -> 'counts' else '{}'::jsonb end,
  coalesce(sync_run ->> 'message', ''), sync_run,
  coalesce(sync_run ->> 'syncStatus', 'Synced'),
  case when coalesce(sync_run ->> 'createdAt', '') ~ '^\d{4}-\d{2}-\d{2}T' then (sync_run ->> 'createdAt')::timestamptz else now() end,
  case when coalesce(sync_run ->> 'updatedAt', '') ~ '^\d{4}-\d{2}-\d{2}T' then (sync_run ->> 'updatedAt')::timestamptz else now() end,
  case when coalesce(sync_run ->> 'createdBy', '') ~ '^[0-9a-f-]{36}$' then (sync_run ->> 'createdBy')::uuid else null end,
  case when coalesce(sync_run ->> 'lastSyncedAt', '') ~ '^\d{4}-\d{2}-\d{2}T' then (sync_run ->> 'lastSyncedAt')::timestamptz else null end
from public.billing_cloud_workspaces workspace
cross join lateral jsonb_array_elements(case when jsonb_typeof(workspace.data -> 'tallySyncRuns') = 'array' then workspace.data -> 'tallySyncRuns' else '[]'::jsonb end) as sync_run
where coalesce(sync_run ->> 'id', '') <> ''
on conflict (workspace_id, id) do update set
  profile_id = excluded.profile_id, run_type = excluded.run_type, status = excluded.status,
  file_name = excluded.file_name, source_file = excluded.source_file,
  from_date = excluded.from_date, to_date = excluded.to_date,
  document_count = excluded.document_count, entry_refs = excluded.entry_refs,
  counts = excluded.counts, message = excluded.message, data = excluded.data,
  sync_status = excluded.sync_status, updated_at = excluded.updated_at,
  created_by = coalesce(public.billing_tally_sync_runs.created_by, excluded.created_by),
  last_synced_at = excluded.last_synced_at;

create table if not exists public.billing_purchase_import_batches (
  workspace_id uuid not null references public.billing_cloud_workspaces(id) on delete cascade,
  id text not null,
  status text not null default 'review',
  file_count integer not null default 0,
  approved_count integer not null default 0,
  completed_at timestamptz,
  label text not null default '',
  data jsonb not null default '{}'::jsonb,
  sync_status text not null default 'Synced',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id),
  last_synced_at timestamptz,
  primary key (workspace_id, id)
);

create table if not exists public.billing_purchase_import_documents (
  workspace_id uuid not null references public.billing_cloud_workspaces(id) on delete cascade,
  id text not null,
  batch_id text not null,
  file_name text not null default '',
  mime_type text not null default 'application/octet-stream',
  file_size bigint not null default 0,
  file_hash text not null default '',
  status text not null default 'queued',
  selected boolean not null default false,
  profile_id text not null default '',
  supplier_gstin text not null default '',
  invoice_number text not null default '',
  invoice_date date,
  total numeric(18,2) not null default 0,
  duplicate_purchase_id text,
  approved_purchase_id text,
  error text not null default '',
  data jsonb not null default '{}'::jsonb,
  sync_status text not null default 'Synced',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id),
  last_synced_at timestamptz,
  primary key (workspace_id, id),
  foreign key (workspace_id, batch_id)
    references public.billing_purchase_import_batches(workspace_id, id)
    on delete cascade
);

create index if not exists billing_purchase_import_batches_workspace_status_idx
  on public.billing_purchase_import_batches(workspace_id, status, updated_at desc);
create index if not exists billing_purchase_import_documents_batch_status_idx
  on public.billing_purchase_import_documents(workspace_id, batch_id, status, created_at);
create index if not exists billing_purchase_import_documents_invoice_idx
  on public.billing_purchase_import_documents(workspace_id, supplier_gstin, invoice_number);
create index if not exists billing_purchase_import_documents_hash_idx
  on public.billing_purchase_import_documents(workspace_id, file_hash)
  where file_hash <> '';

alter table public.billing_purchase_import_batches enable row level security;
alter table public.billing_purchase_import_documents enable row level security;

drop policy if exists "Workspace members can read billing rows" on public.billing_purchase_import_batches;
drop policy if exists "Workspace members can insert billing rows" on public.billing_purchase_import_batches;
drop policy if exists "Workspace members can update billing rows" on public.billing_purchase_import_batches;
drop policy if exists "Workspace members can delete billing rows" on public.billing_purchase_import_batches;
create policy "Workspace members can read billing rows" on public.billing_purchase_import_batches
  for select to authenticated using (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can insert billing rows" on public.billing_purchase_import_batches
  for insert to authenticated with check (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can update billing rows" on public.billing_purchase_import_batches
  for update to authenticated using (public.can_access_billing_workspace(workspace_id::text))
  with check (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can delete billing rows" on public.billing_purchase_import_batches
  for delete to authenticated using (public.can_access_billing_workspace(workspace_id::text));

drop policy if exists "Workspace members can read billing rows" on public.billing_purchase_import_documents;
drop policy if exists "Workspace members can insert billing rows" on public.billing_purchase_import_documents;
drop policy if exists "Workspace members can update billing rows" on public.billing_purchase_import_documents;
drop policy if exists "Workspace members can delete billing rows" on public.billing_purchase_import_documents;
create policy "Workspace members can read billing rows" on public.billing_purchase_import_documents
  for select to authenticated using (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can insert billing rows" on public.billing_purchase_import_documents
  for insert to authenticated with check (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can update billing rows" on public.billing_purchase_import_documents
  for update to authenticated using (public.can_access_billing_workspace(workspace_id::text))
  with check (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can delete billing rows" on public.billing_purchase_import_documents
  for delete to authenticated using (public.can_access_billing_workspace(workspace_id::text));
