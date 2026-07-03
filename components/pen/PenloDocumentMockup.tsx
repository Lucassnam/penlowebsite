"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { PenloToolbar } from "./PenloToolbar";
import { cn } from "@/lib/utils";

// Accurate mockup of the Penlo document annotation screen:
// nav bar → PDF page with red ink → floating pen toolbar

interface PenloDocumentMockupProps {
  className?: string;
  /** If true, cycles through showing pen sizes then eraser modes. */
  animate?: boolean;
}

const SAMPLE_LINES = [
  { text: "The annual review showed that the the", redMark: "double-the" },
  { text: "performance metrics had improved" },
  { text: "significantly over the past quarter" },
  { text: "hit by all departments and the results" },
  { text: "" },
  { text: "The team worked diligently to ensure" },
  { text: "every milestone was achieved on schedule." },
];

export function PenloDocumentMockup({ className, animate = false }: PenloDocumentMockupProps) {
  const [mode, setMode] = useState<"pen" | "eraser">("pen");
  const [activeSize, setActiveSize] = useState<"fine" | "medium" | "thick">("medium");
  const [activeEraserMode, setActiveEraserMode] = useState<"precision" | "stroke" | "standard">("standard");

  // Cycle through pen sizes then eraser modes to demo the toolbar
  useEffect(() => {
    if (!animate) return;
    const steps: (() => void)[] = [
      () => { setMode("pen"); setActiveSize("fine"); },
      () => { setMode("pen"); setActiveSize("medium"); },
      () => { setMode("pen"); setActiveSize("thick"); },
      () => { setMode("pen"); setActiveSize("medium"); },
      () => { setMode("eraser"); setActiveEraserMode("precision"); },
      () => { setMode("eraser"); setActiveEraserMode("stroke"); },
      () => { setMode("eraser"); setActiveEraserMode("standard"); },
      () => { setMode("pen"); setActiveSize("medium"); },
    ];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % steps.length;
      steps[i]();
    }, 1400);
    return () => clearInterval(interval);
  }, [animate]);

  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-2xl",
        "border border-black/10 shadow-2xl bg-[#F2F2F7]",
        className
      )}
    >
      {/* Nav bar */}
      <div
        className="flex items-center justify-between px-4 py-2.5 flex-shrink-0"
        style={{ background: "#0A1628" }}
      >
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M19 12H5M12 5l-7 7 7 7" stroke="white" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" opacity={0.6}/>
          </svg>
        </div>
        <span className="font-body text-white text-[11px] font-medium truncate max-w-[120px]">
          chapter-draft.pdf
        </span>
        <div className="flex items-center gap-2.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"
              stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={0.6}/>
          </svg>
        </div>
      </div>

      {/* PDF page */}
      <div className="flex-1 overflow-hidden bg-white relative" style={{ minHeight: 160 }}>
        {/* Ruled lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(to bottom, transparent 0px, transparent 19px, rgba(0,0,0,0.04) 20px)",
            backgroundPositionY: "30px",
          }}
        />

        {/* Watermark (simulates Nutrient eval) */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{ opacity: 0.05, fontSize: 40, color: "#888", transform: "rotate(-30deg)", fontWeight: 700 }}
        >
          PENLO
        </div>

        {/* Text content */}
        <div className="px-5 pt-4 pb-2 space-y-1 relative">
          {SAMPLE_LINES.map((line, i) => (
            <div key={i} className="relative leading-5">
              {line.text ? (
                <div className="relative inline">
                  <span
                    className="font-body text-[9px] text-gray-800"
                    style={{ lineHeight: "20px" }}
                  >
                    {line.redMark === "double-the"
                      ? renderDoubleThe(line.text)
                      : line.text}
                  </span>
                </div>
              ) : (
                <div style={{ height: 20 }} />
              )}
            </div>
          ))}

          {/* Caret insert above line 4 */}
          <div className="absolute pointer-events-none" style={{ top: 54, left: 112 }}>
            <span className="font-body text-[7px] text-[#E63027] font-semibold leading-tight block text-center">
              meet
            </span>
            <svg width="8" height="6" viewBox="0 0 8 6" aria-hidden>
              <path d="M1,5 L4,1 L7,5" stroke="#E63027" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Period dot */}
          <div className="absolute pointer-events-none" style={{ top: 76, left: 170 }}>
            <svg width="6" height="6" viewBox="0 0 6 6" aria-hidden>
              <circle cx="3" cy="3" r="2.5" fill="#E63027"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Floating toolbar */}
      <div className="flex justify-center py-2.5 bg-[#F2F2F7]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${mode}-${activeSize}-${activeEraserMode}`}
            initial={{ opacity: 0.7, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.18 }}
          >
            <PenloToolbar
              mode={mode}
              activeSize={activeSize}
              activeEraserMode={activeEraserMode}
              compact
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function renderDoubleThe(text: string) {
  // Render "the the" with the second "the" struck through
  const parts = text.split("the the");
  if (parts.length < 2) return <>{text}</>;
  return (
    <>
      {parts[0]}
      {"the "}
      <span className="relative inline-block">
        <span className="font-body text-[9px] text-gray-800">the</span>
        <svg
          className="absolute"
          style={{ top: "50%", left: -1, transform: "translateY(-50%)" }}
          width="22"
          height="6"
          viewBox="0 0 22 6"
          aria-hidden
        >
          <path
            d="M1,3 C5,2 12,4 18,2.5 C20,2 21,3 21,3"
            stroke="#E63027"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            opacity="0.95"
          />
        </svg>
      </span>
      {parts[1]}
    </>
  );
}
