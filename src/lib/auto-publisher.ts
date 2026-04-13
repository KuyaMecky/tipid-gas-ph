import { promises as fs } from "fs";
import path from "path";
import { fetchPhilippineNews } from "./rss-feeds";
import { scrapeArticle, buildWpContent } from "./scraper";
import {
  isAuthConfigured,
  createPost,
  uploadMediaFromUrl,
  searchPostsByTitle,
} from "./wp-publisher";
import type {
  AutoPublishLog,
  AutoPublishLogEntry,
  AutoPublishRunResult,
} from "./types";

const LOG_FILE = path.join(process.cwd(), "data", "auto-publish-log.json");
const MAX_LOG_ENTRIES = 500;
const MAX_ITEMS_PER_RUN = 10;

async function readLog(): Promise<AutoPublishLog> {
  try {
    const raw = await fs.readFile(LOG_FILE, "utf-8");
    return JSON.parse(raw) as AutoPublishLog;
  } catch {
    return { lastRun: null, totalPublished: 0, entries: [] };
  }
}

async function writeLog(log: AutoPublishLog): Promise<void> {
  // Prune to max entries (keep newest)
  if (log.entries.length > MAX_LOG_ENTRIES) {
    log.entries = log.entries.slice(-MAX_LOG_ENTRIES);
  }
  await fs.writeFile(LOG_FILE, JSON.stringify(log, null, 2), "utf-8");
}

function fingerprint(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 50);
}

function slugifyFilename(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
}

export async function runAutoPublish(): Promise<AutoPublishRunResult> {
  const result: AutoPublishRunResult = {
    success: false,
    published: 0,
    skipped: 0,
    failed: 0,
    entries: [],
    errors: [],
  };

  // Check auth
  if (!isAuthConfigured()) {
    result.errors.push("WordPress Application Password not configured (WORDPRESS_APP_USER / WORDPRESS_APP_PASSWORD)");
    return result;
  }

  // Read existing log for dedup
  const log = await readLog();
  const existingFingerprints = new Set(log.entries.map((e) => e.fingerprint));

  // Fetch RSS items
  let rssItems;
  try {
    rssItems = await fetchPhilippineNews();
  } catch (err) {
    result.errors.push(`RSS fetch failed: ${err}`);
    return result;
  }

  if (!rssItems.length) {
    result.errors.push("No RSS items returned");
    return result;
  }

  let processedCount = 0;

  for (const item of rssItems) {
    if (processedCount >= MAX_ITEMS_PER_RUN) break;

    const fp = fingerprint(item.title);
    const entry: AutoPublishLogEntry = {
      sourceUrl: item.url,
      title: item.title,
      fingerprint: fp,
      sourceName: item.source,
      categorySlug: "",
      wpPostId: null,
      status: "skipped",
      publishedAt: new Date().toISOString(),
    };

    // Dedup layer 1: check log fingerprint
    if (existingFingerprints.has(fp)) {
      entry.status = "skipped";
      result.skipped++;
      result.entries.push(entry);
      processedCount++;
      continue;
    }

    // Dedup layer 2: WP search
    try {
      const searchQuery = item.title.slice(0, 60);
      const existing = await searchPostsByTitle(searchQuery);
      if (existing.length > 0) {
        const existingFp = fingerprint(existing[0].title.rendered);
        if (existingFp === fp) {
          entry.status = "skipped";
          result.skipped++;
          result.entries.push(entry);
          existingFingerprints.add(fp);
          processedCount++;
          continue;
        }
      }
    } catch (err) {
      console.warn(`[auto-publisher] WP search failed for "${item.title}": ${err}`);
      // Continue anyway — scrape + publish
    }

    // Scrape article
    let scraped;
    try {
      scraped = await scrapeArticle(
        item.url,
        item.title,
        item.source,
        item.imageUrl,
        item.publishedAt,
        item.description
      );
    } catch (err) {
      entry.status = "failed";
      entry.error = `Scrape error: ${err}`;
      result.failed++;
      result.entries.push(entry);
      existingFingerprints.add(fp);
      processedCount++;
      continue;
    }

    if (!scraped) {
      entry.status = "failed";
      entry.error = "Scraper returned null (no content or unsupported domain)";
      result.failed++;
      result.entries.push(entry);
      existingFingerprints.add(fp);
      processedCount++;
      continue;
    }

    entry.categorySlug = scraped.categorySlug;

    // Upload featured image (if available)
    let featuredMediaId: number | undefined;
    if (scraped.imageUrl) {
      try {
        const imgFilename = slugifyFilename(item.title) + ".jpg";
        const uploaded = await uploadMediaFromUrl(
          scraped.imageUrl,
          imgFilename,
          scraped.title,
          scraped.imageCredit || `Photo: ${scraped.sourceName}`
        );
        featuredMediaId = uploaded.id;
      } catch (err) {
        console.warn(`[auto-publisher] Image upload failed for "${item.title}": ${err}`);
        // Proceed without featured image
      }
    }

    // Build WP content and create post
    try {
      const wpContent = buildWpContent(scraped);
      const post = await createPost({
        title: scraped.title,
        content: wpContent,
        excerpt: scraped.excerpt,
        status: "publish",
        categories: [scraped.categoryId],
        featured_media: featuredMediaId,
      });

      entry.status = "published";
      entry.wpPostId = post.id;
      result.published++;
    } catch (err) {
      entry.status = "failed";
      entry.error = `WP create post failed: ${err}`;
      result.failed++;
    }

    result.entries.push(entry);
    existingFingerprints.add(fp);
    processedCount++;
  }

  // Update log
  log.lastRun = new Date().toISOString();
  log.totalPublished += result.published;
  log.entries.push(...result.entries);
  await writeLog(log);

  result.success = true;
  return result;
}

export { readLog as readPublishLog };

export async function getPublishStats(): Promise<{
  lastRun: string | null;
  totalPublished: number;
  recentCount: number;
}> {
  const log = await readLog();
  return {
    lastRun: log.lastRun,
    totalPublished: log.totalPublished,
    recentCount: log.entries.filter((e) => e.status === "published").length,
  };
}

export async function getRecentPublishLog(
  limit = 50
): Promise<AutoPublishLogEntry[]> {
  const log = await readLog();
  return log.entries.slice(-limit).reverse();
}
