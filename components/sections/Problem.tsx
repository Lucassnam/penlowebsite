"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PenMark } from "@/components/pen/PenMark";

const oldWayPains = [
  "Print the document",
  "Mark it up with a red pen",
  "Sit back down at the keyboard",
  "Manually retype every change into Word",
  "Hope you didn't miss any",
];

export function Problem() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 md:py-28 bg-paper paper-texture" ref={ref}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-14 items-start">
          {/* Paper side */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div>
              <p className="text-xs uppercase tracking-widest font-body text-ink-muted font-semibold mb-4">
                Why paper?
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-ink leading-tight">
                Paper is still{" "}
                <span className="relative inline-block">
                  the best editor.
                  <PenMark
                    variant="underline"
                    className="bottom-[-4px] left-0 w-full"
                    delay={0.4}
                  />
                </span>
              </h2>
              <p className="mt-4 font-body text-base text-ink-muted leading-relaxed">
                Editors, lawyers, teachers: the people who edit for a living
                still print documents and mark them up by hand. Not out of
                habit. You genuinely catch more errors on paper, it&apos;s
                tactile, studies show handwriting improves memory and cognition,
                and every word stays <em>your</em> call. Real editing, not
                prompting an AI to rewrite for you.
              </p>
              <p className="mt-3 font-body text-base text-ink-muted leading-relaxed">
                But for people who edit by hand, there has never been a good way
                to get those marks back into the digital file:
              </p>
            </div>

            {/* Pain list */}
            <div className="space-y-2.5">
              {oldWayPains.map((pain, i) => (
                <motion.div
                  key={pain}
                  className="flex items-center gap-3 text-sm font-body text-ink-muted"
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                >
                  <span className="font-mono text-[11px] font-semibold text-pen w-6 flex-shrink-0 select-none">
                    0{i + 1}
                  </span>
                  <span className={i === 3 ? "text-ink font-medium" : ""}>{pain}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Caret side */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          >
            <div>
              <p className="text-xs uppercase tracking-widest font-body text-pen font-semibold mb-4">
                Caret
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-ink leading-tight">
                Same marks. On your iPad.
              </h2>
              <p className="mt-4 font-body text-base text-ink-muted leading-relaxed">
                Strike a word, caret in a new one, dot in a period. The exact
                marks you&apos;d make with a red pen. Caret reads them and writes
                the edits straight back into your{" "}
                <code className="text-ink font-mono text-sm bg-black/5 px-1.5 py-0.5 rounded">.docx</code>,
                formatting intact.
              </p>
              <p className="mt-3 font-body text-base text-ink-muted leading-relaxed">
                No printing. No sitting back down to retype. Mark it up, cap
                your pen, the document&apos;s done.
              </p>
            </div>

            {/* Zero retyping card */}
            <div className="rounded-2xl overflow-hidden border border-black/8 bg-white shadow-sm">
              <div className="px-5 py-4 flex items-center gap-4 border-b border-black/5">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden className="flex-shrink-0">
                  <path d="M9 12l2 2 4-4" stroke="#E63027" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" stroke="#E63027" strokeWidth="2"/>
                </svg>
                <div>
                  <p className="font-body font-semibold text-ink text-sm">Zero re-typing. Ever.</p>
                  <p className="font-body text-xs text-ink-muted mt-0.5">Marks applied automatically in seconds</p>
                </div>
              </div>
              <div className="px-5 py-4 flex items-center justify-center gap-3">
                {["Mark", "Scan", "Done"].map((label, i) => (
                  <div key={label} className="flex items-center gap-3">
                    {i > 0 && (
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="#E63027" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
                      </svg>
                    )}
                    <span className="text-[11px] font-body font-semibold text-ink-muted uppercase tracking-widest">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
