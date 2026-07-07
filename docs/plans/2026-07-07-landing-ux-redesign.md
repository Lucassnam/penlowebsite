# Caret Landing Page — Senior UX Redesign Plan
**Date:** 2026-07-07 · **Status:** awaiting approval · **Baseline build:** pass (EXIT=0)

## 1. Request (restated literally)
Act as a senior UI/UX designer specializing in high-conversion sites. Inspect every part
of usecaret.app, fix design flaws, deliver "10/10 UX" using proper design systems,
tokens, and typographic ratios. The named pain point: **"the beige/colored boxes with
red lining around them look really AI."** Ship the finished redesign, not a plan alone.

## 2. Audit findings (what actually makes it look AI-generated)

### A. Seven accent colors on a one-red-pen brand (root cause)
The palette sprays red #E63027, green #10B981, amber #F59E0B, indigo #6366F1,
blue #3B82F6, purple #8B5CF6, cyan #06B6D4 across cards, icons, dots, and numbers.
Uniform rainbow distribution with no semantic meaning is the strongest
"AI-generated" tell. Locations:
- `FeatureGrid.tsx` — per-feature `accent` (5 different hues) on icon chips, tagline pills, spotlights
- `AiMarks.tsx` — per-mark `color`/`border` (red/green/amber/indigo chips)
- `HowItWorks.tsx` — per-step `color` (red/purple/green/blue) on ghost numbers + timeline dots; step-02 chips green/amber/blue; step-04 blue icon + green checks
- `Testimonials.tsx` — pastel card backgrounds (`bg-pen-soft`, teal/10, `#F5F3FF`, `#EFF6FF`) with matching tinted borders; rainbow gradient avatars
- `Hero.tsx` — 4 rainbow fake avatars (S/J/P/T); `Problem.tsx` — red/purple/green Mark/Scan/Done dots
- `FinalCta.tsx` — 6-color confetti particles

### B. The tinted-box-with-tinted-border pattern (the user's exact complaint)
`background: ${accent}08–15` + `border: 1px solid ${accent}15–25` chips/pills repeat
~14 times (FeatureGrid icon chips + tagline pills, AiMarks symbol chips + track-change
pill, Problem number circles + icon chip, HowItWorks step-04 chip, Hero AI-chip icon).
Low-alpha tint + low-alpha matching outline is the signature "AI slop card".

### C. UX-hostile gimmicks
- `globals.css:23-25` — **native cursor hidden site-wide** (`cursor: none !important`), replaced by a JS dot (`CustomCursor`). Hurts usability, precision, accessibility; kills trust on a conversion page.
- `globals.css:49-71` — animated film grain over the whole page (constant repaint, hazy text).
- Hero primary CTA stacks 4 effects: spinning conic gradient border + traveling shine + magnetic pull + cursor-follow glow. Visual noise on the single most important element.
- `TextScramble` on "How it works" step headings — hacker aesthetic, off-brand for editors/lawyers.
- `TiltCard` on testimonial text cards — tilting text hurts readability.
- Fake "Verified" badges on invented testimonials; fake rainbow avatar stack in hero.

### D. Structural/UX defects
- Nav "Features" → `#features` sits on the **stats strip** (`SocialProof.tsx:22`), not the feature grid. FeatureGrid has no id.
- No `:focus-visible` styles (keyboard users get nothing once cursor tricks removed); no smooth scroll for anchor nav.
- Type ramp is otherwise consistent (Fraunces display / Inter body) — keep.

### E. Environment defect (outside repo)
`~/node_modules/.bin/node` (v18.20.8) shadows nvm Node 20 inside every npm script
(npm prepends ancestor `.bin` dirs to PATH) → `npm run build`/`dev` fail.
Workaround: `node node_modules/next/dist/bin/next <cmd>`. Permanent fix (user
approval needed — deletion outside repo): remove stray `~/node_modules`.

## 3. Design system (target)
- **Accent:** pen red `#E63027` only. **Green** reserved for functional success states
  (form success, "ready" status dot). No amber/blue/purple/cyan/indigo anywhere.
- **Surfaces:** light sections → `.premium-card` (white, `black/6` hairline, soft shadow);
  dark sections → `white/5` bg + `white/9` hairline. No tinted fills with tinted outlines.
- **Icon treatment:** bare icons in pen red (no chip containers), or neutral chips
  (`black/4` light, `white/6` dark) with red glyphs where a container is structurally needed.
- **Metadata rows** (taglines, track-change labels): hairline-top divider + small mono/uppercase
  text instead of colored pills.
- **Typography:** keep Fraunces/Inter ramp (h1 5xl–7xl, h2 4xl–5xl, body base/lg) — already sound.
- **Motion:** keep entrance reveals + parallax; delete scramble/tilt-on-text/grain/spin.

## 4. Files touched (10)
| File | Change |
|---|---|
| `app/globals.css` | restore native cursor; delete grain, `.gradient-border`, `.shine-border`; add `:focus-visible` ring + smooth scroll (reduced-motion-guarded) |
| `app/layout.tsx` | drop `CustomCursor` |
| `Hero.tsx` | clean primary CTA (solid red); replace rainbow avatar stack with single red check + line; drop `pulse-glow` |
| `SocialProof.tsx` | move `id="features"` off stats strip |
| `Problem.tsx` | numbered circles → mono red numerals; icon chip → bare red check; Mark/Scan/Done → single-accent text steps |
| `HowItWorks.tsx` | all step colors → pen red; step-02 chips neutral+red; step-04 neutral+red; remove TextScramble |
| `AiMarks.tsx` | symbol chips neutral; green "after" text → white; track-change pill → hairline mono row |
| `FeatureGrid.tsx` | `id="features"`; remove accent rainbow (red icons, bare); tagline pills → hairline rows; spotlight red/neutral |
| `Testimonials.tsx` | pastel cards → white premium-card; monochrome avatars; red stars; remove Verified badge + TiltCard |
| `FinalCta.tsx` | particle colors → red family + white |

## 5. Do-not-touch list
- `/api/waitlist` route + `FinalCta` submit logic (fetch, error handling, Supabase) — visual wrapper only
- `layout.tsx` metadata, JSON-LD, fonts, `ScrollProgress`
- `Nav.tsx` behavior, mobile menu; `Faq.tsx` (already neutral); `DocStack.tsx` chips (already neutral); `Footer.tsx`; `pen/*` mockups; `privacy` page
- No dependency changes, no auth/field removals

## 6. Execution steps + verification
1. globals.css + layout.tsx → `node node_modules/next/dist/bin/next build` (EXIT=0)
2. Dark sections (Hero, SocialProof, FinalCta, AiMarks) → build (EXIT=0)
3. Light sections (Problem, HowItWorks, FeatureGrid, Testimonials) → build (EXIT=0)
4. `next dev` on :4321 → full-page screenshots (desktop + 390px mobile) → visual pass:
   no tinted-box-with-tinted-border instances, native cursor back, anchors land correctly
5. Waitlist form still posts to `/api/waitlist` (exercise in dev)

## 7. Risks
- Aurora text kept (red-family, on-brand) — flag for removal if user prefers static
- Red rating stars are unconventional (usually amber) — deliberate single-accent choice
- Testimonials/avatars remain invented content; recommend replacing with real quotes pre-launch
