"use client";

import { motion } from "framer-motion";
import { TagIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import type { FuelDeal, DealType } from "@/lib/types";
import MobileSectionHeader from "./MobileSectionHeader";

interface MobileDealsSectionProps {
  deals: FuelDeal[];
}

const RIBBON_STYLES: Record<DealType, { bg: string; label: string }> = {
  hot: { bg: "bg-amber-500", label: "Hot Deal" },
  new: { bg: "bg-emerald-500", label: "Bago" },
  limited: { bg: "bg-red-600", label: "Limited" },
};

export default function MobileDealsSection({ deals }: MobileDealsSectionProps) {
  if (deals.length === 0) return null;

  return (
    <section role="region" aria-labelledby="deals-heading">
      <MobileSectionHeader title="Mga Promo at Deals" accentColor="bg-red-600" />
      <div className="grid grid-cols-2 gap-3 px-4">
        {deals.map((deal, index) => {
          const ribbon = RIBBON_STYLES[deal.dealType];
          return (
            <motion.a
              key={deal.id}
              href={deal.ctaHref}
              className="block bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Ribbon */}
              <div className={`${ribbon.bg} px-2.5 py-1`}>
                <span className="text-[10px] font-bold text-white uppercase">
                  {ribbon.label}
                </span>
              </div>

              <div className="p-3">
                {/* Brand */}
                <div className="flex items-center gap-1.5 mb-2">
                  <TagIcon className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-[11px] font-semibold text-gray-500 uppercase">
                    {deal.brand}
                  </span>
                </div>

                {/* Discount */}
                <p className="font-heading font-black text-xl text-red-600 leading-tight mb-1">
                  {deal.discount}
                </p>

                {/* Description */}
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 mb-2">
                  {deal.description}
                </p>

                {/* Valid until */}
                <p className="text-[10px] text-gray-400 mb-3">
                  Hanggang {deal.validUntil}
                </p>

                {/* CTA */}
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-full">
                  {deal.ctaLabel}
                  <ChevronRightIcon className="w-3 h-3" />
                </span>
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
