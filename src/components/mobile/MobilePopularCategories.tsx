"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FireIcon,
  TruckIcon,
  BoltIcon,
  NewspaperIcon,
  LightBulbIcon,
  MegaphoneIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import type { Category } from "@/lib/types";
import MobileSectionHeader from "./MobileSectionHeader";

const CATEGORY_META: Record<string, { gradient: string; badge: string; Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }> = {
  gasolina: { gradient: "from-yellow-900/80 via-yellow-700/50 to-yellow-500/20", badge: "bg-yellow-500", Icon: FireIcon },
  diesel: { gradient: "from-blue-900/80 via-blue-700/50 to-blue-500/20", badge: "bg-blue-600", Icon: TruckIcon },
  lpg: { gradient: "from-amber-900/80 via-amber-700/50 to-amber-500/20", badge: "bg-amber-500", Icon: BoltIcon },
  balita: { gradient: "from-red-900/80 via-red-700/50 to-red-500/20", badge: "bg-red-600", Icon: NewspaperIcon },
  tips: { gradient: "from-emerald-900/80 via-emerald-700/50 to-emerald-500/20", badge: "bg-emerald-500", Icon: LightBulbIcon },
  eleksyon: { gradient: "from-orange-900/80 via-orange-700/50 to-orange-500/20", badge: "bg-orange-500", Icon: MegaphoneIcon },
  showbiz: { gradient: "from-pink-900/80 via-pink-700/50 to-pink-500/20", badge: "bg-pink-500", Icon: StarIcon },
};

const CATEGORY_HREFS: Record<string, string> = {
  gasolina: "/gasolina",
  balita: "/balita",
  tips: "/tips",
  eleksyon: "/eleksyon",
};

function getCategoryHref(slug: string): string {
  return CATEGORY_HREFS[slug] || `/category/${slug}`;
}

interface MobilePopularCategoriesProps {
  categories: Category[];
}

export default function MobilePopularCategories({ categories }: MobilePopularCategoriesProps) {
  if (categories.length === 0) return null;

  const defaultMeta = CATEGORY_META.balita;

  return (
    <section role="region" aria-labelledby="popular-categories-heading">
      <MobileSectionHeader title="Popular na Kategorya" accentColor="bg-yellow-500" />
      <div className="grid grid-cols-2 gap-3 px-4">
        {categories.map((cat, index) => {
          const meta = CATEGORY_META[cat.slug] || defaultMeta;
          const { Icon } = meta;
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                href={getCategoryHref(cat.slug)}
                className="block relative rounded-2xl overflow-hidden group"
              >
                <div className="aspect-[4/3] relative">
                  {cat.image ? (
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 1024px) 50vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                  <div className={`absolute inset-0 bg-gradient-to-t ${meta.gradient}`} />

                  {/* Icon — top-right */}
                  <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Icon className="w-4 h-4 text-white" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="font-heading font-bold text-base text-white leading-snug">
                      {cat.name}
                    </h3>
                    <div className={`inline-flex items-center mt-1.5 px-2 py-0.5 rounded-full ${meta.badge}`}>
                      <span className="text-[10px] font-bold text-white">
                        {cat.count} articles
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
