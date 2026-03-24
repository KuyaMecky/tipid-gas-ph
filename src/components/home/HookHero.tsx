"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { HookSlide } from "@/lib/types";

interface HookHeroProps {
  slides: HookSlide[];
}

const urgencyConfig: Record<
  string,
  { badge: string; color: string }
> = {
  critical: { badge: "BREAKING", color: "bg-red-600" },
  high: { badge: "TRENDING", color: "bg-orange-500" },
  normal: { badge: "BAGO", color: "bg-orange-500" },
};

const AUTOPLAY_MS = 6000;
const SWIPE_THRESHOLD = 50;

export default function HookHero({ slides }: HookHeroProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<ReturnType<typeof requestAnimationFrame>>(0);
  const startTimeRef = useRef(Date.now());

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
      setProgress(0);
      startTimeRef.current = Date.now();
    },
    [current]
  );

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, [slides.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, [slides.length]);

  useEffect(() => {
    if (paused) {
      cancelAnimationFrame(progressRef.current);
      return;
    }
    startTimeRef.current = Date.now() - progress * AUTOPLAY_MS;

    function tick() {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(elapsed / AUTOPLAY_MS, 1);
      setProgress(pct);
      if (pct >= 1) {
        next();
        return;
      }
      progressRef.current = requestAnimationFrame(tick);
    }
    progressRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(progressRef.current);
  }, [paused, current, next, progress]);

  const slide = slides[current];
  const config = urgencyConfig[slide.urgency] || urgencyConfig.normal;

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -SWIPE_THRESHOLD) next();
    else if (info.offset.x > SWIPE_THRESHOLD) prev();
  }

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-40%" : "40%", opacity: 0 }),
  };

  const imageVariants = {
    enter: { scale: 1.15, opacity: 0 },
    center: { scale: 1.05, opacity: 1 },
    exit: { scale: 1, opacity: 0 },
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-gray-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      aria-label="Featured fuel updates"
      aria-roledescription="carousel"
    >
      <h1 className="sr-only">Latest Balita PH — Presyo ng Gasolina sa Pilipinas</h1>

      {/* Main slide area */}
      <div className="relative aspect-[16/9] sm:aspect-[2/1] md:aspect-[2.4/1] lg:aspect-[3/1] min-h-[360px] md:min-h-[420px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            {/* Background image with Ken Burns */}
            <motion.div
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 8, ease: "linear" }}
              className="absolute inset-0"
            >
              <Image
                src={slide.image}
                alt=""
                fill
                className="object-cover"
                priority={current === 0}
                sizes="100vw"
              />
            </motion.div>

            {/* Cinematic overlay: bottom-heavy gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/15" />
            {/* Side vignette for depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

            {/* Content — pinned to bottom like news headlines */}
            <div className="absolute inset-0 flex flex-col justify-end px-5 sm:px-8 md:px-12 lg:px-16 pb-6 sm:pb-8 md:pb-10">
              <div className="max-w-3xl">
                {/* Category + Urgency badge row */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="flex items-center gap-2 mb-3"
                >
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded text-[11px] font-bold text-white uppercase tracking-wide ${config.color} ${
                      slide.urgency === "critical" ? "urgency-pulse" : ""
                    }`}
                  >
                    {config.badge}
                  </span>
                  <span className="text-[11px] font-semibold text-white/70 uppercase tracking-wide">
                    {slide.category}
                  </span>
                </motion.div>

                {/* Headline */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                  className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-[1.1] mb-2.5 md:mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
                >
                  {slide.hookText}
                </motion.h2>

                {/* Subtext */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.5, ease: "easeOut" }}
                  className="text-sm sm:text-base md:text-lg text-white/80 mb-5 max-w-xl leading-relaxed"
                >
                  {slide.subText}
                </motion.p>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <Link
                    href={slide.ctaHref}
                    className="group inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-all duration-200 shadow-lg shadow-orange-500/30 text-sm sm:text-base"
                  >
                    {slide.ctaLabel}
                    <svg
                      className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Prev / Next buttons — desktop */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-10 h-10 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-colors"
              aria-label="Previous slide"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-10 h-10 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-colors"
              aria-label="Next slide"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </motion.div>
        </AnimatePresence>

        {/* Progress bars (story-style, top) */}
        <div className="absolute top-0 left-0 right-0 z-30 flex gap-1 px-4 pt-3">
          {slides.map((_, i) => (
            <div key={i} className="flex-1 h-[3px] rounded-full bg-white/25 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-100"
                style={{
                  width:
                    i < current
                      ? "100%"
                      : i === current
                      ? `${progress * 100}%`
                      : "0%",
                  background: i <= current ? "rgba(255,255,255,0.9)" : "transparent",
                }}
              />
            </div>
          ))}
        </div>

        {/* Slide counter + dots — bottom right */}
        <div className="absolute bottom-5 sm:bottom-7 md:bottom-9 right-5 sm:right-8 md:right-12 z-20 flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="p-0.5"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 h-2 bg-orange-500"
                      : "w-2 h-2 bg-white/50 hover:bg-white/80"
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="text-xs font-bold text-white/50 tabular-nums">
            {current + 1}/{slides.length}
          </span>
        </div>
      </div>
    </section>
  );
}
