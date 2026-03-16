"use client";

import Link from "next/link";
import Image from "next/image";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import type { FeedItem } from "@/lib/types";

interface MobilePriceCardProps {
  item: FeedItem;
}

export default function MobilePriceCard({ item }: MobilePriceCardProps) {
  const isUp = item.priceChange?.startsWith("+");

  return (
    <Link href={item.actionHref} className="block">
      <div className="relative overflow-hidden rounded-2xl mobile-card-shadow">
        {/* Top gradient banner */}
        <div
          className={`px-4 py-2.5 ${
            isUp
              ? "bg-gradient-to-r from-red-500 to-orange-500"
              : "bg-gradient-to-r from-green-500 to-teal-500"
          }`}
        >
          <p className="font-heading font-extrabold text-sm text-white flex items-center gap-1.5">
            <ExclamationTriangleIcon className="w-4 h-4" />
            {isUp ? "Wag ka muna magpa-gas bukas!" : "Good news — rollback bukas!"}
          </p>
        </div>

        {/* Card body */}
        <div className="bg-white flex">
          {/* Text content */}
          <div className="flex-1 p-4 min-w-0">
            <p className="text-gray-800 text-sm mb-1">
              <span className="font-extrabold text-gray-900 text-xl">{item.priceChange}</span>{" "}
              <span className="text-gray-500">increase confirmed</span>
            </p>

            <p className="text-sm text-gray-600 mb-3">
              <span className="font-bold text-gray-900">Magpa-full tank</span> ka ngayon para makatipid.
            </p>

            <span className="inline-flex items-center px-4 py-2 bg-red-500 text-white text-xs font-extrabold rounded-lg uppercase tracking-wide">
              Read More
            </span>
          </div>

          {/* Image on right */}
          {item.featuredImage && (
            <div className="flex-shrink-0 w-[120px] self-stretch">
              <Image
                src={item.featuredImage.url}
                alt={item.featuredImage.alt}
                width={240}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
