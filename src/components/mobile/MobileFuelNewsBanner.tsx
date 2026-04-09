"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/20/solid";
import { FireIcon, ClockIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import type { TrendingNewsItem, FuelPrice } from "@/lib/types";
import { proxyImageUrl } from "@/lib/image-proxy";

interface MobileFuelNewsBannerProps {
  fuelNews: TrendingNewsItem[];
  prices: FuelPrice[];
}

// April 3, 2026 Fuel Price Advisory (continued rollback)
const weeklyChanges: Record<string, number> = {
  Petron: -5.50,
  Shell: -5.50,
  Caltex: -5.50,
  Phoenix: -5.50,
  Seaoil: -5.50,
};

export default function MobileFuelNewsBanner({ fuelNews, prices }: MobileFuelNewsBannerProps) {
  const heroArticle = fuelNews[0];
  const topPrices = prices.slice(0, 4);
  const average = topPrices.reduce((sum, p) => sum + p.unleaded, 0) / topPrices.length;

  return (
    <section className="bg-gradient-to-b from-gray-950 to-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-600 rounded-full">
            <FireIcon className="w-3 h-3 text-yellow-300" />
            <span className="text-[10px] font-bold uppercase tracking-wide">Fuel Update</span>
          </div>
          <span className="flex items-center gap-1 text-[10px] text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Live
          </span>
        </div>
      </div>

      {/* Hero fuel news */}
      {heroArticle && (
        <motion.a
          href={heroArticle.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block mx-4 mt-1 rounded-2xl overflow-hidden relative"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative aspect-[16/9]">
            {heroArticle.imageUrl ? (
              <Image
                src={proxyImageUrl(heroArticle.imageUrl) || heroArticle.imageUrl}
                alt={heroArticle.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-red-900 to-yellow-700" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />

            <div className="absolute top-3 left-3">
              <span className="px-2 py-0.5 bg-yellow-500 text-gray-900 text-[9px] font-black rounded-full uppercase">
                Gasolina
              </span>
            </div>
            {heroArticle.imageCredit && (
              <div className="absolute top-3 right-3 z-10">
                <span className="px-2 py-0.5 bg-black/50 backdrop-blur-sm rounded text-[9px] text-white/70">
                  {heroArticle.imageCredit}
                </span>
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h2 className="font-heading font-extrabold text-lg text-white leading-tight line-clamp-2 mb-1.5">
                {heroArticle.title}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-white/60 font-medium">{heroArticle.source}</span>
                <span className="flex items-center gap-1 text-[10px] text-white/50">
                  <ClockIcon className="w-2.5 h-2.5" />
                  {formatDistanceToNow(new Date(heroArticle.publishedAt), { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>
        </motion.a>
      )}

      {/* Prices strip */}
      <div className="px-4 pt-3 pb-4">
        {/* Average */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">Average Unleaded</span>
            <span className="font-heading font-extrabold text-lg text-yellow-400">P{average.toFixed(2)}</span>
          </div>
          <Link
            href="/gasolina"
            className="flex items-center gap-1 text-[11px] font-semibold text-yellow-400"
          >
            Lahat
            <ChevronRightIcon className="w-3 h-3" />
          </Link>
        </div>

        {/* Brand prices row */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {topPrices.map((p, i) => {
            const change = weeklyChanges[p.brand] ?? 0;
            const isUp = change > 0;
            return (
              <motion.div
                key={p.brandSlug}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
              >
                <Link
                  href={`/gasolina/${p.brandSlug}`}
                  className="flex flex-col items-center gap-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 min-w-[80px] active:bg-white/10 transition-colors"
                >
                  <span className="text-[11px] font-semibold text-gray-300">{p.brand}</span>
                  <span className="font-heading font-bold text-sm text-white tabular-nums">
                    P{p.unleaded.toFixed(2)}
                  </span>
                  {change !== 0 && (
                    <span className={`flex items-center gap-0.5 text-[10px] font-bold ${isUp ? "text-red-400" : "text-emerald-400"}`}>
                      {isUp ? (
                        <ArrowTrendingUpIcon className="w-3 h-3" />
                      ) : (
                        <ArrowTrendingDownIcon className="w-3 h-3" />
                      )}
                      P{Math.abs(change).toFixed(2)}
                    </span>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
