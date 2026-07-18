"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface LiquidEffectProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
}

/* Background visuals live in .retro-paper-dark (app/globals.css) */
export const LiquidEffect = forwardRef<HTMLDivElement, LiquidEffectProps>(
  function LiquidEffect({ className, children, id }, forwardedRef) {
    return (
      <div
        ref={forwardedRef}
        id={id}
        className={cn("relative overflow-hidden retro-paper-dark", className)}
      >
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);
