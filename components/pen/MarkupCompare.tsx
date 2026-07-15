"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Caveat } from "next/font/google";

const caveat = Caveat({ subsets: ["latin"], weight: "600" });

/**
 * Draggable before/after document. Left of the handle: the document with red
 * handwritten marks. Right of the handle: the same document with the edits
 * applied, shown green like accepted tracked changes.
 */
export function MarkupCompare({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(62);
  const [hasInteracted, setHasInteracted] = useState(false);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPct(Math.min(94, Math.max(6, p)));
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (dragging.current) setFromClientX(e.clientX);
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [setFromClientX]);

  const startDrag = (e: React.PointerEvent) => {
    dragging.current = true;
    setHasInteracted(true);
    setFromClientX(e.clientX);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setPct((p) => Math.max(6, p - 5));
      setHasInteracted(true);
    } else if (e.key === "ArrowRight") {
      setPct((p) => Math.min(94, p + 5));
      setHasInteracted(true);
    }
  };

  return (
    <div
      ref={ref}
      className={`relative select-none overflow-hidden rounded-2xl border border-black/8 bg-white shadow-lg cursor-ew-resize touch-none ${className}`}
      onPointerDown={startDrag}
    >
      {/* Filename bar */}
      <div className="px-5 py-3 border-b border-black/5 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-pen" />
        <span className="font-mono text-[11px] text-ink-muted">article-draft.docx</span>
      </div>

      <div className="relative">
        {/* BEFORE: red handwritten marks */}
        <DocBefore />

        {/* AFTER: applied edits, revealed right of the handle */}
        <div
          className="absolute inset-0 bg-white"
          style={{ clipPath: `inset(0 0 0 ${pct}%)` }}
          aria-hidden
        >
          <DocAfter />
        </div>

        {/* Corner chips */}
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-pen/10 border border-pen/20 text-pen text-[10px] font-body font-semibold uppercase tracking-wider pointer-events-none">
          Your marks
        </span>
        <span
          className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-green-600/10 border border-green-600/20 text-green-700 text-[10px] font-body font-semibold uppercase tracking-wider pointer-events-none"
          style={{ opacity: pct < 88 ? 1 : 0.25, transition: "opacity 0.2s" }}
        >
          Applied edits
        </span>

        {/* Divider + handle */}
        <div
          className="absolute inset-y-0 pointer-events-none"
          style={{ left: `${pct}%` }}
          aria-hidden
        >
          <div className="absolute inset-y-0 -translate-x-1/2 w-[2px] bg-ink/15" />
        </div>
        <button
          type="button"
          role="slider"
          aria-label="Drag to compare marked-up and edited document"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pct)}
          onKeyDown={onKeyDown}
          onPointerDown={startDrag}
          className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-ink text-white shadow-xl flex items-center justify-center cursor-ew-resize focus:outline-none focus-visible:ring-2 focus-visible:ring-pen ${
            hasInteracted ? "" : "handle-nudge"
          }`}
          style={{ left: `${pct}%` }}
        >
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden>
            <path d="M6 1L1 6l5 5M12 1l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

    </div>
  );
}

const DOC_PAD = "px-8 md:px-12 py-8 md:py-10";
const BODY = "font-body text-[15px] md:text-base leading-[2.1] text-ink";

function DocBefore() {
  return (
    <div className={DOC_PAD}>
      <p className={BODY}>
        The{" "}
        <span className="relative inline-block">
          the
          <svg className="absolute left-[-4px] top-1/2 w-[calc(100%+8px)] h-2 -translate-y-1/2 pointer-events-none" viewBox="0 0 40 8" preserveAspectRatio="none" aria-hidden>
            <path d="M1,5 C10,3 22,6 39,4" stroke="#E63027" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          </svg>
        </span>{" "}
        report reveals surprising data about reading habits in the digital age.
        Researchers found that readers retain more
        <span className="relative inline-block w-5 align-baseline">
          <svg className="absolute left-1/2 -translate-x-1/2 bottom-[-3px] w-3.5 h-3.5 pointer-events-none" viewBox="0 0 32 32" aria-hidden>
            <path d="M4,28 L16,10 L28,28" stroke="#E63027" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span
            className={`${caveat.className} absolute left-1/2 bottom-[1.02em] text-pen text-[19px] leading-none whitespace-nowrap`}
            style={{ transform: "translateX(-50%) rotate(-3deg)" }}
          >
            information
          </span>
        </span>{" "}
        from physical media
        <span className="relative inline-block w-3">
          <svg className="absolute left-1 bottom-[2px] w-2 h-2 pointer-events-none" viewBox="0 0 8 8" aria-hidden>
            <circle cx="4" cy="4" r="2.6" fill="#E63027" />
          </svg>
        </span>
      </p>
    </div>
  );
}

function DocAfter() {
  return (
    <div className={DOC_PAD}>
      <p className={BODY}>
        The report reveals surprising data about reading habits in the digital
        age. Researchers found that readers retain more{" "}
        <span className="text-green-700 bg-green-600/10 rounded px-1">information</span>{" "}
        from physical media<span className="text-green-700 bg-green-600/10 rounded px-0.5">.</span>
      </p>
    </div>
  );
}
