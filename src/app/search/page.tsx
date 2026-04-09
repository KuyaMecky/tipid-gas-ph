import type { Metadata } from "next";
import SearchPageClient from "./SearchPageClient";
import { searchArticles } from "@/lib/content";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Search: ${q}` : "Search",
    description: q
      ? `Search results for "${q}" on Latest Balita PH`
      : "Search articles on Latest Balita PH",
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;

  const results = q
    ? await searchArticles(q, 1, 20)
    : { data: [], total: 0, totalPages: 0 };

  return <SearchPageClient query={q || ""} initialResults={results.data} total={results.total} />;
}
