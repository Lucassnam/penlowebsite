"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PenMark } from "@/components/pen/PenMark";

const oldWayPains = [
  "Print the document",
  "Mark it up with a red pen",
  "Sit back down at the keyboard",
  "Retype every single correction",
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
                Paper
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
                You print it out, mark it up with a red pen. Every awkward phrase
                struck through, every missing word caret-inserted, every period
                dotted in. It feels natural. It{" "}
                <em>is</em> the best way to edit.
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
                  <div className="w-5 h-5 rounded-full bg-pen-soft border border-pen/15 flex items-center justify-center flex-shrink-0">
                    <span className="text-[9px] font-bold text-pen">{i + 1}</span>
                  </div>
                  <span className={i === 3 ? "text-ink font-medium" : ""}>{pain}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Penlo side */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          >
            <div>
              <p className="text-xs uppercase tracking-widest font-body text-pen font-semibold mb-4">
                Penlo
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-ink leading-tight">
                Same marks. On your iPad.
              </h2>
              <p className="mt-4 font-body text-base text-ink-muted leading-relaxed">
                Penlo reads every Apple Pencil mark on your iPad screen: the
                strikes, carets, circles, periods. It applies them directly into
                your <code className="text-ink font-mono text-sm bg-black/5 px-1.5 py-0.5 rounded">.docx</code>.
              </p>
              <p className="mt-3 font-body text-base text-ink-muted leading-relaxed">
                Original formatting stays intact. You never touch the keyboard.
                The document is done the moment you cap your pen.
              </p>
            </div>

            {/* Zero retyping card */}
            <div className="rounded-2xl overflow-hidden border border-black/8 bg-white shadow-sm">
              <div className="px-5 py-4 flex items-center gap-4 border-b border-black/5">
                <div className="w-10 h-10 rounded-xl bg-pen-soft border border-pen/15 flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M5 13l4 4L19 7" stroke="#E63027" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="font-body font-semibold text-ink text-sm">Zero re-typing. Ever.</p>
                  <p className="font-body text-xs text-ink-muted mt-0.5">Marks applied automatically in seconds</p>
                </div>
              </div>
              <div className="px-5 py-4 grid grid-cols-3 gap-4">
                {[
                  { label: "Mark", dot: "#E63027" },
                  { label: "Scan", dot: "#8B5CF6" },
                  { label: "Done", dot: "#10B981" },
                ].map((step, i) => (
                  <div key={step.label} className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${step.dot}18`, border: `1px solid ${step.dot}30` }}>
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: step.dot }} />
                    </div>
                    <span className="text-[10px] font-body font-semibold text-ink-muted uppercase tracking-wide">{step.label}</span>
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
