"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { LightBulbIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import type { FeedItem } from "@/lib/types";
import MobileSectionHeader from "./MobileSectionHeader";

interface MobileTipidTipsSectionProps {
  items: FeedItem[];
}

export default function MobileTipidTipsSection({ items }: MobileTipidTipsSectionProps) {
  const display = items.slice(0, 5);
  if (display.length === 0) return null;

  return (
    <section role="region" aria-labelledby="tipid-tips-heading">
      <MobileSectionHeader title="Tipid Tips" seeAllHref="/tips" accentColor="bg-emerald-500" />
      <div className="flex overflow-x-auto scrollbar-hide gap-3 px-4 pb-1">
        {display.map((item, index) => (
          <motion.div
            key={item.id}
            className="flex-shrink-0 w-[200px]"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href={item.actionHref}
              className="block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <article>
                <div className="aspect-[16/9] relative bg-gray-900">
                  {item.featuredImage ? (
                    <Image
                      src={item.featuredImage.url}
                      alt={item.featuredImage.alt}
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/45" />
                  {/* Numbered badge with icon */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500 shadow-md shadow-emerald-500/30">
                    <LightBulbIcon className="w-3 h-3 text-yellow-200" />
                    <span className="text-xs font-black text-white">#{index + 1}</span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-heading font-bold text-sm text-gray-900 leading-snug line-clamp-2 mb-1.5">
                    {item.hookHeadline}
                  </h3>
                  <div className="flex items-center justify-between">
                    {item.categories[0] && (
                      <span className="inline-block px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-semibold rounded-full">
                        {item.categories[0].name}
                      </span>
                    )}
                    <ChevronRightIcon className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>
              </article>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
