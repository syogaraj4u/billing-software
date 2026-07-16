create or replace function public.billing_json_numeric(value jsonb, key text)
returns numeric
language sql
immutable
as $$
  with cleaned as (
    select regexp_replace(coalesce(value ->> key, ''), '[^0-9.-]', '', 'g') as raw_value
  )
  select case when raw_value ~ '^-?[0-9]+(\.[0-9]+)?$' then raw_value::numeric else 0 end
  from cleaned;
$$;

create or replace function public.billing_json_date(value jsonb, key text)
returns date
language sql
immutable
as $$
  select case when coalesce(value ->> key, '') ~ '^\d{4}-\d{2}-\d{2}$' then (value ->> key)::date else null end;
$$;

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

create index if not exists billing_credit_notes_workspace_date_idx
  on public.billing_credit_notes(workspace_id, credit_note_date);
create index if not exists billing_purchase_returns_workspace_date_idx
  on public.billing_purchase_returns(workspace_id, return_date);

alter table public.billing_credit_notes enable row level security;
alter table public.billing_purchase_returns enable row level security;
alter table public.billing_credit_note_items enable row level security;
alter table public.billing_purchase_return_items enable row level security;

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'billing_credit_notes',
    'billing_purchase_returns',
    'billing_credit_note_items',
    'billing_purchase_return_items'
  ] loop
    execute format('drop policy if exists "Workspace members can read billing rows" on public.%I', table_name);
    execute format('drop policy if exists "Workspace members can insert billing rows" on public.%I', table_name);
    execute format('drop policy if exists "Workspace members can update billing rows" on public.%I', table_name);
    execute format('drop policy if exists "Workspace members can delete billing rows" on public.%I', table_name);
    execute format('create policy "Workspace members can read billing rows" on public.%I for select to authenticated using (public.can_access_billing_workspace(workspace_id::text))', table_name);
    execute format('create policy "Workspace members can insert billing rows" on public.%I for insert to authenticated with check (public.can_access_billing_workspace(workspace_id::text))', table_name);
    execute format('create policy "Workspace members can update billing rows" on public.%I for update to authenticated using (public.can_access_billing_workspace(workspace_id::text)) with check (public.can_access_billing_workspace(workspace_id::text))', table_name);
    execute format('create policy "Workspace members can delete billing rows" on public.%I for delete to authenticated using (public.can_access_billing_workspace(workspace_id::text))', table_name);
  end loop;
end;
$$;

insert into public.billing_credit_notes (
  workspace_id, id, profile_id, party_id, credit_note_number, credit_note_date,
  original_sale_id, original_invoice_number, original_invoice_date,
  seller_gstin, buyer_gstin, reason, restock, status,
  taxable, cgst, sgst, igst, gst, total, cancelled, data,
  sync_status, created_at, updated_at, created_by, last_synced_at
)
select
  workspace.id,
  note ->> 'id',
  coalesce(note ->> 'profileId', ''),
  coalesce(note ->> 'partyId', ''),
  coalesce(note ->> 'number', ''),
  public.billing_json_date(note, 'date'),
  nullif(note ->> 'originalSaleId', ''),
  coalesce(note ->> 'originalInvoiceNumber', ''),
  public.billing_json_date(note, 'originalInvoiceDate'),
  coalesce(note ->> 'sellerGstin', ''),
  coalesce(note ->> 'buyerGstin', ''),
  coalesce(note ->> 'reason', ''),
  coalesce((note ->> 'restock')::boolean, false),
  coalesce(note ->> 'status', ''),
  public.billing_json_numeric(note, 'taxable'),
  public.billing_json_numeric(note, 'cgst'),
  public.billing_json_numeric(note, 'sgst'),
  public.billing_json_numeric(note, 'igst'),
  public.billing_json_numeric(note, 'gst'),
  public.billing_json_numeric(note, 'total'),
  coalesce((note ->> 'cancelled')::boolean, false),
  note,
  'Synced', workspace.created_at, workspace.updated_at, workspace.owner_id, workspace.updated_at
from public.billing_cloud_workspaces workspace
cross join lateral jsonb_array_elements(coalesce(workspace.data -> 'creditNotes', '[]'::jsonb)) note
where coalesce(note ->> 'id', '') <> ''
on conflict (workspace_id, id) do update set data = excluded.data;

insert into public.billing_purchase_returns (
  workspace_id, id, profile_id, party_id, return_number, return_date,
  original_sale_id, original_invoice_number, original_invoice_date,
  seller_gstin, buyer_gstin, reason, restock, status,
  taxable, cgst, sgst, igst, gst, total, cancelled, data,
  sync_status, created_at, updated_at, created_by, last_synced_at
)
select
  workspace.id,
  purchase_return ->> 'id',
  coalesce(purchase_return ->> 'profileId', ''),
  coalesce(purchase_return ->> 'partyId', ''),
  coalesce(purchase_return ->> 'number', ''),
  public.billing_json_date(purchase_return, 'date'),
  nullif(purchase_return ->> 'originalSaleId', ''),
  coalesce(purchase_return ->> 'originalInvoiceNumber', ''),
  public.billing_json_date(purchase_return, 'originalInvoiceDate'),
  coalesce(purchase_return ->> 'sellerGstin', ''),
  coalesce(purchase_return ->> 'buyerGstin', ''),
  coalesce(purchase_return ->> 'reason', ''),
  coalesce((purchase_return ->> 'restock')::boolean, false),
  coalesce(purchase_return ->> 'status', ''),
  public.billing_json_numeric(purchase_return, 'taxable'),
  public.billing_json_numeric(purchase_return, 'cgst'),
  public.billing_json_numeric(purchase_return, 'sgst'),
  public.billing_json_numeric(purchase_return, 'igst'),
  public.billing_json_numeric(purchase_return, 'gst'),
  public.billing_json_numeric(purchase_return, 'total'),
  coalesce((purchase_return ->> 'cancelled')::boolean, false),
  purchase_return,
  'Synced', workspace.created_at, workspace.updated_at, workspace.owner_id, workspace.updated_at
from public.billing_cloud_workspaces workspace
cross join lateral jsonb_array_elements(coalesce(workspace.data -> 'purchaseReturns', '[]'::jsonb)) purchase_return
where coalesce(purchase_return ->> 'id', '') <> ''
on conflict (workspace_id, id) do update set data = excluded.data;

insert into public.billing_credit_note_items (
  workspace_id, credit_note_id, line_index, original_line_index,
  item_id, item_name, hsn, qty, rate, gross_rate, gst_rate,
  taxable, gst, total, data, created_by
)
select
  note.workspace_id,
  note.id,
  (line.ordinality - 1)::integer,
  coalesce((line.value ->> 'originalLineIndex')::integer, 0),
  coalesce(line.value ->> 'itemId', ''),
  coalesce(line.value ->> 'itemName', ''),
  coalesce(line.value ->> 'hsn', '85171300'),
  public.billing_json_numeric(line.value, 'qty'),
  public.billing_json_numeric(line.value, 'rate'),
  public.billing_json_numeric(line.value, 'grossRate'),
  public.billing_json_numeric(line.value, 'gstRate'),
  public.billing_json_numeric(line.value, 'taxable'),
  public.billing_json_numeric(line.value, 'gst'),
  public.billing_json_numeric(line.value, 'total'),
  line.value,
  note.created_by
from public.billing_credit_notes note
cross join lateral jsonb_array_elements(coalesce(note.data -> 'lines', '[]'::jsonb)) with ordinality line(value, ordinality)
on conflict (workspace_id, credit_note_id, line_index) do update set data = excluded.data;

insert into public.billing_purchase_return_items (
  workspace_id, purchase_return_id, line_index, original_line_index,
  item_id, item_name, hsn, qty, rate, gross_rate, gst_rate,
  taxable, gst, total, data, created_by
)
select
  purchase_return.workspace_id,
  purchase_return.id,
  (line.ordinality - 1)::integer,
  coalesce((line.value ->> 'originalLineIndex')::integer, 0),
  coalesce(line.value ->> 'itemId', ''),
  coalesce(line.value ->> 'itemName', ''),
  coalesce(line.value ->> 'hsn', '85171300'),
  public.billing_json_numeric(line.value, 'qty'),
  public.billing_json_numeric(line.value, 'rate'),
  public.billing_json_numeric(line.value, 'grossRate'),
  public.billing_json_numeric(line.value, 'gstRate'),
  public.billing_json_numeric(line.value, 'taxable'),
  public.billing_json_numeric(line.value, 'gst'),
  public.billing_json_numeric(line.value, 'total'),
  line.value,
  purchase_return.created_by
from public.billing_purchase_returns purchase_return
cross join lateral jsonb_array_elements(coalesce(purchase_return.data -> 'lines', '[]'::jsonb)) with ordinality line(value, ordinality)
on conflict (workspace_id, purchase_return_id, line_index) do update set data = excluded.data;
