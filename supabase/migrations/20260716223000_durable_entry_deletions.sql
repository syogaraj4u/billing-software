create table if not exists public.billing_deletion_tombstones (
  workspace_id uuid not null references public.billing_cloud_workspaces(id) on delete cascade,
  entity_type text not null check (entity_type in ('purchase', 'po')),
  entity_id text not null,
  profile_id text not null default '',
  document_number text not null default '',
  deleted_at timestamptz not null default now(),
  deleted_by uuid references auth.users(id),
  before_data jsonb,
  data jsonb not null default '{}'::jsonb,
  sync_status text not null default 'Synced',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id),
  last_synced_at timestamptz,
  primary key (workspace_id, entity_type, entity_id)
);

create index if not exists billing_deletion_tombstones_workspace_deleted_idx
  on public.billing_deletion_tombstones(workspace_id, deleted_at desc);

alter table public.billing_deletion_tombstones enable row level security;

drop policy if exists "Workspace members can read deletion tombstones" on public.billing_deletion_tombstones;
drop policy if exists "Workspace members can insert deletion tombstones" on public.billing_deletion_tombstones;
drop policy if exists "Workspace members can update deletion tombstones" on public.billing_deletion_tombstones;
drop policy if exists "Workspace members can delete deletion tombstones" on public.billing_deletion_tombstones;

create policy "Workspace members can read deletion tombstones" on public.billing_deletion_tombstones
  for select to authenticated using (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can insert deletion tombstones" on public.billing_deletion_tombstones
  for insert to authenticated with check (public.can_access_billing_workspace(workspace_id::text));
create policy "Workspace members can update deletion tombstones" on public.billing_deletion_tombstones
  for update to authenticated using (public.can_access_billing_workspace(workspace_id::text))
  with check (public.can_access_billing_workspace(workspace_id::text));

with workspace_tombstones as (
  select distinct on (workspace.id, tombstone ->> 'entityType', tombstone ->> 'entityId')
    workspace.id as workspace_id,
    tombstone ->> 'entityType' as entity_type,
    tombstone ->> 'entityId' as entity_id,
    coalesce(tombstone ->> 'profileId', tombstone -> 'beforeData' ->> 'profileId', '') as profile_id,
    coalesce(tombstone ->> 'documentNumber', tombstone -> 'beforeData' ->> 'number', '') as document_number,
    case when coalesce(tombstone ->> 'deletedAt', '') ~ '^\d{4}-\d{2}-\d{2}T'
      then (tombstone ->> 'deletedAt')::timestamptz else now() end as deleted_at,
    case when coalesce(tombstone ->> 'deletedBy', '') ~ '^[0-9a-f-]{36}$'
      then (tombstone ->> 'deletedBy')::uuid else null end as deleted_by,
    case when jsonb_typeof(tombstone -> 'beforeData') = 'object'
      then tombstone -> 'beforeData' else null end as before_data,
    tombstone as data,
    coalesce(tombstone ->> 'syncStatus', 'Synced') as sync_status,
    case when coalesce(tombstone ->> 'createdAt', '') ~ '^\d{4}-\d{2}-\d{2}T'
      then (tombstone ->> 'createdAt')::timestamptz else now() end as created_at,
    case when coalesce(tombstone ->> 'updatedAt', '') ~ '^\d{4}-\d{2}-\d{2}T'
      then (tombstone ->> 'updatedAt')::timestamptz else now() end as updated_at,
    case when coalesce(tombstone ->> 'createdBy', '') ~ '^[0-9a-f-]{36}$'
      then (tombstone ->> 'createdBy')::uuid else null end as created_by,
    case when coalesce(tombstone ->> 'lastSyncedAt', '') ~ '^\d{4}-\d{2}-\d{2}T'
      then (tombstone ->> 'lastSyncedAt')::timestamptz else null end as last_synced_at
  from public.billing_cloud_workspaces workspace
  cross join lateral jsonb_array_elements(
    case when jsonb_typeof(workspace.data -> 'deletionTombstones') = 'array'
      then workspace.data -> 'deletionTombstones' else '[]'::jsonb end
  ) as tombstone
  where tombstone ->> 'entityType' in ('purchase', 'po')
    and coalesce(tombstone ->> 'entityId', '') <> ''
  order by workspace.id, tombstone ->> 'entityType', tombstone ->> 'entityId', deleted_at desc
)
insert into public.billing_deletion_tombstones (
  workspace_id, entity_type, entity_id, profile_id, document_number,
  deleted_at, deleted_by, before_data, data, sync_status,
  created_at, updated_at, created_by, last_synced_at
)
select workspace_id, entity_type, entity_id, profile_id, document_number,
  deleted_at, deleted_by, before_data, data, sync_status,
  created_at, updated_at, created_by, last_synced_at
from workspace_tombstones
on conflict (workspace_id, entity_type, entity_id) do update set
  profile_id = excluded.profile_id,
  document_number = excluded.document_number,
  deleted_at = excluded.deleted_at,
  deleted_by = excluded.deleted_by,
  before_data = coalesce(excluded.before_data, public.billing_deletion_tombstones.before_data),
  data = excluded.data,
  sync_status = excluded.sync_status,
  updated_at = excluded.updated_at,
  created_by = coalesce(public.billing_deletion_tombstones.created_by, excluded.created_by),
  last_synced_at = excluded.last_synced_at
where excluded.deleted_at >= public.billing_deletion_tombstones.deleted_at;

with audited_deletions as (
  select distinct on (audit.workspace_id, audit.entity_type, audit.entity_id)
    audit.workspace_id,
    case audit.entity_type when 'purchase_order' then 'po' else 'purchase' end as entity_type,
    audit.entity_id,
    coalesce(audit.before_data ->> 'profileId', '') as profile_id,
    coalesce(audit.before_data ->> 'number', '') as document_number,
    audit.created_at as deleted_at,
    audit.created_by as deleted_by,
    audit.before_data,
    jsonb_build_object(
      'id', (case audit.entity_type when 'purchase_order' then 'po' else 'purchase' end) || ':' || audit.entity_id,
      'entityType', case audit.entity_type when 'purchase_order' then 'po' else 'purchase' end,
      'entityId', audit.entity_id,
      'profileId', coalesce(audit.before_data ->> 'profileId', ''),
      'documentNumber', coalesce(audit.before_data ->> 'number', ''),
      'deletedAt', audit.created_at,
      'deletedBy', coalesce(audit.created_by::text, ''),
      'beforeData', audit.before_data,
      'syncStatus', 'Synced',
      'createdAt', audit.created_at,
      'updatedAt', audit.created_at,
      'createdBy', coalesce(audit.created_by::text, ''),
      'lastSyncedAt', audit.created_at
    ) as data
  from public.billing_audit_logs audit
  where audit.action = 'deleted'
    and audit.entity_type in ('purchase', 'purchase_order')
    and audit.entity_id <> ''
  order by audit.workspace_id, audit.entity_type, audit.entity_id, audit.created_at desc
)
insert into public.billing_deletion_tombstones (
  workspace_id, entity_type, entity_id, profile_id, document_number,
  deleted_at, deleted_by, before_data, data, sync_status,
  created_at, updated_at, created_by, last_synced_at
)
select workspace_id, entity_type, entity_id, profile_id, document_number,
  deleted_at, deleted_by, before_data, data, 'Synced',
  deleted_at, deleted_at, deleted_by, deleted_at
from audited_deletions
on conflict (workspace_id, entity_type, entity_id) do update set
  profile_id = excluded.profile_id,
  document_number = excluded.document_number,
  deleted_at = excluded.deleted_at,
  deleted_by = excluded.deleted_by,
  before_data = coalesce(excluded.before_data, public.billing_deletion_tombstones.before_data),
  data = excluded.data,
  sync_status = 'Synced',
  updated_at = excluded.updated_at,
  created_by = coalesce(public.billing_deletion_tombstones.created_by, excluded.created_by),
  last_synced_at = excluded.last_synced_at
where excluded.deleted_at >= public.billing_deletion_tombstones.deleted_at;

delete from public.billing_purchase_items line
using public.billing_deletion_tombstones tombstone
where tombstone.workspace_id = line.workspace_id
  and tombstone.entity_type = 'purchase'
  and tombstone.entity_id = line.purchase_id;

delete from public.billing_purchases purchase
using public.billing_deletion_tombstones tombstone
where tombstone.workspace_id = purchase.workspace_id
  and tombstone.entity_type = 'purchase'
  and tombstone.entity_id = purchase.id;

delete from public.billing_purchase_order_items line
using public.billing_deletion_tombstones tombstone
where tombstone.workspace_id = line.workspace_id
  and tombstone.entity_type = 'po'
  and tombstone.entity_id = line.purchase_order_id;

delete from public.billing_purchase_orders purchase_order
using public.billing_deletion_tombstones tombstone
where tombstone.workspace_id = purchase_order.workspace_id
  and tombstone.entity_type = 'po'
  and tombstone.entity_id = purchase_order.id;

update public.billing_cloud_workspaces workspace
set data = jsonb_set(
  jsonb_set(
    jsonb_set(
      coalesce(workspace.data, '{}'::jsonb),
      '{purchases}',
      (
        select coalesce(jsonb_agg(entry), '[]'::jsonb)
        from jsonb_array_elements(
          case when jsonb_typeof(workspace.data -> 'purchases') = 'array'
            then workspace.data -> 'purchases' else '[]'::jsonb end
        ) as purchase(entry)
        where not exists (
          select 1 from public.billing_deletion_tombstones tombstone
          where tombstone.workspace_id = workspace.id
            and tombstone.entity_type = 'purchase'
            and tombstone.entity_id = entry ->> 'id'
        )
      ),
      true
    ),
    '{purchaseOrders}',
    (
      select coalesce(jsonb_agg(entry), '[]'::jsonb)
      from jsonb_array_elements(
        case when jsonb_typeof(workspace.data -> 'purchaseOrders') = 'array'
          then workspace.data -> 'purchaseOrders' else '[]'::jsonb end
      ) as purchase_order(entry)
      where not exists (
        select 1 from public.billing_deletion_tombstones tombstone
        where tombstone.workspace_id = workspace.id
          and tombstone.entity_type = 'po'
          and tombstone.entity_id = entry ->> 'id'
      )
    ),
    true
  ),
  '{deletionTombstones}',
  (
    select coalesce(jsonb_agg(tombstone.data order by tombstone.deleted_at), '[]'::jsonb)
    from public.billing_deletion_tombstones tombstone
    where tombstone.workspace_id = workspace.id
  ),
  true
), updated_at = now()
where exists (
  select 1 from public.billing_deletion_tombstones tombstone
  where tombstone.workspace_id = workspace.id
);
