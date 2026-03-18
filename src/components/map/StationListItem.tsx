"use client";

import type { GasStation } from "@/lib/types";
import { brandColors } from "@/lib/mock-data";
import { formatDistance, calculateDistance } from "@/lib/utils";

interface StationListItemProps {
  station: GasStation;
  userLocation: { lat: number; lng: number };
  onClick: (station: GasStation) => void;
}

export default function StationListItem({ station, userLocation, onClick }: StationListItemProps) {
  const dist = calculateDistance(userLocation.lat, userLocation.lng, station.lat, station.lng);
  const cheapest = Math.min(
    station.prices.regular,
    station.prices.unleaded,
    station.prices.diesel
  );
  const color = brandColors[station.brand] || "#f97316";

  return (
    <button
      type="button"
      onClick={() => onClick(station)}
      className="flex items-stretch w-full text-left bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors"
    >
      {/* Brand color strip */}
      <div className="w-1.5 flex-shrink-0" style={{ background: color }} />

      <div className="flex-1 flex items-center justify-between px-3 py-3 min-w-0">
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-sm text-gray-900 truncate">{station.name}</p>
          <p className="text-xs text-gray-500 truncate mt-0.5">{station.address}</p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0 ml-3">
          <div className="text-right">
            <p className="text-sm font-bold text-orange-600">P{cheapest.toFixed(2)}</p>
            <p className="text-xs text-gray-400">mula</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium text-gray-700">{formatDistance(dist)}</p>
            <span
              className={`inline-block text-xs font-medium mt-0.5 ${
                station.isOpen ? "text-green-600" : "text-red-500"
              }`}
            >
              {station.isOpen ? "Bukas" : "Sarado"}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
