"use client";

import { motion } from "framer-motion";
import ArticleCard from "../article/ArticleCard";
import type { Article } from "@/lib/types";

interface TrendingNewsProps {
  articles: Article[];
}

export default function TrendingNews({ articles }: TrendingNewsProps) {
  if (!articles.length) return null;

  const [main, ...sidebar] = articles;

  return (
    <section>
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="font-heading text-xl font-bold text-gray-900 mb-5 tracking-tight"
      >
        Trending Balita
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Main trending article */}
        <ArticleCard article={main} index={0} />

        {/* Sidebar trending list */}
        <div className="space-y-5">
          {sidebar.slice(0, 3).map((article, i) => (
            <ArticleCard
              key={article.id}
              article={article}
              index={i + 1}
              variant="horizontal"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
