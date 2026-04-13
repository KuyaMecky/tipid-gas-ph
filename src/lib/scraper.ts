import * as cheerio from "cheerio";
import type { ScrapedArticle } from "./types";

interface SourceConfig {
  bodySelector: string;
  removeSelectors: string[];
}

const SOURCE_CONFIGS: Record<string, SourceConfig> = {
  "gmanetwork.com": {
    bodySelector: ".story_main, .article-body, .story-body",
    removeSelectors: [
      ".related-stories",
      ".story-references",
      "script",
      "style",
      ".ad-container",
      ".social-share",
      "iframe",
      ".embed-wrap",
    ],
  },
  "rappler.com": {
    bodySelector: ".cXenseParse, .post-single__body, .article-main-content",
    removeSelectors: [
      ".related-posts",
      "script",
      "style",
      ".ad-slot",
      ".social-media-share",
      "iframe",
      ".rappler-ad",
    ],
  },
  "inquirer.net": {
    bodySelector: "#article_content, .entry-content, .article-body-content",
    removeSelectors: [
      ".related-posts",
      "script",
      "style",
      ".inline-ad",
      ".social-share-inline",
      "iframe",
      "#inq-ad",
    ],
  },
  "philstar.com": {
    bodySelector: ".article__content, .entry-content, .article-content",
    removeSelectors: [
      ".related-stories",
      "script",
      "style",
      ".ad-container",
      ".social-share",
      "iframe",
      ".article__related",
    ],
  },
};

// Category IDs matching WordPress
const CATEGORY_IDS: Record<string, number> = {
  gasolina: 2,
  diesel: 3,
  lpg: 4,
  balita: 5,
  tips: 6,
  eleksyon: 7,
  featured: 8,
  showbiz: 9,
  sports: 10,
};

const FUEL_KEYWORDS = [
  "gasolina", "gasoline", "diesel", "fuel", "petrol",
  "oil price", "gas price", "fuel price", "presyo ng gas",
  "petron", "shell", "caltex", "phoenix", "seaoil",
  "price hike", "price rollback", "price increase",
  "lpg", "kerosene", "oil deregulation",
];

function getDomainKey(url: string): string | null {
  try {
    const hostname = new URL(url).hostname;
    for (const domain of Object.keys(SOURCE_CONFIGS)) {
      if (hostname.includes(domain)) return domain;
    }
  } catch {
    // invalid URL
  }
  return null;
}

export function detectCategory(
  title: string,
  sourceName: string
): { id: number; slug: string } {
  const lowerTitle = title.toLowerCase();

  // Fuel keywords override everything
  for (const kw of FUEL_KEYWORDS) {
    if (lowerTitle.includes(kw)) {
      return { id: CATEGORY_IDS.gasolina, slug: "gasolina" };
    }
  }

  // Source-based mapping
  const lowerSource = sourceName.toLowerCase();
  if (lowerSource.includes("sports")) {
    return { id: CATEGORY_IDS.sports, slug: "sports" };
  }
  if (lowerSource.includes("showbiz")) {
    return { id: CATEGORY_IDS.showbiz, slug: "showbiz" };
  }

  // Default to balita
  return { id: CATEGORY_IDS.balita, slug: "balita" };
}

export async function scrapeArticle(
  url: string,
  title: string,
  source: string,
  imageUrl: string | null,
  publishedAt: string,
  rssDescription?: string
): Promise<ScrapedArticle | null> {
  const category = detectCategory(title, source);
  const imageCredit = imageUrl ? `Photo: ${source}` : null;

  const domainKey = getDomainKey(url);
  if (!domainKey) {
    // Unsupported domain — fall back to RSS description
    if (rssDescription && rssDescription.length > 50) {
      return buildFromDescription(title, url, source, imageUrl, imageCredit, publishedAt, rssDescription, category);
    }
    console.warn(`[scraper] Unsupported domain for URL: ${url}`);
    return null;
  }

  const config = SOURCE_CONFIGS[domainKey];

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        Referer: "https://www.google.com/",
      },
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      console.warn(`[scraper] HTTP ${res.status} for ${url}`);
      if (rssDescription && rssDescription.length > 50) {
        return buildFromDescription(title, url, source, imageUrl, imageCredit, publishedAt, rssDescription, category);
      }
      return null;
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    // Remove unwanted elements
    for (const sel of config.removeSelectors) {
      $(sel).remove();
    }

    // Extract body content
    const bodyEl = $(config.bodySelector);

    // Clean up the HTML: keep paragraphs and headings
    const paragraphs: string[] = [];
    if (bodyEl.length) {
      bodyEl.find("p, h2, h3, h4, blockquote").each((_, el) => {
        const text = $(el).text().trim();
        if (text.length > 20) {
          const tag = (el as { tagName: string }).tagName;
          if (tag === "p") {
            paragraphs.push(`<p>${text}</p>`);
          } else if (tag.startsWith("h")) {
            paragraphs.push(`<${tag}>${text}</${tag}>`);
          } else if (tag === "blockquote") {
            paragraphs.push(`<blockquote><p>${text}</p></blockquote>`);
          }
        }
      });
    }

    // If scraping got too little content, fall back to RSS description
    if (paragraphs.length < 2) {
      console.warn(`[scraper] Low content (${paragraphs.length} paragraphs) for ${url}, trying RSS fallback`);
      if (rssDescription && rssDescription.length > 50) {
        return buildFromDescription(title, url, source, imageUrl, imageCredit, publishedAt, rssDescription, category);
      }
      if (paragraphs.length === 0) return null;
    }

    const content = paragraphs.join("\n");

    // Generate excerpt from first paragraph text
    const firstText = paragraphs.length > 0
      ? paragraphs[0].replace(/<[^>]+>/g, "").slice(0, 200)
      : title;
    const excerpt = firstText + (firstText.length >= 200 ? "..." : "");

    return {
      title,
      content,
      excerpt,
      sourceUrl: url,
      sourceName: source,
      imageUrl,
      imageCredit,
      publishedAt,
      categoryId: category.id,
      categorySlug: category.slug,
    };
  } catch (err) {
    console.warn(`[scraper] Error scraping ${url}: ${err}`);
    if (rssDescription && rssDescription.length > 50) {
      return buildFromDescription(title, url, source, imageUrl, imageCredit, publishedAt, rssDescription, category);
    }
    return null;
  }
}

function buildFromDescription(
  title: string,
  url: string,
  source: string,
  imageUrl: string | null,
  imageCredit: string | null,
  publishedAt: string,
  description: string,
  category: { id: number; slug: string }
): ScrapedArticle {
  // Clean HTML tags from RSS description
  const cleanDesc = description.replace(/<[^>]+>/g, "").trim();
  const content = `<p>${cleanDesc}</p>`;
  const excerpt = cleanDesc.slice(0, 200) + (cleanDesc.length > 200 ? "..." : "");

  return {
    title,
    content,
    excerpt,
    sourceUrl: url,
    sourceName: source,
    imageUrl,
    imageCredit,
    publishedAt,
    categoryId: category.id,
    categorySlug: category.slug,
  };
}

export function buildWpContent(scraped: ScrapedArticle): string {
  let wpContent = "";

  // Image credit header
  if (scraped.imageCredit) {
    wpContent += `<p><em>${scraped.imageCredit}</em></p>\n\n`;
  }

  // Main body
  wpContent += scraped.content;

  // Source attribution footer
  wpContent += `\n\n<hr />\n`;
  wpContent += `<p><strong>Source:</strong> <a href="${scraped.sourceUrl}" target="_blank" rel="noopener noreferrer">${scraped.sourceName}</a></p>\n`;
  wpContent += `<p><em>This article was originally published by ${scraped.sourceName}. `;
  wpContent += `Visit the <a href="${scraped.sourceUrl}" target="_blank" rel="noopener noreferrer">original article</a> for the full story.</em></p>`;

  return wpContent;
}
