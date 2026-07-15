-- Caret analytics events table + Row Level Security.
-- Run this in: Supabase dashboard → your project → SQL Editor → New query → Run.
-- (Run docs/supabase-waitlist-setup.sql first if the waitlist table doesn't exist yet.)

create table if not exists public.events (
  id           uuid primary key default gen_random_uuid(),
  type         text not null check (type in ('pageview', 'cta_click', 'signup', 'application')),
  path         text,
  referrer     text,
  visitor_hash text,
  created_at   timestamptz not null default now()
);

-- Enable Row Level Security. With RLS on and only the INSERT policy below,
-- the public (anon) key can add rows but cannot read, update, or delete them.
-- The /admin dashboard reads via the service-role key, which bypasses RLS.
alter table public.events enable row level security;

-- Allow anonymous inserts only.
create policy "anon can insert events"
  on public.events
  for insert
  to anon
  with check (true);

create index if not exists events_created_at_idx on public.events (created_at);
create index if not exists events_type_idx on public.events (type);
