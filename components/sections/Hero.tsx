"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { IpadSlides } from "@/components/pen/IpadSlides";

const rise = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

/**
 * The word cycles typeface and warm gradient as you scroll — a print shop
 * flicking through hands. Grain rides on top of every one of them.
 */
const FACES = [
  {
    cls: "font-heading",
    scale: 1,
    gradient:
      "linear-gradient(96deg, #FFB45C 0%, #FF7A2F 26%, #E63027 62%, #FF9245 100%)",
  },
  {
    cls: "font-display",
    scale: 0.98,
    gradient:
      "linear-gradient(96deg, #FF9F4A 0%, #E63027 42%, #FF5A2F 76%, #FFC46C 100%)",
  },
  {
    cls: "font-script",
    scale: 1.14,
    gradient:
      "linear-gradient(96deg, #FFC46C 0%, #FF8A3D 38%, #E63027 100%)",
  },
] as const;

function Handwriting() {
  const { scrollY } = useScroll();
  const [face, setFace] = useState(0);
  const [flick, setFlick] = useState(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = Math.min(FACES.length - 1, Math.floor(y / 260));
    setFace((prev) => {
      if (prev !== next) setFlick((f) => f + 1);
      return next;
    });
  });

  const f = FACES[face];

  return (
    <span className="relative mt-1 block">
      <motion.span
        key={flick}
        className={`grain-text inline-block ${f.cls} text-[3rem] font-bold leading-[0.94] tracking-[-0.045em] sm:text-[4.5rem] md:text-[6.5rem]`}
        style={{ backgroundImage: undefined, scale: f.scale }}
        initial={{ opacity: 0.25, filter: "blur(5px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      >
        <span
          className="grain-text"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='t'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23t)' opacity='0.72'/%3E%3C/svg%3E"), ${f.gradient}`,
          }}
        >
          Handwriting
        </span>
      </motion.span>
    </span>
  );
}

export function Hero() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  return (
    <section id="hero" className="relative bg-black">
      {/* barely-there warmth so the black isn't dead */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(255,122,47,0.10) 0%, rgba(0,0,0,0) 68%)",
        }}
      />

      <div className="relative">
        <ContainerScroll
          titleComponent={
            <motion.h1 initial="initial" animate="animate" transition={{ staggerChildren: 0.12 }}>
              <motion.span
                variants={rise}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="block font-heading text-2xl font-medium tracking-[-0.02em] text-white/55 sm:text-3xl md:text-[2.75rem]"
              >
                Unleash the power of
              </motion.span>
              <motion.span
                variants={rise}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                {ready ? (
                  <Handwriting />
                ) : (
                  <span className="grain-text mt-1 block font-heading text-[3rem] font-bold leading-[0.94] tracking-[-0.045em] sm:text-[4.5rem] md:text-[6.5rem]">
                    Handwriting
                  </span>
                )}
              </motion.span>
            </motion.h1>
          }
        >
          {(progress) => <IpadSlides progress={progress} />}
        </ContainerScroll>

        {/* the other half of the sentence, kept close to the device */}
        <div className="relative flex flex-col items-center px-6 pb-12 pt-[3vh] text-center md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-heading text-2xl font-medium tracking-[-0.02em] text-white/55 sm:text-3xl md:text-[2.75rem]">
              at the efficiency of
            </p>
            <p className="silver-text mt-1 font-heading text-[3rem] font-bold leading-[0.94] tracking-[-0.045em] sm:text-[4.5rem] md:text-[6.5rem]">
              AI.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-9 flex flex-col items-center gap-6"
          >
            <p className="max-w-lg font-body text-base leading-relaxed text-white/45 md:text-lg">
              Mark up any Word document with your Apple Pencil, exactly like
              paper. Caret reads the marks and writes them into the file.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="#waitlist"
                data-track="cta-hero"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-body text-sm font-semibold text-black transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.97]"
              >
                Get early access
                <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="#demo"
                data-track="cta-demo"
                className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-body text-sm font-semibold text-white transition-colors duration-200 hover:border-white/45 hover:bg-white/5"
              >
                <svg className="h-4 w-4 text-white/60 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M9 6L5 12l4 6M15 6l4 6-4 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Drag to see it work
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
