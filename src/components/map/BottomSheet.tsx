"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";

export type SheetState = "collapsed" | "half" | "full";

const COLLAPSED_HEIGHT = 80;
const HALF_HEIGHT = 360;

interface BottomSheetProps {
  state: SheetState;
  onStateChange: (state: SheetState) => void;
  children: React.ReactNode;
}

export default function BottomSheet({ state, onStateChange, children }: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState(600);
  const height = useMotionValue(HALF_HEIGHT);
  const borderRadius = useTransform(height, [COLLAPSED_HEIGHT, maxHeight], [20, 0]);

  // Calculate max available height (viewport minus header minus BottomNav)
  useEffect(() => {
    function updateMax() {
      // On mobile (< 1024px) the BottomNav takes 64px, so we offset bottom-16
      // Available height = viewport - 64px(header) - 64px(bottomnav-offset already handled)
      const isMobile = window.innerWidth < 1024;
      const navOffset = isMobile ? 64 : 0;
      setMaxHeight(window.innerHeight - navOffset - 64);
    }
    updateMax();
    window.addEventListener("resize", updateMax);
    return () => window.removeEventListener("resize", updateMax);
  }, []);

  useEffect(() => {
    let target = HALF_HEIGHT;
    if (state === "collapsed") target = COLLAPSED_HEIGHT;
    else if (state === "full") target = maxHeight;
    height.set(target);
  }, [state, height, maxHeight]);

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

    if (currentHeight > maxHeight * 0.6) onStateChange("full");
    else if (currentHeight > 200) onStateChange("half");
    else onStateChange("collapsed");
  }

  return (
    <motion.div
      ref={sheetRef}
      className="fixed bottom-16 lg:bottom-0 left-0 right-0 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.1)]"
      style={{
        height,
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
        maxHeight,
        zIndex: 1100,
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
          height.set(Math.max(60, Math.min(maxHeight, newHeight)));
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
