import type { WPPost } from "./types";

const API_URL =
  process.env.WORDPRESS_API_URL ||
  process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json";

const INTERNAL_HOST = process.env.WORDPRESS_INTERNAL_HOST || "";
const APP_USER = process.env.WORDPRESS_APP_USER || "";
const APP_PASSWORD = process.env.WORDPRESS_APP_PASSWORD || "";

export function isAuthConfigured(): boolean {
  return !!(APP_USER && APP_PASSWORD);
}

function getAuthHeaders(): Record<string, string> {
  const token = Buffer.from(`${APP_USER}:${APP_PASSWORD}`).toString("base64");
  const headers: Record<string, string> = {
    Authorization: `Basic ${token}`,
  };
  if (INTERNAL_HOST) {
    headers["Host"] = INTERNAL_HOST;
  }
  return headers;
}

interface CreatePostParams {
  title: string;
  content: string;
  excerpt: string;
  status?: "publish" | "draft";
  categories?: number[];
  featured_media?: number;
}

export async function createPost(params: CreatePostParams): Promise<WPPost> {
  const url = `${API_URL}/wp/v2/posts`;

  const body: Record<string, unknown> = {
    title: params.title,
    content: params.content,
    excerpt: params.excerpt,
    status: params.status || "publish",
  };

  if (params.categories?.length) {
    body.categories = params.categories;
  }
  if (params.featured_media) {
    body.featured_media = params.featured_media;
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`WP create post failed: ${res.status} — ${text}`);
  }

  return (await res.json()) as WPPost;
}

interface UploadMediaResult {
  id: number;
  source_url: string;
}

export async function uploadMediaFromUrl(
  imageUrl: string,
  filename: string,
  altText: string,
  caption: string
): Promise<UploadMediaResult> {
  // Download the image
  const imgRes = await fetch(imageUrl, {
    headers: {
      "User-Agent": "LatestBalitaPH/1.0",
      Accept: "image/*",
    },
  });

  if (!imgRes.ok) {
    throw new Error(`Failed to download image: ${imgRes.status} ${imageUrl}`);
  }

  const contentType = imgRes.headers.get("content-type") || "image/jpeg";
  const buffer = Buffer.from(await imgRes.arrayBuffer());

  // Sanitize filename
  const safeName = filename
    .replace(/[^a-zA-Z0-9_.-]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 100);

  // Upload to WP media library
  const uploadUrl = `${API_URL}/wp/v2/media`;

  const res = await fetch(uploadUrl, {
    method: "POST",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${safeName}"`,
    },
    body: buffer,
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`WP media upload failed: ${res.status} — ${text}`);
  }

  const media = (await res.json()) as { id: number; source_url: string };

  // Update alt text and caption
  if (altText || caption) {
    const updateUrl = `${API_URL}/wp/v2/media/${media.id}`;
    await fetch(updateUrl, {
      method: "POST",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        alt_text: altText,
        caption: caption,
      }),
      cache: "no-store",
    });
  }

  return { id: media.id, source_url: media.source_url };
}

export async function searchPostsByTitle(query: string): Promise<WPPost[]> {
  const url = new URL(`${API_URL}/wp/v2/posts`);
  url.searchParams.set("search", query);
  url.searchParams.set("per_page", "5");
  url.searchParams.set("status", "publish,draft");

  const headers: Record<string, string> = { ...getAuthHeaders() };

  const res = await fetch(url.toString(), {
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    console.warn(`[wp-publisher] Search failed: ${res.status}`);
    return [];
  }

  return (await res.json()) as WPPost[];
}
