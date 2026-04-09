import type {
  WPPost,
  WPCategory,
  WPTag,
  WPAuthor,
  Article,
  Category,
  PaginatedResponse,
} from "./types";

const API_URL =
  process.env.WORDPRESS_API_URL ||
  process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json";

const REVALIDATE = Number(process.env.REVALIDATE_TIME) || 60;

// When using an internal URL (127.0.0.1) to bypass Cloudflare, we need to
// send the real Host header so Nginx routes to the correct server block and
// WordPress generates correct URLs. NODE_TLS_REJECT_UNAUTHORIZED is handled
// via env var in the PM2 ecosystem config.
const INTERNAL_HOST = process.env.WORDPRESS_INTERNAL_HOST || "";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function fetchAPI<T>(
  endpoint: string,
  params: Record<string, string> = {},
  returnHeaders = false
): Promise<T | { data: T; headers: Headers }> {
  const url = new URL(`${API_URL}/wp/v2${endpoint}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const headers: Record<string, string> = {};
  if (INTERNAL_HOST) {
    headers["Host"] = INTERNAL_HOST;
  }

  const res = await fetch(url.toString(), {
    next: { revalidate: REVALIDATE },
    headers,
  });

  if (!res.ok) {
    throw new Error(`WordPress API error: ${res.status} ${res.statusText}`);
  }

  const data = (await res.json()) as T;

  if (returnHeaders) {
    return { data, headers: res.headers } as { data: T; headers: Headers };
  }

  return data;
}

function transformPost(post: WPPost): Article {
  const embedded = post._embedded;
  const media = embedded?.["wp:featuredmedia"]?.[0];
  const author = embedded?.author?.[0];
  const categories = embedded?.["wp:term"]?.[0] ?? [];
  const tags = embedded?.["wp:term"]?.[1] ?? [];

  return {
    id: post.id,
    slug: post.slug,
    title: post.title.rendered,
    excerpt: post.excerpt.rendered,
    content: post.content.rendered,
    date: post.date,
    modified: post.modified,
    featuredImage: media
      ? {
          url: media.source_url,
          alt: media.alt_text || post.title.rendered,
          width: media.media_details?.width || 1200,
          height: media.media_details?.height || 630,
        }
      : null,
    author: {
      name: author?.name ?? "Editorial Team",
      slug: author?.slug ?? "editorial",
      avatar: author?.avatar_urls?.["96"] ?? "",
    },
    categories: categories.map((c: WPCategory) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
    })),
    tags: tags.map((t: WPTag) => ({ name: t.name, slug: t.slug })),
  };
}

// ---------------------------------------------------------------------------
// Posts
// ---------------------------------------------------------------------------

export async function getPosts(
  page = 1,
  perPage = 10,
  categoryId?: number
): Promise<PaginatedResponse<Article>> {
  const params: Record<string, string> = {
    _embed: "true",
    page: String(page),
    per_page: String(perPage),
    orderby: "date",
    order: "desc",
  };

  if (categoryId) params.categories = String(categoryId);

  const result = (await fetchAPI<WPPost[]>("/posts", params, true)) as {
    data: WPPost[];
    headers: Headers;
  };

  return {
    data: result.data.map(transformPost),
    total: Number(result.headers.get("X-WP-Total") || 0),
    totalPages: Number(result.headers.get("X-WP-TotalPages") || 0),
  };
}

export async function getPostBySlug(slug: string): Promise<Article | null> {
  const posts = (await fetchAPI<WPPost[]>("/posts", {
    _embed: "true",
    slug,
  })) as WPPost[];

  if (!posts.length) return null;
  return transformPost(posts[0]);
}

export async function getPostsByCategory(
  categorySlug: string,
  page = 1,
  perPage = 10
): Promise<PaginatedResponse<Article>> {
  const categories = (await fetchAPI<WPCategory[]>("/categories", {
    slug: categorySlug,
  })) as WPCategory[];

  if (!categories.length) {
    return { data: [], total: 0, totalPages: 0 };
  }

  return getPosts(page, perPage, categories[0].id);
}

export async function searchPosts(
  query: string,
  page = 1,
  perPage = 10
): Promise<PaginatedResponse<Article>> {
  const result = (await fetchAPI<WPPost[]>(
    "/posts",
    {
      _embed: "true",
      search: query,
      page: String(page),
      per_page: String(perPage),
    },
    true
  )) as { data: WPPost[]; headers: Headers };

  return {
    data: result.data.map(transformPost),
    total: Number(result.headers.get("X-WP-Total") || 0),
    totalPages: Number(result.headers.get("X-WP-TotalPages") || 0),
  };
}

export async function getRelatedPosts(
  categoryIds: number[],
  excludeId: number,
  perPage = 4
): Promise<Article[]> {
  if (!categoryIds.length) return [];

  const posts = (await fetchAPI<WPPost[]>("/posts", {
    _embed: "true",
    categories: categoryIds.join(","),
    exclude: String(excludeId),
    per_page: String(perPage),
  })) as WPPost[];

  return posts.map(transformPost);
}

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

export async function getCategories(): Promise<Category[]> {
  const categories = (await fetchAPI<WPCategory[]>("/categories", {
    per_page: "100",
    hide_empty: "true",
  })) as WPCategory[];

  return categories.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description,
    count: c.count,
  }));
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  const categories = (await fetchAPI<WPCategory[]>("/categories", {
    slug,
  })) as WPCategory[];

  if (!categories.length) return null;
  const c = categories[0];
  return {
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description,
    count: c.count,
  };
}

// ---------------------------------------------------------------------------
// Tags
// ---------------------------------------------------------------------------

export async function getTags(perPage = 20) {
  const tags = (await fetchAPI<WPTag[]>("/tags", {
    per_page: String(perPage),
    orderby: "count",
    order: "desc",
    hide_empty: "true",
  })) as WPTag[];

  return tags.map((t) => ({ id: t.id, name: t.name, slug: t.slug, count: t.count }));
}

// ---------------------------------------------------------------------------
// Authors
// ---------------------------------------------------------------------------

export async function getAuthors() {
  const authors = (await fetchAPI<WPAuthor[]>("/users", {
    per_page: "10",
  })) as WPAuthor[];

  return authors.map((a) => ({
    id: a.id,
    name: a.name,
    slug: a.slug,
    avatar: a.avatar_urls?.["96"] ?? "",
    description: a.description,
  }));
}
