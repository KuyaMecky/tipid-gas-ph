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

const CATEGORY_META: Record<string, { bg: string; badge: string; image: string; Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }> = {
  gasolina: { bg: "from-red-700 via-orange-600 to-yellow-500", badge: "bg-yellow-500", image: "/images/categories/gasolina.jpg", Icon: FireIcon },
  diesel: { bg: "from-blue-800 via-blue-600 to-cyan-500", badge: "bg-blue-600", image: "/images/categories/diesel.jpg", Icon: TruckIcon },
  lpg: { bg: "from-amber-700 via-amber-500 to-yellow-400", badge: "bg-amber-500", image: "/images/categories/lpg.jpg", Icon: BoltIcon },
  balita: { bg: "from-red-800 via-red-600 to-rose-500", badge: "bg-red-600", image: "/images/categories/balita.jpg", Icon: NewspaperIcon },
  tips: { bg: "from-emerald-700 via-emerald-500 to-teal-400", badge: "bg-emerald-500", image: "/images/categories/tips.jpg", Icon: LightBulbIcon },
  eleksyon: { bg: "from-orange-700 via-orange-500 to-amber-400", badge: "bg-orange-500", image: "/images/categories/eleksyon.jpg", Icon: MegaphoneIcon },
  showbiz: { bg: "from-pink-700 via-fuchsia-500 to-purple-500", badge: "bg-pink-500", image: "/images/categories/showbiz.jpg", Icon: StarIcon },
  sports: { bg: "from-green-700 via-teal-500 to-cyan-400", badge: "bg-teal-500", image: "/images/categories/sports.jpg", Icon: StarIcon },
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
                  <Image
                    src={meta.image}
                    alt={cat.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

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
