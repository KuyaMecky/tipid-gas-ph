"use client";

import { brandColors } from "@/lib/mock-data";
import type { FuelBrand } from "@/lib/types";

const brands: FuelBrand[] = [
  "Petron", "Shell", "Caltex", "Phoenix", "Seaoil",
  "PTT", "Unioil", "Cleanfuel", "Jetti", "Total",
];

interface BrandFilterChipsProps {
  activeBrand: string | null;
  onSelect: (brand: string | null) => void;
}

export default function BrandFilterChips({ activeBrand, onSelect }: BrandFilterChipsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide px-4 py-2">
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 shadow-sm ${
          activeBrand === null
            ? "bg-orange-500 text-white shadow-md shadow-orange-500/25"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
      >
        Lahat
      </button>
      {brands.map((brand) => (
        <button
          key={brand}
          type="button"
          onClick={() => onSelect(activeBrand === brand ? null : brand)}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 shadow-sm ${
            activeBrand === brand
              ? "bg-orange-500 text-white shadow-md shadow-orange-500/25"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          <span
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ background: brandColors[brand] }}
          />
          {brand}
        </button>
      ))}
    </div>
  );
}
