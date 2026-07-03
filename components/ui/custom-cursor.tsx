"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorState = "default" | "hover" | "text" | "hidden";

export function CustomCursor() {
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  // Dot follows instantly
  const dotX = useSpring(x, { stiffness: 800, damping: 45 });
  const dotY = useSpring(y, { stiffness: 800, damping: 45 });

  // Ring follows with lag
  const ringX = useSpring(x, { stiffness: 130, damping: 20 });
  const ringY = useSpring(y, { stiffness: 130, damping: 20 });

  const updateCursor = useCallback((e: MouseEvent) => {
    x.set(e.clientX);
    y.set(e.clientY);

    const el = document.elementFromPoint(e.clientX, e.clientY);
    if (!el) return;
    const isClickable =
      el.closest("a, button, input, textarea, select, [role='button'], label") !== null;
    const isText =
      !isClickable &&
      ["P", "H1", "H2", "H3", "H4", "SPAN", "LI"].includes(el.tagName);

    if (isClickable) setState("hover");
    else if (isText) setState("text");
    else setState("default");
  }, [x, y]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => { updateCursor(e); setVisible(true); };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown = () => setClicked(true);
    const onUp = () => setClicked(false);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [updateCursor]);

  /* Only on non-touch (desktop) */
  const [isTouch, setIsTouch] = useState(true);
  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);
  if (isTouch) return null;

  const ringSize =
    state === "hover" ? 64 : state === "text" ? 3 : 36;
  const ringH =
    state === "text" ? 28 : state === "hover" ? 64 : 36;
  const ringColor =
    state === "hover" ? "rgba(230,48,39,0.6)" : "rgba(255,255,255,0.25)";
  const ringRadius = state === "text" ? "2px" : "50%";

  const dotSize = state === "hover" ? 10 : state === "text" ? 0 : 6;
  const dotColor = state === "hover" ? "#E63027" : "#ffffff";

  return (
    <>
      {/* Outer ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          border: "1px solid",
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference" as const,
        }}
        animate={{
          width: ringSize,
          height: ringH,
          borderRadius: ringRadius,
          borderColor: ringColor,
          scale: clicked ? 0.85 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 24 }}
      />

      {/* Glow behind ring (hover only) */}
      {state === "hover" && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9998]"
          style={{
            x: ringX,
            y: ringY,
            translateX: "-50%",
            translateY: "-50%",
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(230,48,39,0.2) 0%, transparent 70%)",
            filter: "blur(8px)",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      {/* Inner dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          borderRadius: "50%",
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9999,
        }}
        animate={{
          width: dotSize,
          height: dotSize,
          backgroundColor: dotColor,
          scale: clicked ? 0.6 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 700, damping: 35 }}
      />
    </>
  );
}
