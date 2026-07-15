# Ship-Ready + /admin Analytics Plan — 2026-07-14

## Request (restated)
1. Review whether the pain point is clear; identify remaining "looks AI" elements.
2. Make the site ship-ready: every page, link, and interaction verified working.
3. Cold-calling + Reddit plan for waitlist growth → `docs/marketing/2026-07-14-waitlist-growth-plan.md`.
4. `usecaret.app/admin`: visitors, CTA clicks, signups, conversion rates.

## Audit findings (2026-07-14, read-only pass + live probes)

### BLOCKER — waitlist backend is dead
- `POST /api/waitlist` with a valid email → **HTTP 500**.
- Cause: `getaddrinfo ENOTFOUND haoxmfzdvxdhnifpvzfi.supabase.co` → **NXDOMAIN** (network
  otherwise fine: supabase.com → 200). The Supabase project referenced by `.env.local`
  no longer resolves — deleted or recreated under a new ref.
- Validation path works (bad email → 400 with correct message). Form UI works.
- **User action required**: check the Supabase dashboard. Either the project is gone
  (create new project, run `docs/sql/waitlist.sql` + new `docs/sql/analytics.sql`,
  update `SUPABASE_URL`/`SUPABASE_ANON_KEY` in `.env.local` AND the deploy host env)
  or production uses different env vars (verify on the deploy host).

### Ship blockers (site content)
| # | Item | Where | Proposed fix |
|---|---|---|---|
| S1 | **Invented testimonials** — 4 fake people, fake roles, fake 5-star ratings under "Early access feedback". Deceptive + classic AI tell. #4 (Tom W.) also claims a PDF-import flow the FAQ says doesn't exist. | Testimonials.tsx | Replace section with an honest "Be one of the first" early-tester strip (no fake people) until real quotes exist. NEEDS APPROVAL — removal of existing content. |
| S2 | **Invented stats** — "12+ types of pen marks" (AiMarks shows 4), "3.2s avg. AI processing" (unsourced). | SocialProof.tsx | Needs real numbers from the app, or reword to non-numeric claims. NEEDS USER INPUT. |
| S3 | Dead links: Terms of Service `href="#"`, Twitter `#`, LinkedIn `#`, footer brand `#` | Footer.tsx | Brand → `/`. ToS: create a real `/terms` page (draft provided) OR remove link. Social: remove until real profiles exist OR user provides URLs. NEEDS DECISION. |
| S4 | Nav brand logo `href="#"` | Nav.tsx | → `/` (scrolls to top, works from /privacy too). |
| S5 | Contact is `mailto:hello@usecaret.app` (footer + FAQ). Unverifiable from here. | Footer.tsx, Faq.tsx | USER ACTION: confirm the mailbox exists and is monitored. |

### Verified working (evidence in session)
- All anchor links resolve: #features, #how-it-works, #faq, #waitlist, #ai-marks, #any-document exist and are unique.
- /privacy page: real, accurate (matches CloudConvert + Gemini architecture), linked from footer.
- Build: exit 0. tsc: exit 0. Dev render: HTTP 200, no console/build error tokens.
- SEO surfaces present: metadata, OG image route, JSON-LD, sitemap.ts, robots.ts.
- Waitlist API input validation + duplicate-email handling correct (400 path live-tested).

### Pain-point clarity & AI-look review → summarized in session report
Pain point: clear post-rewrite (print→mark→retype→Caret kills the retype). Residual AI tells:
fake testimonials (S1), invented stats (S2), dead social links (S3), em-dash-heavy copy is fine.

## Proposed changes (Phase B — /admin analytics)

New Supabase table `events` + tracking pipeline + password-protected dashboard.

Files to create:
- `docs/sql/analytics.sql` — `events` table (`id uuid pk, type text CHECK IN ('pageview','cta_click','signup'), path text, referrer text, visitor_hash text, created_at timestamptz`), RLS: anon insert-only; service-role read.
- `app/api/track/route.ts` — POST; validates type/path; computes `visitor_hash = sha256(ip + UA + UTC-day)` server-side (no cookies, GDPR-light); inserts event.
- `components/analytics/Tracker.tsx` — client component in layout: pageview on mount + route change; delegated click listener for `[data-track]`.
- `app/admin/page.tsx` — server component; totals + last-14-days: unique visitors (distinct visitor_hash), pageviews, CTA clicks, signups, conversion rates (signups/visitors, clicks/visitors, signups/clicks); `noindex`.
- `app/admin/layout.tsx` or inline auth — compares `?key=`/cookie against `ADMIN_PASSWORD` env; wrong/missing → 401. Reads DB via new `SUPABASE_SERVICE_ROLE_KEY` (server-only).
- `lib/supabase-admin.ts` — service-role client (separate from insert-only anon client).

Files to modify (additive only):
- `app/layout.tsx` — mount `<Tracker />`.
- `Hero.tsx`, `Nav.tsx`, `FinalCta.tsx` — add `data-track="cta-hero" / "cta-nav" / "cta-final"` to CTAs.
- `app/api/waitlist/route.ts` — after successful insert, fire-and-forget a `signup` event (failure must NOT block the signup response).
- `Footer.tsx` — S3/S4 fixes.
- `Testimonials.tsx`, `SocialProof.tsx` — per S1/S2 decisions.
- `.env.local` + deploy host — add `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD` (user provides).

## Do-not-touch list
- `app/api/waitlist/route.ts`: keep `email` + `source` fields, 23505 duplicate handling, response shape — additive changes only.
- `lib/supabase.ts` insert-only anon-key pattern — never give the browser bundle or anon key read access; admin reads go through the service-role client only, server-side only.
- HowItWorks step content (user: "the 4 steps, it's good").
- Just-shipped copy rewrite (commit d78fe32); restored CustomCursor wiring.
- SEO: metadata, JSON-LD, sitemap, robots, OG image.

## Risks / unknowns
- Production env vars unknown (deploy host not accessible from here) — the dead-Supabase blocker may or may not exist in prod; must be checked by user.
- Visitor counts start at zero from deploy of the tracker; no historical data.
- `visitor_hash` dedupe is per-day (same person on two days = 2 visitors) — standard for lightweight analytics.
- Ad-blockers may block `/api/track` (first-party endpoint minimizes this).

## Verification commands (Phase 5)
- `node node_modules/typescript/bin/tsc --noEmit` → exit 0
- `node node_modules/next/dist/bin/next build` → exit 0, failure-token scan clean
- Live: `curl -X POST localhost:4321/api/track -d '{"type":"pageview","path":"/"}'` → 200 (after new Supabase project exists)
- Live: waitlist POST with test email → 200 `{ok:true}`; verify row + signup event in Supabase
- `curl localhost:4321/admin` → 401 without key; 200 with `ADMIN_PASSWORD`; numbers match inserted test events
- Full-page screenshot desktop+mobile (dwell-scroll per observation #5) for visual regressions

## Status
AWAITING APPROVAL — no code edits made. Marketing plan doc written (no approval needed, doc-only).
