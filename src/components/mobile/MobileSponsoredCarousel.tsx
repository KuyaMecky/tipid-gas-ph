"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import type { SponsoredProduct } from "@/lib/types";
import MobileSectionHeader from "./MobileSectionHeader";

interface MobileSponsoredCarouselProps {
  products: SponsoredProduct[];
}

export default function MobileSponsoredCarousel({ products }: MobileSponsoredCarouselProps) {
  if (products.length === 0) return null;

  return (
    <section role="region" aria-labelledby="sponsored-heading">
      <MobileSectionHeader title="Mga Partner Brands" accentColor="bg-amber-500" />
      <div className="flex overflow-x-auto scrollbar-hide gap-3 px-4 pb-1">
        {products.map((product, index) => (
          <motion.a
            key={product.id}
            href={product.ctaHref}
            className="flex-shrink-0 w-[240px] block bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-amber-500"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Product image */}
            <div className="aspect-[16/9] relative bg-gray-900">
              <Image
                src={product.imageUrl}
                alt={product.productName}
                fill
                className="object-cover"
                sizes="240px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              {/* Sponsored badge */}
              <span className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-amber-500/90 text-white text-[9px] font-bold rounded-full uppercase">
                Sponsored
              </span>
            </div>

            <div className="p-3">
              <p className="text-[10px] font-semibold text-amber-600 uppercase mb-1">
                {product.brand}
              </p>
              <h3 className="font-heading font-bold text-sm text-gray-900 leading-snug mb-1">
                {product.productName}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-2.5">
                {product.description}
              </p>
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-500 text-white text-xs font-bold rounded-full">
                {product.ctaLabel}
                <ChevronRightIcon className="w-3 h-3" />
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
