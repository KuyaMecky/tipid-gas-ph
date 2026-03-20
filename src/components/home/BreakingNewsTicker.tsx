"use client";

import { motion } from "framer-motion";

interface BreakingNewsTickerProps {
  headline: string;
  subtext?: string;
}

export default function BreakingNewsTicker({
  headline,
  subtext,
}: BreakingNewsTickerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl px-6 py-5 text-center"
    >
      <h2 className="font-heading text-xl md:text-2xl font-bold italic tracking-tight">{headline}</h2>
      {subtext && (
        <p className="mt-1 text-sm text-orange-100 max-w-xl mx-auto">
          {subtext}
        </p>
      )}
    </motion.div>
  );
}
