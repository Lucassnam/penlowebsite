"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { TiltCard } from "@/components/ui/tilt-card";
import { WordReveal } from "@/components/ui/word-reveal";

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M9 12l2 2 4-4" stroke="#E63027" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" stroke="#E63027" strokeWidth="2"/>
      </svg>
    ),
    title: "Keeps your formatting",
    description:
      "Hand-retyping edits is how styles, numbering, and headers get broken. Caret writes changes into the file the way Word does, so every detail survives untouched.",
    size: "large",
    dark: false,
    tagline: "Fonts, styles, tracked changes, all preserved",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="#E63027" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 2v6h6M8 13h8M8 17h5" stroke="#E63027" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Real .docx output",
    description: "No proprietary format, no lock-in. You get a standard Word file that opens anywhere: Word, Google Docs, Pages.",
    size: "small",
    dark: true,
    tagline: "",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="#E63027" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Fast recognition",
    description: "Caret reads your marks within seconds of lifting the Pencil. No tap, no button.",
    size: "small",
    dark: true,
    tagline: "",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9l-7-7z" stroke="#E63027" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 2v7h7" stroke="#E63027" strokeWidth="2" strokeLinecap="round"/>
        <path d="M9 17l1.5-4.5L12 15l1.5-4.5L15 17" stroke="#E63027" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Works on any .docx",
    description:
      "Contracts, manuscripts, essays, reports, scripts. If Word opens it, Caret marks it. No special template, no reformatting your work to fit the tool.",
    size: "large",
    dark: false,
    tagline: "Theses · Contracts · Articles · Scripts · Reports",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 22V12M12 12L8 16M12 12l4 4" stroke="#E63027" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 16.7A4 4 0 0017 9h-1.26A8 8 0 104 16.3" stroke="#E63027" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Original never touched",
    description: "Every edit lands in a fresh copy. Your source file stays exactly as it was. You can't lose work you didn't approve.",
    size: "large",
    dark: false,
    tagline: "Non-destructive by design",
  },
];

export function FeatureGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-16 md:py-24 bg-paper" ref={ref} id="features">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs uppercase tracking-widest font-body text-ink-muted font-semibold mb-3">
            Features
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink leading-tight">
            <WordReveal text="Built for people" />
            <br />
            <span className="text-ink-muted">
              <WordReveal text="who prefer paper." delay={0.25} />
            </span>
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {features.map((feature, i) => {
            const isLarge = feature.size === "large";
            const spotlightColor = feature.dark
              ? "rgba(255,255,255,0.07)"
              : "rgba(230,48,39,0.05)";

            return (
              <motion.div
                key={feature.title}
                className={isLarge ? "md:col-span-2" : ""}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.04 + i * 0.09, ease: [0.22,1,0.36,1] }}
              >
                <TiltCard maxTilt={5} scale={1.015}>
                  <SpotlightCard
                    className={`rounded-2xl p-6 flex flex-col gap-4 h-full ${
                      feature.dark ? "dark-card" : "premium-card"
                    }`}
                    spotlightColor={spotlightColor}
                  >
                    <motion.div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        feature.dark ? "bg-white/6" : "bg-black/5"
                      }`}
                      whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    >
                      {feature.icon}
                    </motion.div>

                    <div className="flex-1">
                      <h3
                        className={`font-body font-semibold text-base leading-snug mb-2 ${
                          feature.dark ? "text-white" : "text-ink"
                        }`}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className={`font-body text-sm leading-relaxed ${
                          feature.dark ? "text-white/45" : "text-ink-muted"
                        }`}
                      >
                        {feature.description}
                      </p>
                    </div>

                    {isLarge && feature.tagline && (
                      <p
                        className={`mt-2 pt-4 border-t text-xs font-body font-medium tracking-wide ${
                          feature.dark
                            ? "border-white/10 text-white/50"
                            : "border-black/6 text-ink-muted"
                        }`}
                      >
                        {feature.tagline}
                      </p>
                    )}
                  </SpotlightCard>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
