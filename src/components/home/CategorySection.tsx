"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ArticleCard from "../article/ArticleCard";
import type { Article } from "@/lib/types";

interface CategorySectionProps {
  title: string;
  articles: Article[];
  seeAllHref: string;
}

export default function CategorySection({
  title,
  articles,
  seeAllHref,
}: CategorySectionProps) {
  if (!articles.length) return null;

  // Layout: first article large, rest in grid
  const [featured, ...rest] = articles;

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-heading text-2xl md:text-3xl font-bold text-orange-500 tracking-tight"
        >
          {title}
        </motion.h2>
        <Link
          href={seeAllHref}
          className="text-orange-500 text-sm font-semibold hover:text-orange-500 transition-colors"
        >
          See All
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left small card */}
        {rest[0] && (
          <ArticleCard article={rest[0]} index={0} variant="compact" />
        )}

        {/* Center featured */}
        <div className="md:row-span-2">
          <ArticleCard article={featured} index={1} />
        </div>

        {/* Right small card */}
        {rest[1] && (
          <ArticleCard article={rest[1]} index={2} variant="compact" />
        )}

        {/* Bottom row */}
        {rest.slice(2, 5).map((article, i) => (
          <ArticleCard
            key={article.id}
            article={article}
            index={i + 3}
            variant="compact"
          />
        ))}
      </div>
    </section>
  );
}
