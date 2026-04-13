"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FireIcon, ChevronRightIcon, NewspaperIcon, BellAlertIcon, LightBulbIcon, BookOpenIcon } from "@heroicons/react/24/solid";
import { formatDistanceToNow } from "date-fns";
import type { FeedItem } from "@/lib/types";
import MobileShareWidget from "./MobileShareWidget";

const GRADIENT_BY_TYPE: Record<string, string> = {
  BALITA: "from-black via-black/75 to-black/45",
  ALERT: "from-black via-black/75 to-black/45",
  TIPID: "from-black via-black/75 to-black/45",
  KWENTO: "from-black via-black/75 to-black/45",
};

const BADGE_BY_TYPE: Record<string, string> = {
  BALITA: "bg-blue-600",
  ALERT: "bg-red-600",
  TIPID: "bg-emerald-500",
  KWENTO: "bg-amber-500",
};

function TypeIcon({ type }: { type: string }) {
  const cls = "w-3 h-3";
  switch (type) {
    case "ALERT": return <BellAlertIcon className={cls} />;
    case "BALITA": return <NewspaperIcon className={cls} />;
    case "TIPID": return <LightBulbIcon className={cls} />;
    case "KWENTO": return <BookOpenIcon className={cls} />;
    default: return <NewspaperIcon className={cls} />;
  }
}

interface MobileSecondaryCardProps {
  item: FeedItem;
}

export default function MobileSecondaryCard({ item }: MobileSecondaryCardProps) {
  const gradient = GRADIENT_BY_TYPE[item.contentType] || GRADIENT_BY_TYPE.BALITA;
  const badgeBg = BADGE_BY_TYPE[item.contentType] || BADGE_BY_TYPE.BALITA;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="mx-4 mt-4 rounded-2xl overflow-hidden bg-gray-900">
        <Link href={item.actionHref} className="block relative">
          <article className="aspect-[16/9] relative bg-gray-900">
            {item.featuredImage ? (
              <Image
                src={item.featuredImage.url}
                alt={item.featuredImage.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw"
              />
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
            <div className={`absolute inset-0 bg-gradient-to-t ${gradient}`} />

            {/* Reaction badge top-right */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/40 backdrop-blur-sm rounded-full">
              <FireIcon className="w-3 h-3 text-yellow-400" />
              <span className="text-[11px] font-bold text-white">
                {item.reactionCount >= 1000
                  ? `${(item.reactionCount / 1000).toFixed(1)}k`
                  : item.reactionCount}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4">
              {/* Category badge with content type icon */}
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 ${badgeBg} text-white text-xs font-bold rounded-full mb-2`}>
                <TypeIcon type={item.contentType} />
                {item.categories[0]?.name || item.contentType}
              </span>
              <h3 className="font-heading font-bold text-lg text-white leading-tight mb-2">
                {item.hookHeadline}
              </h3>
              {/* Author + time + chevron */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-white/70">
                  <div className="w-5 h-5 rounded-full bg-yellow-500/80 flex items-center justify-center text-[9px] font-bold text-gray-900 uppercase">
                    {item.author.name.charAt(0)}
                  </div>
                  <span className="font-medium">{item.author.name}</span>
                  <span>&middot;</span>
                  <time dateTime={item.date}>
                    {formatDistanceToNow(new Date(item.date), { addSuffix: true })}
                  </time>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-white/50" />
              </div>
            </div>
          </article>
        </Link>

        {/* Share Widget */}
        <div className="px-4 pb-3 bg-gray-900">
          <MobileShareWidget
            articleUrl={`https://latestbalita.ph${item.actionHref}`}
            articleTitle={item.hookHeadline}
            shareCount={item.reactionCount}
          />
        </div>
      </div>
    </motion.div>
  );
}
