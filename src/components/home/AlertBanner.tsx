"use client";

import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import type { FeedItem } from "@/lib/types";

interface AlertBannerProps {
  item: FeedItem;
}

export default function AlertBanner({ item }: AlertBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;
  if (!item.isBreaking || item.urgency !== "critical") return null;

  return (
    <div
      role="alert"
      className="relative w-full bg-gradient-to-r from-red-600 to-orange-500 text-white"
    >
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
        <span className="w-2.5 h-2.5 rounded-full bg-white urgency-pulse shrink-0" />
        <span className="text-xs font-bold uppercase tracking-wider shrink-0">
          ALERT
        </span>
        <Link
          href={item.actionHref}
          className="font-bold text-sm md:text-base hover:underline truncate"
        >
          {item.hookHeadline}
        </Link>
        <Link
          href={item.actionHref}
          className="hidden sm:inline-flex items-center px-3 py-1 bg-white text-red-600 text-xs font-bold rounded-full hover:bg-gray-100 transition-colors shrink-0 ml-auto"
        >
          {item.actionLabel}
        </Link>
        <button
          onClick={() => setDismissed(true)}
          className="ml-auto sm:ml-2 p-1 rounded-full hover:bg-white/20 transition-colors shrink-0"
          aria-label="Dismiss alert"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
