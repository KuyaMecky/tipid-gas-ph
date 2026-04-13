"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BellAlertIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import type { FeedItem } from "@/lib/types";

interface MobileHeroCardProps {
  item: FeedItem;
}

export default function MobileHeroCard({ item }: MobileHeroCardProps) {
  const isCritical = item.urgency === "critical";

  return (
    <motion.div
      className="mx-4 mt-4 rounded-2xl overflow-hidden relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <Link href={item.actionHref} className="block">
        <article className="aspect-[16/10] relative bg-gray-900">
          {item.featuredImage ? (
            <Image
              src={item.featuredImage.url}
              alt={item.featuredImage.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-800" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Single top-left badge */}
          {isCritical && (
            <div className="absolute top-3.5 left-3.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-600 text-white text-[11px] font-bold rounded-full uppercase tracking-wide">
                <BellAlertIcon className="w-3 h-3" />
                Breaking
              </span>
            </div>
          )}

          {/* Bottom content — headline + category only */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            {item.categories[0] && (
              <span className="inline-block px-2.5 py-0.5 bg-yellow-500 text-gray-900 text-[10px] font-bold rounded-full uppercase mb-2">
                {item.categories[0].name}
              </span>
            )}
            <h2 className="font-heading font-extrabold text-xl text-white leading-snug tracking-tight">
              {item.hookHeadline}
            </h2>
            <div className="flex items-center gap-2 mt-2.5">
              <span className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-yellow-500 text-gray-900 text-xs font-bold rounded-full">
                {item.actionLabel || "Basahin"}
                <ChevronRightIcon className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
