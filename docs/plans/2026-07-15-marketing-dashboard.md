# Plan: Marketing Dashboard in /admin
2026-07-15 · Status: AWAITING APPROVAL · Companion strategy docs: docs/marketing/2026-07-14-waitlist-growth-plan.md, 2026-07-15-influencer-targets-and-specific-drafts.md

## Request (restated)
One dashboard to (a) manage outreach emails: target list, per-target status, ready-to-send drafts; (b) track Reddit posts: upvotes, comments, views; (c) see impressions/traffic and conversion into waitlist signups per `?src=` channel.

## Current state (audited)
- `/admin` (app/admin/page.tsx): password-gated (`?key=` + ADMIN_PASSWORD + IP rate limit), server-rendered. Already shows: unique visitors, pageviews, CTA clicks, signups, waitlist total, tester applications, 3 conversion rates, 14-day daily table, clicks-by-CTA, signups-by-source.
- `events` table (docs/supabase-analytics-setup.sql): type/path/referrer/visitor_hash. RLS anon-insert-only. **No source column.**
- Tracker (components/analytics/Tracker.tsx): sends pageview with `usePathname()` — **query string stripped, so `?src=` visits are never recorded**. Signup attribution works (waitlist.source), but per-channel impressions do not exist yet.
- `/api/track` (app/api/track/route.ts): validates type against pageview/cta_click only; signup events written server-side by waitlist route (anti-inflation) — keep.
- No outreach, Reddit, or email-sending code exists anywhere in the repo.

## Decisions embedded in this plan (approve or veto)
1. **No in-app email sending.** Dashboard gives one-click "copy draft" and prefilled `mailto:` per target. Rationale: cold volume must go through the warmed lookalike domain in Instantly/Smartlead (per growth plan); sending from usecaret.app infrastructure risks the main domain, and an SMTP/Resend integration adds keys + deliverability risk for zero gain. "Send" = status tracking here.
2. **Reddit "impressions":** true view counts are visible only to the post author in Reddit's own app. Dashboard auto-refreshes public score + comment count (server-side fetch of `<post-url>.json`), and has a manual "views" field you fill from the Reddit app when you want it.
3. Email opens/read-receipts: out of scope (needs tracking pixels; hurts deliverability and trust).

## Proposed changes

### Step 1 — Channel funnel (impressions by source)
- `docs/supabase-marketing-setup.sql` (new): `alter table events add column if not exists source text;` + new tables below + RLS (no anon policies on new tables; service-role only).
- Tracker.tsx: read `?src=` from `window.location.search` on pageview, send as `source`.
- /api/track: accept + sanitize optional `source` (string, ≤64 chars).
- admin page: new "Channel funnel" section: per source → visits, signups, visit→signup %.
- Check: build exit 0 + `curl -X POST localhost:4321/api/track -d '{"type":"pageview","path":"/","source":"test"}'` returns ok.

### Step 2 — Outreach tracker
- Table `outreach_targets`: name, tier (creator/press/editor/other), contact, email, status (`research|drafted|sent|followed_up|replied|won|passed`), draft_subject, draft_body, notes, sent_at, follow_up_at, timestamps.
- SQL file includes seed INSERTs for the 7 researched targets (Lawley, Paperless X, Fernando Silva, Greg's Gadgets, Study to Success, Love Nika, Harnby/Cowle) with their draft subjects/bodies from the drafts doc.
- `app/api/admin/outreach/route.ts`: POST upsert/status-change, auth = same ADMIN_PASSWORD key check as /admin.
- `app/admin/OutreachPanel.tsx` (client): table grouped by status, status dropdown, follow-up-due highlight, "copy draft" button, `mailto:` link prefilled with subject+body.
- Check: build + curl POST status change reflected on refresh.

### Step 3 — Reddit tracker
- Table `reddit_posts`: subreddit, title, url, src_tag, posted_at, score, num_comments, views (manual), last_refreshed, notes.
- `app/api/admin/reddit/route.ts`: POST add/update; POST refresh → server fetch `<url>.json` with a descriptive User-Agent, update score/num_comments; graceful failure (Reddit may 403 cloud IPs → keep manual entry working).
- `app/admin/RedditPanel.tsx` (client): add-post form, per-post row (score, comments, views input, clicks = pageviews with matching source, signups = waitlist.source), refresh button.
- Check: build + add a real reddit URL, refresh, see score or explicit fetch-failed state.

## FILES (TASK block preview)
- docs/supabase-marketing-setup.sql (new)
- components/analytics/Tracker.tsx (edit, ~10 lines)
- app/api/track/route.ts (edit, ~8 lines)
- app/admin/page.tsx (edit: add sections + load new tables)
- app/admin/OutreachPanel.tsx (new client component)
- app/admin/RedditPanel.tsx (new client component)
- app/api/admin/outreach/route.ts (new)
- app/api/admin/reddit/route.ts (new)

EST: ~550-650 changed lines across 8 files → executed as 3 steps, each ending with its named check, per P6.

## Do-not-touch list
- ADMIN_PASSWORD gate + admin-rate-limit logic (auth stays; new admin API routes must use the same check).
- RLS anon-insert-only policies on events/waitlist; new tables get NO anon policies.
- /api/waitlist and /api/apply contracts (email, source fields) — no field removals.
- Server-side-only signup events (anti-inflation comment in track route).
- Design tokens/globals; single red accent; no em-dashes in any user-visible copy.

## Risks / unknowns
- Reddit JSON may 403 from hosting provider IPs (works from most; mitigated by manual fields + graceful error).
- `useSearchParams` in a root client component requires Suspense in Next 16; mitigation: read `window.location.search` inside the existing effect instead (no hook).
- events.source backfill impossible for past traffic (acceptable; channels start now).
- User must run the new SQL in Supabase dashboard once (same flow as existing setup files).

## Verification (Phase 5 gates)
1. `node node_modules/next/dist/bin/next build`; success = exit 0 (capture `$?` directly, zsh).
2. `curl -s -X POST http://localhost:4321/api/track -H 'Content-Type: application/json' -d '{"type":"pageview","path":"/","source":"smoke"}'` → `{"ok":true}`.
3. `/admin?key=…` renders funnel + outreach + reddit sections without error against live Supabase (needs the SQL run first).
4. On-device: status change + copy-draft + mailto open.
