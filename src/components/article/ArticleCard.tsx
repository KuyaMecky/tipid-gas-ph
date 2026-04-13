"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ArticleMeta from "./ArticleMeta";
import { truncate } from "@/lib/utils";
import type { Article } from "@/lib/types";

interface ArticleCardProps {
  article: Article;
  index?: number;
  variant?: "default" | "compact" | "horizontal";
}

export default function ArticleCard({ article, index = 0, variant = "default" }: ArticleCardProps) {
  if (variant === "horizontal") {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="group cursor-pointer"
      >
        <Link href={`/article/${article.slug}`} className="flex gap-4 items-start">
          <div className="relative w-24 h-24 md:w-32 md:h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
            {article.featuredImage && (
              <Image
                src={article.featuredImage.url}
                alt={article.featuredImage.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 96px, 128px"
              />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-semibold text-gray-900 group-hover:text-orange-500 transition-colors duration-200 line-clamp-2 text-sm md:text-base leading-snug">
              {article.title}
            </h3>
            <div className="mt-2">
              <ArticleMeta
                authorName={article.author.name}
                authorAvatar={article.author.avatar}
                date={article.date}
                categoryName={article.categories[0]?.name}
              />
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  if (variant === "compact") {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="group cursor-pointer"
      >
        <Link href={`/article/${article.slug}`} className="block">
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-gray-900 mb-3">
            {article.featuredImage && (
              <Image
                src={article.featuredImage.url}
                alt={article.featuredImage.alt}
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            )}
          </div>
          <ArticleMeta
            authorName={article.author.name}
            authorAvatar={article.author.avatar}
            date={article.date}
            categoryName={article.categories[0]?.name}
            showFullDate
          />
          <h3 className="mt-2 font-heading font-semibold text-gray-900 group-hover:text-orange-500 transition-colors duration-200 line-clamp-2 text-base leading-snug">
            {article.title}
          </h3>
          <p className="mt-1.5 text-gray-500 text-sm line-clamp-2 font-serif">
            {truncate(article.excerpt, 100)}
          </p>
        </Link>
      </motion.article>
    );
  }

  // default
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <Link href={`/article/${article.slug}`} className="block">
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-gray-900 mb-4">
          {article.featuredImage && (
            <Image
              src={article.featuredImage.url}
              alt={article.featuredImage.alt}
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}
        </div>
        <ArticleMeta
          authorName={article.author.name}
          authorAvatar={article.author.avatar}
          date={article.date}
          categoryName={article.categories[0]?.name}
          showFullDate
        />
        <h3 className="mt-2 font-heading font-semibold text-gray-900 group-hover:text-orange-500 transition-colors duration-200 line-clamp-2 text-lg leading-snug">
          {article.title}
        </h3>
        <p className="mt-2 text-gray-500 text-sm line-clamp-3 font-serif">
          {truncate(article.excerpt, 150)}
        </p>
        <span className="mt-3 inline-block text-xs font-semibold text-gray-400 border border-gray-200 rounded-md px-3 py-1 group-hover:border-orange-500 group-hover:text-orange-500 transition-colors duration-200">
          READ MORE
        </span>
      </Link>
    </motion.article>
  );
}
