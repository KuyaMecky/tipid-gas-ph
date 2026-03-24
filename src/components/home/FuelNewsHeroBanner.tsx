"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/20/solid";
import { FireIcon, ClockIcon } from "@heroicons/react/24/solid";
import type { TrendingNewsItem, FuelPrice } from "@/lib/types";

interface FuelNewsHeroBannerProps {
  fuelNews: TrendingNewsItem[];
  prices: FuelPrice[];
}

// March 24, 2026 Fuel Price Advisory
const weeklyChanges: Record<string, number> = {
  Petron: 10.50,
  Shell: 12.00,
  Caltex: 11.00,
  Phoenix: 9.00,
  Seaoil: 9.50,
};

export default function FuelNewsHeroBanner({ fuelNews, prices }: FuelNewsHeroBannerProps) {
  const topPrices = prices.slice(0, 5);
  const heroArticle = fuelNews[0];
  const sideArticles = fuelNews.slice(1, 4);

  // Find cheapest and most expensive
  const sorted = [...topPrices].sort((a, b) => a.unleaded - b.unleaded);
  const cheapest = sorted[0];
  const average = topPrices.reduce((sum, p) => sum + p.unleaded, 0) / topPrices.length;

  return (
    <section className="bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8">
        {/* Header row */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-red-600 rounded-full">
              <FireIcon className="w-3.5 h-3.5 text-yellow-300" />
              <span className="text-[11px] font-bold uppercase tracking-wide">Fuel Update</span>
            </div>
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Real-time
            </span>
          </div>
          <Link
            href="/gasolina"
            className="text-xs font-semibold text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            Lahat ng Presyo &rarr;
          </Link>
        </div>

        {/* Main grid: News + Prices */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
          {/* Left: Fuel news */}
          <div className="space-y-4">
            {/* Hero fuel article */}
            {heroArticle && (
              <motion.a
                href={heroArticle.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative rounded-2xl overflow-hidden group"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative aspect-[16/9] lg:aspect-[2.2/1]">
                  {heroArticle.imageUrl ? (
                    <Image
                      src={heroArticle.imageUrl}
                      alt={heroArticle.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 700px"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-red-900 to-yellow-700" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-yellow-500 text-gray-900 text-[10px] font-black rounded-full uppercase">
                      Gasolina
                    </span>
                    <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5 text-white/50" />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5">
                    <h2 className="font-heading font-extrabold text-xl lg:text-2xl text-white leading-tight line-clamp-2 mb-2">
                      {heroArticle.title}
                    </h2>
                    {heroArticle.description && (
                      <p className="text-sm text-white/70 line-clamp-2 mb-2 hidden sm:block">
                        {heroArticle.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2">
                      {heroArticle.sourceIcon && (
                        <Image
                          src={heroArticle.sourceIcon}
                          alt={heroArticle.source}
                          width={14}
                          height={14}
                          className="rounded-full"
                        />
                      )}
                      <span className="text-xs text-white/60 font-medium">{heroArticle.source}</span>
                      <span className="text-white/30">|</span>
                      <span className="flex items-center gap-1 text-xs text-white/50">
                        <ClockIcon className="w-3 h-3" />
                        {formatDistanceToNow(new Date(heroArticle.publishedAt), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.a>
            )}

            {/* Side fuel articles */}
            {sideArticles.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {sideArticles.map((item, i) => (
                  <motion.a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex sm:flex-col gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                  >
                    <div className="relative w-16 h-16 sm:w-full sm:h-24 flex-shrink-0 rounded-lg overflow-hidden">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 64px, 200px"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-700" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-semibold text-[13px] text-white leading-snug line-clamp-2 group-hover:text-yellow-400 transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="text-[10px] text-gray-400 truncate">{item.source}</span>
                        <span className="text-[10px] text-gray-500">
                          {formatDistanceToNow(new Date(item.publishedAt), { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            )}
          </div>

          {/* Right: Today's prices */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 lg:p-5 h-fit">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-base text-white">
                Presyo Ngayon
              </h3>
              <span className="text-[10px] text-gray-400 font-medium">
                Unleaded / Liter
              </span>
            </div>

            {/* Average price highlight */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 mb-4">
              <div>
                <span className="text-[10px] text-yellow-400/70 font-medium uppercase tracking-wide">Average</span>
                <p className="font-heading font-extrabold text-2xl text-yellow-400">
                  P{average.toFixed(2)}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-emerald-400/70 font-medium uppercase tracking-wide">Pinakamura</span>
                <p className="font-heading font-bold text-lg text-emerald-400">
                  {cheapest.brand} P{cheapest.unleaded.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Brand prices */}
            <div className="space-y-2">
              {topPrices.map((p, i) => {
                const change = weeklyChanges[p.brand] ?? 0;
                const isUp = change > 0;
                return (
                  <motion.div
                    key={p.brandSlug}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
                  >
                    <Link
                      href={`/gasolina/${p.brandSlug}`}
                      className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors group"
                    >
                      <span className="text-sm font-semibold text-white group-hover:text-yellow-400 transition-colors">
                        {p.brand}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-bold text-sm text-white tabular-nums">
                          P{p.unleaded.toFixed(2)}
                        </span>
                        {change !== 0 && (
                          <span className={`flex items-center gap-0.5 text-[11px] font-bold ${isUp ? "text-red-400" : "text-emerald-400"}`}>
                            {isUp ? (
                              <ArrowTrendingUpIcon className="w-3.5 h-3.5" />
                            ) : (
                              <ArrowTrendingDownIcon className="w-3.5 h-3.5" />
                            )}
                            P{Math.abs(change).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <Link
              href="/gasolina"
              className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 bg-yellow-500 text-gray-900 font-bold text-sm rounded-xl hover:bg-yellow-400 transition-colors"
            >
              I-compare Lahat ng Brand
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
