-- Caret marketing dashboard: source attribution + outreach + reddit tracking.
-- Run this in: Supabase dashboard → your project → SQL Editor → New query → Run.
-- (Run docs/supabase-waitlist-setup.sql and docs/supabase-analytics-setup.sql first.)

-- 1) Channel attribution on events (?src= query param captured by the Tracker).
alter table public.events add column if not exists source text;

-- 2) Outreach targets (creator/press/editor emails). Service-role only: RLS on,
--    NO anon policies — the public key can neither read nor write these rows.
create table if not exists public.outreach_targets (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  tier          text not null check (tier in ('creator', 'press', 'editor', 'other')),
  contact       text,
  email         text,
  status        text not null default 'research'
                check (status in ('research', 'drafted', 'sent', 'followed_up', 'replied', 'won', 'passed')),
  draft_subject text,
  draft_body    text,
  notes         text,
  sent_at       timestamptz,
  follow_up_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
alter table public.outreach_targets enable row level security;

-- 3) Reddit posts. Score/comments auto-refreshed server-side; views is manual
--    (Reddit shows view counts only to the post author in their app).
create table if not exists public.reddit_posts (
  id             uuid primary key default gen_random_uuid(),
  subreddit      text not null,
  title          text not null,
  url            text,
  src_tag        text,
  posted_at      timestamptz,
  score          integer,
  num_comments   integer,
  views          integer,
  last_refreshed timestamptz,
  notes          text,
  created_at     timestamptz not null default now()
);
alter table public.reddit_posts enable row level security;

-- 4) Seed the researched targets (docs/marketing/2026-07-15-influencer-targets-and-specific-drafts.md).
--    Draft bodies live in that doc; fill demo link + your name before sending.
insert into public.outreach_targets (name, tier, contact, status, draft_subject, draft_body, notes) values
  ('Christopher Lawley', 'creator', 'YouTube About page email; Mastodon @ChrisLawley; Patreon', 'drafted',
   'an iPad workflow that finally kills paper editing',
   'Hi Christopher,

Your "Changing my Relationship with the iPad" post stuck with me, the tension between loving the device and it not quite fitting real work. I built something aimed at exactly that gap and I think you might be the single best person on the internet to judge it.

Caret turns the iPad into the place where document editing actually finishes. You mark up a Word doc with the Apple Pencil like a red pen (strikes, carets, circles) and it types the edits into the actual .docx for you. You approve every change, formatting and tracked changes survive, the original file is never touched.

60-second demo: [link]

We launch on the App Store later this year. I would love to get you TestFlight access before anyone else. No script, no strings, say what you actually think, including if the recognition falls over.

Worth a look?

[your name], founder of Caret · usecaret.app
[mailing address] · Reply "pass" and I will never email you again.',
   '~150k subs, iPad productivity/automation. Reference his "Changing my Relationship with the iPad" post (theuntitled.site).'),
  ('Paperless X', 'creator', 'beingpaperless.com contact form; Medium @paperlessx', 'drafted',
   'a new app for your "must-have iPad apps" radar (from a developer)',
   'Hi,

Your May post on the 5 must-have iPad apps for 2026 made it obvious you evaluate apps the way developers wish reviewers did, tracking changes over time instead of one-shot reviews. So I want to put Caret on your radar early, before launch.

It reads Apple Pencil markups on a Word document (strikethroughs, carets, circles) and applies the edits into the real .docx. Approve or reject each change, formatting survives, output is a standard Word file with no lock-in. Think: the paper red-pen editing loop, minus retyping the changes afterward.

60-second demo: [link]

Since you also write courses for apps: if Caret earns a place in your workflow, I would be glad to support that however is useful (early access, roadmap visibility, direct line to me). TestFlight invite is yours today if you want it.

[your name], founder of Caret · usecaret.app
[mailing address] · Reply "pass" for silence forever.',
   'Two channels (Paperless X + Paperless Humans); evaluates apps for developers, writes courses. Reference May 2026 Medium post "My 5 must-have iPad apps for 2026".'),
  ('Fernando Silva', 'creator', '9to5Mac author page; YouTube About email', 'drafted',
   'a Word workflow the iPad can do and the Mac can''t',
   'Hi Fernando,

You have spent years making the case that iPadOS is a real computer. Here is a data point for your side: an editing workflow that is genuinely better on iPad than on a Mac, because it needs the Pencil.

Caret lets you mark up a .docx with the Apple Pencil like a paper draft (strike a word, caret an insertion, circle for emphasis) and then types those edits into the actual Word file. Approve every change, formatting intact, original untouched.

60-second demo: [link]

Launching later this year; happy to give you TestFlight access now, for the channel or for 9to5Mac, whichever fits. Zero expectations on coverage, honest skepticism welcome.

[your name], founder of Caret · usecaret.app
[mailing address] · "pass" = never again.',
   '~43k subs, iPadOS-first; also writes for 9to5Mac (one relationship, two outlets).'),
  ('Greg''s Gadgets', 'creator', 'YouTube About email', 'drafted',
   '15-second demo: Pencil marks become real Word edits',
   'Hi Greg,

15-second version: [GIF/video link]. You strike through words on a Word doc with the Apple Pencil, and the app types the edits into the actual .docx. Approve each change, formatting survives.

It is called Caret, launching on the App Store later this year. Early TestFlight access is yours if the demo lands. Promo codes for your audience at launch if you want them.

[your name], founder · usecaret.app
[mailing address] · Reply "pass" to opt out.',
   '~412k subs, general Apple. Short demo-first pitch.'),
  ('Study to Success', 'creator', 'YouTube About email', 'drafted',
   'for the "professor covered my draft in red ink" video',
   'Hi,

Your iPad study setup videos reach exactly the people I built this for: students who get a draft back covered in handwritten feedback and then spend an evening retyping corrections into Word.

Caret closes that loop on the iPad. Mark up the .docx with the Apple Pencil like paper, and it applies the edits into the real Word file. Approve every change; the original is never touched. Works with all Pencil models on iPadOS 17+.

60-second demo: [link]

We launch later this year. Early access plus promo codes for your viewers are yours if you want to show it in a note-taking or essay-editing video. No script, your honest take.

[your name], founder of Caret · usecaret.app
[mailing address] · Reply "pass" and I will not follow up.',
   'StudyTube; featured on Goodnotes'' own best-study-channels list.'),
  ('Love Nika', 'creator', 'YouTube About email', 'drafted',
   'for the "professor covered my draft in red ink" video',
   'Hi Nika,

Your study-with-me videos reach exactly the people I built this for: students who get a draft back covered in handwritten feedback and then spend an evening retyping corrections into Word.

Caret closes that loop on the iPad. Mark up the .docx with the Apple Pencil like paper, and it applies the edits into the real Word file. Approve every change; the original is never touched. Works with all Pencil models on iPadOS 17+.

60-second demo: [link]

We launch later this year. Early access plus promo codes for your viewers are yours if you want to show it in a note-taking or essay-editing video. No script, your honest take.

[your name], founder of Caret · usecaret.app
[mailing address] · Reply "pass" and I will not follow up.',
   'StudyTube, study-with-me with iPad + GoodNotes.'),
  ('Louise Harnby + Denise Cowle', 'editor', 'louiseharnbyproofreader.com contact; The Editing Podcast', 'drafted',
   'podcast topic: the red pen is undefeated, the retyping is not',
   'Hi Louise and Denise,

Louise, your Editorial Marketing series convinced me that editors respond to tools that respect how they already work, so I will keep this honest and short.

I built Caret, an iPad app for editors who still mark up on paper because they catch more that way. It reads Apple Pencil markups (strikes, carets, circles) on a Word document and types the changes into the actual .docx. The editor approves or rejects every single edit, formatting and tracked changes survive, and the original file is never modified.

Two ideas, take either or neither:
1. A conversation for The Editing Podcast about whether AI belongs anywhere near an editor''s markup (I will defend "only with approval on every edit" and take the hard questions).
2. Early access for you both, and for any CIEP/EFA colleagues you would trust to try to break it before launch.

60-second demo: [link]

[your name], founder of Caret · usecaret.app
[mailing address] · A "no thanks" reply ends this thread permanently.',
   'The editor educator (CIEP, EFA keynote, Editorial Marketing books). Podcast guest pitch + early access.'),
  ('MacStories (Federico Viticci)', 'press', 'macstories.net contact', 'research',
   'TestFlight: Apple Pencil markup that edits the actual .docx (launching [month])',
   'Hi Federico,

One-paragraph pitch: Caret is an iPad app where Apple Pencil markups become real edits in the Word file. Strike through a word on the .docx, caret in a replacement, and the app writes the change into the document the way Word does, with the user approving every edit. Formatting, styles, and tracked changes survive. Output is standard .docx, no proprietary format.

Why it might fit MacStories: it is a Pencil-first workflow that exists only on iPad, and it targets the last group still printing documents: editors, lawyers, professors.

TestFlight link: [link] · Press kit: [link] · Launching [date/month].

Happy to answer anything, including the uncomfortable questions about vision AI reading marks.

[your name], founder · usecaret.app · [mailing address]',
   'HOLD until ~2 weeks before App Store launch.'),
  ('The Sweet Setup (Shawn Blanc)', 'press', 'thesweetsetup.com contact', 'research',
   'TestFlight: Apple Pencil markup that edits the actual .docx (launching [month])',
   'Hi Shawn,

One-paragraph pitch: Caret is an iPad app where Apple Pencil markups become real edits in the Word file. Strike through a word on the .docx, caret in a replacement, and the app writes the change into the document the way Word does, with the user approving every edit. Formatting, styles, and tracked changes survive. Output is standard .docx, no proprietary format.

Why it might fit The Sweet Setup: you crowned PDF Expert the best PDF app; Caret is a bid for the "best way to edit Word docs with Apple Pencil" slot.

TestFlight link: [link] · Press kit: [link] · Launching [date/month].

Happy to answer anything, including the uncomfortable questions about vision AI reading marks.

[your name], founder · usecaret.app · [mailing address]',
   'HOLD until ~2 weeks before launch.')
on conflict do nothing;
