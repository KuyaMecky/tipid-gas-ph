import type { Metadata } from "next";
import SearchPageClient from "./SearchPageClient";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Search: ${q}` : "Search",
    description: q
      ? `Search results for "${q}" on Philippine Developer News`
      : "Search articles on Philippine Developer News",
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;

  // In production:
  // const { data: results, total } = await searchPosts(q || "", 1, 20);

  return <SearchPageClient query={q || ""} />;
}
