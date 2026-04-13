import type { MetadataRoute } from "next";
import { mockCategories } from "@/lib/mock-data";
import { getArticles } from "@/lib/content";
import { getFuelPrices } from "@/lib/fuel-prices";
import { getAllCachedNews } from "@/lib/news-cache";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://latestbalita.ph";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Pillar pages
  const pillarPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/mapa`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/gasolina`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.95,
    },
    {
      url: `${siteUrl}/balita`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.85,
    },
    {
      url: `${siteUrl}/tips`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/eleksyon`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
  ];

  // Brand cluster pages
  const fuelPrices = await getFuelPrices();
  const brandPages: MetadataRoute.Sitemap = fuelPrices.map((fuel) => ({
    url: `${siteUrl}/gasolina/${fuel.brandSlug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.85,
  }));

  const categoryPages: MetadataRoute.Sitemap = mockCategories.map((cat) => ({
    url: `${siteUrl}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  // Fetch real articles from WordPress (with fallback to mock)
  let articlePages: MetadataRoute.Sitemap = [];
  try {
    const { data: articles } = await getArticles(1, 100);
    articlePages = articles.map((article) => ({
      url: `${siteUrl}/article/${article.slug}`,
      lastModified: new Date(article.modified),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    // Fallback handled inside getArticles
  }

  // Fetch cached news items
  let newsPages: MetadataRoute.Sitemap = [];
  try {
    const newsItems = await getAllCachedNews();
    newsPages = newsItems.map((item) => ({
      url: `${siteUrl}/news/${item.id}`,
      lastModified: new Date(item.cachedAt),
      changeFrequency: "daily" as const,
      priority: 0.6,
    }));
  } catch {
    // Non-critical
  }

  return [...staticPages, ...pillarPages, ...brandPages, ...categoryPages, ...articlePages, ...newsPages];
}
