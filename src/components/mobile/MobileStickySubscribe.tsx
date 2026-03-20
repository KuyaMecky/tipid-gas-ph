"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BellAlertIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default function MobileStickySubscribe() {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-16 left-0 right-0 z-40 px-3 pb-2 lg:hidden"
        >
          <div className="flex items-center justify-between bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-400 rounded-2xl px-4 py-3.5 shadow-lg shadow-yellow-400/20">
            <div className="flex items-center gap-2">
              <BellAlertIcon className="w-5 h-5 text-yellow-800" />
              <span className="font-heading font-extrabold text-base text-gray-900">
                Subscribe NOW
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                className="px-4 py-1.5 bg-white text-orange-600 font-extrabold text-xs rounded-lg shadow-sm uppercase"
              >
                Go
              </button>
              <button
                type="button"
                onClick={() => setVisible(false)}
                className="p-1 text-gray-700/60 hover:text-gray-900"
                aria-label="Dismiss subscribe banner"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
