"use client";

import { useMemo } from "react";
import BreakingNewsTicker from "@/components/home/BreakingNewsTicker";
import ArticleCardLarge from "@/components/article/ArticleCardLarge";
import ArticleCard from "@/components/article/ArticleCard";
import Sidebar from "@/components/layout/Sidebar";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { mockArticles, mockCategories } from "@/lib/mock-data";

interface CategoryPageClientProps {
  slug: string;
}

export default function CategoryPageClient({ slug }: CategoryPageClientProps) {
  const category = useMemo(
    () => mockCategories.find((c) => c.slug === slug),
    [slug]
  );

  const categoryName = category?.name ?? slug.charAt(0).toUpperCase() + slug.slice(1);

  // In production, filter by category from WP data
  const articles = mockArticles;
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        <div className="space-y-10">
          {/* Breaking news banner */}
          <BreakingNewsTicker
            headline={`${categoryName} News`}
            subtext={`Stay updated with the latest ${categoryName.toLowerCase()} news and insights from the Philippine tech industry.`}
          />

          {/* Featured article */}
          <AnimatedSection>
            <ArticleCardLarge article={featured} />
          </AnimatedSection>

          {/* Section title */}
          <AnimatedSection delay={0.1}>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-orange-500 tracking-tight">
              {categoryName} News Update
            </h2>
          </AnimatedSection>

          {/* Second featured (larger style) */}
          {rest[0] && (
            <AnimatedSection delay={0.15}>
              <ArticleCardLarge article={rest[0]} />
            </AnimatedSection>
          )}

          {/* Grid of remaining articles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.slice(1).map((article, i) => (
              <AnimatedSection key={article.id} delay={i * 0.08}>
                <ArticleCard article={article} index={i} variant="compact" />
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block">
          <div className="sticky top-20">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
