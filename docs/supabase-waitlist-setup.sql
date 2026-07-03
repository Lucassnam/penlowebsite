-- Penlo waitlist table + Row Level Security.
-- Run this in: Supabase dashboard → your project → SQL Editor → New query → Run.

create table if not exists public.waitlist (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  source     text,
  created_at timestamptz not null default now()
);

-- Enable Row Level Security. With RLS on and only the INSERT policy below,
-- the public (anon) key can add rows but cannot read, update, or delete them.
alter table public.waitlist enable row level security;

-- Allow anonymous inserts only.
create policy "anon can join waitlist"
  on public.waitlist
  for insert
  to anon
  with check (true);
