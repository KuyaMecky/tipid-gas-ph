"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import SearchBar from "@/components/ui/SearchBar";
import ArticleCard from "@/components/article/ArticleCard";
import Sidebar from "@/components/layout/Sidebar";
import { mockArticles } from "@/lib/mock-data";

interface SearchPageClientProps {
  query: string;
}

export default function SearchPageClient({ query }: SearchPageClientProps) {
  const results = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    return mockArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.categories.some((c) => c.name.toLowerCase().includes(q)) ||
        a.author.name.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        <div>
          {/* Search header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-heading text-3xl font-bold text-gray-900 mb-4 tracking-tight">
              {query ? `Results for "${query}"` : "Search Articles"}
            </h1>
            <SearchBar className="max-w-xl" />
          </motion.div>

          {/* Results */}
          {query && (
            <p className="text-sm text-gray-500 mb-6">
              {results.length} article{results.length !== 1 ? "s" : ""} found
            </p>
          )}

          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((article, i) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  index={i}
                  variant="compact"
                />
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                No results found
              </h2>
              <p className="text-gray-500">
                Try different keywords or browse our categories.
              </p>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">✍️</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Start searching
              </h2>
              <p className="text-gray-500">
                Enter a keyword above to find articles, topics, and authors.
              </p>
            </div>
          )}
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
