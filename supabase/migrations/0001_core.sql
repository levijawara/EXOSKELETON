-- Core schema for EXOSKELETON shell
-- This file is designed for Supabase migrations.

create extension if not exists "pgcrypto";

-- Profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own"
on public.profiles for select
using (id = auth.uid());

create policy "profiles_update_own"
on public.profiles for update
using (id = auth.uid())
with check (id = auth.uid());

-- Keep `profiles` in sync with auth.users (minimal baseline).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do update set email = excluded.email, updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- Roles (optional but future-proof)
create table if not exists public.user_roles (
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('user', 'admin')),
  created_at timestamptz not null default now(),
  primary key (user_id, role)
);

alter table public.user_roles enable row level security;

create policy "user_roles_select_own"
on public.user_roles for select
using (user_id = auth.uid());

-- Consents (cookie/privacy)
create table if not exists public.consents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null, -- e.g. "cookies", "privacy"
  value jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.consents enable row level security;

create policy "consents_select_own"
on public.consents for select
using (user_id = auth.uid());

create policy "consents_insert_own"
on public.consents for insert
with check (user_id = auth.uid());

-- Support tickets (contact messages)
create table if not exists public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  email text,
  message text not null,
  status text not null default 'open' check (status in ('open', 'closed')),
  created_at timestamptz not null default now()
);

alter table public.support_tickets enable row level security;

create policy "support_tickets_insert_any"
on public.support_tickets for insert
with check (true);

create policy "support_tickets_select_own"
on public.support_tickets for select
using (user_id = auth.uid());

-- Privacy requests (export/delete)
create table if not exists public.privacy_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (type in ('export', 'delete')),
  status text not null default 'requested' check (status in ('requested', 'in_progress', 'fulfilled', 'rejected')),
  requested_at timestamptz not null default now(),
  fulfilled_at timestamptz,
  notes text
);

alter table public.privacy_requests enable row level security;

create policy "privacy_requests_insert_own"
on public.privacy_requests for insert
with check (user_id = auth.uid());

create policy "privacy_requests_select_own"
on public.privacy_requests for select
using (user_id = auth.uid());

-- Audit logs (service-role only by default)
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid,
  action text not null,
  target_user_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.audit_logs enable row level security;

-- No RLS policies intentionally: only service role can read/write by default.

