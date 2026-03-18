"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { Article } from "@/lib/types";

interface NewsStoriesProps {
  articles: Article[];
}

export default function NewsStories({ articles }: NewsStoriesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-heading text-2xl md:text-3xl font-bold text-orange-500 tracking-tight"
        >
          Mga Kwento
        </motion.h2>
        <Link
          href="/balita"
          className="text-orange-500 text-sm font-semibold hover:text-orange-500 transition-colors"
        >
          See All &rarr;
        </Link>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
      >
        {articles.map((article, i) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="flex-shrink-0 snap-start"
          >
            <Link
              href={`/article/${article.slug}`}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 p-[3px]">
                <div className="w-full h-full rounded-full bg-white p-[2px]">
                  <div className="w-full h-full rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg group-hover:bg-orange-600 transition-colors">
                    {article.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </div>
              </div>
              <span className="text-sm font-medium text-orange-500 text-center max-w-[80px] truncate">
                {article.author.name.split(" ")[0]}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
