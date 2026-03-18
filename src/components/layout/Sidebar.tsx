"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const quickLinks = [
  { name: "Presyo ng Gasolina", href: "/gasolina" },
  { name: "Balita sa Fuel", href: "/balita" },
  { name: "Tips sa Pagtitipid", href: "/tips" },
  { name: "Petron Prices", href: "/gasolina/petron" },
  { name: "Shell Prices", href: "/gasolina/shell" },
  { name: "Caltex Prices", href: "/gasolina/caltex" },
];

const trendingTags = [
  { name: "#PresyoNgGas", category: "Fuel Prices", count: "15k views" },
  { name: "#TipidTips", category: "Tips", count: "9.2k views" },
  { name: "#FuelUpdate", category: "Balita", count: "7.5k views" },
  { name: "#DieselWatch", category: "Diesel", count: "5.1k views" },
  { name: "#LPGPresyo", category: "LPG", count: "4k views" },
];

export default function Sidebar() {
  return (
    <aside className="space-y-8">
      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl border border-gray-200 p-5"
      >
        <h3 className="font-heading font-bold text-lg text-gray-900 mb-4">Quick Links</h3>
        <div className="space-y-2">
          {quickLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-orange-50 transition-colors group"
            >
              <span className="font-medium text-gray-700 group-hover:text-orange-500 transition-colors text-sm">
                {link.name}
              </span>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Trending Tags */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="bg-white rounded-2xl border border-gray-200 p-5"
      >
        <h3 className="font-heading font-bold text-lg text-gray-900 mb-4">Trending</h3>
        <div className="space-y-4">
          {trendingTags.map((tag, i) => (
            <Link
              key={tag.name}
              href={`/search?q=${encodeURIComponent(tag.name)}`}
              className="block group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-gray-400">
                    Pilipinas Trending &middot; {tag.category}
                  </p>
                  <p className="font-bold text-gray-900 group-hover:text-orange-500 transition-colors">
                    {tag.name}
                  </p>
                  <p className="text-xs text-gray-400">{tag.count}</p>
                </div>
                <span className="text-gray-300 text-lg">&middot;&middot;&middot;</span>
              </div>
              {i < trendingTags.length - 1 && (
                <div className="mt-3 border-b border-gray-100" />
              )}
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Ad Slot Placeholder */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="bg-gray-100 rounded-2xl border border-dashed border-gray-300 p-5 text-center"
      >
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Advertisement</p>
        <div className="h-[250px] flex items-center justify-center text-gray-300 text-sm">
          300 x 250
        </div>
      </motion.div>
    </aside>
  );
}
