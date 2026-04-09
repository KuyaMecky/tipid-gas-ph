import { promises as fs } from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import type { FuelPrice } from "@/lib/types";

const SECRET = process.env.REVALIDATE_SECRET || "latestbalita2026";
const DATA_FILE = path.join(process.cwd(), "data", "fuel-prices.json");

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const prices = JSON.parse(raw) as FuelPrice[];
    return NextResponse.json({ count: prices.length, prices });
  } catch {
    return NextResponse.json({ error: "No price data found" }, { status: 404 });
  }
}

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!Array.isArray(body) || body.length === 0) {
      return NextResponse.json({ error: "Body must be a non-empty array of FuelPrice objects" }, { status: 400 });
    }

    // Validate shape
    for (const item of body) {
      if (!item.brand || !item.brandSlug || typeof item.unleaded !== "number") {
        return NextResponse.json({ error: "Each item must have brand, brandSlug, unleaded, regular, diesel, premium (numbers)" }, { status: 400 });
      }
    }

    // Stamp lastUpdated
    const now = new Date().toISOString();
    const prices: FuelPrice[] = body.map((item: FuelPrice) => ({
      ...item,
      lastUpdated: item.lastUpdated || now,
    }));

    await fs.writeFile(DATA_FILE, JSON.stringify(prices, null, 2), "utf-8");

    // Revalidate fuel-related pages
    revalidatePath("/");
    revalidatePath("/gasolina");

    return NextResponse.json({ ok: true, count: prices.length, updatedAt: now });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update prices", details: String(err) }, { status: 500 });
  }
}
