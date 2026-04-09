"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { mockFuelPrices } from "@/lib/mock-data";
import type { FuelPrice } from "@/lib/types";
import { format } from "date-fns";

interface FuelPriceWidgetProps {
  prices?: FuelPrice[];
}

export default function FuelPriceWidget({ prices }: FuelPriceWidgetProps) {
  const allPrices = prices && prices.length > 0 ? prices : mockFuelPrices;
  const topBrands = allPrices.slice(0, 5);
  const lastUpdated = format(new Date(topBrands[0].lastUpdated), "MMM d, yyyy h:mm a");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 md:p-8 text-white"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight">
            Presyo ng Gas Ngayon
          </h2>
          <p className="text-orange-100 text-sm mt-1">
            Last Updated: {lastUpdated}
          </p>
        </div>
        <Link
          href="/gasolina"
          className="text-sm font-semibold bg-white/15 hover:bg-white/25 px-4 py-2 rounded-lg transition-colors"
        >
          Lahat ng Brand &rarr;
        </Link>
      </div>

      {/* Price table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left py-2 font-semibold text-orange-100">Brand</th>
              <th className="text-right py-2 font-semibold text-orange-100">Regular</th>
              <th className="text-right py-2 font-semibold text-orange-100">Unleaded</th>
              <th className="text-right py-2 font-semibold text-orange-100 hidden sm:table-cell">Premium</th>
              <th className="text-right py-2 font-semibold text-orange-100">Diesel</th>
            </tr>
          </thead>
          <tbody>
            {topBrands.map((fuel, i) => (
              <motion.tr
                key={fuel.brand}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="border-b border-white/10 hover:bg-white/5 transition-colors"
              >
                <td className="py-3 font-semibold">
                  <Link href={`/gasolina/${fuel.brandSlug}`} className="hover:text-orange-500 transition-colors">
                    {fuel.brand}
                  </Link>
                </td>
                <td className="py-3 text-right tabular-nums">&#8369;{fuel.regular.toFixed(2)}</td>
                <td className="py-3 text-right tabular-nums">&#8369;{fuel.unleaded.toFixed(2)}</td>
                <td className="py-3 text-right tabular-nums hidden sm:table-cell">&#8369;{fuel.premium.toFixed(2)}</td>
                <td className="py-3 text-right tabular-nums">&#8369;{fuel.diesel.toFixed(2)}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-orange-100 mt-4">
        * Prices in PHP per liter. Based on Metro Manila rates. Actual prices may vary by location.
      </p>
    </motion.div>
  );
}
