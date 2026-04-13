"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BellAlertIcon, BookOpenIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import type { FeedItem } from "@/lib/types";

interface MobileTwoColumnFeatureProps {
  leftItem: FeedItem | undefined;
  rightItem: FeedItem | undefined;
}

function isNew(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  return diff < 24 * 60 * 60 * 1000;
}

export default function MobileTwoColumnFeature({
  leftItem,
  rightItem,
}: MobileTwoColumnFeatureProps) {
  if (!leftItem && !rightItem) return null;

  return (
    <motion.div
      className="grid grid-cols-2 gap-3 px-4"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {leftItem && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0 }}
          whileTap={{ scale: 0.97 }}
        >
          <Link
            href={leftItem.actionHref}
            className="relative rounded-2xl overflow-hidden group block"
            style={{ boxShadow: "0 4px 24px rgba(220, 38, 38, 0.2)" }}
          >
            <article className="aspect-[4/3] relative bg-gray-900">
              {leftItem.featuredImage ? (
                <Image
                  src={leftItem.featuredImage.url}
                  alt={leftItem.featuredImage.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 1024px) 50vw"
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/45" />

              {/* Type icon — top-left */}
              <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-red-600/80 flex items-center justify-center shadow-md backdrop-blur-sm">
                <BellAlertIcon className="w-4 h-4 text-white" />
              </div>

              {isNew(leftItem.date) && (
                <span className="absolute top-3 right-3 px-2 py-0.5 bg-yellow-500 text-gray-900 text-[9px] font-bold rounded-full uppercase shadow-md shadow-yellow-500/30">
                  Bago
                </span>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <span className="inline-block px-2 py-0.5 bg-red-600 text-white text-[10px] font-bold rounded-full mb-2 uppercase shadow-sm">
                  Gasolina Update
                </span>
                <h3 className="font-heading font-bold text-sm text-white leading-snug line-clamp-3 mb-1.5">
                  {leftItem.hookHeadline}
                </h3>
                <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-white/50">
                  Basahin <ChevronRightIcon className="w-3 h-3" />
                </span>
              </div>
            </article>
          </Link>
        </motion.div>
      )}
      {rightItem && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          whileTap={{ scale: 0.97 }}
        >
          <Link
            href={rightItem.actionHref}
            className="relative rounded-2xl overflow-hidden group block"
            style={{ boxShadow: "0 4px 24px rgba(37, 99, 235, 0.2)" }}
          >
            <article className="aspect-[4/3] relative bg-gray-900">
              {rightItem.featuredImage ? (
                <Image
                  src={rightItem.featuredImage.url}
                  alt={rightItem.featuredImage.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 1024px) 50vw"
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/45" />

              {/* Type icon — top-left */}
              <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-blue-600/80 flex items-center justify-center shadow-md backdrop-blur-sm">
                <BookOpenIcon className="w-4 h-4 text-white" />
              </div>

              {isNew(rightItem.date) && (
                <span className="absolute top-3 right-3 px-2 py-0.5 bg-yellow-500 text-gray-900 text-[9px] font-bold rounded-full uppercase shadow-md shadow-yellow-500/30">
                  Bago
                </span>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <span className="inline-block px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-full mb-2 uppercase shadow-sm">
                  Tipid Kwento
                </span>
                <h3 className="font-heading font-bold text-sm text-white leading-snug line-clamp-3 mb-1.5">
                  {rightItem.hookHeadline}
                </h3>
                <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-white/50">
                  Basahin <ChevronRightIcon className="w-3 h-3" />
                </span>
              </div>
            </article>
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}
