"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type PenMarkVariant = "underline" | "caret" | "strike" | "circle";

interface PenMarkProps {
  variant: PenMarkVariant;
  className?: string;
  delay?: number;
  color?: string;
}

const paths: Record<PenMarkVariant, { viewBox: string; d: string; width: number; height: number }> = {
  underline: {
    viewBox: "0 0 200 16",
    d: "M2,10 C20,8 45,6 70,9 C95,12 115,7 140,8 C165,9 182,11 198,9",
    width: 200,
    height: 16,
  },
  strike: {
    viewBox: "0 0 200 12",
    d: "M2,6 C30,4 60,7 90,5 C120,3 150,8 175,6 C185,5 192,7 198,6",
    width: 200,
    height: 12,
  },
  caret: {
    viewBox: "0 0 32 32",
    d: "M4,28 L16,8 L28,28",
    width: 32,
    height: 32,
  },
  circle: {
    viewBox: "0 0 120 60",
    d: "M60,4 C85,2 114,10 116,30 C118,50 90,57 60,56 C30,55 4,48 5,28 C6,8 35,6 60,4 Z",
    width: 120,
    height: 60,
  },
};

export function PenMark({
  variant,
  className = "",
  delay = 0,
  color = "#E63027",
}: PenMarkProps) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const def = paths[variant];

  const isFill = variant === "circle";

  return (
    <svg
      ref={ref}
      viewBox={def.viewBox}
      width={def.width}
      height={def.height}
      className={`absolute pointer-events-none ${className}`}
      aria-hidden
    >
      <motion.path
        d={def.d}
        stroke={color}
        strokeWidth={isFill ? 2.5 : 3}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.7, delay, ease: "easeOut" }}
      />
    </svg>
  );
}
