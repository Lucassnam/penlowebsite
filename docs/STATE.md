# STATE

## Goal
Ship-readiness + /admin analytics per approved plan docs/plans/2026-07-14-ship-ready-admin.md. (Copy rewrite pushed as d78fe32; CustomCursor restored per user request.)

## Now
Ship fixes + full analytics pipeline + /admin dashboard built and verified locally (build exit 0). BLOCKED on user: Supabase project is dead (NXDOMAIN) — user must create a new project, run docs/supabase-waitlist-setup.sql + docs/supabase-analytics-setup.sql, update SUPABASE_URL/SUPABASE_ANON_KEY and add SUPABASE_SERVICE_ROLE_KEY in .env.local AND Vercel, and copy ADMIN_PASSWORD (already generated in .env.local) to Vercel. Uncommitted; user has not asked to commit this batch.

## Next
1. (optional, needs user approval) delete stray /Users/coolio_999/node_modules to fix npm scripts globally
2. (optional) delete now-unused components/ui/custom-cursor.tsx and text-scramble.tsx
3. (pre-launch) replace invented testimonials with real quotes; fill footer social/Terms links

## Constraints
- User: "No M dash is on the website" — no em-dashes in any site copy, titles, or metadata (2026-07-14). Exception: the "——" strikethrough mark glyphs.
- User: "We might drastically rechange what the website looks like. So just keep that in mind" — user will supply real assets (Photoshop); refs: awwwards cooldock + supaste; leans light theme; big redesign possible, avoid over-investing in current visuals (2026-07-14)
- User: "the 4 steps, it's good" — do not change HowItWorks step content (2026-07-13)
- User: fix "the beige color with the boxes, the colored boxes with red lining around them, that just looks really AI"
- User: "make careful design choices"; "do the whole thing"; ship finished product, not a plan
- Global rules: never remove auth/required fields; report success only beside real exit codes

## Decisions
- DECISION: Single accent color = pen red #E63027; green reserved for functional success states only; all amber/blue/purple/cyan/indigo accents removed — the product story is one red pen, and the 7-color palette is the main "AI-generated" tell.
- DECISION: Kill the low-alpha tinted-bg + tinted-border chip/pill pattern everywhere; replace with bare icons, hairline dividers, or neutral surfaces (white + black/6 border on light; white/5 + white/9 border on dark).
- DECISION: Remove UX-hostile gimmicks: hidden native cursor + CustomCursor, animated film grain, spinning gradient border + shine on primary CTA, TextScramble headings, TiltCard on testimonials, fake "Verified" badges, rainbow avatar/particle colors.
- DECISION: Run next via `node node_modules/next/dist/bin/next <cmd>` — npm scripts resolve a stray Node 18 (see Facts).

## Facts
- Project: /Users/coolio_999/Desktop/Active/penlo-landing — Next.js 16.2.9 (Turbopack), Tailwind v4, framer-motion 12.42.0
- Dev server: port 4321 (next dev), NOT 3000
- Build command that works: `node node_modules/next/dist/bin/next build` (shell node = v20.20.2 via nvm)
- BUG (environment, outside repo): /Users/coolio_999/node_modules/.bin/node is v18.20.8 and shadows nvm node inside all npm scripts because npm prepends ancestor node_modules/.bin dirs to PATH. Fix = delete stray ~/node_modules (needs user approval).
- Design tokens live in app/globals.css @theme block; card utilities: .premium-card (light), .dark-card (dark)
- Full design audit: docs/design-review-2026-07-07.md

## Done
- Ship fixes: fake testimonials → founding-tester invite; honest stats (54-study Delgado meta-analysis, kept real 3.2s); footer/nav dead links fixed; social icons removed; /terms page created + sitemap — RESULT: build exit 0, render probes confirm new/absent strings (2026-07-14)
- Analytics: events SQL, /api/track (spoofed signup → 400 verified), Tracker component, data-track on 4 CTAs, server-side signup events, /admin dashboard (auth gate verified: no key → Unauthorized, key → renders; DB reads UNVERIFIED until new Supabase project) (2026-07-14)
- Copy rewrite (Hero, Problem, DocStack, FeatureGrid) per dictated investor-pitch positioning — RESULT: tsc exit 0, build exit 0, all new strings and zero old strings confirmed in curl'd localhost:4321 HTML (2026-07-13; pushed as d78fe32)
- CustomCursor restored to layout + cursor-hiding CSS per user request — RESULT: tsc exit 0, dev compile clean, chunk served (2026-07-13, uncommitted)
- Baseline build — RESULT: pass, EXIT=0, all 9 static pages generated (2026-07-07)
- Full single-accent redesign (11 files) — RESULT: final build EXIT=0; desktop 1440px + mobile 390px full-page screenshots verified; #features anchor confirmed on FeatureGrid; cards probe at computed opacity 1 with zero console errors (2026-07-07)
- GradientBridge smear bands removed from app/page.tsx — RESULT: hard section cuts verified in screenshots (2026-07-07)
- NOTE: uncommitted CLAUDE.md change (48 lines) in working tree predates this session (guardrails-kit install on 2026-07-06) — not touched

## Open items
- BLOCKER (user): dead Supabase project — see ## Now for the exact restore steps; until done, waitlist signups, /apply applications, AND analytics 500 in prod if prod shares these env vars. THREE SQL files to run: supabase-waitlist-setup.sql, supabase-analytics-setup.sql, supabase-applications-setup.sql
- USER: confirm hello@usecaret.app mailbox exists and is monitored (contact link in footer, FAQ, privacy, terms)
- USER: copy ADMIN_PASSWORD from .env.local to Vercel env; add SUPABASE_SERVICE_ROLE_KEY to both
- Suggest user delete stray /Users/coolio_999/node_modules (contains node v18 binary that breaks npm scripts in every project under $HOME)

## Failed attempts
- `npm run build` fails with "You are using Node.js 18.20.8" despite shell node v20.20.2 — cause: ~/node_modules/.bin/node shadowing. Workaround in Facts.
