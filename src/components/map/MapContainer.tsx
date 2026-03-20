"use client";

import { useEffect } from "react";
import {
  MapContainer as LeafletMap,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import type { GasStation } from "@/lib/types";
import { brandColors } from "@/lib/mock-data";

function createStationIcon(brand: string) {
  const color = brandColors[brand] || "#f97316";
  return L.divIcon({
    className: "",
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -36],
    html: `<div class="station-marker">
      <div class="station-marker-pin" style="background:${color}"></div>
    </div>`,
  });
}

const userLocationIcon = L.divIcon({
  className: "",
  iconSize: [16, 16],
  iconAnchor: [8, 8],
  html: `<div class="user-location-dot"></div>`,
});

function FitBounds({
  stations,
  userLocation,
}: {
  stations: GasStation[];
  userLocation: { lat: number; lng: number };
}) {
  const map = useMap();
  useEffect(() => {
    if (stations.length === 0) return;
    const points: [number, number][] = stations.map((s) => [s.lat, s.lng]);
    points.push([userLocation.lat, userLocation.lng]);
    const bounds = L.latLngBounds(points);
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [stations, userLocation, map]);
  return null;
}

interface MapContainerProps {
  stations: GasStation[];
  userLocation: { lat: number; lng: number };
  center?: [number, number];
  zoom?: number;
  className?: string;
  onStationSelect?: (station: GasStation) => void;
  interactive?: boolean;
}

export default function StationMapContainer({
  stations,
  userLocation,
  center,
  zoom = 13,
  className = "",
  onStationSelect,
  interactive = true,
}: MapContainerProps) {
  const mapCenter = center || [userLocation.lat, userLocation.lng] as [number, number];

  return (
    <LeafletMap
      center={mapCenter}
      zoom={zoom}
      className={className}
      scrollWheelZoom={interactive}
      dragging={interactive}
      zoomControl={interactive}
      doubleClickZoom={interactive}
      touchZoom={interactive}
      attributionControl={false}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {!center && (
        <FitBounds stations={stations} userLocation={userLocation} />
      )}

      {/* User location */}
      <Marker position={[userLocation.lat, userLocation.lng]} icon={userLocationIcon}>
        <Popup>
          <span className="text-sm font-medium">Ikaw ay nandito</span>
        </Popup>
      </Marker>

      {/* Station markers */}
      {stations.map((station) => (
          <Marker
            key={station.id}
            position={[station.lat, station.lng]}
            icon={createStationIcon(station.brand)}
            eventHandlers={{
              click: () => onStationSelect?.(station),
            }}
          />
      ))}
    </LeafletMap>
  );
}
