import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";
import { fetchTrendingNews, fetchFuelNews } from "@/lib/news-api";
import { getArticles, getFeaturedArticles, getAllCategories, articleToFeedItem } from "@/lib/content";
import { fetchAndCacheNews } from "@/lib/news-cache";
import { getFuelPrices } from "@/lib/fuel-prices";
import { fetchPhilippineNews } from "@/lib/rss-feeds";

export const metadata: Metadata = {
  title: "Latest Balita PH — Presyo ng Gasolina, Diesel, at LPG sa Pilipinas",
  description:
    "Real-time fuel price alerts, tipid tips, at balita tungkol sa gasolina, diesel, at LPG sa Pilipinas. I-compare ang presyo ng Petron, Shell, Caltex, Phoenix, at iba pa.",
  keywords: [
    "presyo ng gasolina",
    "gas price today philippines",
    "diesel price philippines",
    "fuel price update",
    "petron price today",
    "shell price today",
    "caltex price today",
    "lpg price today",
    "oil price rollback",
    "presyo ng diesel",
    "gasolina ngayon",
    "fuel price philippines 2026",
  ],
};

function HomePageJsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Latest Balita PH",
          url: "https://latestbalita.ph",
          potentialAction: {
            "@type": "SearchAction",
            target: { "@type": "EntryPoint", urlTemplate: "https://latestbalita.ph/search?q={search_term_string}" },
            "query-input": "required name=search_term_string",
          },
        }) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Latest Balita PH",
          url: "https://latestbalita.ph",
          logo: {
            "@type": "ImageObject",
            url: "https://latestbalita.ph/logo.png",
            width: 600,
            height: 60,
          },
          description: "Ang pinaka-updated na fuel price guide sa Pilipinas. Real-time presyo ng gasolina, diesel, at LPG mula sa lahat ng major brands.",
          sameAs: [
            "https://www.facebook.com/latestbalitaph",
          ],
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
            availableLanguage: ["Filipino", "English"],
          },
        }) }}
      />
    </>
  );
}

export default async function HomePage() {
  const [trendingNews, fuelNews, wpArticlesResult, featuredArticles, wpCategories, fuelPrices, rssNews] = await Promise.all([
    fetchTrendingNews({ category: "top", size: 10 }),
    fetchFuelNews(5),
    getArticles(1, 20),
    getFeaturedArticles(5),
    getAllCategories(),
    getFuelPrices(),
    fetchPhilippineNews(),
  ]);

  // Also cache news items for /news/[id] pages
  await fetchAndCacheNews();

  // Featured posts get hero treatment (urgency: critical/high)
  const featuredIds = new Set(featuredArticles.map((a) => a.id));
  const featuredFeedItems = featuredArticles.map((a) => articleToFeedItem(a, true));

  // Regular posts (exclude featured to avoid duplicates)
  const regularFeedItems = wpArticlesResult.data
    .filter((a) => !featuredIds.has(a.id))
    .map((a) => articleToFeedItem(a));

  // Featured first, then regular
  const wpFeedItems = [...featuredFeedItems, ...regularFeedItems];

  // Filter out "Uncategorized" and "Featured" from displayed categories
  const displayCategories = wpCategories.filter(
    (c) => c.slug !== "uncategorized" && c.slug !== "featured"
  );

  // Build hero fuel news with fallback chain:
  // 1. NewsData.io fuelNews (current behavior)
  // 2. WP featured articles converted to TrendingNewsItem format
  // 3. RSS fuel-related items
  let heroFuelNews = fuelNews;

  if (heroFuelNews.length === 0) {
    // Fallback to WP featured articles
    heroFuelNews = featuredArticles.slice(0, 5).map((a) => ({
      id: `wp-${a.id}`,
      title: a.title,
      description: a.excerpt.replace(/<[^>]*>/g, "").slice(0, 200),
      url: `/article/${a.slug}`,
      imageUrl: a.featuredImage?.url || "",
      source: "Latest Balita PH",
      sourceIcon: null,
      publishedAt: a.date,
      imageCredit: null,
      category: a.categories.find((c) => c.slug !== "featured")?.name || "Balita",
    }));
  }

  if (heroFuelNews.length === 0 && rssNews.length > 0) {
    // Fallback to RSS items (prefer fuel-related)
    const fuelKeywords = ["gas", "fuel", "oil", "petrol", "diesel", "presyo", "gasolina", "lpg"];
    const fuelRss = rssNews.filter((item) =>
      fuelKeywords.some((k) => item.title.toLowerCase().includes(k))
    );
    heroFuelNews = (fuelRss.length > 0 ? fuelRss : rssNews).slice(0, 5);
  }

  // Build HookHero slides from WP featured articles instead of mock data
  const hookHeroSlides = featuredArticles.slice(0, 4).map((a) => {
    const catSlug = a.categories.find((c) => c.slug !== "featured")?.slug || "balita";
    const gradientMap: Record<string, string> = {
      gasolina: "from-red-600 to-orange-500",
      diesel: "from-blue-600 to-blue-400",
      lpg: "from-amber-600 to-amber-400",
      balita: "from-red-700 to-red-500",
      tips: "from-green-600 to-emerald-500",
      eleksyon: "from-orange-600 to-orange-400",
      showbiz: "from-pink-600 to-purple-500",
      sports: "from-teal-600 to-teal-400",
    };
    const ageHours = (Date.now() - new Date(a.date).getTime()) / (1000 * 60 * 60);
    return {
      hookText: a.title,
      subText: a.excerpt.replace(/<[^>]*>/g, "").slice(0, 140),
      bgGradient: gradientMap[catSlug] || "from-red-600 to-orange-500",
      ctaLabel: "Basahin",
      ctaHref: `/article/${a.slug}`,
      urgency: (ageHours < 12 ? "critical" : ageHours < 48 ? "high" : "normal") as "critical" | "high" | "normal",
      image: a.featuredImage?.url || "/images/categories/balita.jpg",
      category: a.categories.find((c) => c.slug !== "featured")?.name || "Balita",
    };
  });

  return (
    <>
      <HomePageJsonLd />
      <HomePageClient
        trendingNews={trendingNews}
        fuelNews={heroFuelNews}
        wpFeedItems={wpFeedItems}
        wpCategories={displayCategories}
        fuelPrices={fuelPrices}
        rssNews={rssNews}
        hookHeroSlides={hookHeroSlides.length > 0 ? hookHeroSlides : undefined}
      />
    </>
  );
}
