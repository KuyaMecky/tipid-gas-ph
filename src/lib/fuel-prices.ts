import { promises as fs } from "fs";
import path from "path";
import type { FuelPrice } from "./types";
import { mockFuelPrices } from "./mock-data";

const DATA_FILE = path.join(process.cwd(), "data", "fuel-prices.json");

export async function getFuelPrices(): Promise<FuelPrice[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw) as FuelPrice[];
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // File missing or invalid — fall back to mock data
  }
  return mockFuelPrices;
}
