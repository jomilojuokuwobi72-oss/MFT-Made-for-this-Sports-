-- MFT Supabase schema. Run in the Supabase SQL editor.
-- Creates the waitlist + contacts tables and allows the public anon key to
-- INSERT (so the site's server actions can write) while keeping reads locked
-- down to authenticated/service access only.

-- ── Waitlist ────────────────────────────────────────────────────────────────
create table if not exists public.waitlist (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  created_at  timestamptz not null default now()
);

alter table public.waitlist enable row level security;

-- Allow anonymous inserts (the join form). The UNIQUE constraint on email
-- surfaces as error code 23505, which the server action maps to a friendly
-- "already on the waitlist" message.
create policy "anon can join waitlist"
  on public.waitlist for insert
  to anon
  with check (true);

-- ── Contact submissions ──────────────────────────────────────────────────────
create table if not exists public.contacts (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  message     text not null,
  created_at  timestamptz not null default now()
);

alter table public.contacts enable row level security;

create policy "anon can submit contact"
  on public.contacts for insert
  to anon
  with check (true);

-- No SELECT policies are defined, so the anon key cannot read rows back.
-- View submissions via the Supabase dashboard or the service role key.
