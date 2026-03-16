"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { mockFuelPrices, mockGasStations, brandColors } from "@/lib/mock-data";
import StationDetailModal from "./StationDetailModal";

export default function MobileCheapestCard() {
  const [modalOpen, setModalOpen] = useState(false);

  const sorted = [...mockFuelPrices].sort((a, b) => a.unleaded - b.unleaded);
  const cheapest = sorted[0];
  const runner = sorted[1];
  const savingsPerTank = Math.round((runner.unleaded - cheapest.unleaded) * 40);
  const accentColor = brandColors[cheapest.brand] || "#f97316";

  const cheapestStation = useMemo(() => {
    const brandStations = mockGasStations.filter(
      (s) => s.brand === cheapest.brand && s.isOpen
    );
    if (brandStations.length === 0) return mockGasStations[0];
    return brandStations.sort((a, b) => a.prices.unleaded - b.prices.unleaded)[0];
  }, [cheapest.brand]);

  return (
    <>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="w-full text-left bg-white rounded-2xl overflow-hidden mobile-card-shadow active:scale-[0.98] transition-transform"
      >
        <div className="flex">
          {/* Image on left */}
          <div className="flex-shrink-0 w-[120px] bg-gray-100 self-stretch">
            <Image
              src={`https://picsum.photos/seed/station${cheapestStation.id}/240/200`}
              alt={cheapestStation.name}
              width={240}
              height={200}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content on right */}
          <div className="flex-1 p-4 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-6 h-6 rounded-md bg-orange-100 flex items-center justify-center flex-shrink-0">
                <CurrencyDollarIcon className="w-3.5 h-3.5 text-orange-500" />
              </div>
              <p className="font-heading font-extrabold text-sm text-gray-900">
                Dito pinakamura <span className="text-orange-500">today</span>
              </p>
            </div>

            <p className="text-sm text-gray-500 mb-1">
              {cheapest.brand} vs {runner.brand}
            </p>

            <p className="text-sm text-gray-700 mb-3">
              Save{" "}
              <span className="font-extrabold text-green-600 text-lg">P{savingsPerTank}</span>
            </p>

            <span
              className="inline-flex items-center px-3.5 py-1.5 border-2 font-extrabold text-xs rounded-lg uppercase tracking-wide"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              Check Location
            </span>
          </div>
        </div>
      </button>

      <StationDetailModal
        station={cheapestStation}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
