"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Counter } from "@/components/ui/counter";
import { AuroraText } from "@/components/ui/aurora-text";

const stats = [
  { value: 4, suffix: " mark types", label: "AI understands instantly", decimals: 0 },
  { value: 2.7, suffix: "s", label: "avg. AI processing", decimals: 1 },
  { value: 0, suffix: "", label: "paper wasted. Ever.", decimals: 0, prefix: "Zero" },
];

const press = [
  "Product Hunt", "The Verge", "Hacker News", "AppAdvice",
  "9to5Mac", "MacStories", "TechCrunch", "Product Hunt",
  "The Verge", "Hacker News", "AppAdvice", "9to5Mac",
  "MacStories", "TechCrunch",
];

export function SocialProof() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="py-16 md:py-20 border-t border-white/5 overflow-hidden"
      style={{ background: "#0A0A10" }}
      id="features"
      ref={ref}
    >
      {/* Stats */}
      <div className="max-w-5xl mx-auto px-6 mb-14">
        <div className="grid grid-cols-3 gap-6 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              {i === 2 ? (
                <p className="font-display text-3xl md:text-5xl font-bold leading-none mb-2">
                  <AuroraText>Zero</AuroraText>
                </p>
              ) : (
                <p className="font-display text-3xl md:text-5xl font-bold text-white leading-none mb-2">
                  <Counter
                    from={0}
                    to={stat.value}
                    duration={1.8}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                </p>
              )}
              <p className="font-body text-sm text-white/35">{stat.label}</p>

            </motion.div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-14" />

      {/* Quote */}
      <motion.div
        className="max-w-5xl mx-auto px-6 mb-14 text-center"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.35 }}
      >
        <p className="font-display text-xl md:text-2xl text-white/40 italic leading-relaxed">
          "Built for people who still think{" "}
          <span className="not-italic font-semibold text-white/80">in pen.</span>"
        </p>
      </motion.div>

      {/* Marquee */}
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #0A0A10, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #0A0A10, transparent)" }} />

        <div className="flex overflow-hidden">
          <div className="marquee-track flex shrink-0 gap-12 items-center">
            {press.map((name, i) => (
              <span
                key={i}
                className="font-body text-xs text-white/18 font-semibold tracking-[0.2em] uppercase whitespace-nowrap select-none"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
