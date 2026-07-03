"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  trigger?: "mount" | "hover" | "inview";
}

export function TextScramble({
  text,
  className = "",
  delay = 0,
  speed = 35,
  trigger = "inview",
}: TextScrambleProps) {
  const [display, setDisplay] = useState(trigger === "mount" ? "" : text);
  const [hovering, setHovering] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const rafRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scramble = () => {
    if (rafRef.current) clearTimeout(rafRef.current);
    let iteration = 0;
    const maxIter = text.length * 3;

    const step = () => {
      setDisplay(
        text
          .split("")
          .map((char, idx) => {
            if (char === " ") return " ";
            if (idx < Math.floor(iteration / 3)) return text[idx];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      iteration++;
      if (iteration < maxIter) {
        rafRef.current = setTimeout(step, speed);
      } else {
        setDisplay(text);
      }
    };

    rafRef.current = setTimeout(step, delay * 1000);
  };

  useEffect(() => {
    if (trigger === "inview" && inView) scramble();
    if (trigger === "mount") scramble();
  }, [inView, trigger]);

  useEffect(() => {
    if (trigger === "hover" && hovering) scramble();
    if (trigger === "hover" && !hovering) setDisplay(text);
  }, [hovering, trigger]);

  useEffect(() => () => { if (rafRef.current) clearTimeout(rafRef.current); }, []);

  return (
    <span
      ref={ref}
      className={className || "font-mono"}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {display}
    </span>
  );
}
