"use client";

import dynamic from "next/dynamic";
import type { GasStation } from "@/lib/types";

const StationMapContainer = dynamic(() => import("./MapContainer"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded-2xl">
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-gray-500 font-medium">Loading mapa...</span>
      </div>
    </div>
  ),
});

interface DynamicMapProps {
  stations: GasStation[];
  userLocation: { lat: number; lng: number };
  center?: [number, number];
  zoom?: number;
  className?: string;
  onStationSelect?: (station: GasStation) => void;
  interactive?: boolean;
}

export default function DynamicMap(props: DynamicMapProps) {
  return <StationMapContainer {...props} />;
}
