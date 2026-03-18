"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";

export type SheetState = "collapsed" | "half" | "full";

const SNAP_POINTS: Record<SheetState, number> = {
  collapsed: 80,
  half: 360,
  full: typeof window !== "undefined" ? window.innerHeight * 0.85 : 600,
};

interface BottomSheetProps {
  state: SheetState;
  onStateChange: (state: SheetState) => void;
  children: React.ReactNode;
}

export default function BottomSheet({ state, onStateChange, children }: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const height = useMotionValue(SNAP_POINTS[state]);
  const borderRadius = useTransform(height, [SNAP_POINTS.collapsed, SNAP_POINTS.full], [20, 0]);

  useEffect(() => {
    const target =
      state === "full"
        ? window.innerHeight * 0.85
        : SNAP_POINTS[state];
    height.set(target);
  }, [state, height]);

  useEffect(() => {
    if (state === "full") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [state]);

  function handleDragEnd(_: unknown, info: PanInfo) {
    const velocity = info.velocity.y;
    const currentHeight = height.get();

    if (velocity > 400) {
      if (state === "full") onStateChange("half");
      else onStateChange("collapsed");
      return;
    }
    if (velocity < -400) {
      if (state === "collapsed") onStateChange("half");
      else onStateChange("full");
      return;
    }

    const maxH = window.innerHeight * 0.85;
    if (currentHeight > maxH * 0.6) onStateChange("full");
    else if (currentHeight > 200) onStateChange("half");
    else onStateChange("collapsed");
  }

  return (
    <motion.div
      ref={sheetRef}
      className="fixed bottom-0 left-0 right-0 z-40 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.1)]"
      style={{
        height,
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
        maxHeight: "85dvh",
      }}
    >
      {/* Drag handle */}
      <motion.div
        className="cursor-grab active:cursor-grabbing pt-1 pb-2"
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        onDrag={(_, info) => {
          const newHeight = height.get() - info.delta.y;
          const maxH = window.innerHeight * 0.85;
          height.set(Math.max(60, Math.min(maxH, newHeight)));
        }}
      >
        <div className="bottom-sheet-handle" />
      </motion.div>

      {/* Content */}
      <div
        className={`overflow-y-auto px-0 ${
          state === "collapsed" ? "max-h-[40px]" : "h-[calc(100%-32px)]"
        }`}
      >
        {children}
      </div>
    </motion.div>
  );
}
