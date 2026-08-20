"use client";

import { useEffect, useState } from "react";
import { NAV_GLASS, blurPx } from "@/lib/glass";
import { setNavBlur, useNavBlur } from "@/lib/glass-store";

/**
 * Frostedness slider, parked just under the nav bar it controls.
 *
 * Shows automatically in development, and on any build via `?glass` — so it
 * never reaches a normal visitor but is one query string away when you want to
 * dial the bar in on the real page instead of in /glass-lab.
 */
export function GlassTuner() {
  const [visible, setVisible] = useState(false);
  const blur = useNavBlur();

  useEffect(() => {
    const forced = new URLSearchParams(window.location.search).has("glass");
    setVisible(forced || process.env.NODE_ENV === "development");
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed right-3 top-[72px] z-[60] w-[248px] rounded-2xl border border-white/15 bg-[#0E0E12]/92 px-4 py-3 shadow-2xl backdrop-blur-xl md:right-6 md:top-[84px]"
      style={{ WebkitBackdropFilter: "blur(20px)" }}
    >
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <span className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
          Frostedness
        </span>
        <span className="font-mono text-[11px] text-pen">
          {blurPx({ blurAmount: blur, overLight: false })}px
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={blur}
        onChange={(e) => setNavBlur(Number(e.target.value))}
        aria-label="Nav bar frostedness"
        className="w-full accent-[#E63027]"
      />

      <div className="mt-2 flex items-center justify-between">
        <span className="font-mono text-[10px] text-white/30">
          blurAmount {blur.toFixed(2)}
        </span>
        <button
          onClick={() => setNavBlur(NAV_GLASS.blurAmount)}
          className="rounded-full bg-white/10 px-2.5 py-1 font-body text-[10px] text-white/70 transition-colors hover:bg-white/20"
        >
          Reset
        </button>
      </div>

      <p className="mt-2 font-body text-[10px] leading-snug text-white/30">
        Scroll down so the bar appears. Happy with it? Put{" "}
        <code className="text-white/50">blurAmount: {blur.toFixed(2)}</code> in
        lib/glass.ts.
      </p>
    </div>
  );
}
