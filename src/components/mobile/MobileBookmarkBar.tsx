"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookmarkIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import type { BookmarkBarData } from "@/lib/types";

interface MobileBookmarkBarProps {
  data: BookmarkBarData;
}

export default function MobileBookmarkBar({ data }: MobileBookmarkBarProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (dismissed) return;
      setVisible(window.scrollY > 600);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          className="fixed bottom-20 left-4 right-4 z-40 lg:hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 shadow-lg px-4 py-3 flex items-center gap-3 border-l-4 border-l-yellow-500">
            <BookmarkIcon className="w-5 h-5 text-yellow-500 flex-shrink-0" />
            <span className="text-sm font-medium text-gray-700 flex-1">
              {data.savedCount} Saved Articles
            </span>
            <Link
              href="/saved"
              className="text-sm font-bold text-red-600 hover:text-red-700 transition-colors"
            >
              Tingnan
            </Link>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="p-1 text-gray-400 hover:text-gray-600"
              aria-label="Dismiss bookmark bar"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
