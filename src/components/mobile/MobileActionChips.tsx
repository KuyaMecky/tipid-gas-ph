"use client";

import Link from "next/link";
import { CurrencyDollarIcon, MapPinIcon, ChartBarIcon } from "@heroicons/react/24/solid";
import { mockFuelPrices, mockGasStations, MOCK_USER_LOCATION } from "@/lib/mock-data";
import { calculateDistance } from "@/lib/utils";

function getChipsData() {
  const sorted = [...mockFuelPrices].sort((a, b) => a.unleaded - b.unleaded);
  const cheapest = sorted[0];
  const avg = sorted[Math.floor(sorted.length / 2)];
  const savingsPerLiter = avg.unleaded - cheapest.unleaded;
  const savingsEstimate = Math.round(savingsPerLiter * 40);

  const stationsWithDist = mockGasStations
    .filter((s) => s.isOpen)
    .map((s) => ({
      ...s,
      distance: calculateDistance(
        MOCK_USER_LOCATION.lat, MOCK_USER_LOCATION.lng,
        s.lat, s.lng
      ),
    }))
    .sort((a, b) => a.prices.unleaded - b.prices.unleaded);
  const cheapestStation = stationsWithDist[0];

  return { savingsEstimate, cheapestStation };
}

export default function MobileActionChips() {
  const { savingsEstimate, cheapestStation } = getChipsData();

  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 pt-4">
      {/* Save Today */}
      <Link
        href="/tips"
        className="flex-shrink-0 w-[140px] bg-white rounded-2xl p-4 mobile-card-shadow active:scale-[0.97] transition-transform"
      >
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center">
            <CurrencyDollarIcon className="w-4 h-4 text-green-600" />
          </div>
          <span className="font-heading font-bold text-xs text-gray-900">Save Today</span>
        </div>
        <p className="font-heading font-extrabold text-2xl text-green-600">
          P{savingsEstimate}
        </p>
        <p className="text-[11px] text-gray-400 font-medium mt-0.5">vs kahapon</p>
      </Link>

      {/* Cheapest Nearby */}
      <Link
        href="/mapa"
        className="flex-shrink-0 w-[140px] bg-white rounded-2xl p-4 mobile-card-shadow active:scale-[0.97] transition-transform"
      >
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center">
            <MapPinIcon className="w-4 h-4 text-red-500" />
          </div>
          <span className="font-heading font-bold text-xs text-gray-900">Cheapest Nearby</span>
        </div>
        <p className="font-heading font-bold text-sm text-gray-900 truncate">
          {cheapestStation?.name?.replace(cheapestStation.brand + " ", "") || "---"}
        </p>
        <p className="text-[11px] text-gray-400 font-medium mt-0.5 truncate">
          {cheapestStation?.brand}
        </p>
      </Link>

      {/* Weekly Trend */}
      <Link
        href="/gasolina"
        className="flex-shrink-0 w-[140px] bg-white rounded-2xl p-4 mobile-card-shadow active:scale-[0.97] transition-transform"
      >
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center">
            <ChartBarIcon className="w-4 h-4 text-orange-500" />
          </div>
          <span className="font-heading font-bold text-xs text-gray-900">Weekly Trend</span>
        </div>
        <p className="font-heading font-extrabold text-lg text-red-600">
          +P5.20
        </p>
        <p className="text-[11px] text-gray-400 font-medium mt-0.5">this week</p>
      </Link>
    </div>
  );
}
