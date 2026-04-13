"use client";

import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { BellAlertIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import type { FeedItem } from "@/lib/types";

interface AlertBannerProps {
  item: FeedItem;
}

const FUEL_PRICE_CHANGES = [
  { fuel: "Gasoline", range: "P9.00 - P12.00", direction: "up" as const },
  { fuel: "Diesel", range: "P16.00 - P18.00", direction: "up" as const },
  { fuel: "Kerosene", range: "P15.00 - P19.00", direction: "up" as const },
];

export default function AlertBanner({ item }: AlertBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;
  if (!item.isBreaking || item.urgency !== "critical") return null;

  return (
    <div role="alert" className="relative w-full">
      {/* Top urgency strip */}
      <div className="bg-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-3">
          <BellAlertIcon className="w-4 h-4 text-yellow-300 animate-pulse shrink-0" />
          <span className="text-[11px] font-black uppercase tracking-widest shrink-0">
            Fuel Price Advisory
          </span>
          <span className="text-[11px] font-medium text-white/70 shrink-0">
            Effective March 24, 2026
          </span>
          <div className="flex-1" />
          <button
            onClick={() => setDismissed(true)}
            className="p-1 rounded-full hover:bg-white/20 transition-colors shrink-0"
            aria-label="Dismiss alert"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Price changes strip */}
      <div className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-2.5">
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
            {FUEL_PRICE_CHANGES.map((fc) => (
              <div key={fc.fuel} className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-bold text-white/80 uppercase">{fc.fuel}</span>
                <span className="flex items-center gap-1 px-2.5 py-1 bg-white/15 backdrop-blur-sm rounded-lg">
                  <ArrowTrendingUpIcon className="w-3.5 h-3.5 text-yellow-300" />
                  <span className="text-sm font-extrabold text-white tabular-nums">{fc.range}</span>
                </span>
                {fc !== FUEL_PRICE_CHANGES[FUEL_PRICE_CHANGES.length - 1] && (
                  <span className="text-white/30 ml-1">|</span>
                )}
              </div>
            ))}
            <Link
              href="/gasolina"
              className="inline-flex items-center px-4 py-1.5 bg-yellow-500 text-gray-900 text-xs font-black rounded-full hover:bg-yellow-400 transition-colors shrink-0 ml-auto shadow-lg shadow-yellow-500/30"
            >
              Tingnan Lahat ng Presyo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
