"use client";

import Link from "next/link";
import { mockFuelPrices } from "@/lib/mock-data";
import type { FuelPrice } from "@/lib/types";

interface FuelPriceTableProps {
  prices?: FuelPrice[];
  caption?: string;
}

export default function FuelPriceTable({
  prices = mockFuelPrices,
  caption = "Presyo ng Gasolina at Diesel sa Pilipinas — Updated March 2026",
}: FuelPriceTableProps) {
  return (
    <div className="overflow-x-auto my-8">
      <table className="w-full border-collapse text-sm">
        <caption className="text-left font-heading font-bold text-lg text-gray-900 mb-4">
          {caption}
        </caption>
        <thead>
          <tr className="bg-orange-500 text-white">
            <th className="text-left px-4 py-3 font-semibold rounded-tl-lg">Brand</th>
            <th className="text-right px-4 py-3 font-semibold">Regular</th>
            <th className="text-right px-4 py-3 font-semibold">Unleaded</th>
            <th className="text-right px-4 py-3 font-semibold">Premium</th>
            <th className="text-right px-4 py-3 font-semibold rounded-tr-lg">Diesel</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((fuel, i) => (
            <tr
              key={fuel.brand}
              className={`border-b border-gray-100 hover:bg-orange-50/50 transition-colors ${
                i % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <td className="px-4 py-3 font-semibold text-gray-900">
                <Link
                  href={`/gasolina/${fuel.brandSlug}`}
                  className="hover:text-orange-500 transition-colors"
                >
                  {fuel.brand}
                </Link>
              </td>
              <td className="px-4 py-3 text-right tabular-nums text-gray-700">&#8369;{fuel.regular.toFixed(2)}</td>
              <td className="px-4 py-3 text-right tabular-nums text-gray-700">&#8369;{fuel.unleaded.toFixed(2)}</td>
              <td className="px-4 py-3 text-right tabular-nums text-gray-700">&#8369;{fuel.premium.toFixed(2)}</td>
              <td className="px-4 py-3 text-right tabular-nums text-gray-700">&#8369;{fuel.diesel.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-gray-400 mt-2">
        * Prices in PHP per liter. Metro Manila rates. Last updated: March 17, 2026.
      </p>
    </div>
  );
}
