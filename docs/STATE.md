# STATE

## Goal
Senior-level UX redesign pass on the Caret landing page: fix the AI-looking colored/tinted boxes with colored borders, enforce a single-accent design system, make it "10/10 UX".

## Now
Redesign complete and verified. Awaiting user review; nothing committed (user has not asked for a commit).

## Next
1. (optional, needs user approval) delete stray /Users/coolio_999/node_modules to fix npm scripts globally
2. (optional) delete now-unused components/ui/custom-cursor.tsx and text-scramble.tsx
3. (pre-launch) replace invented testimonials with real quotes; fill footer social/Terms links

## Constraints
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
- Baseline build — RESULT: pass, EXIT=0, all 9 static pages generated (2026-07-07)
- Full single-accent redesign (11 files) — RESULT: final build EXIT=0; desktop 1440px + mobile 390px full-page screenshots verified; #features anchor confirmed on FeatureGrid; cards probe at computed opacity 1 with zero console errors (2026-07-07)
- GradientBridge smear bands removed from app/page.tsx — RESULT: hard section cuts verified in screenshots (2026-07-07)
- NOTE: uncommitted CLAUDE.md change (48 lines) in working tree predates this session (guardrails-kit install on 2026-07-06) — not touched

## Open items
- Suggest user delete stray /Users/coolio_999/node_modules (contains node v18 binary that breaks npm scripts in every project under $HOME)
- Footer social links (Twitter/LinkedIn) are href="#" placeholders; Terms of Service is href="#"

## Failed attempts
- `npm run build` fails with "You are using Node.js 18.20.8" despite shell node v20.20.2 — cause: ~/node_modules/.bin/node shadowing. Workaround in Facts.
