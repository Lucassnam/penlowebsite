"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { StackedPanels } from "@/components/ui/stacked-panels";
import { DocCard } from "@/components/pen/DocCard";

const docs = [
  {
    filename: "thesis-final.docx",
    lines: [
      "Abstract: This paper examines the",
      "relationship between digital tools and",
      "traditional annotation practices in",
      "academic writing environments.",
    ],
    marks: [
      { type: "strike" as const, top: "8px", left: "12px" },
      { type: "caret-insert" as const, top: "-4px", left: "80px", text: "explores" },
    ],
    rotate: -3,
  },
  {
    filename: "contract-draft.docx",
    lines: [
      "AGREEMENT entered into as of the date",
      "set forth below, by and between the",
      "parties named herein, concerning the",
      "terms and conditions described within.",
    ],
    marks: [
      { type: "circle" as const, top: "26px", left: "8px" },
      { type: "period" as const, top: "62px", left: "148px" },
    ],
    rotate: 1,
  },
  {
    filename: "article-draft.docx",
    lines: [
      "The new study reveals surprising data",
      "about reading habits in the digital age.",
      "Researchers found that readers retain",
      "more information from physical media.",
    ],
    marks: [
      { type: "underline" as const, top: "24px", left: "8px" },
      { type: "strike" as const, top: "42px", left: "8px" },
      { type: "caret-insert" as const, top: "36px", left: "120px", text: "paper" },
    ],
    rotate: -1,
  },
];

const docTypes = [
  { label: "Theses" },
  { label: "Contracts" },
  { label: "Articles" },
  { label: "Scripts" },
  { label: "Reports" },
];

export function DocStack() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-16 md:py-24 bg-paper" ref={ref} id="any-document">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div>
              <p className="text-xs uppercase tracking-widest font-body text-ink-muted font-semibold mb-3">
                You approve everything
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-ink leading-tight">
                You&apos;re fully
                <br />
                <span className="text-ink-muted">in control.</span>
              </h2>
            </div>
            <p className="font-body text-base text-ink-muted leading-relaxed">
              Caret never changes a word without your sign-off. Every mark
              becomes a proposed edit you approve or reject, one by one or all
              at once. The AI does the retyping to make your life easier; the
              red pen stays in your hand. And it works on any{" "}
              <code className="text-ink font-mono text-sm bg-black/5 px-1.5 py-0.5 rounded">.docx</code>:
            </p>

            {/* Doc type chips */}
            <div className="flex flex-wrap gap-2">
              {docTypes.map((type, i) => (
                <motion.div
                  key={type.label}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-black/8 bg-white text-sm font-body text-ink-muted shadow-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
                >
                  {type.label}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex items-center gap-2 text-sm font-body text-ink-muted"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M9 12l2 2 4-4" stroke="#E63027" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" stroke="#E63027" strokeWidth="2"/>
              </svg>
              Works with any{" "}
              <code className="font-mono text-xs text-ink bg-black/5 px-1 rounded">.docx</code>{" "}
              No special template needed
            </motion.div>
          </motion.div>

          {/* Stacked panels */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <StackedPanels
              className="w-72"
              panels={docs.map((doc) => (
                <DocCard
                  key={doc.filename}
                  filename={doc.filename}
                  lines={doc.lines}
                  marks={doc.marks}
                  rotate={doc.rotate}
                />
              ))}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
