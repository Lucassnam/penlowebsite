"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { LiquidEffect } from "@/components/ui/liquid-effect";

const marks = [
  {
    symbol: "——",
    name: "Strikethrough",
    description: "Draw a line through any word or phrase to delete it instantly.",
    before: "The the document",
    strikeWord: "the",
    after: "The document",
    trackedEdit: "Delete: 'the'",
  },
  {
    symbol: "∧",
    name: "Caret insert",
    description: "Place a caret and write above it to insert text at that point.",
    before: "hit deadline",
    insertWord: "meet",
    after: "meet deadline",
    trackedEdit: "Insert: 'meet' before 'deadline'",
  },
  {
    symbol: "○",
    name: "Circle / emphasis",
    description: "Circle a word to flag it for review or emphasis.",
    before: "important clause",
    circled: true,
    after: "[flagged for review]",
    trackedEdit: "Flag: 'important clause'",
  },
  {
    symbol: "•",
    name: "Period dot",
    description: "A firm dot at sentence end adds the missing period.",
    before: "See you then",
    after: "See you then.",
    addedPeriod: true,
    trackedEdit: "Insert: '.' after 'then'",
  },
];

export function AiMarks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <LiquidEffect className="py-20 md:py-28" ref={ref} id="ai-marks">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs uppercase tracking-widest font-body text-white/40 font-semibold mb-4">
            AI recognition
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
            The AI reads{" "}
            <span className="text-pen">your marks.</span>
          </h2>
          <p className="mt-5 font-body text-lg text-white/50 max-w-xl mx-auto leading-relaxed">
            Every symbol a professional copy editor uses, Caret understands
            them all. In real time.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {marks.map((mark, i) => (
            <MarkCard key={mark.name} mark={mark} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </LiquidEffect>
  );
}

function MarkCard({
  mark,
  index,
  inView,
}: {
  mark: (typeof marks)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      className="rounded-2xl p-5 space-y-4 flex flex-col"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.09)",
        backdropFilter: "blur(12px)",
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.08 + index * 0.1 }}
    >
      {/* Mark symbol */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <span className="font-display text-pen font-bold text-xl">{mark.symbol}</span>
      </div>

      <div className="flex-1">
        <h3 className="font-body font-semibold text-white text-sm mb-1">{mark.name}</h3>
        <p className="font-body text-white/45 text-xs leading-relaxed">
          {mark.description}
        </p>
      </div>

      {/* Before → after */}
      <div className="space-y-2">
        <p className="text-[9px] font-body text-white/35 uppercase tracking-wider font-medium">
          Transforms to
        </p>
        <div
          className="rounded-xl px-3 py-2.5 space-y-1.5"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="flex items-center gap-1 flex-wrap">
            <span className="text-[10px] font-body text-white/30 line-through">{mark.before}</span>
          </div>
          <div className="flex items-center gap-0.5">
            <span className="text-[9px] text-white/20 mr-1">→</span>
            <span className="text-[10px] font-body text-white/85 font-medium">{mark.after}</span>
          </div>
        </div>
        <div className="pt-2 border-t border-white/10 flex items-baseline gap-1.5 text-[10px] font-body">
          <span className="text-white/35">Track change</span>
          <span className="text-[#FF6B5B] font-medium">{mark.trackedEdit}</span>
        </div>
      </div>
    </motion.div>
  );
}
