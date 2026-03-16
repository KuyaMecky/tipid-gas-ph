"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import type { HookSlide, FeedItem } from "@/lib/types";

interface MobileHeroAlertProps {
  slide: HookSlide;
  breakingItem?: FeedItem;
}

export default function MobileHeroAlert({ slide, breakingItem }: MobileHeroAlertProps) {
  const priceChange = breakingItem?.priceChange ?? "+P2.50/L";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="px-4 pt-4"
    >
      {/* TODAY ALERT pill */}
      <div className="mb-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full text-xs font-extrabold text-white uppercase tracking-wide shadow-sm">
          <ExclamationTriangleIcon className="w-3.5 h-3.5" />
          Today Alert
        </span>
      </div>

      {/* Main hero card */}
      <div className="relative overflow-hidden rounded-2xl">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slide.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/85 via-orange-500/80 to-yellow-500/70" />

        <div className="relative px-5 pt-5 pb-5">
          <h1 className="font-heading font-extrabold text-[26px] leading-[1.15] text-white mb-1.5 drop-shadow-sm">
            Gas {priceChange} bukas!
          </h1>

          <p className="font-heading font-bold text-lg text-yellow-200 mb-1">
            Habol na ngayon!
          </p>

          <p className="text-white/90 text-sm mb-5">
            Save up to <span className="font-extrabold">P200</span> kung ngayon ka magpa-full tank
          </p>

          <div className="flex gap-2">
            <Link
              href="/mapa"
              className="flex-1 py-2.5 text-center border-2 border-white text-white font-extrabold text-xs rounded-lg hover:bg-white/10 transition-colors uppercase tracking-wide"
            >
              Check Cheapest Gas
            </Link>
            <Link
              href="#subscribe"
              className="flex-1 py-2.5 text-center border-2 border-white text-white font-extrabold text-xs rounded-lg hover:bg-white/10 transition-colors uppercase tracking-wide"
            >
              Subscribe Alert
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
