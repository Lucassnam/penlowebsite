# Caret Outreach Drafts: Creator Cold Email + First Reddit Posts
2026-07-15 · Companion to `2026-07-14-waitlist-growth-plan.md` (strategy lives there; copy lives here).

One-liner (reused everywhere): **"Caret is red-pen editing without the retyping. You mark up the document on your iPad like paper; the AI types the changes into the .docx for you. You approve every edit."**

Prerequisite for everything below: **the 15-second demo GIF/video** (red strikes and carets on a doc, tap, edits appear in Word with tracked changes). Do not send a single email or post until it exists. It is the pitch.

---

## Part 1 — Cold email

### Reality check on "1000s of people"
Do not email thousands of random consumers. Two lists are worth emailing:

1. **Creators (100–300 total):** iPad/productivity YouTubers, TikTokers, and newsletter writers who cover GoodNotes, Notability, PDF Expert, paperless workflows. One mid-size video outperforms thousands of cold emails.
2. **Freelance editors and proofreaders (the volume list, 1000+):** same segment as the cold-call plan, same sources: EFA directory (the-efa.org), Reedsy marketplace, ACES member list, LinkedIn "freelance copy editor". These are B2B recipients, which keeps CAN-SPAM legitimate.

### Deliverability setup (do this before sending anything)
- Buy a lookalike domain (trycaret.app or getcaret.app). Never send cold email from usecaret.app.
- Warm the domain 2–3 weeks (Instantly or Smartlead handle warmup and sending).
- Set up SPF, DKIM, DMARC on the sending domain.
- Ceiling: 30–50 emails/day per inbox. "Thousands" means 3–4 domains x 2–3 inboxes each, ramped over weeks, roughly $200–500/mo.
- CAN-SPAM: real mailing address in the footer, working unsubscribe line, truthful subject.
- Track with `usecaret.app/?src=cold-email-creator` and `?src=cold-email-editor` (waitlist API already stores `source`).

### Template A: creators (YouTube / TikTok / newsletter)
Goal: get them to watch the demo and try early access, not to "collab".

**Subject options (pick per recipient, lowercase reads more human):**
- `red pen on iPad, edits typed into Word for you`
- `an app your [GoodNotes/Notability] audience will fight over`
- `60-sec demo: Apple Pencil markup that edits the actual .docx`

**Body:**

> Hi [Name],
>
> Your video on [specific video, e.g. "GoodNotes vs Notability for grad school"] is exactly the audience I built this for, so you get the first look.
>
> Caret is an iPad app that reads your Apple Pencil markups (strikes, carets, circles) and types the edits into the actual Word file for you. Red-pen editing without the retyping. You approve every change, and the original file is never touched.
>
> 60-second demo: [link]
>
> We launch on the App Store later this year. I would love to get you early access before anyone else, plus promo codes for your audience if you want them. No strings, no script, say whatever you actually think of it.
>
> Worth a look?
>
> [Your name], founder
> usecaret.app
> [mailing address]
> (Not interested? Reply "pass" and I will never email you again.)

**Personalization rule:** the first line must reference one specific piece of their content. If you cannot write that line, you have not researched them enough to email them.

**Follow-up (one only, 4 days later):**

> Subject: re: [original subject]
>
> Hi [Name], one nudge and then I will leave you alone. The 60-second demo is here: [link]. If iPad markup content is not on your calendar right now, a "pass" reply is a totally fine answer.

### Template B: freelance editors / proofreaders (volume list)
Email version of the cold-call opener. Goal: demo view + waitlist signup.

**Subject options:**
- `still retyping your red-pen edits into Word?`
- `for editors who still mark up on paper`
- `your paper markups, typed into the .docx for you`

**Body:**

> Hi [Name],
>
> Quick question for a working editor: do you still print drafts and mark them up by hand? Most editors I talk to do, because you catch more on paper. The painful part is retyping every change into Word afterward.
>
> I built an iPad app that kills that step. You mark up the document with an Apple Pencil like a red pen, and it types the changes into the Word file for you. You approve or reject every edit, formatting and tracked changes survive, and your original file is never modified.
>
> 60-second demo: [link]
>
> We launch later this year. Early-access users get in first and lock in 40% off the launch price: usecaret.app/?src=cold-email-editor
>
> If you edit on screen only, no worries, just delete this.
>
> [Your name], founder of Caret
> [mailing address]
> Reply "unsubscribe" and you will never hear from me again.

**Objection replies (from the call plan, reuse verbatim):**
- "I don't have an iPad" → "Desktop is on the roadmap, can I email you when it lands?" (still a signup)
- "AI will mess up my document" → "It never edits without your approval. You accept or reject every change, and your original file is never touched."
- "How much?" → "Early users lock in 40% off launch price now, for free."

---

## Part 2 — Reddit posts (ready to paste)

Cadence per the growth plan: 2 weeks of genuine comments in target subs first, then Post 1 in r/SideProject (lowest risk), fix messaging from the responses, then Post 2 and 3 the following weeks. One sub per week. Answer every comment within the first 2 hours.

### Post 1: r/SideProject (demo GIF post)

**Title:**
`I built an iPad app that reads your Apple Pencil markups and types the edits into the Word doc for you`

**Body (GIF/video attached as the post media):**

> For years my editing loop was: print the draft, mark it up with a red pen, then sit back down and retype every single change into Word. The markup part works great (you genuinely catch more on paper). The retyping part is slow, mind-numbing, and error-prone.
>
> So I built Caret. You open a .docx on your iPad, mark it up with the Apple Pencil the way you would on paper (strikethroughs, carets, circles), and the app reads your marks and applies the edits into the actual Word file. You approve or reject each change. Formatting, styles, and tracked changes all survive, and your original file is never modified. Output is a standard .docx, no lock-in.
>
> Stack, for the curious: PencilKit for ink, vision AI for mark recognition, edits written into the .docx the same way Word writes them.
>
> It is not on the App Store yet (targeting later this year). Happy to answer anything about the recognition pipeline, the .docx surgery, or the many ways this broke along the way.

**First comment (self-reply, post immediately):**

> If you want early access when the beta opens: usecaret.app/?src=reddit-sideproject (early users get 40% off at launch). And if you edit documents for a living, I would genuinely love to hear what would make you trust or distrust an app like this.

### Post 2: r/iPadPro or r/applepencil (demo GIF post, tighter)

**Title options:**
- `Made an app where Apple Pencil red-pen marks become real edits in the Word file`
- `Apple Pencil markup that actually edits the .docx instead of just drawing on it`

**Body:**

> Quick demo of something I have been building. You mark up a Word doc with the Pencil like you would on paper: strike through a word, caret in an insertion, circle for emphasis. Caret reads the marks within seconds of lifting the Pencil and types the changes into the actual .docx. You approve every edit, and the original file is untouched.
>
> Works with all Pencil models on iPadOS 17+. Not on the App Store yet, launching later this year. Happy to answer questions, and honest skepticism is welcome, this sub knows handwriting apps better than anyone.

**First comment:** same waitlist link pattern with `?src=reddit-ipadpro`.

### Post 3: r/Copyediting (story post, no GIF needed, link only when asked)

**Title:**
`People who still edit on paper: I built something to kill the retyping step, and I need 10 brutal beta testers`

**Body:**

> I keep meeting editors with the same loop: print the draft, mark it up with a red pen (because you catch more on paper, and the research backs this up), then spend the least enjoyable part of the job retyping every change into Word and hoping you did not miss any.
>
> I built an iPad app that reads your red-pen markups (strikes, carets, circles, transpositions are on the roadmap) and applies them into the actual .docx. You review and approve every single edit before it lands. Formatting and tracked changes survive. Your original file is never touched, edits go into a new copy.
>
> Before I launch, I want 10 working editors to try to break it and tell me exactly where it fails. Brutal honesty preferred over politeness.
>
> Two questions for this sub, even if you do not want to test:
> 1. What would make you trust, or refuse to trust, AI reading your markups?
> 2. What mark do you use constantly that I have probably never heard of?

**Link policy:** r/Copyediting is strict. Put nothing in the body. Reply with `usecaret.app/?src=reddit-copyediting` only when someone asks, or in a first comment if the sidebar allows it.

---

## This week, in order
1. Record the 15-second demo GIF and a 60-second demo video (blocks everything).
2. Buy the lookalike domain, set up Instantly/Smartlead, start domain warmup (2–3 weeks of lead time starts now).
3. Start the 2-week Reddit comment-history clock: 10 min/day of genuine comments in r/SideProject, r/iPadPro, r/Copyediting.
4. While warming: build the creator list (50 names: YouTube search "GoodNotes alternative", "iPad note taking apps 2026", newsletter directories) and pull the first 200 editors from EFA/Reedsy.
5. Week 3: send first 30 creator emails (Template A), post Post 1 to r/SideProject.
