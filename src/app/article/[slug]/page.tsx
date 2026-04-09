import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticlePageClient from "./ArticlePageClient";
import { getArticleBySlug, getRelatedArticles } from "@/lib/content";
import { stripHtml } from "@/lib/utils";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://latestbalita.ph";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: "Article Not Found" };
  }

  const description = stripHtml(article.excerpt).slice(0, 160);

  return {
    title: article.title,
    description,
    alternates: {
      canonical: `${siteUrl}/article/${slug}`,
    },
    openGraph: {
      title: article.title,
      description,
      type: "article",
      publishedTime: article.date,
      modifiedTime: article.modified,
      authors: [article.author.name],
      images: article.featuredImage
        ? [
            {
              url: article.featuredImage.url,
              width: article.featuredImage.width,
              height: article.featuredImage.height,
              alt: article.featuredImage.alt,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: article.featuredImage ? [article.featuredImage.url] : [],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(article, 3);

  const articleUrl = `${siteUrl}/article/${slug}`;
  const categoryName = article.categories[0]?.name || "Balita";
  const categorySlug = article.categories[0]?.slug || "balita";

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
                name: categoryName,
                item: `${siteUrl}/category/${categorySlug}`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: article.title,
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
              "@id": articleUrl,
            },
            headline: article.title,
            description: stripHtml(article.excerpt),
            image: article.featuredImage?.url,
            datePublished: article.date,
            dateModified: article.modified,
            url: articleUrl,
            author: {
              "@type": "Person",
              name: article.author.name,
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
      <ArticlePageClient article={article} relatedArticles={relatedArticles} />
    </>
  );
}
