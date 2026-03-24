"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { FireIcon, ChevronRightIcon, ClockIcon } from "@heroicons/react/24/solid";
import type { FeedItem } from "@/lib/types";
import MobileSectionHeader from "./MobileSectionHeader";

const TYPE_ACCENT: Record<string, string> = {
  ALERT: "border-l-red-600",
  BALITA: "border-l-blue-600",
  TIPID: "border-l-emerald-500",
  KWENTO: "border-l-amber-500",
};

interface MobileOpinionsSectionProps {
  items: FeedItem[];
}

export default function MobileOpinionsSection({ items }: MobileOpinionsSectionProps) {
  const display = items.slice(0, 5);
  if (display.length === 0) return null;

  return (
    <section role="region" aria-labelledby="opinions-heading">
      <MobileSectionHeader title="Mga Opinyon" dots={3} activeDot={0} accentColor="bg-amber-500" />
      <div className="flex overflow-x-auto scrollbar-hide gap-3 px-4 pb-1">
        {display.map((item, index) => {
          const readMin = Math.max(2, Math.min(5, Math.floor(item.hookHeadline.length / 10)));
          return (
            <motion.div
              key={item.id}
              className="flex-shrink-0 w-[260px]"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                href={item.actionHref}
                className={`block bg-white rounded-2xl shadow-sm border border-gray-100 border-l-[3px] overflow-hidden hover:shadow-md transition-shadow ${
                  TYPE_ACCENT[item.contentType] || TYPE_ACCENT.KWENTO
                }`}
              >
                <article>
                  <div className="aspect-[16/9] relative bg-gray-900">
                    {item.featuredImage ? (
                      <Image
                        src={item.featuredImage.url}
                        alt={item.featuredImage.alt}
                        fill
                        className="object-contain"
                        sizes="260px"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                    {/* Quotes icon overlay */}
                    <div className="absolute top-2.5 left-2.5 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
                      <svg className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                      </svg>
                    </div>
                    {/* Read time — top-right */}
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 bg-black/30 backdrop-blur-sm rounded-full">
                      <ClockIcon className="w-3 h-3 text-white/80" />
                      <span className="text-[10px] font-semibold text-white/80">{readMin} min</span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-heading font-bold text-sm text-gray-900 leading-snug line-clamp-2 mb-2">
                      {item.hookHeadline}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="font-medium">{item.author.name}</span>
                        <span>&middot;</span>
                        <time dateTime={item.date}>
                          {formatDistanceToNow(new Date(item.date), {
                            addSuffix: true,
                          })}
                        </time>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5 text-red-500">
                          <FireIcon className="w-3 h-3" />
                          <span className="text-[10px] font-bold">
                            {item.reactionCount >= 1000
                              ? `${(item.reactionCount / 1000).toFixed(1)}k`
                              : item.reactionCount}
                          </span>
                        </div>
                        <ChevronRightIcon className="w-4 h-4 text-gray-300" />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
