"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ClockIcon } from "@heroicons/react/24/outline";
import { formatDistanceToNow } from "date-fns";
import type { TrendingNewsItem } from "@/lib/types";
import { proxyImageUrl } from "@/lib/image-proxy";
import MobileSectionHeader from "./MobileSectionHeader";

const CATEGORY_COLORS: Record<string, string> = {
  balita: "bg-red-600",
  showbiz: "bg-pink-500",
  eleksyon: "bg-orange-500",
  tips: "bg-emerald-500",
};

interface MobileTrendingNewsProps {
  items: TrendingNewsItem[];
}

export default function MobileTrendingNews({ items }: MobileTrendingNewsProps) {
  if (items.length === 0) return null;

  const heroItem = items[0];
  const listItems = items.slice(1, 7);

  return (
    <section role="region" aria-labelledby="trending-news-heading">
      <MobileSectionHeader title="Trending News PH" accentColor="bg-red-600" />

      {/* Hero card */}
      <div className="px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href={`/news/${heroItem.id}`}
            className="block relative rounded-2xl overflow-hidden group"
          >
            <div className="relative aspect-[16/9] bg-gray-900">
              {heroItem.imageUrl ? (
                <Image
                  src={proxyImageUrl(heroItem.imageUrl) || heroItem.imageUrl}
                  alt={heroItem.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-red-800 to-yellow-600" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/45" />
              <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold text-white ${CATEGORY_COLORS[heroItem.category] || CATEGORY_COLORS.balita}`}>
                  {heroItem.category.toUpperCase()}
                </span>
                <span className="flex items-center gap-1 px-2 py-0.5 bg-black/40 backdrop-blur-sm rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[9px] font-bold text-white">LIVE</span>
                </span>
              </div>
              {heroItem.imageCredit && (
                <div className="absolute top-3 right-3 z-10">
                  <span className="px-2 py-0.5 bg-black/50 backdrop-blur-sm rounded text-[9px] text-white/70">
                    {heroItem.imageCredit}
                  </span>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="font-heading font-bold text-base text-white leading-snug line-clamp-2">
                  {heroItem.title}
                </h3>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] text-white/70 font-medium">{heroItem.source}</span>
                  <span className="text-[10px] text-white/50">
                    {formatDistanceToNow(new Date(heroItem.publishedAt), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* List items */}
      <div className="mt-3 px-4 space-y-2">
        {listItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.06 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href={`/news/${item.id}`}
              className="flex gap-3 p-2.5 rounded-xl bg-white border border-gray-100 active:bg-gray-50 transition-colors"
            >
              {/* Thumbnail */}
              <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                {item.imageUrl ? (
                  <Image
                    src={proxyImageUrl(item.imageUrl) || item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold text-white ${CATEGORY_COLORS[item.category] || CATEGORY_COLORS.balita}`}>
                    {item.category.toUpperCase()}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-[13px] text-gray-900 leading-snug line-clamp-2">
                  {item.title}
                </h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-[10px] text-gray-400 truncate">{item.source}</span>
                  <ClockIcon className="w-2.5 h-2.5 text-gray-300 flex-shrink-0" />
                  <span className="text-[10px] text-gray-400 flex-shrink-0">
                    {formatDistanceToNow(new Date(item.publishedAt), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
