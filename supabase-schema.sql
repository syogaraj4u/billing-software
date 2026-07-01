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
