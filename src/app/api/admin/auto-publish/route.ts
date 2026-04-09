import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import {
  runAutoPublish,
  getPublishStats,
  getRecentPublishLog,
} from "@/lib/auto-publisher";

const SECRET = process.env.REVALIDATE_SECRET || "latestbalita2026";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  try {
    const stats = await getPublishStats();
    const recentEntries = await getRecentPublishLog(50);
    return NextResponse.json({ ...stats, recentEntries });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to read publish log", details: String(err) },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  try {
    const result = await runAutoPublish();

    // Revalidate main paths after successful publish
    if (result.published > 0) {
      const paths = [
        "/",
        "/balita",
        "/tips",
        "/eleksyon",
        "/gasolina",
        "/showbiz",
        "/sports",
        "/sitemap.xml",
      ];
      for (const p of paths) {
        revalidatePath(p);
      }
    }

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: "Auto-publish run failed", details: String(err) },
      { status: 500 }
    );
  }
}
