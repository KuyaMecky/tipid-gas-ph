import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// On-demand revalidation — call this after creating/updating/deleting a post
// in WordPress to instantly refresh cached pages.
//
// Usage:
//   GET /api/revalidate?secret=<SECRET>&path=/
//   GET /api/revalidate?secret=<SECRET>&path=/balita
//   GET /api/revalidate?secret=<SECRET>&path=/article/my-post-slug
//   GET /api/revalidate?secret=<SECRET>&all=1  (revalidate all main pages)

const SECRET = process.env.REVALIDATE_SECRET || "latestbalita2026";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const secret = searchParams.get("secret");
  const path = searchParams.get("path");
  const all = searchParams.get("all");

  if (secret !== SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  const revalidated: string[] = [];

  if (all === "1") {
    const paths = ["/", "/balita", "/tips", "/eleksyon", "/gasolina", "/sitemap.xml"];
    for (const p of paths) {
      revalidatePath(p);
      revalidated.push(p);
    }
  } else if (path) {
    revalidatePath(path);
    revalidated.push(path);
  } else {
    // Default: revalidate homepage
    revalidatePath("/");
    revalidated.push("/");
  }

  return NextResponse.json({ revalidated, now: Date.now() });
}
