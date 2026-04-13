import Parser from "rss-parser";
import type { TrendingNewsItem } from "./types";

// Configure parser with custom fields to capture media:content and media:thumbnail
const parser = new Parser({
  timeout: 10000,
  headers: {
    "User-Agent": "LatestBalitaPH/1.0",
    Accept: "application/rss+xml, application/xml, text/xml",
  },
  customFields: {
    item: [
      ["media:content", "mediaContent"],
      ["media:thumbnail", "mediaThumbnail"],
    ],
  },
});

interface RSSSource {
  url: string;
  name: string;
  category: string;
}

const RSS_SOURCES: RSSSource[] = [
  { url: "https://data.gmanetwork.com/gno/rss/news/feed.xml", name: "GMA News", category: "balita" },
  { url: "https://data.gmanetwork.com/gno/rss/sports/feed.xml", name: "GMA Sports", category: "sports" },
  { url: "https://data.gmanetwork.com/gno/rss/showbiz/feed.xml", name: "GMA Showbiz", category: "showbiz" },
  { url: "https://www.rappler.com/feed/", name: "Rappler", category: "balita" },
  { url: "https://newsinfo.inquirer.net/feed", name: "Inquirer", category: "balita" },
  { url: "https://www.philstar.com/rss/headlines", name: "Philstar", category: "balita" },
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

/**
 * Extract image URL from various RSS fields.
 * Priority: enclosure > media:thumbnail > media:content > description/content HTML
 */
function extractImageUrl(item: Parser.Item): string | null {
  // 1. Enclosure with image type
  const enc = item.enclosure;
  if (enc?.url && enc.type?.startsWith("image")) {
    return enc.url;
  }

  // 2. Enclosure URL without type check (some feeds omit type)
  if (enc?.url && /\.(jpg|jpeg|png|webp|gif)/i.test(enc.url)) {
    return enc.url;
  }

  // 3. media:thumbnail — can be object with $ attrs or string
  const thumbnail = (item as Record<string, unknown>).mediaThumbnail;
  if (thumbnail) {
    if (typeof thumbnail === "object" && thumbnail !== null) {
      const attrs = (thumbnail as Record<string, unknown>).$ as Record<string, string> | undefined;
      if (attrs?.url) return attrs.url;
    }
    if (typeof thumbnail === "string") {
      const urlMatch = thumbnail.match(/(?:url="|src=")([^"]+)"/);
      if (urlMatch) return urlMatch[1];
    }
  }

  // 4. media:content — can be object with $ attrs, or CDATA HTML string (GMA style)
  const mediaContent = (item as Record<string, unknown>).mediaContent;
  if (mediaContent) {
    if (typeof mediaContent === "object" && mediaContent !== null) {
      const attrs = (mediaContent as Record<string, unknown>).$ as Record<string, string> | undefined;
      if (attrs?.url) return attrs.url;
    }
    if (typeof mediaContent === "string") {
      const imgMatch = mediaContent.match(/<img[^>]+src="([^"]+)"/);
      if (imgMatch) return imgMatch[1];
    }
  }

  // 5. Parse <img> from content (rss-parser maps <description> here)
  if (item.content) {
    const imgMatch = item.content.match(/<img[^>]+src="([^"]+)"/);
    if (imgMatch) return imgMatch[1];
  }

  // 6. Parse <img> from summary (some parsers put description here)
  if (item.summary) {
    const imgMatch = (item.summary as string).match(/<img[^>]+src="([^"]+)"/);
    if (imgMatch) return imgMatch[1];
  }

  return null;
}

function normalizeItem(
  item: Parser.Item,
  source: RSSSource
): TrendingNewsItem | null {
  if (!item.title || !item.link) return null;

  const id = `rss-${slugify(source.name)}-${slugify(item.title)}`;
  const description =
    item.contentSnippet?.slice(0, 200) ||
    item.content?.replace(/<[^>]+>/g, "").slice(0, 200) ||
    "";

  const imageUrl = extractImageUrl(item);

  return {
    id,
    title: item.title,
    description,
    url: item.link,
    imageUrl,
    imageCredit: imageUrl ? `Photo: ${source.name}` : null,
    source: source.name,
    sourceIcon: null,
    publishedAt: item.isoDate || item.pubDate || new Date().toISOString(),
    category: source.category,
  };
}

async function fetchSingleFeed(source: RSSSource): Promise<TrendingNewsItem[]> {
  try {
    const feed = await parser.parseURL(source.url);
    const items: TrendingNewsItem[] = [];
    for (const entry of feed.items.slice(0, 10)) {
      const normalized = normalizeItem(entry, source);
      if (normalized) items.push(normalized);
    }
    return items;
  } catch (err) {
    console.warn(`[rss-feeds] Failed to fetch ${source.name}: ${err}`);
    return [];
  }
}

export async function fetchPhilippineNews(): Promise<TrendingNewsItem[]> {
  const results = await Promise.allSettled(
    RSS_SOURCES.map((source) => fetchSingleFeed(source))
  );

  const allItems: TrendingNewsItem[] = [];
  for (const result of results) {
    if (result.status === "fulfilled") {
      allItems.push(...result.value);
    }
  }

  // Sort by date descending
  allItems.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // Deduplicate by title similarity (first 40 chars lowercase)
  const seen = new Set<string>();
  const deduped: TrendingNewsItem[] = [];
  for (const item of allItems) {
    const key = item.title.toLowerCase().slice(0, 40);
    if (!seen.has(key)) {
      seen.add(key);
      deduped.push(item);
    }
  }

  return deduped.slice(0, 30);
}
