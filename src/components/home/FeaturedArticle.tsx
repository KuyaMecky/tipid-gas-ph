"use client";

import ArticleCardLarge from "../article/ArticleCardLarge";
import type { Article } from "@/lib/types";

interface FeaturedArticleProps {
  article: Article;
}

export default function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <section className="mt-6">
      <ArticleCardLarge article={article} />
    </section>
  );
}
