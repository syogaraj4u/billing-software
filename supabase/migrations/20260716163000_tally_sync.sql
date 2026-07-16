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
select
  workspace.id,
  sync_run ->> 'id',
  coalesce(sync_run ->> 'profileId', ''),
  coalesce(sync_run ->> 'runType', 'vouchers-export'),
  coalesce(sync_run ->> 'status', 'Exported'),
  coalesce(sync_run ->> 'fileName', ''),
  coalesce(sync_run ->> 'sourceFile', ''),
  case when coalesce(sync_run ->> 'fromDate', '') ~ '^\d{4}-\d{2}-\d{2}$' then (sync_run ->> 'fromDate')::date else null end,
  case when coalesce(sync_run ->> 'toDate', '') ~ '^\d{4}-\d{2}-\d{2}$' then (sync_run ->> 'toDate')::date else null end,
  case when coalesce(sync_run ->> 'documentCount', '') ~ '^\d+$' then (sync_run ->> 'documentCount')::integer else 0 end,
  array(select jsonb_array_elements_text(case when jsonb_typeof(sync_run -> 'entryRefs') = 'array' then sync_run -> 'entryRefs' else '[]'::jsonb end)),
  case when jsonb_typeof(sync_run -> 'counts') = 'object' then sync_run -> 'counts' else '{}'::jsonb end,
  coalesce(sync_run ->> 'message', ''),
  sync_run,
  coalesce(sync_run ->> 'syncStatus', 'Synced'),
  case when coalesce(sync_run ->> 'createdAt', '') ~ '^\d{4}-\d{2}-\d{2}T' then (sync_run ->> 'createdAt')::timestamptz else now() end,
  case when coalesce(sync_run ->> 'updatedAt', '') ~ '^\d{4}-\d{2}-\d{2}T' then (sync_run ->> 'updatedAt')::timestamptz else now() end,
  case when coalesce(sync_run ->> 'createdBy', '') ~ '^[0-9a-f-]{36}$' then (sync_run ->> 'createdBy')::uuid else null end,
  case when coalesce(sync_run ->> 'lastSyncedAt', '') ~ '^\d{4}-\d{2}-\d{2}T' then (sync_run ->> 'lastSyncedAt')::timestamptz else null end
from public.billing_cloud_workspaces workspace
cross join lateral jsonb_array_elements(
  case when jsonb_typeof(workspace.data -> 'tallySyncRuns') = 'array'
    then workspace.data -> 'tallySyncRuns'
    else '[]'::jsonb
  end
) as sync_run
where coalesce(sync_run ->> 'id', '') <> ''
on conflict (workspace_id, id) do update set
  profile_id = excluded.profile_id,
  run_type = excluded.run_type,
  status = excluded.status,
  file_name = excluded.file_name,
  source_file = excluded.source_file,
  from_date = excluded.from_date,
  to_date = excluded.to_date,
  document_count = excluded.document_count,
  entry_refs = excluded.entry_refs,
  counts = excluded.counts,
  message = excluded.message,
  data = excluded.data,
  sync_status = excluded.sync_status,
  updated_at = excluded.updated_at,
  created_by = coalesce(public.billing_tally_sync_runs.created_by, excluded.created_by),
  last_synced_at = excluded.last_synced_at;
