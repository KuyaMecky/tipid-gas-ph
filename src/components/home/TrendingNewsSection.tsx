"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowTopRightOnSquareIcon, ClockIcon } from "@heroicons/react/24/outline";
import { formatDistanceToNow } from "date-fns";
import type { TrendingNewsItem } from "@/lib/types";

const CATEGORY_COLORS: Record<string, string> = {
  balita: "bg-red-600",
  showbiz: "bg-pink-500",
  eleksyon: "bg-orange-500",
  tips: "bg-emerald-500",
};

interface TrendingNewsSectionProps {
  items: TrendingNewsItem[];
  title?: string;
}

export default function TrendingNewsSection({
  items,
  title = "Trending News — Pilipinas",
}: TrendingNewsSectionProps) {
  if (items.length === 0) return null;

  const heroItem = items[0];
  const restItems = items.slice(1, 9);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-bold text-xl text-gray-900">
          {title}
        </h2>
        <span className="flex items-center gap-1 text-xs text-gray-400">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Live
        </span>
      </div>

      {/* Hero trending article */}
      <motion.a
        href={heroItem.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative rounded-2xl overflow-hidden group"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <div className="relative aspect-[16/9]">
          {heroItem.imageUrl ? (
            <Image
              src={heroItem.imageUrl}
              alt={heroItem.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 1024px) 100vw, 700px"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-red-800 to-yellow-600" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute top-3 left-3 z-10">
            <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold text-white ${CATEGORY_COLORS[heroItem.category] || CATEGORY_COLORS.balita}`}>
              {heroItem.category.toUpperCase()}
            </span>
          </div>
          <div className="absolute top-3 right-3 z-10">
            <ArrowTopRightOnSquareIcon className="w-4 h-4 text-white/70" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-heading font-bold text-lg text-white leading-snug line-clamp-2">
              {heroItem.title}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              {heroItem.sourceIcon && (
                <Image
                  src={heroItem.sourceIcon}
                  alt={heroItem.source}
                  width={16}
                  height={16}
                  className="rounded-full"
                />
              )}
              <span className="text-xs text-white/70 font-medium">{heroItem.source}</span>
              <span className="text-white/30">|</span>
              <span className="flex items-center gap-1 text-xs text-white/50">
                <ClockIcon className="w-3 h-3" />
                {formatDistanceToNow(new Date(heroItem.publishedAt), { addSuffix: true })}
              </span>
            </div>
          </div>
        </div>
      </motion.a>

      {/* Rest of trending articles */}
      <div className="space-y-2">
        {restItems.map((item, index) => (
          <motion.a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-3 p-3 rounded-xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            {/* Thumbnail */}
            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="80px"
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
              <div className="absolute top-1 left-1">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-yellow-500 text-[10px] font-black text-gray-900">
                  {index + 2}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold text-white ${CATEGORY_COLORS[item.category] || CATEGORY_COLORS.balita}`}>
                  {item.category.toUpperCase()}
                </span>
                <ArrowTopRightOnSquareIcon className="w-3 h-3 text-gray-300" />
              </div>
              <h3 className="font-heading font-semibold text-sm text-gray-900 leading-snug line-clamp-2 group-hover:text-red-600 transition-colors">
                {item.title}
              </h3>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[10px] text-gray-400 font-medium truncate">{item.source}</span>
                <span className="text-gray-300">|</span>
                <span className="text-[10px] text-gray-400">
                  {formatDistanceToNow(new Date(item.publishedAt), { addSuffix: true })}
                </span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
