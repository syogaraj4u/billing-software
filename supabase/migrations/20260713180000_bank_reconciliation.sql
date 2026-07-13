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
select
  workspace.id,
  source ->> 'id',
  coalesce(source ->> 'profileId', ''),
  coalesce(source ->> 'name', ''),
  coalesce(source ->> 'type', 'Bank Account'),
  coalesce(source ->> 'institution', ''),
  right(regexp_replace(coalesce(source ->> 'last4', ''), '[^0-9]', '', 'g'), 4),
  coalesce(source ->> 'accountName', ''),
  case when coalesce(source ->> 'openingBalance', '') ~ '^-?[0-9]+(\.[0-9]+)?$' then (source ->> 'openingBalance')::numeric else 0 end,
  case when coalesce(source ->> 'statementDay', '') ~ '^[0-9]+$' then least(31, (source ->> 'statementDay')::integer) else 0 end,
  case when coalesce(source ->> 'dueDay', '') ~ '^[0-9]+$' then least(31, (source ->> 'dueDay')::integer) else 0 end,
  lower(coalesce(source ->> 'active', 'true')) <> 'false',
  lower(coalesce(source ->> 'systemDefault', 'false')) = 'true',
  source
from public.billing_cloud_workspaces workspace
cross join lateral jsonb_array_elements(
  case when jsonb_typeof(workspace.data -> 'paymentSources') = 'array'
    then workspace.data -> 'paymentSources'
    else '[]'::jsonb
  end
) as source
where coalesce(source ->> 'id', '') <> ''
on conflict (workspace_id, id) do update set
  profile_id = excluded.profile_id,
  name = excluded.name,
  type = excluded.type,
  institution = excluded.institution,
  last4 = excluded.last4,
  account_name = excluded.account_name,
  opening_balance = excluded.opening_balance,
  statement_day = excluded.statement_day,
  due_day = excluded.due_day,
  active = excluded.active,
  system_default = excluded.system_default,
  data = excluded.data,
  updated_at = now();

insert into public.billing_bank_transactions (
  workspace_id, id, profile_id, payment_source_id, transaction_date, description,
  reference, debit, credit, balance, status, match_entry_type, match_entry_id,
  suggested_entry_type, suggested_entry_id, matched_amount, difference,
  difference_accepted, fingerprint, import_batch_id, source_file, imported_at, data
)
select
  workspace.id,
  bank_tx ->> 'id',
  coalesce(bank_tx ->> 'profileId', ''),
  coalesce(bank_tx ->> 'paymentSourceId', ''),
  case when coalesce(bank_tx ->> 'date', '') ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$' then (bank_tx ->> 'date')::date else null end,
  coalesce(bank_tx ->> 'description', ''),
  coalesce(bank_tx ->> 'reference', ''),
  case when coalesce(bank_tx ->> 'debit', '') ~ '^-?[0-9]+(\.[0-9]+)?$' then (bank_tx ->> 'debit')::numeric else 0 end,
  case when coalesce(bank_tx ->> 'credit', '') ~ '^-?[0-9]+(\.[0-9]+)?$' then (bank_tx ->> 'credit')::numeric else 0 end,
  case when coalesce(bank_tx ->> 'balance', '') ~ '^-?[0-9]+(\.[0-9]+)?$' then (bank_tx ->> 'balance')::numeric else 0 end,
  coalesce(bank_tx ->> 'status', 'unmatched'),
  coalesce(bank_tx ->> 'matchEntryType', ''),
  coalesce(bank_tx ->> 'matchEntryId', ''),
  coalesce(bank_tx ->> 'suggestedEntryType', ''),
  coalesce(bank_tx ->> 'suggestedEntryId', ''),
  case when coalesce(bank_tx ->> 'matchedAmount', '') ~ '^-?[0-9]+(\.[0-9]+)?$' then (bank_tx ->> 'matchedAmount')::numeric else 0 end,
  case when coalesce(bank_tx ->> 'difference', '') ~ '^-?[0-9]+(\.[0-9]+)?$' then (bank_tx ->> 'difference')::numeric else 0 end,
  lower(coalesce(bank_tx ->> 'differenceAccepted', 'false')) = 'true',
  coalesce(bank_tx ->> 'fingerprint', ''),
  coalesce(bank_tx ->> 'importBatchId', ''),
  coalesce(bank_tx ->> 'sourceFile', ''),
  case when coalesce(bank_tx ->> 'importedAt', '') ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}T' then (bank_tx ->> 'importedAt')::timestamptz else null end,
  bank_tx
from public.billing_cloud_workspaces workspace
cross join lateral jsonb_array_elements(
  case when jsonb_typeof(workspace.data -> 'bankTransactions') = 'array'
    then workspace.data -> 'bankTransactions'
    else '[]'::jsonb
  end
) as bank_tx
where coalesce(bank_tx ->> 'id', '') <> ''
on conflict (workspace_id, id) do update set
  profile_id = excluded.profile_id,
  payment_source_id = excluded.payment_source_id,
  transaction_date = excluded.transaction_date,
  description = excluded.description,
  reference = excluded.reference,
  debit = excluded.debit,
  credit = excluded.credit,
  balance = excluded.balance,
  status = excluded.status,
  match_entry_type = excluded.match_entry_type,
  match_entry_id = excluded.match_entry_id,
  suggested_entry_type = excluded.suggested_entry_type,
  suggested_entry_id = excluded.suggested_entry_id,
  matched_amount = excluded.matched_amount,
  difference = excluded.difference,
  difference_accepted = excluded.difference_accepted,
  fingerprint = excluded.fingerprint,
  import_batch_id = excluded.import_batch_id,
  source_file = excluded.source_file,
  imported_at = excluded.imported_at,
  data = excluded.data,
  updated_at = now();
