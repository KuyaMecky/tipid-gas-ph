import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCachedNewsById, fetchAndCacheNews } from "@/lib/news-cache";
import { getArticles } from "@/lib/content";
import NewsArticlePageClient from "./NewsArticlePageClient";
import type { Article } from "@/lib/types";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://latestbalita.ph";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = await getCachedNewsById(id);

  if (!item) {
    return { title: "News Article Not Found" };
  }

  const description = item.description.slice(0, 160);

  return {
    title: item.title,
    description,
    alternates: {
      canonical: `${siteUrl}/news/${id}`,
    },
    openGraph: {
      title: item.title,
      description,
      type: "article",
      publishedTime: item.publishedAt,
      images: item.imageUrl ? [{ url: item.imageUrl }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description,
      images: item.imageUrl ? [item.imageUrl] : [],
    },
  };
}

export default async function NewsPage({ params }: Props) {
  const { id } = await params;

  // Ensure cache is fresh
  await fetchAndCacheNews();

  const item = await getCachedNewsById(id);
  if (!item) {
    notFound();
  }

  // Fetch related WP articles for the sidebar/related section
  let relatedArticles: Article[] = [];
  try {
    const result = await getArticles(1, 4);
    relatedArticles = result.data;
  } catch {
    // Non-critical, proceed without related articles
  }

  const newsUrl = `${siteUrl}/news/${id}`;

  return (
    <>
      {/* BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: siteUrl,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "News",
                item: `${siteUrl}/news`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: item.title,
              },
            ],
          }),
        }}
      />
      {/* NewsArticle JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": newsUrl,
            },
            headline: item.title,
            description: item.description,
            image: item.imageUrl,
            datePublished: item.publishedAt,
            url: newsUrl,
            author: {
              "@type": "Organization",
              name: item.source,
            },
            publisher: {
              "@type": "Organization",
              name: "Latest Balita PH",
              logo: {
                "@type": "ImageObject",
                url: `${siteUrl}/logo.png`,
              },
            },
          }),
        }}
      />
      <NewsArticlePageClient item={item} relatedArticles={relatedArticles} />
    </>
  );
}
