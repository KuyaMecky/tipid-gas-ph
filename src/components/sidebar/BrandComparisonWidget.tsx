"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { mockFuelPrices } from "@/lib/mock-data";

export default function BrandComparisonWidget() {
  const sorted = [...mockFuelPrices].sort((a, b) => a.regular - b.regular);
  const cheapest = sorted[0];
  const expensive = sorted[sorted.length - 1];
  const diff = expensive.regular - cheapest.regular;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="bg-white rounded-2xl border border-gray-200 p-4"
    >
      <h3 className="font-heading font-bold text-sm text-gray-900 mb-3 flex items-center gap-2">
        <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
        </svg>
        Brand Comparison
      </h3>

      {/* Cheapest */}
      <div className="bg-green-50 rounded-xl p-3 mb-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-green-600 uppercase tracking-wider">Pinakamura</p>
            <p className="text-sm font-bold text-gray-900">{cheapest.brand}</p>
          </div>
          <p className="text-lg font-extrabold text-green-700">P{cheapest.regular.toFixed(2)}</p>
        </div>
      </div>

      {/* Most Expensive */}
      <div className="bg-red-50 rounded-xl p-3 mb-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider">Pinakamahal</p>
            <p className="text-sm font-bold text-gray-900">{expensive.brand}</p>
          </div>
          <p className="text-lg font-extrabold text-red-600">P{expensive.regular.toFixed(2)}</p>
        </div>
      </div>

      <p className="text-xs text-gray-500 text-center mb-3">
        Agwat: <span className="font-bold text-gray-800">P{diff.toFixed(2)}/L</span> (Regular)
      </p>

      <Link
        href="/gasolina"
        className="flex items-center justify-center gap-1 w-full px-3 py-2 bg-orange-50 text-orange-600 text-xs font-bold rounded-lg hover:bg-orange-100 transition-colors"
      >
        I-compare Lahat
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </Link>
    </motion.div>
  );
}
