"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { mockTrendingTags } from "@/lib/mock-data";

export default function TrendingSidebar() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white rounded-2xl border border-gray-200 p-4"
    >
      <h3 className="font-heading font-bold text-sm text-gray-900 mb-3 flex items-center gap-2">
        <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
        </svg>
        Trending Ngayon
      </h3>
      <div className="space-y-3">
        {mockTrendingTags.map((tag, i) => (
          <Link
            key={tag.name}
            href={`/search?q=${encodeURIComponent(tag.name)}`}
            className="block group"
          >
            <div className="flex items-start gap-3">
              <span className="text-lg font-bold text-gray-300 leading-none mt-0.5">
                {i + 1}
              </span>
              <div className="min-w-0">
                <p className="font-bold text-sm text-gray-900 group-hover:text-orange-500 transition-colors truncate">
                  {tag.name}
                </p>
                <p className="text-xs text-gray-400">{tag.count}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
