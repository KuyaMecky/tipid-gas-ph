"use client";

import Link from "next/link";
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from "@heroicons/react/20/solid";
import type { FuelPrice } from "@/lib/types";

interface QuickPriceStripProps {
  prices: FuelPrice[];
}

// Weekly change based on March 24, 2026 Fuel Price Advisory
const weeklyChanges: Record<string, number> = {
  Petron: 10.50,
  Shell: 12.00,
  Caltex: 11.00,
  Phoenix: 9.00,
  Seaoil: 9.50,
  PTT: 10.00,
  Unioil: 9.80,
  Cleanfuel: 9.00,
  Jetti: 10.20,
  Total: 11.50,
};

export default function QuickPriceStrip({ prices }: QuickPriceStripProps) {
  const topBrands = prices.slice(0, 6);

  return (
    <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-2.5">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-2 shrink-0">
            Gas
          </span>
          {topBrands.map((p) => {
            const change = weeklyChanges[p.brand] ?? 0;
            const isUp = change > 0;
            return (
              <Link
                key={p.brandSlug}
                href={`/gasolina/${p.brandSlug}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors shrink-0"
              >
                <span className="text-xs font-semibold text-gray-800">{p.brand}</span>
                <span className="text-xs font-bold text-gray-900">P{p.unleaded.toFixed(2)}</span>
                {change !== 0 && (
                  <span className={`flex items-center text-xs font-bold ${isUp ? "price-up" : "price-down"}`}>
                    {isUp ? (
                      <ArrowTrendingUpIcon className="w-3 h-3" />
                    ) : (
                      <ArrowTrendingDownIcon className="w-3 h-3" />
                    )}
                  </span>
                )}
              </Link>
            );
          })}
          <Link
            href="/gasolina"
            className="text-xs font-semibold text-orange-500 hover:text-orange-600 whitespace-nowrap shrink-0 ml-2"
          >
            Lahat ng Presyo &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
