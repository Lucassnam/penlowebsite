"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "What file formats does Caret support?",
    a: "Standard .docx files — what Word, Google Docs exports and Apple Pages all produce. PDF and .pages aren't in the first release.",
    sticker: "📄",
  },
  {
    q: "Does it need an internet connection?",
    a: "Yes. Your document is prepared and the marks are read in the cloud over an encrypted connection. Nothing is stored, and nothing is used for training.",
  },
  {
    q: "Which Apple Pencils work?",
    a: "All of them — 1st gen, 2nd gen, USB-C and Pro. Any iPad that supports a Pencil and runs iPadOS 17 or later.",
    sticker: "✏️",
  },
  {
    q: "What happens to my original document?",
    a: "It's never modified. Applied edits go into a new copy, so the file you started with stays exactly as it was.",
  },
  {
    q: "How does it handle tables and footnotes?",
    a: "Inline edits — insertions, deletions, emphasis — are what Caret rewrites. Tables, footnotes, headers and styles pass through untouched.",
  },
  {
    q: "When does it launch?",
    a: "We're aiming for the App Store later this year. The waitlist goes first, at a 40% launch discount.",
    sticker: "🚀",
  },
];

function TypingDots() {
  return (
    <div className="flex w-fit items-center gap-1 rounded-[20px] rounded-bl-[6px] bg-[#EBEBED] px-4 py-3.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-ink-muted/60"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.16, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function Thread({ faq, index }: { faq: (typeof faqs)[number]; index: number }) {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!open) {
      setTyping(false);
      return;
    }
    setTyping(true);
    const t = window.setTimeout(() => setTyping(false), 620);
    return () => window.clearTimeout(t);
  }, [open]);

  return (
    <motion.div
      className="flex flex-col gap-2"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* question — incoming bubble with a + affordance */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <motion.button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            whileTap={{ scale: 0.97 }}
            className="rounded-[20px] rounded-bl-[6px] bg-[#EBEBED] px-4 py-3 text-left font-body text-[15px] leading-snug text-ink transition-colors hover:bg-[#E2E2E5]"
          >
            {faq.q}
          </motion.button>

          {faq.sticker && (
            <motion.span
              className="pointer-events-none absolute -top-3 -right-2 select-none text-[19px] drop-shadow-sm"
              initial={{ scale: 0, rotate: -30 }}
              whileInView={{ scale: 1, rotate: 12 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 420, damping: 14, delay: 0.3 + index * 0.06 }}
            >
              {faq.sticker}
            </motion.span>
          )}
        </div>

        <motion.button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? `Hide answer to ${faq.q}` : `Show answer to ${faq.q}`}
          className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-ink-muted/60 transition-colors hover:bg-black/[0.05] hover:text-ink"
          animate={{ rotate: open ? 45 : 0 }}
          whileTap={{ scale: 0.85 }}
          transition={{ duration: 0.22 }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </motion.button>
      </div>

      {/* answer — outgoing bubble */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-1">
              {typing ? (
                <TypingDots />
              ) : (
                <motion.p
                  initial={{ opacity: 0, scale: 0.94, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 420, damping: 28 }}
                  className="ml-auto w-fit max-w-[86%] origin-bottom-right rounded-[20px] rounded-br-[6px] bg-pen px-4 py-3 font-body text-[15px] leading-snug text-white"
                >
                  {faq.a}
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Faq() {
  return (
    <section id="faq" className="bg-paper pb-20 md:pb-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <motion.div
          className="lg:sticky lg:top-28 lg:self-start"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-body text-xs font-semibold uppercase tracking-[0.28em] text-pen">
            FAQ
          </p>
          <h2 className="mt-4 font-heading text-4xl font-bold tracking-[-0.03em] text-ink md:text-5xl">
            Ask us anything.
          </h2>
          <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-ink-muted">
            Tap a question to get the reply. Anything we missed goes to{" "}
            <a href="mailto:hello@usecaret.app" className="text-pen underline underline-offset-4 hover:opacity-80">
              hello@usecaret.app
            </a>
            .
          </p>
        </motion.div>

        <div>
          <p className="mb-6 text-center font-body text-[11px] font-medium text-ink-muted/70">
            <span className="font-semibold text-ink-muted">Caret</span> · Today 9:41 AM
          </p>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <Thread key={faq.q} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
