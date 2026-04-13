import * as wp from "./wordpress";
import { mockArticles, mockCategories } from "./mock-data";
import type { Article, Category, PaginatedResponse, FeedItem, FeedContentType, FeedUrgency } from "./types";

// ---------------------------------------------------------------------------
// Fallback data layer — wraps WordPress API calls with mock data fallback.
// Ensures the site never breaks even when WordPress has no content.
// ---------------------------------------------------------------------------

export async function getArticles(
  page = 1,
  perPage = 10
): Promise<PaginatedResponse<Article>> {
  try {
    const result = await wp.getPosts(page, perPage);
    if (result.data.length > 0) return result;
  } catch (err) {
    console.warn("[content] getPosts failed, using mock data:", err);
  }
  // Fallback to mock
  const start = (page - 1) * perPage;
  const slice = mockArticles.slice(start, start + perPage);
  return {
    data: slice,
    total: mockArticles.length,
    totalPages: Math.ceil(mockArticles.length / perPage),
  };
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const article = await wp.getPostBySlug(slug);
    if (article) return article;
  } catch (err) {
    console.warn("[content] getPostBySlug failed, using mock data:", err);
  }
  return mockArticles.find((a) => a.slug === slug) ?? null;
}

export async function getArticlesByCategory(
  categorySlug: string,
  page = 1,
  perPage = 10
): Promise<PaginatedResponse<Article>> {
  try {
    const result = await wp.getPostsByCategory(categorySlug, page, perPage);
    if (result.data.length > 0) return result;
  } catch (err) {
    console.warn("[content] getPostsByCategory failed, using mock data:", err);
  }
  // Fallback: filter mock articles by category
  const filtered = mockArticles.filter((a) =>
    a.categories.some((c) => c.slug === categorySlug)
  );
  const start = (page - 1) * perPage;
  const slice = filtered.slice(start, start + perPage);
  return {
    data: slice.length > 0 ? slice : mockArticles.slice(0, perPage),
    total: filtered.length || mockArticles.length,
    totalPages: Math.ceil((filtered.length || mockArticles.length) / perPage),
  };
}

export async function getAllCategories(): Promise<Category[]> {
  try {
    const cats = await wp.getCategories();
    if (cats.length > 0) return cats;
  } catch (err) {
    console.warn("[content] getCategories failed, using mock data:", err);
  }
  return mockCategories;
}

export async function getRelatedArticles(
  article: Article,
  limit = 3
): Promise<Article[]> {
  try {
    const categoryIds = article.categories
      .map((c) => c.id)
      .filter((id): id is number => id !== undefined);
    if (categoryIds.length > 0) {
      const related = await wp.getRelatedPosts(categoryIds, article.id, limit);
      if (related.length > 0) return related;
    }
  } catch (err) {
    console.warn("[content] getRelatedPosts failed, using mock data:", err);
  }
  return mockArticles.filter((a) => a.id !== article.id).slice(0, limit);
}

export async function searchArticles(
  query: string,
  page = 1,
  perPage = 20
): Promise<PaginatedResponse<Article>> {
  try {
    const result = await wp.searchPosts(query, page, perPage);
    if (result.data.length > 0) return result;
  } catch (err) {
    console.warn("[content] searchPosts failed, using mock data:", err);
  }
  // Fallback: local mock search
  const q = query.toLowerCase();
  const filtered = mockArticles.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.categories.some((c) => c.name.toLowerCase().includes(q))
  );
  return {
    data: filtered,
    total: filtered.length,
    totalPages: 1,
  };
}

// ---------------------------------------------------------------------------
// Featured articles — posts in the "featured" category get hero treatment
// ---------------------------------------------------------------------------

export async function getFeaturedArticles(
  perPage = 5
): Promise<Article[]> {
  try {
    const result = await wp.getPostsByCategory("featured", 1, perPage);
    if (result.data.length > 0) return result.data;
  } catch (err) {
    console.warn("[content] getFeaturedArticles failed:", err);
  }
  return [];
}

// ---------------------------------------------------------------------------
// Convert Article to FeedItem for homepage feed
// ---------------------------------------------------------------------------

const CONTENT_TYPE_MAP: Record<string, FeedContentType> = {
  gasolina: "ALERT",
  diesel: "ALERT",
  lpg: "ALERT",
  balita: "BALITA",
  tips: "TIPID",
  eleksyon: "BALITA",
  showbiz: "KWENTO",
  sports: "KWENTO",
  featured: "ALERT",
};

function extractPriceChange(title: string): string | undefined {
  // Match patterns like "+P9.00", "-P1.20", "+P3.50/kg", "+P16.00 to P18.00/L"
  const match = title.match(/([+-]P[\d.]+(?:\/[a-zA-Z]+)?(?:\s*to\s*P[\d.]+(?:\/[a-zA-Z]+)?)?)/i);
  return match ? match[1] : undefined;
}

export function articleToFeedItem(article: Article, isFeatured = false): FeedItem {
  const catSlugs = article.categories.map((c) => c.slug);
  // Pick the most specific content type (skip "featured" slug for type mapping)
  const typeCatSlug = catSlugs.find((s) => s !== "featured" && CONTENT_TYPE_MAP[s]) ?? catSlugs[0] ?? "balita";
  const contentType = CONTENT_TYPE_MAP[typeCatSlug] ?? "BALITA";

  // Determine urgency from featured status and post age
  const ageHours = (Date.now() - new Date(article.date).getTime()) / (1000 * 60 * 60);
  let urgency: FeedUrgency = "normal";
  if (isFeatured) {
    urgency = ageHours < 12 ? "critical" : "high";
  } else if (ageHours < 24) {
    urgency = "high";
  }

  const priceChange = extractPriceChange(article.title);

  return {
    id: article.id,
    slug: article.slug,
    contentType,
    urgency,
    hookHeadline: article.title,
    subHeadline: article.excerpt.replace(/<[^>]*>/g, "").slice(0, 120),
    actionLabel: "Basahin",
    actionHref: `/article/${article.slug}`,
    reactionCount: Math.floor(Math.random() * 1000) + 100,
    isBreaking: isFeatured && ageHours < 12,
    priceChange,
    featuredImage: article.featuredImage,
    author: article.author,
    date: article.date,
    categories: article.categories,
  };
}
