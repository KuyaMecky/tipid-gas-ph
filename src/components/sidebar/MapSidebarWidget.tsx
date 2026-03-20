"use client";

import Link from "next/link";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { mockGasStations, MOCK_USER_LOCATION, brandColors } from "@/lib/mock-data";
import { calculateDistance, formatDistance } from "@/lib/utils";

export default function MapSidebarWidget() {
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
      .slice(0, 5);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
    >
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3">
        <h3 className="font-heading font-bold text-sm text-white flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
          Malapit na Gas Station
        </h3>
      </div>
      <div className="divide-y divide-gray-100">
        {nearestStations.map((station) => (
          <div
            key={station.id}
            className="flex items-center gap-2.5 px-4 py-2.5"
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: brandColors[station.brand] }}
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-800 truncate">{station.name}</p>
              <p className="text-xs text-gray-400">{formatDistance(station.distance)}</p>
            </div>
            <span className="text-xs font-bold text-orange-600 flex-shrink-0">
              P{station.prices.diesel.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
      <Link
        href="/mapa"
        className="flex items-center justify-center gap-1 px-4 py-2.5 text-xs font-bold text-blue-600 hover:bg-blue-50 transition-colors border-t border-gray-100"
      >
        Buksan ang Mapa
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </Link>
    </motion.div>
  );
}
