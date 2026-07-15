"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MarkupCompare } from "@/components/pen/MarkupCompare";
import { WordReveal } from "@/components/ui/word-reveal";

export function DragDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-16 md:py-24 bg-paper" ref={ref} id="demo">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs uppercase tracking-widest font-body text-ink-muted font-semibold mb-3">
            Try it
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink">
            <WordReveal text="Drag to see it work." />
          </h2>
          <p className="mt-4 font-body text-base text-ink-muted max-w-md mx-auto leading-relaxed">
            Red marks on the left. The finished document on the right. Caret
            does the part in between.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <MarkupCompare />
        </motion.div>
      </div>
    </section>
  );
}
