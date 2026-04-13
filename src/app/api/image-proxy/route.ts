import { NextRequest, NextResponse } from "next/server";

const ALLOWED_DOMAINS = [
  "images.gmanews.tv",
  "images.gmanetwork.com",
  "www.gmanetwork.com",
  "assets.rappler.com",
  "media.inquirer.net",
  "newsinfo.inquirer.net",
  "www.inquirer.net",
  "media.philstar.com",
  "www.philstar.com",
  "newsdata.io",
  "images.unsplash.com",
  "abs-cbn.com",
  "static.abs-cbn.com",
  "www.abs-cbn.com",
];

function isDomainAllowed(url: string): boolean {
  try {
    const hostname = new URL(url).hostname;
    return ALLOWED_DOMAINS.some(
      (d) => hostname === d || hostname.endsWith(`.${d}`)
    );
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  if (!isDomainAllowed(url)) {
    return NextResponse.json({ error: "Domain not allowed" }, { status: 403 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "LatestBalitaPH/1.0",
        Accept: "image/*",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Upstream returned ${response.status}` },
        { status: 502 }
      );
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, s-maxage=604800",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch image" }, { status: 502 });
  }
}
