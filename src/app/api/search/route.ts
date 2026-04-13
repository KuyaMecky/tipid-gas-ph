import { NextRequest, NextResponse } from "next/server";
import { searchArticles } from "@/lib/content";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const q = searchParams.get("q") || "";
  const page = Number(searchParams.get("page") || "1");
  const perPage = Number(searchParams.get("per_page") || "20");

  if (!q.trim()) {
    return NextResponse.json({ data: [], total: 0, totalPages: 0 });
  }

  const results = await searchArticles(q, page, perPage);
  return NextResponse.json(results);
}
