"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { FireIcon } from "@heroicons/react/24/solid";
import type { FeedItem } from "@/lib/types";
import MobileSectionHeader from "./MobileSectionHeader";

const TYPE_COLORS: Record<string, string> = {
  ALERT: "bg-red-600",
  BALITA: "bg-blue-600",
  TIPID: "bg-emerald-500",
  KWENTO: "bg-amber-500",
};

interface MobileHotNewsSectionProps {
  items: FeedItem[];
}

export default function MobileHotNewsSection({ items }: MobileHotNewsSectionProps) {
  const display = items.slice(0, 4);
  if (display.length === 0) return null;

  return (
    <section role="region" aria-labelledby="hot-news-heading">
      <MobileSectionHeader title="Mga Mainit Na Balita" dots={3} activeDot={0} accentColor="bg-red-600" />
      <div className="grid grid-cols-2 gap-3 px-4">
        {display.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href={item.actionHref}
              className="block relative rounded-2xl overflow-hidden group"
            >
              <article className="aspect-[4/3] relative bg-gray-900">
                {/* Content type color bar */}
                <div className={`absolute top-0 left-0 right-0 h-[3px] z-10 ${TYPE_COLORS[item.contentType] || TYPE_COLORS.BALITA}`} />

                {/* Ranking number — top-left */}
                <div className="absolute top-3 left-3 z-10 w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center shadow-lg shadow-yellow-500/30">
                  <span className="text-sm font-black text-gray-900">{index + 1}</span>
                </div>

                {/* Reaction count — top-right */}
                <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-0.5 bg-black/40 backdrop-blur-sm rounded-full">
                  <FireIcon className="w-3 h-3 text-yellow-400" />
                  <span className="text-[10px] font-bold text-white">
                    {item.reactionCount >= 1000
                      ? `${(item.reactionCount / 1000).toFixed(1)}k`
                      : item.reactionCount}
                  </span>
                </div>

                {item.featuredImage ? (
                  <Image
                    src={item.featuredImage.url}
                    alt={item.featuredImage.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 1024px) 50vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/45" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="font-heading font-bold text-sm text-white leading-snug line-clamp-3">
                    {item.hookHeadline}
                  </h3>
                  <div className="flex items-center justify-between mt-1.5">
                    <time
                      dateTime={item.date}
                      className="text-[10px] text-yellow-300/70"
                    >
                      {formatDistanceToNow(new Date(item.date), { addSuffix: true })}
                    </time>
                    <span className="text-[10px] font-semibold text-white/50">
                      Basahin &rsaquo;
                    </span>
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
