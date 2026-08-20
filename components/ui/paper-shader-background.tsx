"use client";

import { useEffect, useState } from "react";
import { GrainGradient } from "@paper-design/shaders-react";

/**
 * Grainy orange shader field. Mounted client-side only — it draws to WebGL,
 * so there is nothing meaningful to render on the server.
 */
export function PaperShaderBackground({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [still, setStill] = useState(false);
  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {/* fallback tint so the section is never a black hole pre-paint */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 50%, #FF5A24 0%, #C81E14 55%, #0A0A0C 100%)",
        }}
      />
      {mounted && (
        <GrainGradient
          style={{ height: "100%", width: "100%" }}
          colorBack="hsl(0, 0%, 0%)"
          softness={0.76}
          intensity={0.45}
          noise={0}
          shape="corners"
          offsetX={0}
          offsetY={0}
          scale={1}
          rotation={0}
          speed={still ? 0 : 1}
          colors={["hsl(14, 100%, 57%)", "hsl(38, 100%, 52%)", "hsl(2, 84%, 46%)"]}
        />
      )}
      {/* keeps white type legible over the brightest part of the field */}
      <div className="absolute inset-0 bg-black/25" />
    </div>
  );
}
