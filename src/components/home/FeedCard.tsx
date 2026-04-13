"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ContentTypeBadge from "@/components/ui/ContentTypeBadge";
import Button from "@/components/ui/Button";
import type { FeedItem } from "@/lib/types";
import { timeAgo } from "@/lib/utils";

interface FeedCardProps {
  item: FeedItem;
  variant?: "hero" | "standard" | "compact";
}

export default function FeedCard({ item, variant = "standard" }: FeedCardProps) {
  if (variant === "hero") return <HeroCard item={item} />;
  if (variant === "compact") return <CompactCard item={item} />;
  return <StandardCard item={item} />;
}

function HeroCard({ item }: { item: FeedItem }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="relative rounded-2xl overflow-hidden feed-card-shadow group"
    >
      <Link href={item.actionHref} className="block">
        <div className="relative aspect-[16/9] md:aspect-[2/1] bg-gray-900">
          {item.featuredImage && (
            <Image
              src={item.featuredImage.url}
              alt={item.featuredImage.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          )}
          <div className="feed-hero-overlay absolute inset-0" />
          <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-8">
            <ContentTypeBadge type={item.contentType} className="mb-3 w-fit" />
            <h2 className="feed-headline text-2xl md:text-4xl text-white mb-2 drop-shadow-lg">
              {item.hookHeadline}
            </h2>
            <p className="text-sm md:text-base text-white/85 mb-4 max-w-lg">
              {item.subHeadline}
            </p>
            <div className="flex items-center gap-4">
              <Button variant="feed" size="sm" href={item.actionHref}>
                {item.actionLabel}
              </Button>
              {item.priceChange && (
                <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                  item.priceChange.startsWith("+")
                    ? "bg-red-500/20 text-red-200"
                    : "bg-green-500/20 text-green-200"
                }`}>
                  {item.priceChange}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function StandardCard({ item }: { item: FeedItem }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl overflow-hidden feed-card-shadow border border-gray-100"
    >
      <Link href={item.actionHref} className="block group">
        {item.featuredImage && (
          <div className="relative aspect-[16/9] overflow-hidden bg-gray-900">
            <Image
              src={item.featuredImage.url}
              alt={item.featuredImage.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 640px"
            />
          </div>
        )}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <ContentTypeBadge type={item.contentType} />
            {item.priceChange && (
              <span className={`text-xs font-bold ${
                item.priceChange.startsWith("+") ? "price-up" : "price-down"
              }`}>
                {item.priceChange}
              </span>
            )}
          </div>
          <h2 className="feed-headline text-xl md:text-2xl text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">
            {item.hookHeadline}
          </h2>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {item.subHeadline}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="font-medium text-gray-600">{item.author.name}</span>
              <span>&middot;</span>
              <span>{timeAgo(item.date)}</span>
              <span>&middot;</span>
              <span>{item.reactionCount.toLocaleString()} reactions</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="px-5 pb-4">
        <Button variant="feed" size="sm" href={item.actionHref}>
          {item.actionLabel}
        </Button>
      </div>
    </motion.article>
  );
}

function CompactCard({ item }: { item: FeedItem }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl overflow-hidden feed-card-shadow border border-gray-100"
    >
      <Link href={item.actionHref} className="flex group">
        {item.featuredImage && (
          <div className="relative w-28 md:w-36 shrink-0 overflow-hidden">
            <Image
              src={item.featuredImage.url}
              alt={item.featuredImage.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="144px"
            />
          </div>
        )}
        <div className="p-3 flex flex-col justify-center min-w-0">
          <ContentTypeBadge type={item.contentType} className="mb-1.5 w-fit text-[10px]" />
          <h2 className="font-heading font-bold text-sm text-gray-900 group-hover:text-orange-500 transition-colors line-clamp-2 leading-snug">
            {item.hookHeadline}
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            {timeAgo(item.date)}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
