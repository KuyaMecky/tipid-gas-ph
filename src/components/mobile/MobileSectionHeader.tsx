"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface MobileSectionHeaderProps {
  title: string;
  dots?: number;
  activeDot?: number;
  seeAllHref?: string;
  accentColor?: string;
}

export default function MobileSectionHeader({
  title,
  dots,
  activeDot = 0,
  seeAllHref,
  accentColor = "bg-yellow-500",
}: MobileSectionHeaderProps) {
  return (
    <motion.div
      className="flex items-center justify-between px-4 mb-3"
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="flex items-center gap-2.5">
        <span className={`w-1 h-5 rounded-full ${accentColor}`} />
        <h2 className="font-heading font-bold text-lg text-gray-900">{title}</h2>
      </div>
      {dots !== undefined && dots > 0 && (
        <div className="flex items-center gap-1.5">
          {Array.from({ length: dots }).map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === activeDot ? "bg-yellow-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
      {seeAllHref && (
        <Link
          href={seeAllHref}
          className="text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
        >
          Tignan Lahat
        </Link>
      )}
    </motion.div>
  );
}
