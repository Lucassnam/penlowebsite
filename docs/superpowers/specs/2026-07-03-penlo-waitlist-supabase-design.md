# Penlo Waitlist — Supabase Email Collection + Deploy

**Date:** 2026-07-03
**Status:** Approved design

## Goal

Wire the existing (currently faked) waitlist form in `FinalCta.tsx` to a real
Supabase table so launch emails are actually collected, and deploy the site
live on Vercel with the Porkbun domain.

## Context

- `penlo-landing` is a Next.js 16.2.9 app (App Router, React 19).
- `components/sections/FinalCta.tsx` already renders an email form with confetti
  + "You're on the list!" success UI, but `handleSubmit` never sends the email
  anywhere — it just animates.
- InfinityFree (the originally-planned host) cannot run Next.js; Vercel is the
  target host instead. Porkbun domain points at Vercel via DNS.

## Architecture

Browser form → `POST /api/waitlist` (Next.js server route) → Supabase insert.
The Supabase key stays server-side; it never reaches the browser bundle.

### 1. Supabase (manual, one-time in dashboard)

Table `waitlist`:

| column      | type        | notes                         |
|-------------|-------------|-------------------------------|
| id          | uuid        | pk, default `gen_random_uuid()` |
| email       | text        | unique, not null              |
| created_at  | timestamptz | default `now()`               |
| source      | text        | nullable (e.g. "landing")     |

Row Level Security **enabled**, one policy: anonymous role may `INSERT` only.
No select/update/delete via the anon key — the key cannot read the list back.

### 2. Server route — `app/api/waitlist/route.ts`

- `export async function POST(request: Request)`.
- Parse JSON `{ email }`, trim, validate with a simple email regex → 400 on bad.
- Insert via `@supabase/supabase-js` using `SUPABASE_URL` + `SUPABASE_ANON_KEY`
  (server-only env vars, not `NEXT_PUBLIC_`).
- Unique-violation (Postgres code `23505`) → return 200 success (idempotent;
  "already on the list" is a success from the user's view).
- Other errors → 500 with a generic message (no leaking DB internals).
- Returns `Response.json({ ok: true })` on success.

### 3. Client — `components/sections/FinalCta.tsx`

- Add `loading` and `error` state.
- `handleSubmit` becomes async: `await fetch('/api/waitlist', { method: 'POST', body: JSON.stringify({ email, source: 'landing' }) })`.
- On ok → run existing particle burst + `setSubmitted(true)`.
- On failure → set an inline error message, keep the form, re-enable the button.
- Disable the submit button while `loading` to prevent double-submits.

### 4. Dependency

Add `@supabase/supabase-js`.

### 5. Env

`.env.local` (gitignored) for local dev; same two vars added in Vercel project
settings for production:

```
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
```

### 6. Deploy

- Push repo to GitHub, import into Vercel (free), add the 2 env vars.
- Porkbun DNS → point apex + `www` at Vercel per Vercel's domain instructions.
- SSL is automatic on Vercel.

## Out of scope (YAGNI)

- No admin UI to view signups (read them in the Supabase dashboard).
- No double opt-in / confirmation email.
- No rate limiting beyond what Vercel/Supabase provide by default.

## Testing / verification

- Local: run `next dev`, submit the form, confirm a row appears in Supabase and
  the success animation fires. Submit the same email twice → still success, one row.
- Submit an invalid email → inline error, no row.
