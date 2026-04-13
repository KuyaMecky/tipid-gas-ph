import type { Metadata } from "next";
import ArticlePageClient from "./ArticlePageClient";
import { mockArticles } from "@/lib/mock-data";
import { stripHtml } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // In production: const article = await getPostBySlug(slug);
  const article = mockArticles.find((a) => a.slug === slug) ?? mockArticles[0];

  const description = stripHtml(article.excerpt).slice(0, 160);

  return {
    title: article.title,
    description,
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

  // In production:
  // const article = await getPostBySlug(slug);
  // if (!article) notFound();
  // const related = await getRelatedPosts(article.categories.map(c => c.id), article.id);

  const article = mockArticles.find((a) => a.slug === slug) ?? mockArticles[0];

  return (
    <>
      {/* JSON-LD structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: article.title,
            description: stripHtml(article.excerpt),
            image: article.featuredImage?.url,
            datePublished: article.date,
            dateModified: article.modified,
            author: {
              "@type": "Person",
              name: article.author.name,
            },
            publisher: {
              "@type": "Organization",
              name: "Latest Balita PH",
              logo: {
                "@type": "ImageObject",
                url: "/logo.png",
              },
            },
          }),
        }}
      />
      <ArticlePageClient slug={slug} />
    </>
  );
}
