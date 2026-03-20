"use client";

import Link from "next/link";
import { useMemo } from "react";
import DynamicMap from "@/components/map/DynamicMap";
import { mockGasStations, MOCK_USER_LOCATION, brandColors } from "@/lib/mock-data";
import { calculateDistance, formatDistance } from "@/lib/utils";

export default function MapPreviewCard() {
  const nearestStations = useMemo(() => {
    return mockGasStations
      .map((s) => ({
        ...s,
        distance: calculateDistance(
          MOCK_USER_LOCATION.lat,
          MOCK_USER_LOCATION.lng,
          s.lat,
          s.lng
        ),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 4);
  }, []);

  return (
    <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden feed-card-shadow">
      {/* Map preview (non-interactive) */}
      <div className="h-48 relative">
        <DynamicMap
          stations={nearestStations}
          userLocation={MOCK_USER_LOCATION}
          center={[MOCK_USER_LOCATION.lat, MOCK_USER_LOCATION.lng]}
          zoom={13}
          interactive={false}
          className="w-full h-full"
        />
        {/* Overlay to prevent map interaction and show CTA */}
        <Link
          href="/mapa"
          className="absolute inset-0 z-10 flex items-end justify-center pb-3"
          aria-label="Buksan ang mapa"
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-500 text-white text-sm font-bold rounded-full shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            Buksan ang Mapa
          </span>
        </Link>
      </div>

      {/* Mini station list */}
      <div className="p-4">
        <h3 className="font-heading font-bold text-sm text-gray-900 mb-2">
          Pinakamalapit na Gas Station
        </h3>
        <div className="space-y-2">
          {nearestStations.map((station) => (
            <div
              key={station.id}
              className="flex items-center gap-2 text-sm"
            >
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ background: brandColors[station.brand] }}
              />
              <span className="text-gray-700 truncate flex-1">{station.name}</span>
              <span className="text-xs text-gray-500 flex-shrink-0">
                {formatDistance(station.distance)}
              </span>
              <span className="text-xs font-bold text-orange-600 flex-shrink-0">
                P{station.prices.diesel.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
