"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from "@heroicons/react/20/solid";
import { mockFuelPrices } from "@/lib/mock-data";
import type { FuelPrice } from "@/lib/types";

const weeklyChanges: Record<string, number> = {
  Petron: 2.50, Shell: 2.50, Caltex: 2.10, Phoenix: -0.50, Seaoil: -0.30,
  PTT: 1.80, Unioil: 1.00, Cleanfuel: -0.65, Jetti: 0.90, Total: 1.20,
};

interface FuelPriceSidebarProps {
  prices?: FuelPrice[];
}

export default function FuelPriceSidebar({ prices }: FuelPriceSidebarProps) {
  const allPrices = prices && prices.length > 0 ? prices : mockFuelPrices;
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
    >
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3">
        <h3 className="font-heading font-bold text-sm text-white flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          Fuel Prices Ngayon
        </h3>
      </div>
      <div className="divide-y divide-gray-100">
        {allPrices.slice(0, 6).map((p) => {
          const change = weeklyChanges[p.brand] ?? 0;
          const isUp = change > 0;
          return (
            <Link
              key={p.brandSlug}
              href={`/gasolina/${p.brandSlug}`}
              className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-semibold text-gray-800">{p.brand}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-900">P{p.unleaded.toFixed(2)}</span>
                {change !== 0 && (
                  <span className={`flex items-center gap-0.5 text-xs font-bold ${isUp ? "text-red-500" : "text-green-600"}`}>
                    {isUp ? (
                      <ArrowTrendingUpIcon className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowTrendingDownIcon className="w-3.5 h-3.5" />
                    )}
                    P{Math.abs(change).toFixed(2)}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
      <Link
        href="/gasolina"
        className="flex items-center justify-center gap-1 px-4 py-2.5 text-xs font-bold text-orange-500 hover:bg-orange-50 transition-colors border-t border-gray-100"
      >
        Lahat ng Presyo
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </Link>
    </motion.div>
  );
}
