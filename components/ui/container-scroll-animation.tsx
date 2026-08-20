"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

/**
 * A sticky "stage": the headline and the device hold in place while you
 * scroll, the device lays flat as you move into it, and the proof-of-concept
 * plays on its screen. The stage owns 200vh of scroll — enough for the three
 * beats, short enough that the line below it stays close.
 */
export function ContainerScroll({
  titleComponent,
  children,
}: {
  titleComponent: React.ReactNode;
  children?: (progress: MotionValue<number>) => React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const rotate = useTransform(scrollYProgress, [0, 0.42], [24, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.42], [0.94, 1.04]);
  const titleY = useTransform(scrollYProgress, [0, 0.42], [0, -40]);
  const titleOpacity = useTransform(scrollYProgress, [0.5, 0.72], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden pt-[7vh]">
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="mx-auto w-full max-w-5xl px-6 text-center"
        >
          {titleComponent}
        </motion.div>

        <Device rotate={rotate} scale={scale}>
          {children?.(scrollYProgress)}
        </Device>
      </div>
    </div>
  );
}

function Device({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children?: React.ReactNode;
}) {
  return (
    <div
      style={{ perspective: "1600px" }}
      className="mt-[4vh] flex w-full justify-center px-4"
    >
      <motion.div
        style={{
          rotateX: rotate,
          scale,
          transformOrigin: "center top",
          aspectRatio: "4 / 3",
          boxShadow:
            "0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a",
        }}
        className="relative h-[42vh] max-w-[92vw] rounded-[22px] border border-white/[0.09] bg-[#141416] p-2 md:h-[54vh] md:rounded-[34px] md:p-3"
      >
        {/* aluminium edge highlight */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[22px] md:rounded-[34px]"
          style={{
            background:
              "linear-gradient(150deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.06) 100%)",
          }}
        />

        <div className="relative h-full w-full overflow-hidden rounded-[15px] bg-[#08080A] md:rounded-[25px]">
          {children}
          <div
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(125deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0) 45%)",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
