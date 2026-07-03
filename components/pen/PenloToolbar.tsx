"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Mirrors the real app toolbar: pen sizes, eraser modes, undo, Convert button.

type ToolMode = "pen" | "eraser";
type PenSize = "fine" | "medium" | "thick";
type EraserMode = "precision" | "stroke" | "standard";

const PEN_SIZES: { id: PenSize; diameter: number; label: string }[] = [
  { id: "fine",   diameter: 4,  label: "Fine"   },
  { id: "medium", diameter: 8,  label: "Medium" },
  { id: "thick",  diameter: 14, label: "Thick"  },
];

const ERASER_MODES: { id: EraserMode; label: string; icon: string }[] = [
  { id: "precision", label: "Precision", icon: "⌁" },
  { id: "stroke",    label: "Stroke",    icon: "⌫"  },
  { id: "standard",  label: "Standard",  icon: "◻"  },
];

interface PenloToolbarProps {
  mode?: ToolMode;
  activeSize?: PenSize;
  activeEraserMode?: EraserMode;
  className?: string;
  /** Show the toolbar in a compact/scaled-down form for small mockups. */
  compact?: boolean;
}

export function PenloToolbar({
  mode = "pen",
  activeSize = "medium",
  activeEraserMode = "standard",
  className,
  compact = false,
}: PenloToolbarProps) {
  const scale = compact ? "scale-75 origin-center" : "";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 px-3.5 py-2.5 rounded-full shadow-lg",
        "border border-white/15",
        scale,
        className
      )}
      style={{
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(16px)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.18), 0 1px 4px rgba(0,0,0,0.1)",
      }}
    >
      {/* Size / mode group */}
      {mode === "pen" ? (
        <div className="flex items-center gap-1.5">
          {PEN_SIZES.map((s) => (
            <div
              key={s.id}
              className={cn(
                "flex items-center justify-center rounded-lg transition-colors",
                compact ? "w-7 h-6" : "w-8 h-7"
              )}
              style={{
                background: activeSize === s.id ? "rgba(230,48,39,0.12)" : "transparent",
              }}
              title={s.label}
            >
              <div
                className="rounded-full bg-[#E63027]"
                style={{
                  width: s.diameter,
                  height: s.diameter,
                  opacity: activeSize === s.id ? 1 : 0.4,
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-1">
          {ERASER_MODES.map((em) => (
            <div
              key={em.id}
              className={cn(
                "flex flex-col items-center justify-center rounded-lg transition-colors",
                compact ? "w-10 h-7 gap-0.5" : "w-12 h-8 gap-0.5"
              )}
              style={{
                background: activeEraserMode === em.id ? "rgba(0,0,0,0.08)" : "transparent",
              }}
              title={em.label}
            >
              <span
                className="leading-none"
                style={{
                  fontSize: compact ? 10 : 12,
                  color: activeEraserMode === em.id ? "#111" : "#999",
                }}
              >
                {em.icon}
              </span>
              <span
                className="font-body leading-none"
                style={{
                  fontSize: compact ? 6 : 7,
                  color: activeEraserMode === em.id ? "#333" : "#aaa",
                  fontWeight: 500,
                }}
              >
                {em.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Divider */}
      <div className="w-px self-stretch bg-black/10" />

      {/* Pen / Eraser tool toggle */}
      <div className="flex items-center gap-1">
        <ToolIcon
          active={mode === "pen"}
          compact={compact}
          label="Pen"
          icon={
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"
                stroke={mode === "pen" ? "#E63027" : "#999"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
        <ToolIcon
          active={mode === "eraser"}
          compact={compact}
          label="Eraser"
          icon={
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M20 20H7L3 16 13 6l8 8-1 6z"
                stroke={mode === "eraser" ? "#333" : "#999"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill={mode === "eraser" ? "rgba(0,0,0,0.08)" : "none"}
              />
            </svg>
          }
        />
      </div>

      {/* Divider */}
      <div className="w-px self-stretch bg-black/10" />

      {/* Undo */}
      <div
        className={cn(
          "flex items-center justify-center",
          compact ? "w-6 h-6" : "w-7 h-7"
        )}
      >
        <svg
          width={compact ? 11 : 13}
          height={compact ? 11 : 13}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <path
            d="M3 10h10a5 5 0 010 10H9M3 10l4-4M3 10l4 4"
            stroke="#888"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Divider */}
      <div className="w-px self-stretch bg-black/10" />

      {/* Convert button */}
      <motion.div
        className={cn(
          "flex items-center gap-1.5 rounded-full text-white font-body font-bold",
          compact ? "px-2.5 py-1 text-[9px]" : "px-3.5 py-1.5 text-[11px]"
        )}
        style={{
          background: "linear-gradient(135deg, #E63027 0%, #c42219 100%)",
          boxShadow: "0 2px 8px rgba(230,48,39,0.4)",
        }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
      >
        <svg
          width={compact ? 9 : 11}
          height={compact ? 9 : 11}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <path
            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
            fill="white"
          />
        </svg>
        Convert
      </motion.div>
    </div>
  );
}

function ToolIcon({
  active,
  compact,
  label,
  icon,
}: {
  active: boolean;
  compact: boolean;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-lg",
        compact ? "w-6 h-6" : "w-7 h-7"
      )}
      style={{
        background: active
          ? label === "Pen"
            ? "rgba(230,48,39,0.12)"
            : "rgba(0,0,0,0.07)"
          : "transparent",
      }}
      title={label}
    >
      {icon}
    </div>
  );
}
