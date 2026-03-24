import type { Metadata } from "next";
import CategoryPageClient from "./CategoryPageClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // In production, fetch category from WordPress:
  // const category = await getCategoryBySlug(slug);
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `${title} News`,
    description: `Pinakabagong ${title.toLowerCase()} balita at updates mula sa Latest Balita PH.`,
    openGraph: {
      title: `${title} News | Latest Balita PH`,
      description: `Pinakabagong ${title.toLowerCase()} balita at updates.`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  // In production:
  // const category = await getCategoryBySlug(slug);
  // const { data: posts, total, totalPages } = await getPostsByCategory(slug);

  return <CategoryPageClient slug={slug} />;
}
