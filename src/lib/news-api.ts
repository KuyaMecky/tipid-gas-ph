import type { NewsDataResponse, TrendingNewsItem } from "./types";

const NEWSDATA_BASE = "https://newsdata.io/api/1/latest";
const API_KEY = process.env.NEWSDATA_API_KEY;

// Map NewsData categories to site categories
const CATEGORY_MAP: Record<string, string> = {
  top: "balita",
  politics: "eleksyon",
  business: "balita",
  entertainment: "showbiz",
  technology: "balita",
  sports: "balita",
  science: "balita",
  health: "tips",
  world: "balita",
  environment: "balita",
  food: "tips",
  tourism: "balita",
};

function mapCategory(categories: string[]): string {
  for (const cat of categories) {
    const mapped = CATEGORY_MAP[cat.toLowerCase()];
    if (mapped) return mapped;
  }
  return "balita";
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

function normalize(article: NewsDataResponse["results"][number]): TrendingNewsItem {
  return {
    id: article.article_id,
    title: article.title,
    description: article.description || "",
    url: article.link,
    imageUrl: article.image_url,
    source: article.source_name,
    sourceIcon: article.source_icon,
    publishedAt: article.pubDate,
    category: mapCategory(article.category),
  };
}

export type NewsCategory =
  | "top"
  | "politics"
  | "business"
  | "entertainment"
  | "sports"
  | "technology"
  | "science"
  | "health";

interface FetchNewsOptions {
  category?: NewsCategory;
  size?: number;
  language?: string;
}

export async function fetchTrendingNews(
  options: FetchNewsOptions = {}
): Promise<TrendingNewsItem[]> {
  if (!API_KEY) {
    console.warn("[news-api] NEWSDATA_API_KEY not set, returning empty results");
    return [];
  }

  const { category = "top", size = 10, language = "en" } = options;

  const params = new URLSearchParams({
    apikey: API_KEY,
    country: "ph",
    language,
    category,
    size: String(size),
    image: "1",
    removeduplicate: "1",
  });

  try {
    const res = await fetch(`${NEWSDATA_BASE}?${params.toString()}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error(`[news-api] HTTP ${res.status}: ${res.statusText}`);
      return [];
    }

    const data: NewsDataResponse = await res.json();

    if (data.status !== "success" || !data.results) {
      console.error("[news-api] Unexpected response:", data.status);
      return [];
    }

    return data.results
      .filter((a) => a.title && !a.duplicate)
      .map(normalize);
  } catch (err) {
    console.error("[news-api] Fetch failed:", err);
    return [];
  }
}

// Fetch fuel/gas-specific news for the hero banner
export async function fetchFuelNews(size = 5): Promise<TrendingNewsItem[]> {
  if (!API_KEY) {
    console.warn("[news-api] NEWSDATA_API_KEY not set, skipping fuel news");
    return [];
  }

  const params = new URLSearchParams({
    apikey: API_KEY,
    country: "ph",
    language: "en",
    q: "gasoline OR diesel OR fuel price OR gas price OR oil price OR petrol",
    size: String(size),
    image: "1",
    removeduplicate: "1",
  });

  try {
    const res = await fetch(`${NEWSDATA_BASE}?${params.toString()}`, {
      next: { revalidate: 1800 },
    });

    if (!res.ok) {
      console.error(`[news-api] fuel news HTTP ${res.status}: ${res.statusText}`);
      return [];
    }

    const data: NewsDataResponse = await res.json();

    if (data.status !== "success" || !data.results) {
      console.error("[news-api] fuel news unexpected response:", data.status);
      return [];
    }

    return data.results
      .filter((a) => a.title && !a.duplicate)
      .map((a) => ({
        ...normalize(a),
        category: "gasolina",
      }));
  } catch (err) {
    console.error("[news-api] fuel news fetch failed:", err);
    return [];
  }
}

// Fetch multiple categories in parallel
export async function fetchAllTrendingNews(): Promise<{
  top: TrendingNewsItem[];
  entertainment: TrendingNewsItem[];
  politics: TrendingNewsItem[];
  business: TrendingNewsItem[];
}> {
  const [top, entertainment, politics, business] = await Promise.all([
    fetchTrendingNews({ category: "top", size: 10 }),
    fetchTrendingNews({ category: "entertainment", size: 5 }),
    fetchTrendingNews({ category: "politics", size: 5 }),
    fetchTrendingNews({ category: "business", size: 5 }),
  ]);

  return { top, entertainment, politics, business };
}
