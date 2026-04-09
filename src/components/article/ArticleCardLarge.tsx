"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ArticleMeta from "./ArticleMeta";
import Button from "../ui/Button";
import { truncate } from "@/lib/utils";
import type { Article } from "@/lib/types";

interface ArticleCardLargeProps {
  article: Article;
}

export default function ArticleCardLarge({ article }: ArticleCardLargeProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group cursor-pointer"
    >
      <Link
        href={`/article/${article.slug}`}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-6 rounded-2xl border-2 border-gray-200 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-200 bg-white"
      >
        <div className="relative aspect-[16/9] md:aspect-auto rounded-xl overflow-hidden bg-gray-900">
          {article.featuredImage && (
            <Image
              src={article.featuredImage.url}
              alt={article.featuredImage.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          )}
        </div>
        <div className="flex flex-col justify-center">
          <ArticleMeta
            authorName={article.author.name}
            authorAvatar={article.author.avatar}
            date={article.date}
            categoryName={article.categories[0]?.name}
            showFullDate
          />
          <h2 className="mt-3 font-heading text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-orange-500 transition-colors duration-200 leading-tight tracking-tight">
            {article.title}
          </h2>
          <p className="mt-3 text-gray-500 leading-relaxed font-serif">
            {truncate(article.excerpt, 200)}
          </p>
          <div className="mt-5">
            <Button variant="primary" size="md">
              Read More
            </Button>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
