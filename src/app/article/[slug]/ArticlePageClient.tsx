"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import parse from "html-react-parser";
import ArticleCard from "@/components/article/ArticleCard";
import AuthorBio from "@/components/article/AuthorBio";
import FuelPriceTable from "@/components/article/FuelPriceTable";
import AdSlot from "@/components/ui/AdSlot";
import FuelPriceSidebar from "@/components/sidebar/FuelPriceSidebar";
import TrendingSidebar from "@/components/sidebar/TrendingSidebar";
import MapSidebarWidget from "@/components/sidebar/MapSidebarWidget";
import NewsletterCTA from "@/components/sidebar/NewsletterCTA";
import BrandComparisonWidget from "@/components/sidebar/BrandComparisonWidget";
import { formatDate, timeAgo, getReadingTime } from "@/lib/utils";
import type { Article } from "@/lib/types";

interface ArticlePageClientProps {
  article: Article;
  relatedArticles: Article[];
}

export default function ArticlePageClient({ article, relatedArticles }: ArticlePageClientProps) {
  const readingTime = getReadingTime(article.content);
  const isFuelArticle = article.categories.some(
    (c) => c.slug === "gasolina" || c.slug === "diesel" || c.slug === "lpg"
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        {/* Article Content */}
        <article>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-orange-500 transition-colors">
              Home
            </Link>
            <span>/</span>
            {article.categories[0] && (
              <>
                <Link
                  href={`/category/${article.categories[0].slug}`}
                  className="hover:text-orange-500 transition-colors"
                >
                  {article.categories[0].name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-gray-600 truncate">{article.title}</span>
          </nav>

          {/* Article header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-3">
              {article.categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="text-xs font-semibold text-orange-500 bg-orange-50 px-3 py-1.5 rounded-full hover:bg-orange-100 transition-colors duration-200 cursor-pointer"
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            {/* Title */}
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              {article.title}
            </h1>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 mt-5 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                  {article.author.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {article.author.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatDate(article.date)} &middot; {readingTime} min read
                  </p>
                </div>
              </div>
              <span className="text-gray-300">|</span>
              <span>{timeAgo(article.date)}</span>
            </div>
          </motion.div>

          {/* Featured image */}
          {article.featuredImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-[16/9] rounded-2xl overflow-hidden mt-8 mb-10 bg-gray-200"
            >
              <Image
                src={article.featuredImage.url}
                alt={article.featuredImage.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 800px"
                priority
              />
            </motion.div>
          )}

          {/* Article body */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="article-content max-w-none"
          >
            {parse(article.content)}

            {/* Fuel-specific content */}
            <h2>Bakit Nagbabago ang Presyo ng Gas?</h2>
            <p>
              Ang presyo ng gasolina at diesel sa Pilipinas ay naaapektuhan ng
              maraming factors — mula sa global oil prices, exchange rate ng
              peso, at ang oil deregulation law. Ang Department of Energy (DOE)
              ang nag-oobserba ng price movements at nag-aanunsyo ng weekly
              adjustments.
            </p>
            <p>
              Ayon sa mga eksperto, ang mga fuel price adjustments ay
              karaniwang ipinapatupad tuwing Martes. Kaya naman importante
              na alam mo ang tamang oras ng pag-fill up para makatipid.
            </p>
            <blockquote>
              &ldquo;Ang pinakamagandang paraan para makatipid sa gas ay ang
              pag-monitor ng weekly price adjustments at pagpili ng tamang
              araw ng pag-fill up.&rdquo;
              — DOE Energy Analyst
            </blockquote>
            <h3>Mga Dapat Tandaan</h3>
            <ul>
              <li>Mag-fill up bago ang price hike announcement (usually Martes)</li>
              <li>I-compare ang presyo ng iba&apos;t ibang fuel brands</li>
              <li>Gamitin ang fuel-efficient driving techniques</li>
              <li>Regular maintenance ng sasakyan para sa better fuel efficiency</li>
            </ul>
          </motion.div>

          {/* In-article ad */}
          <AdSlot size="in-article" className="my-8" />

          {/* Fuel price table for fuel articles */}
          {isFuelArticle && <FuelPriceTable />}

          {/* Author Bio (E-E-A-T) */}
          <AuthorBio authorSlug={article.author.slug} />

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Link
                    key={tag.slug}
                    href={`/search?q=${encodeURIComponent(tag.name)}`}
                    className="text-sm bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-orange-50 hover:text-orange-500 transition-colors duration-200 cursor-pointer"
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

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

          {/* Related articles */}
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
            <BrandComparisonWidget />
            <MapSidebarWidget />
            <TrendingSidebar />
            <NewsletterCTA />
            <AdSlot size="sidebar" />
          </div>
        </div>
      </div>
    </div>
  );
}
