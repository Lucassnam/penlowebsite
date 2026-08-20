"use client";

import { useState } from "react";
import { useMotionValueEvent, type MotionValue } from "framer-motion";

/**
 * What plays inside the hero iPad — a three-beat proof of concept driven by
 * the same scroll progress that flattens the device: mark it up → Caret reads
 * the marks → the .docx is rewritten.
 *
 * Everything here is derived from a single rounded state value rather than a
 * chain of motion values. Three elements re-rendering costs nothing, and the
 * sequencing stays trivially inspectable.
 */

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
const ramp = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));

export function IpadSlides({ progress }: { progress: MotionValue<number> }) {
  const [p, setP] = useState(0);
  useMotionValueEvent(progress, "change", (v) => setP(Math.round(v * 200) / 200));

  // The strike is there from the first frame — without it "The the" just reads
  // as a typo. The annotations draw on as you scroll into the device.
  const strike = 0.45 + 0.55 * ramp(p, 0.02, 0.3);
  const ink = ramp(p, 0.06, 0.36);        // caret + margin note drawing on
  const draft = 1 - ramp(p, 0.76, 0.84);  // marked-up draft fading out
  const hud = ramp(p, 0.5, 0.57) * (1 - ramp(p, 0.74, 0.8)); // reading panel
  const scan = ramp(p, 0.5, 0.78);        // sweep position
  const done = ramp(p, 0.78, 0.86);       // rewritten document

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#FBFAF7]">
      {/* document chrome */}
      <div className="flex items-center gap-2 border-b border-black/[0.06] bg-white/70 px-4 py-2.5">
        <span className="h-1.5 w-1.5 rounded-full bg-pen" />
        <span className="font-mono text-[9px] text-ink-muted sm:text-[10px]">
          article-draft.docx
        </span>
      </div>

      <div className="relative h-[calc(100%-38px)]">
        {/* ── the marked-up draft ─────────────────────────── */}
        <div
          className="absolute inset-x-5 top-5 sm:inset-x-9 sm:top-8 md:inset-x-14 md:top-10"
          style={{ opacity: draft, transition: "opacity 90ms linear" }}
        >
          <Chip tone="pen" label="Your marks" />
          <p className="mt-4 font-body text-[11px] leading-[2.4] text-ink sm:text-[13px] md:text-[15px] md:leading-[2.6]">
            The{" "}
            <span className="relative inline-block">
              the
              <svg
                className="pointer-events-none absolute left-[-4px] top-1/2 h-2 w-[calc(100%+8px)] -translate-y-1/2"
                viewBox="0 0 40 8"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M1,5 C10,3 22,6 39,4"
                  stroke="#E63027"
                  strokeWidth="2.2"
                  fill="none"
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={1 - strike}
                />
              </svg>
            </span>{" "}
            report reveals surprising data about reading habits. Researchers
            found that readers retain more
            <span className="relative inline-block w-4 align-baseline">
              <svg
                className="pointer-events-none absolute bottom-[-3px] left-1/2 h-3 w-3 -translate-x-1/2"
                viewBox="0 0 32 32"
                aria-hidden
              >
                <path
                  d="M4,28 L16,10 L28,28"
                  stroke="#E63027"
                  strokeWidth="3.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={1 - ink}
                />
              </svg>
              <span
                className="absolute bottom-[1.15em] left-1/2 whitespace-nowrap font-script text-[13px] leading-none text-pen sm:text-[16px] md:text-[19px]"
                style={{
                  transform: "translateX(-50%) rotate(-3deg)",
                  opacity: ink,
                  transition: "opacity 90ms linear",
                }}
              >
                information
              </span>
            </span>{" "}
            from physical media
            <span
              className="ml-0.5 inline-block h-1.5 w-1.5 rounded-full bg-pen align-baseline"
              style={{ opacity: ink, transition: "opacity 90ms linear" }}
            />
          </p>
        </div>

        {/* ── scan sweep ──────────────────────────────────── */}
        <div
          className="pointer-events-none absolute inset-x-0"
          style={{
            top: `calc(${scan * 112}% - 56px)`,
            height: 112,
            opacity: hud,
            background:
              "linear-gradient(to bottom, rgba(230,48,39,0) 0%, rgba(230,48,39,0.14) 50%, rgba(230,48,39,0) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 h-[2px]"
          style={{ top: `${scan * 112}%`, opacity: hud, background: "rgba(230,48,39,0.6)" }}
        />

        {/* ── what Caret found ────────────────────────────── */}
        <div
          className="absolute inset-x-5 bottom-4 sm:inset-x-9 sm:bottom-6 md:inset-x-14 md:bottom-8"
          style={{
            opacity: hud,
            transform: `translateY(${(1 - hud) * 10}px)`,
            transition: "opacity 90ms linear, transform 90ms linear",
          }}
        >
          <div className="rounded-xl border border-black/[0.07] bg-white/95 px-3.5 py-3 shadow-[0_6px_20px_rgba(0,0,0,0.07)] backdrop-blur-sm sm:px-4 sm:py-3.5">
            <Chip tone="pen" label="Caret reads the marks" />
            <div className="mt-2.5 space-y-1.5">
              {(
                [
                  ["strike", "delete “the”"],
                  ["caret", "insert “information”"],
                  ["dot", "add a period"],
                ] as const
              ).map(([sym, text], i) => (
                <div
                  key={text}
                  className="flex items-center gap-2.5"
                  style={{
                    opacity: ramp(p, 0.55 + i * 0.035, 0.6 + i * 0.035),
                    transition: "opacity 90ms linear",
                  }}
                >
                  <span className="rounded bg-pen/10 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wide text-pen sm:text-[9px]">
                    {sym}
                  </span>
                  <span className="font-body text-[10px] text-ink-muted sm:text-[12px]">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── rewritten .docx ─────────────────────────────── */}
        <div
          className="absolute inset-x-5 top-5 sm:inset-x-9 sm:top-8 md:inset-x-14 md:top-10"
          style={{ opacity: done, transition: "opacity 90ms linear" }}
        >
          <Chip tone="green" label="Written back into the .docx" />
          <p className="mt-4 font-body text-[11px] leading-[2.4] text-ink sm:text-[13px] md:text-[15px] md:leading-[2.6]">
            The report reveals surprising data about reading habits. Researchers
            found that readers retain more{" "}
            <span className="rounded bg-green-600/10 px-1 text-green-700">information</span>{" "}
            from physical media
            <span className="rounded bg-green-600/10 px-0.5 text-green-700">.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Chip({ label, tone }: { label: string; tone: "pen" | "green" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-body text-[8px] font-semibold uppercase tracking-[0.16em] sm:text-[9px] ${
        tone === "pen" ? "bg-pen/10 text-pen" : "bg-green-600/10 text-green-700"
      }`}
    >
      <span className={`h-1 w-1 rounded-full ${tone === "pen" ? "bg-pen" : "bg-green-600"}`} />
      {label}
    </span>
  );
}
