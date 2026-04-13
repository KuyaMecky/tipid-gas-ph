import type { Metadata } from "next";
import CategoryPageClient from "./CategoryPageClient";
import { getArticlesByCategory } from "@/lib/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://latestbalita.ph";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `${title} News`,
    description: `Pinakabagong ${title.toLowerCase()} balita at updates mula sa Latest Balita PH.`,
    alternates: {
      canonical: `${siteUrl}/category/${slug}`,
    },
    openGraph: {
      title: `${title} News | Latest Balita PH`,
      description: `Pinakabagong ${title.toLowerCase()} balita at updates.`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const { data: articles } = await getArticlesByCategory(slug, 1, 20);

  return <CategoryPageClient slug={slug} articles={articles} />;
}
