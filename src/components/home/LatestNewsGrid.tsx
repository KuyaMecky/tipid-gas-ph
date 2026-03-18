"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ArticleCard from "../article/ArticleCard";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import type { Article } from "@/lib/types";

interface LatestNewsGridProps {
  articles: Article[];
  title: string;
  seeAllHref?: string;
}

export default function LatestNewsGrid({
  articles,
  title,
  seeAllHref = "/balita",
}: LatestNewsGridProps) {
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
          className="flex items-center gap-2 text-orange-500 text-sm font-semibold hover:text-orange-500 transition-colors duration-200 group cursor-pointer"
        >
          See All
          <span className="w-8 h-8 rounded-full border-2 border-orange-500 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all duration-200">
            <ArrowRightIcon className="w-4 h-4" />
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map((article, i) => (
          <ArticleCard key={article.id} article={article} index={i} variant="compact" />
        ))}
      </div>
    </section>
  );
}
