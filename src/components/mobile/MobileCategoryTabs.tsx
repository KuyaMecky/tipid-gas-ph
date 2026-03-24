"use client";

import { motion } from "framer-motion";

interface MobileCategoryTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TABS = [
  { label: "Trending", value: "trending" },
  { label: "Balita", value: "balita" },
  { label: "Tipid Tips", value: "tipid" },
  { label: "Gasolina", value: "gasolina" },
];

export default function MobileCategoryTabs({
  activeTab,
  onTabChange,
}: MobileCategoryTabsProps) {
  return (
    <div className="sticky top-16 z-40 bg-white border-b border-gray-200">
      <div className="flex overflow-x-auto scrollbar-hide">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => onTabChange(tab.value)}
            className={`flex-shrink-0 px-5 py-3 text-sm font-semibold transition-colors relative ${
              activeTab === tab.value
                ? "text-red-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
            {activeTab === tab.value && (
              <motion.span
                layoutId="mobile-tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-500 to-red-600"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
