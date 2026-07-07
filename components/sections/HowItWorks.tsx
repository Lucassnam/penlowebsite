"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { IpadMock } from "@/components/pen/IpadMock";
import { WordReveal } from "@/components/ui/word-reveal";

const steps = [
  {
    number: "01",
    title: "Mark it up",
    description:
      "Open any Word document in Caret on your iPad. Pick up your Apple Pencil and mark it up exactly as you would on paper: red strikes, caret insertions, circled words, period dots.",
    visual: (
      <IpadMock className="w-[240px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/app-annotation.png"
          alt="Caret document with red Apple Pencil marks"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
        />
      </IpadMock>
    ),
    color: "#E63027",
    imageRight: false,
  },
  {
    number: "02",
    title: "Caret reads your marks",
    description:
      "The moment you lift your Pencil, Caret's AI scans the red ink. It recognizes strikes as deletions, carets as insertions, circles as emphasis markers, and dots as punctuation. Just like a professional copy editor.",
    visual: (
      <div className="rounded-2xl overflow-hidden border border-black/8 bg-white shadow-lg" style={{ width: 240, height: 320 }}>
        <div className="px-4 py-3 border-b border-black/5 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-pen" style={{ boxShadow: "0 0 6px rgba(230,48,39,0.5)" }} />
          <span className="text-[10px] font-body font-semibold text-ink-muted uppercase tracking-wider">Recognizing marks</span>
        </div>
        <div className="p-4 space-y-3">
          {[
            { mark: "——", label: "Delete word" },
            { mark: "∧", label: "Insert text" },
            { mark: "○", label: "Flag emphasis" },
            { mark: "•", label: "Add period" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center flex-shrink-0">
                <span className="font-body text-pen font-bold text-base">{item.mark}</span>
              </div>
              <div>
                <span className="font-body text-xs text-ink font-medium">{item.label}</span>
                <div className="flex items-center gap-1 mt-0.5">
                  <div className="h-1 w-16 bg-ink/8 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-pen rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "85%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                  <span className="text-[9px] font-body text-ink-muted">detected</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    color: "#E63027",
    imageRight: true,
  },
  {
    number: "03",
    title: "Review the changes",
    description:
      "Caret shows you a clean summary of every edit it detected: what will be deleted, what will be inserted. Approve all at once or tweak individual changes before applying.",
    visual: (
      // Real app screenshot: zoomed into the right Accept/Reject cards panel, nav bar cropped
      <div
        className="rounded-2xl overflow-hidden shadow-xl border border-black/10"
        style={{ width: 240, height: 320, position: "relative" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/app-review.png"
          alt="Caret review screen showing Accept and Reject cards"
          style={{
            position: "absolute",
            width: 600,
            right: 0,
            top: -52,
            display: "block",
          }}
        />
      </div>
    ),
    color: "#E63027",
    imageRight: false,
  },
  {
    number: "04",
    title: "Export your clean .docx",
    description:
      "Caret writes every change back into the original Word file. Formatting, styles, track changes: all intact. Share it, email it, open it in Word. It's just a normal .docx, done.",
    visual: (
      <div
        className="rounded-2xl border border-white/10 flex flex-col items-center justify-center gap-4 p-6"
        style={{ background: "#111115", width: 240, height: 320 }}
      >
        <div className="w-14 h-14 rounded-2xl bg-white/8 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="#E63027" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="rgba(230,48,39,0.08)"/>
            <path d="M14 2v6h6" stroke="#E63027" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M8 12h8M8 16h6" stroke="#E63027" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="text-center">
          <p className="text-white text-xs font-body font-semibold">chapter-draft.docx</p>
          <p className="text-white/40 text-[10px] font-body mt-1">All 3 edits applied</p>
        </div>
        {["Formatting intact", "Original preserved", "Ready to share"].map((text, i) => (
          <div key={i} className="flex items-center gap-2 text-[10px] font-body text-white/60">
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M2.5 6l2.5 2.5 4.5-4.5" stroke="#FF6B5B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {text}
          </div>
        ))}
      </div>
    ),
    color: "#E63027",
    imageRight: true,
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-paper paper-texture" id="how-it-works">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest font-body text-ink-muted font-semibold mb-3">
            How it works
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink">
            <WordReveal text="Four steps." />
            {" "}
            <span className="text-ink-muted">
              <WordReveal text="Zero typing." delay={0.2} />
            </span>
          </h2>
          <p className="mt-4 font-body text-base text-ink-muted max-w-lg mx-auto leading-relaxed">
            From handwritten marks to a clean Word document, in seconds.
          </p>
        </div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-8 bottom-8 w-px hidden md:block"
            style={{
              background: "linear-gradient(to bottom, rgba(230,48,39,0.3), rgba(230,48,39,0.05))",
            }}
          />

          <div className="space-y-16">
            {steps.map((step, i) => (
              <Step key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({
  step,
  index,
}: {
  step: (typeof steps)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const textMotion = {
    initial: { opacity: 0, x: step.imageRight ? -28 : 28 },
    animate: inView ? { opacity: 1, x: 0 } : {},
    transition: { duration: 0.7, ease: "easeOut" as const },
  };

  const imgMotion = {
    initial: { opacity: 0, x: step.imageRight ? 28 : -28, scale: 0.95 },
    animate: inView ? { opacity: 1, x: 0, scale: 1 } : {},
    transition: { duration: 0.7, delay: 0.1, ease: "easeOut" as const },
  };

  return (
    <div
      ref={ref}
      className={`grid md:grid-cols-2 gap-12 items-center relative ${
        step.imageRight ? "" : "md:[&>*:first-child]:order-last"
      }`}
    >
      {/* Step dot on timeline */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full hidden md:block ring-4 ring-paper"
        style={{ background: step.color }}
      />

      <motion.div className="flex justify-center" {...imgMotion}>
        {step.visual}
      </motion.div>

      <motion.div className="space-y-4" {...textMotion}>
        <span
          className="font-display text-7xl font-bold leading-none select-none"
          style={{ color: `${step.color}18` }}
        >
          {step.number}
        </span>
        <h3 className="font-display text-3xl font-bold text-ink leading-tight -mt-2">
          {step.title}
        </h3>
        <p className="font-body text-base text-ink-muted leading-relaxed">
          {step.description}
        </p>
      </motion.div>
    </div>
  );
}
