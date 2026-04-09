"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowTopRightOnSquareIcon, ClockIcon } from "@heroicons/react/24/outline";
import { formatDistanceToNow, format } from "date-fns";
import ArticleCard from "@/components/article/ArticleCard";
import FuelPriceTable from "@/components/article/FuelPriceTable";
import AdSlot from "@/components/ui/AdSlot";
import FuelPriceSidebar from "@/components/sidebar/FuelPriceSidebar";
import TrendingSidebar from "@/components/sidebar/TrendingSidebar";
import NewsletterCTA from "@/components/sidebar/NewsletterCTA";
import type { CachedNewsItem, Article } from "@/lib/types";
import { proxyImageUrl } from "@/lib/image-proxy";

const CATEGORY_COLORS: Record<string, string> = {
  balita: "bg-red-600",
  gasolina: "bg-yellow-500",
  showbiz: "bg-pink-500",
  eleksyon: "bg-orange-500",
  tips: "bg-emerald-500",
};

interface NewsArticlePageClientProps {
  item: CachedNewsItem;
  relatedArticles: Article[];
}

export default function NewsArticlePageClient({
  item,
  relatedArticles,
}: NewsArticlePageClientProps) {
  const categoryColor = CATEGORY_COLORS[item.category] || CATEGORY_COLORS.balita;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        <article>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-orange-500 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/balita" className="hover:text-orange-500 transition-colors">
              Balita
            </Link>
            <span>/</span>
            <span className="text-gray-600 truncate">{item.title}</span>
          </nav>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Source badge + category */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white ${categoryColor}`}>
                {item.category.toUpperCase()}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                {item.sourceIcon && (
                  <Image
                    src={item.sourceIcon}
                    alt={item.source}
                    width={14}
                    height={14}
                    className="rounded-full"
                  />
                )}
                {item.source}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              {item.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <ClockIcon className="w-4 h-4" />
                <time dateTime={item.publishedAt}>
                  {format(new Date(item.publishedAt), "MMMM d, yyyy 'at' h:mm a")}
                </time>
              </div>
              <span className="text-gray-300">|</span>
              <span>{formatDistanceToNow(new Date(item.publishedAt), { addSuffix: true })}</span>
            </div>
          </motion.div>

          {/* Featured image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 mb-10"
          >
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
              {item.imageUrl ? (
                <Image
                  src={proxyImageUrl(item.imageUrl) || item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 800px"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-red-800 to-yellow-600" />
              )}
            </div>
            {item.imageCredit && (
              <p className="mt-2 text-xs text-gray-400 italic">
                {item.imageCredit}
              </p>
            )}
          </motion.div>

          {/* Description / summary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="article-content max-w-none"
          >
            {item.description && (
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {item.description}
              </p>
            )}

            {item.content && (
              <div className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
                {item.content}
              </div>
            )}

            {/* Keywords */}
            {item.keywords && item.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {item.keywords.map((kw) => (
                  <span
                    key={kw}
                    className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          {/* CTA to original source */}
          <div className="my-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl">
            <p className="text-sm text-gray-600 mb-3">
              Ang artikulong ito ay mula sa <strong>{item.source}</strong>.
              Para sa buong detalye, bisitahin ang original na artikulo.
            </p>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors min-h-[44px]"
            >
              Basahin ang Buong Artikulo
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            </a>
          </div>

          <AdSlot size="in-article" className="my-8" />

          {/* Fuel price table for fuel-related news */}
          {item.category === "gasolina" && <FuelPriceTable />}

          {/* Share buttons */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-900 mb-3">
              I-share ang article na ito
            </p>
            <div className="flex gap-3">
              {["Facebook", "Twitter", "LinkedIn", "Copy Link"].map((platform) => (
                <button
                  key={platform}
                  className="px-4 py-2 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-orange-50 hover:text-orange-500 transition-colors duration-200 cursor-pointer min-h-[44px] flex items-center"
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>

          {/* Related WordPress articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6 tracking-tight">
                Mga Kaugnay na Artikulo
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedArticles.map((a, i) => (
                  <ArticleCard key={a.id} article={a} index={i} variant="compact" />
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Sidebar */}
        <div className="hidden lg:block">
          <div className="sticky top-20 space-y-5">
            <FuelPriceSidebar />
            <TrendingSidebar />
            <NewsletterCTA />
            <AdSlot size="sidebar" />
          </div>
        </div>
      </div>
    </div>
  );
}
