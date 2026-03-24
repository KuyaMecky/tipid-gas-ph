import type { MetadataRoute } from "next";
import { mockArticles, mockCategories, mockFuelPrices } from "@/lib/mock-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://latestbalitaph.com";

export default function sitemap(): MetadataRoute.Sitemap {
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
  const brandPages: MetadataRoute.Sitemap = mockFuelPrices.map((fuel) => ({
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

  const articlePages: MetadataRoute.Sitemap = mockArticles.map((article) => ({
    url: `${siteUrl}/article/${article.slug}`,
    lastModified: new Date(article.modified),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...pillarPages, ...brandPages, ...categoryPages, ...articlePages];
}
