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

insert into public.billing_purchase_import_batches (
  workspace_id, id, status, file_count, approved_count, completed_at, label,
  data, sync_status, created_at, updated_at, created_by, last_synced_at
)
select workspace.id, batch ->> 'id', coalesce(batch ->> 'status', 'review'),
  case when coalesce(batch ->> 'fileCount', '') ~ '^\d+$' then (batch ->> 'fileCount')::integer else 0 end,
  case when coalesce(batch ->> 'approvedCount', '') ~ '^\d+$' then (batch ->> 'approvedCount')::integer else 0 end,
  case when coalesce(batch ->> 'completedAt', '') ~ '^\d{4}-\d{2}-\d{2}T' then (batch ->> 'completedAt')::timestamptz else null end,
  coalesce(batch ->> 'label', ''), batch, coalesce(batch ->> 'syncStatus', 'Synced'),
  case when coalesce(batch ->> 'createdAt', '') ~ '^\d{4}-\d{2}-\d{2}T' then (batch ->> 'createdAt')::timestamptz else now() end,
  case when coalesce(batch ->> 'updatedAt', '') ~ '^\d{4}-\d{2}-\d{2}T' then (batch ->> 'updatedAt')::timestamptz else now() end,
  case when coalesce(batch ->> 'createdBy', '') ~ '^[0-9a-f-]{36}$' then (batch ->> 'createdBy')::uuid else null end,
  case when coalesce(batch ->> 'lastSyncedAt', '') ~ '^\d{4}-\d{2}-\d{2}T' then (batch ->> 'lastSyncedAt')::timestamptz else null end
from public.billing_cloud_workspaces workspace
cross join lateral jsonb_array_elements(
  case when jsonb_typeof(workspace.data -> 'purchaseImportBatches') = 'array'
    then workspace.data -> 'purchaseImportBatches' else '[]'::jsonb end
) as batch
where coalesce(batch ->> 'id', '') <> ''
on conflict (workspace_id, id) do update set
  status = excluded.status, file_count = excluded.file_count,
  approved_count = excluded.approved_count, completed_at = excluded.completed_at,
  label = excluded.label, data = excluded.data, sync_status = excluded.sync_status,
  updated_at = excluded.updated_at,
  created_by = coalesce(public.billing_purchase_import_batches.created_by, excluded.created_by),
  last_synced_at = excluded.last_synced_at;

insert into public.billing_purchase_import_documents (
  workspace_id, id, batch_id, file_name, mime_type, file_size, file_hash,
  status, selected, profile_id, supplier_gstin, invoice_number, invoice_date,
  total, duplicate_purchase_id, approved_purchase_id, error, data,
  sync_status, created_at, updated_at, created_by, last_synced_at
)
select workspace.id, document ->> 'id', document ->> 'batchId',
  coalesce(document ->> 'fileName', ''), coalesce(document ->> 'mimeType', 'application/octet-stream'),
  case when coalesce(document ->> 'size', '') ~ '^\d+$' then (document ->> 'size')::bigint else 0 end,
  coalesce(document ->> 'fileHash', ''), coalesce(document ->> 'status', 'queued'),
  lower(coalesce(document ->> 'selected', 'false')) = 'true',
  coalesce(document -> 'parsed' ->> 'profileId', ''),
  coalesce(document -> 'parsed' ->> 'supplierGstin', ''),
  coalesce(document -> 'parsed' ->> 'invoiceNumber', ''),
  case when coalesce(document -> 'parsed' ->> 'invoiceDate', '') ~ '^\d{4}-\d{2}-\d{2}$' then (document -> 'parsed' ->> 'invoiceDate')::date else null end,
  case when coalesce(document -> 'parsed' ->> 'total', '') ~ '^-?[0-9]+(\.[0-9]+)?$' then (document -> 'parsed' ->> 'total')::numeric else 0 end,
  nullif(document ->> 'duplicatePurchaseId', ''), nullif(document ->> 'approvedPurchaseId', ''),
  coalesce(document ->> 'error', ''), document, coalesce(document ->> 'syncStatus', 'Synced'),
  case when coalesce(document ->> 'createdAt', '') ~ '^\d{4}-\d{2}-\d{2}T' then (document ->> 'createdAt')::timestamptz else now() end,
  case when coalesce(document ->> 'updatedAt', '') ~ '^\d{4}-\d{2}-\d{2}T' then (document ->> 'updatedAt')::timestamptz else now() end,
  case when coalesce(document ->> 'createdBy', '') ~ '^[0-9a-f-]{36}$' then (document ->> 'createdBy')::uuid else null end,
  case when coalesce(document ->> 'lastSyncedAt', '') ~ '^\d{4}-\d{2}-\d{2}T' then (document ->> 'lastSyncedAt')::timestamptz else null end
from public.billing_cloud_workspaces workspace
cross join lateral jsonb_array_elements(
  case when jsonb_typeof(workspace.data -> 'purchaseImportDocuments') = 'array'
    then workspace.data -> 'purchaseImportDocuments' else '[]'::jsonb end
) as document
where coalesce(document ->> 'id', '') <> ''
  and coalesce(document ->> 'batchId', '') <> ''
on conflict (workspace_id, id) do update set
  batch_id = excluded.batch_id, file_name = excluded.file_name,
  mime_type = excluded.mime_type, file_size = excluded.file_size,
  file_hash = excluded.file_hash, status = excluded.status, selected = excluded.selected,
  profile_id = excluded.profile_id, supplier_gstin = excluded.supplier_gstin,
  invoice_number = excluded.invoice_number, invoice_date = excluded.invoice_date,
  total = excluded.total, duplicate_purchase_id = excluded.duplicate_purchase_id,
  approved_purchase_id = excluded.approved_purchase_id, error = excluded.error,
  data = excluded.data, sync_status = excluded.sync_status, updated_at = excluded.updated_at,
  created_by = coalesce(public.billing_purchase_import_documents.created_by, excluded.created_by),
  last_synced_at = excluded.last_synced_at;
