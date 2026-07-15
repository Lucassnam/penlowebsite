-- Caret beta-tester applications table + Row Level Security.
-- Run this in: Supabase dashboard → your project → SQL Editor → New query → Run.

create table if not exists public.tester_applications (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  role       text not null,
  use_case   text not null,
  created_at timestamptz not null default now()
);

-- Insert-only for the anon key, same pattern as the waitlist table.
-- The /admin dashboard reads via the service-role key, which bypasses RLS.
alter table public.tester_applications enable row level security;

create policy "anon can apply"
  on public.tester_applications
  for insert
  to anon
  with check (true);
