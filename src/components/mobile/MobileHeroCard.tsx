"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FireIcon, BellAlertIcon, ChevronRightIcon, ClockIcon } from "@heroicons/react/24/solid";
import type { FeedItem } from "@/lib/types";
import MobileShareWidget from "./MobileShareWidget";

interface MobileHeroCardProps {
  item: FeedItem;
}

export default function MobileHeroCard({ item }: MobileHeroCardProps) {
  const isCritical = item.urgency === "critical";
  const isHike = item.priceChange?.startsWith("+");
  const isRollback = item.priceChange?.startsWith("-");
  const readMin = Math.max(2, Math.min(6, Math.floor(item.hookHeadline.length / 8)));

  return (
    <motion.div
      className="mx-4 mt-4 rounded-2xl overflow-hidden relative bg-gray-900"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileTap={{ scale: 0.98 }}
    >
      <Link href={item.actionHref} className="block">
        <article className="aspect-[16/9] relative bg-gray-900">
          {item.featuredImage ? (
            <Image
              src={item.featuredImage.url}
              alt={item.featuredImage.alt}
              fill
              className="object-contain animate-[kenburns_8s_ease-in-out_infinite_alternate]"
              sizes="(max-width: 1024px) 100vw"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-200" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

          {/* Top badges row */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isCritical && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-[11px] font-bold rounded-full uppercase animate-pulse shadow-lg shadow-red-600/40">
                  <BellAlertIcon className="w-3.5 h-3.5" />
                  Breaking
                </span>
              )}
              {!isCritical && item.urgency === "high" && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-yellow-500 text-gray-900 text-[11px] font-bold rounded-full uppercase shadow-lg shadow-yellow-500/40">
                  <FireIcon className="w-3.5 h-3.5" />
                  Trending
                </span>
              )}
            </div>
            {/* Reaction count */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-black/40 backdrop-blur-sm rounded-full">
              <FireIcon className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-[11px] font-bold text-white">
                {item.reactionCount >= 1000
                  ? `${(item.reactionCount / 1000).toFixed(1)}k`
                  : item.reactionCount}
              </span>
            </div>
          </div>

          {/* Price change — large prominent pill */}
          {item.priceChange && (
            <div className="absolute top-16 left-4">
              <span
                className={`inline-flex items-center gap-1 px-4 py-2 text-base font-black rounded-xl shadow-lg ${
                  isHike
                    ? "bg-red-500 text-white shadow-red-500/40"
                    : isRollback
                    ? "bg-emerald-500 text-white shadow-emerald-500/40"
                    : "bg-gray-500/90 text-white"
                }`}
              >
                {isHike ? "\u2191" : isRollback ? "\u2193" : ""} {item.priceChange}
              </span>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-5">
            {item.categories[0] && (
              <span className="inline-block px-3 py-1 bg-yellow-500 text-gray-900 text-xs font-bold rounded-full uppercase shadow-md shadow-yellow-500/30 mb-3">
                {item.categories[0].name}
              </span>
            )}
            <h2 className="font-heading font-black text-2xl text-white leading-tight mb-2 tracking-tight">
              {item.hookHeadline}
            </h2>
            <p className="text-sm text-yellow-100/80 mb-4 line-clamp-2">
              {item.subHeadline}
            </p>
            {/* CTA row with read time */}
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-yellow-500 text-gray-900 text-sm font-bold rounded-full shadow-lg shadow-yellow-500/30">
                {item.actionLabel || "Basahin"}
                <ChevronRightIcon className="w-4 h-4" />
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-white/60">
                <ClockIcon className="w-3.5 h-3.5" />
                {readMin} min
              </span>
            </div>
          </div>
        </article>
      </Link>

      {/* Share Widget */}
      <div className="px-5 pb-4 bg-gray-900">
        <MobileShareWidget
          articleUrl={`https://latestbalitaph.com${item.actionHref}`}
          articleTitle={item.hookHeadline}
          shareCount={item.reactionCount}
        />
      </div>

      <style jsx global>{`
        @keyframes kenburns {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }
      `}</style>
    </motion.div>
  );
}
