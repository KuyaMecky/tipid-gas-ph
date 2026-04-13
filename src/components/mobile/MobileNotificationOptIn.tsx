"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BellIcon } from "@heroicons/react/24/solid";

export default function MobileNotificationOptIn() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          className="mx-4 mt-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="rounded-2xl bg-blue-600 p-4 shadow-md shadow-blue-600/20">
            <div className="flex items-start gap-3">
              <motion.div
                animate={{ rotate: [0, 15, -15, 10, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                className="flex-shrink-0 mt-0.5"
              >
                <BellIcon className="w-6 h-6 text-yellow-300" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <p className="font-heading font-bold text-white text-sm mb-1">
                  Fuel Price Alerts
                </p>
                <p className="text-blue-100 text-xs leading-relaxed mb-3">
                  Gusto mo bang malaman agad ang fuel price changes? I-activate ang alerts para laging updated!
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 bg-yellow-500 text-gray-900 text-xs font-bold rounded-full shadow-sm shadow-yellow-500/30"
                    onClick={() => setDismissed(true)}
                  >
                    I-activate ang Alerts
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 text-blue-200 text-xs font-medium"
                    onClick={() => setDismissed(true)}
                  >
                    Mamaya Na
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
