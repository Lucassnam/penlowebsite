"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { animate } from "framer-motion";

interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  decimals?: number;
}

export function Counter({
  from = 0,
  to,
  duration = 2,
  suffix = "",
  prefix = "",
  className = "",
  decimals = 0,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inViewRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(inViewRef, { once: true, margin: "-60px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!inView || hasAnimated) return;
    setHasAnimated(true);
    const el = ref.current;
    if (!el) return;

    const controls = animate(from, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(value) {
        el.textContent = prefix + value.toFixed(decimals) + suffix;
      },
    });

    return () => controls.stop();
  }, [inView, from, to, duration, suffix, prefix, decimals, hasAnimated]);

  return (
    <span ref={inViewRef} className={className}>
      <span ref={ref}>{prefix}{from.toFixed(decimals)}{suffix}</span>
    </span>
  );
}
