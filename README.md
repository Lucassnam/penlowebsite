# Caret, marketing site and waitlist

[![CI](https://github.com/Lucassnam/penlowebsite/actions/workflows/ci.yml/badge.svg)](https://github.com/Lucassnam/penlowebsite/actions/workflows/ci.yml)

Landing page, waitlist and admin dashboard for Caret, an iPad app for marking up
documents by hand without destroying the document underneath.

**[Open the live site](https://penlowebsite.vercel.app)**

![The Caret landing page](docs/screenshot.png)

## What it does

This is not a brochure that ends at a signup box. The repo carries the whole
funnel:

- **Landing page** with the product argument and an animated markup demo
- **Waitlist capture** writing through to Supabase
- **Application flow** at `/apply` for early access
- **Analytics pipeline** recording source attribution and funnel steps
- **Admin dashboard** at `/admin`, behind a login form with an httpOnly signed
  session cookie, showing the waitlist and the funnel
- **`/glass-lab`**, a scratch route for tuning the glass surface treatment used
  across the site

Legal pages, `robots.ts`, `sitemap.ts` and an `opengraph-image` route are all
generated rather than hand maintained.

## Stack

Next.js 16 with the App Router, TypeScript, Supabase for the waitlist and
analytics tables, and a custom auth layer for the admin routes. Deployed on
Vercel.

## Running it locally

```bash
npm ci
npm run dev
```

Create `.env.local` with:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key   # server only, never expose
ADMIN_PASSWORD=something-long-and-random
```

The SQL to create the tables lives in `docs/`. Run `supabase-run-all.sql`
against a fresh project and the waitlist, analytics and application tables are
all set up in one pass.

`SUPABASE_SERVICE_ROLE_KEY` bypasses row level security. It is read only on the
server, and it must never be given a `NEXT_PUBLIC_` prefix.
