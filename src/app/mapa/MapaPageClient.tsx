"use client";

import { useState, useMemo } from "react";
import DynamicMap from "@/components/map/DynamicMap";
import BrandFilterChips from "@/components/map/BrandFilterChips";
import StationListItem from "@/components/map/StationListItem";
import StationDetail from "@/components/map/StationDetail";
import BottomSheet, { type SheetState } from "@/components/map/BottomSheet";
import type { GasStation } from "@/lib/types";
import { mockGasStations, MOCK_USER_LOCATION } from "@/lib/mock-data";
import { calculateDistance } from "@/lib/utils";

export default function MapaPageClient() {
  const [selectedStation, setSelectedStation] = useState<GasStation | null>(null);
  const [sheetState, setSheetState] = useState<SheetState>("half");
  const [brandFilter, setBrandFilter] = useState<string | null>(null);

  const filteredStations = useMemo(() => {
    let stations = mockGasStations;
    if (brandFilter) {
      stations = stations.filter((s) => s.brand === brandFilter);
    }
    return stations
      .map((s) => ({
        ...s,
        distance: calculateDistance(
          MOCK_USER_LOCATION.lat,
          MOCK_USER_LOCATION.lng,
          s.lat,
          s.lng
        ),
      }))
      .sort((a, b) => a.distance - b.distance);
  }, [brandFilter]);

  function handleStationSelect(station: GasStation) {
    setSelectedStation(station);
    setSheetState("half");
  }

  function handleCloseDetail() {
    setSelectedStation(null);
  }

  function handleBrandFilter(brand: string | null) {
    setBrandFilter(brand);
    setSelectedStation(null);
  }

  return (
    <>
      <div className="relative w-full" style={{ height: "calc(100dvh - 128px)", zIndex: 0 }}>
        {/* Full-screen map */}
        <div className="absolute inset-0">
          <DynamicMap
            stations={filteredStations}
            userLocation={MOCK_USER_LOCATION}
            onStationSelect={handleStationSelect}
            className="w-full h-full"
          />
        </div>

        {/* Brand filter chips overlay */}
        <div className="absolute top-0 left-0 right-0 z-30">
          <BrandFilterChips activeBrand={brandFilter} onSelect={handleBrandFilter} />
        </div>
      </div>

      {/* Bottom sheet — outside map container so Leaflet z-indexes cannot overlap */}
      <BottomSheet state={sheetState} onStateChange={setSheetState}>
        {selectedStation ? (
          <StationDetail
            station={selectedStation}
            userLocation={MOCK_USER_LOCATION}
            onClose={handleCloseDetail}
          />
        ) : (
          <div className="px-4">
            <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">
              Mga Gas Station ({filteredStations.length})
            </h2>
            <div className="space-y-2 pb-8">
              {filteredStations.map((station) => (
                <StationListItem
                  key={station.id}
                  station={station}
                  userLocation={MOCK_USER_LOCATION}
                  onClick={handleStationSelect}
                />
              ))}
            </div>
          </div>
        )}
      </BottomSheet>
    </>
  );
}
