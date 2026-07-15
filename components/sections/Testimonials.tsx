"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { WordReveal } from "@/components/ui/word-reveal";

const personas = [
  {
    title: "Editors & proofreaders",
    line: "You mark up manuscripts for a living. Help us get every proofreading mark right.",
  },
  {
    title: "Lawyers & paralegals",
    line: "Redline the contract by hand. Skip retyping the changes into Word.",
  },
  {
    title: "Academics & grad students",
    line: "Advisor markups, thesis drafts, and revision cycles without the busywork.",
  },
];

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-16 md:py-24 bg-paper paper-texture" ref={ref}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs uppercase tracking-widest font-body text-ink-muted font-semibold mb-3">
            Beta testers
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink">
            <WordReveal text="Be one of the first." />
          </h2>
          <p className="mt-5 font-body text-base text-ink-muted max-w-xl mx-auto leading-relaxed">
            Caret is in private beta. We&apos;re inviting a small group of
            beta testers who edit on paper every day. You get free early
            access, the 40% launch discount, and a direct line to the founder.
            We get your brutal feedback.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-5 mb-12">
          {personas.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 + i * 0.09 }}
            >
              <div className="premium-card rounded-2xl p-7 h-full">
                <p className="font-body font-semibold text-ink text-sm mb-2">{p.title}</p>
                <p className="font-body text-sm text-ink-muted leading-relaxed">{p.line}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <a
            href="/apply"
            data-track="cta-testers"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-2xl font-body font-semibold text-sm bg-pen border border-pen/50 text-white hover:bg-pen/90 transition-all active:scale-[0.97]"
          >
            Apply to be a beta tester
            <svg className="ml-2 w-4 h-4" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
