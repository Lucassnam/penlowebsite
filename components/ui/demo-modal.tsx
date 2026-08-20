"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  animate,
  AnimatePresence,
  motion,
  useDragControls,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { MarkupCompare } from "@/components/pen/MarkupCompare";

const HASH = "#demo";
const DISMISS_DISTANCE = 130;
const DISMISS_VELOCITY = 550;

/**
 * The before/after demo, as a sheet.
 *
 * Opened by any `href="#demo"` link, so plain anchors in server components
 * work. Dismissed by swiping down from the grab bar — the bar owns the
 * vertical drag so it can't fight the horizontal drag of the compare slider
 * inside.
 *
 * Two nested elements on purpose: the outer one owns the enter/exit transform
 * (variants), the inner one owns the drag offset (a controlled motion value).
 * Putting both on one element makes the controlled value silently win and the
 * exit animation never resolve.
 */
export function DemoModal() {
  const [open, setOpen] = useState(false);
  const dragControls = useDragControls();
  const dragY = useMotionValue(0);
  const overlayOpacity = useTransform(dragY, [0, 320], [1, 0.2]);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    if (window.location.hash === HASH) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  // hash is the entry point
  useEffect(() => {
    const sync = () => {
      if (window.location.hash === HASH) {
        dragY.set(0);
        setOpen(true);
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [dragY]);

  // esc to close, and hold the page still behind the sheet
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > DISMISS_DISTANCE || info.velocity.y > DISMISS_VELOCITY) {
      close();
    } else {
      animate(dragY, 0, { type: "spring", stiffness: 420, damping: 38 });
    }
  };

  return (
    <AnimatePresence onExitComplete={() => dragY.set(0)}>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
          <motion.button
            type="button"
            aria-label="Close demo"
            onClick={close}
            className="absolute inset-0 cursor-default bg-black/75 backdrop-blur-md"
            style={{ opacity: overlayOpacity }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />

          {/* outer: enter / exit only */}
          <motion.div
            className="relative w-full max-w-3xl"
            initial={{ y: "102%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{
              y: "102%",
              opacity: 0,
              transition: { duration: 0.26, ease: [0.4, 0, 1, 1] },
            }}
            transition={{ type: "spring", stiffness: 330, damping: 34, mass: 0.9 }}
          >
            {/* inner: drag offset only */}
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="See how Caret works"
              tabIndex={-1}
              drag="y"
              dragListener={false}
              dragControls={dragControls}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.55 }}
              dragMomentum={false}
              onDragEnd={onDragEnd}
              style={{ y: dragY }}
              className="rounded-t-3xl bg-paper shadow-2xl outline-none sm:rounded-3xl"
            >
              {/* grab bar — owns the vertical swipe */}
              <div
                onPointerDown={(e) => dragControls.start(e)}
                className="flex cursor-grab touch-none flex-col items-center rounded-t-3xl px-5 pb-2 pt-3 active:cursor-grabbing"
              >
                <span className="h-1.5 w-11 rounded-full bg-black/15" />
              </div>

              <div className="flex items-start justify-between gap-4 px-6 pb-4 sm:px-8">
                <div>
                  <p className="font-body text-[11px] font-semibold uppercase tracking-[0.28em] text-pen">
                    How it works
                  </p>
                  <h2 className="mt-2 font-heading text-2xl font-bold tracking-[-0.02em] text-ink sm:text-3xl">
                    Drag to see it work.
                  </h2>
                  <p className="mt-2 max-w-md font-body text-sm leading-relaxed text-ink-muted">
                    Red marks on the left. The finished document on the right.
                    Caret does the part in between.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-black/[0.06] text-ink-muted transition-colors hover:bg-black/10 hover:text-ink"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <div className="px-4 pb-4 sm:px-8 sm:pb-6">
                <MarkupCompare />
              </div>

              <p className="pb-6 text-center font-body text-[11px] text-ink-muted/70 sm:pb-7">
                Swipe down to close
              </p>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
