"use client";

import { motion } from "framer-motion";

export default function NewsletterCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-5 text-white"
    >
      <h3 className="font-heading font-bold text-sm mb-1">
        Huwag Palampasin!
      </h3>
      <p className="text-xs text-gray-400 mb-4 leading-relaxed">
        Mag-subscribe para ma-notify ka bago tumaas ang presyo ng gas.
      </p>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
        <input
          type="email"
          placeholder="Email mo dito"
          className="w-full px-3 py-2.5 rounded-lg bg-white/10 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="w-full px-3 py-2.5 bg-orange-500 text-white text-sm font-bold rounded-lg hover:bg-orange-600 transition-colors"
        >
          I-subscribe
        </button>
      </form>
      <p className="text-[10px] text-gray-500 mt-2">
        Walang spam. Fuel alerts lang.
      </p>
    </motion.div>
  );
}
