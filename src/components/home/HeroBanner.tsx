"use client";

import { motion } from "framer-motion";
import SearchBar from "../ui/SearchBar";
import CategoryPill from "../ui/CategoryPill";
import FuelPriceWidget from "./FuelPriceWidget";
import { mockCategories } from "@/lib/mock-data";

interface HeroBannerProps {
  activeCategory?: string;
}

export default function HeroBanner({ activeCategory }: HeroBannerProps) {
  return (
    <div className="space-y-5">
      {/* FuelPriceWidget as hero */}
      <FuelPriceWidget />

      {/* Search bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <SearchBar placeholder="Maghanap ng presyo, brand, o tips..." />
      </motion.div>

      {/* Category pills */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
      >
        <CategoryPill
          name="Lahat"
          slug="all"
          active={!activeCategory}
        />
        {mockCategories.map((cat) => (
          <CategoryPill
            key={cat.slug}
            name={cat.name}
            slug={cat.slug}
            active={activeCategory === cat.slug}
          />
        ))}
      </motion.div>
    </div>
  );
}
