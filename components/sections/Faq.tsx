"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { WordReveal } from "@/components/ui/word-reveal";

const faqs = [
  {
    q: "What file formats does Caret support?",
    a: "Caret works with standard .docx files, the format used by Microsoft Word, Google Docs exports, Apple Pages, and virtually every other word processor. PDFs and .pages files are not supported in the initial release.",
  },
  {
    q: "Does Caret require an internet connection?",
    a: "Yes. Caret uses CloudConvert to prepare your document and Gemini's vision AI to read your marks. Both require a connection. Your document is sent over an encrypted connection and is not stored or used for training.",
  },
  {
    q: "Which Apple Pencil models are supported?",
    a: "Caret works with all Apple Pencil models (1st gen, 2nd gen, USB-C, and Pro). Any iPad that supports Apple Pencil and runs iPadOS 17 or later will work.",
  },
  {
    q: "What happens to the original document?",
    a: "Caret never modifies your original file. When you apply edits, they go into a new copy. Your source document is always untouched.",
  },
  {
    q: "How does Caret handle complex formatting like tables or footnotes?",
    a: "Caret's AI focuses on inline edits (insertions, deletions, emphasis marks). Tables, footnotes, headers, and styles are passed through unchanged. Complex structural rewrites are on the roadmap.",
  },
  {
    q: "When will Caret be available?",
    a: "We're targeting an App Store launch later this year. Join the waitlist and you'll be first to know, and first to get early access at a 40% discount.",
  },
];

export function Faq() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 bg-paper" ref={ref} id="faq">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs uppercase tracking-widest font-body text-ink-muted font-semibold mb-3">
            FAQ
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink">
            <WordReveal text="Questions?" />
          </h2>
          <p className="mt-4 font-body text-base text-ink-muted">
            We&apos;ve got answers. If not,{" "}
            <a href="mailto:hello@caret.app" className="text-pen underline underline-offset-2 hover:text-pen/80 transition-colors">
              email us.
            </a>
          </p>
        </motion.div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.q}
              className="rounded-2xl border border-black/7 overflow-hidden bg-white shadow-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.04 + i * 0.06 }}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left group"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-body font-semibold text-ink text-sm pr-6 group-hover:text-ink/80 transition-colors">
                  {faq.q}
                </span>
                <motion.span
                  className="flex-shrink-0 w-6 h-6 rounded-full bg-black/5 flex items-center justify-center text-ink-muted group-hover:bg-pen-soft group-hover:text-pen transition-colors"
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </motion.span>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 font-body text-sm text-ink-muted leading-relaxed border-t border-black/5 pt-4">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
