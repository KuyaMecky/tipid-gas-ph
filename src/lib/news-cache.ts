import { promises as fs } from "fs";
import path from "path";
import { fetchTrendingNews } from "./news-api";
import { fetchPhilippineNews } from "./rss-feeds";
import type { CachedNewsItem, TrendingNewsItem } from "./types";

// ---------------------------------------------------------------------------
// News caching layer — fetches from NewsData.io and persists to disk.
// On production (Linux), uses /tmp. On dev (Windows), uses os.tmpdir().
// ---------------------------------------------------------------------------

const CACHE_FILE = process.env.NEWS_CACHE_PATH || path.join(
  process.platform === "win32" ? (process.env.TEMP || "C:\\Temp") : "/tmp",
  "news-cache.json"
);

const CACHE_MAX_AGE_MS = 60 * 60 * 1000; // 1 hour

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

function trendingToCached(item: TrendingNewsItem): CachedNewsItem {
  return {
    id: item.id,
    slug: slugify(item.title),
    title: item.title,
    description: item.description,
    content: null,
    url: item.url,
    imageUrl: item.imageUrl,
    imageCredit: item.imageCredit,
    source: item.source,
    sourceIcon: item.sourceIcon,
    publishedAt: item.publishedAt,
    category: item.category,
    keywords: null,
    cachedAt: new Date().toISOString(),
  };
}

interface NewsCache {
  lastFetched: string;
  items: CachedNewsItem[];
}

async function readCache(): Promise<NewsCache | null> {
  try {
    const raw = await fs.readFile(CACHE_FILE, "utf-8");
    return JSON.parse(raw) as NewsCache;
  } catch {
    return null;
  }
}

async function writeCache(cache: NewsCache): Promise<void> {
  try {
    await fs.writeFile(CACHE_FILE, JSON.stringify(cache, null, 2), "utf-8");
  } catch (err) {
    console.error("[news-cache] Failed to write cache:", err);
  }
}

function isCacheStale(cache: NewsCache): boolean {
  const age = Date.now() - new Date(cache.lastFetched).getTime();
  return age > CACHE_MAX_AGE_MS;
}

export async function fetchAndCacheNews(): Promise<CachedNewsItem[]> {
  // Try to read existing cache first
  const existing = await readCache();
  if (existing && !isCacheStale(existing) && existing.items.length > 0) {
    return existing.items;
  }

  // Fetch fresh news from both NewsData.io and RSS feeds in parallel
  const [trending, rssItems] = await Promise.all([
    fetchTrendingNews({ category: "top", size: 10 }),
    fetchPhilippineNews(),
  ]);

  const allFresh = [...trending, ...rssItems];
  if (allFresh.length === 0 && existing?.items.length) {
    // Both sources returned nothing — serve stale cache
    return existing.items;
  }

  const cached = allFresh.map(trendingToCached);

  // Merge with existing to keep a bigger pool (dedup by id)
  const existingMap = new Map((existing?.items ?? []).map((i) => [i.id, i]));
  for (const item of cached) {
    existingMap.set(item.id, item);
  }

  // Keep only the 80 most recent (increased pool with RSS)
  const merged = Array.from(existingMap.values())
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 80);

  const newCache: NewsCache = {
    lastFetched: new Date().toISOString(),
    items: merged,
  };
  await writeCache(newCache);

  return merged;
}

export async function getCachedNewsById(id: string): Promise<CachedNewsItem | null> {
  const cache = await readCache();
  if (!cache) return null;
  return cache.items.find((item) => item.id === id) ?? null;
}

export async function getCachedNewsBySlug(slug: string): Promise<CachedNewsItem | null> {
  const cache = await readCache();
  if (!cache) return null;
  return cache.items.find((item) => item.slug === slug) ?? null;
}

export async function getAllCachedNews(): Promise<CachedNewsItem[]> {
  const cache = await readCache();
  return cache?.items ?? [];
}
