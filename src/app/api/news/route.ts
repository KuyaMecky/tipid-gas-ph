import { NextResponse } from "next/server";
import { fetchAndCacheNews } from "@/lib/news-cache";

export async function GET() {
  const items = await fetchAndCacheNews();
  return NextResponse.json({
    count: items.length,
    items,
  });
}
