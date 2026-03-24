"use client";

import { motion } from "framer-motion";
import { CloudIcon } from "@heroicons/react/24/solid";
import type { WeatherForecastData, WeatherCondition } from "@/lib/types";

interface MobileWeatherMarqueeProps {
  forecast: WeatherForecastData;
}

const CONDITION_ICON: Record<WeatherCondition, string> = {
  sunny: "\u2600\uFE0F",
  "partly-cloudy": "\u26C5",
  cloudy: "\u2601\uFE0F",
  rainy: "\uD83C\uDF27\uFE0F",
  stormy: "\u26C8\uFE0F",
};

const CONDITION_LABEL: Record<WeatherCondition, string> = {
  sunny: "Maaraw",
  "partly-cloudy": "Bahagyang Maulap",
  cloudy: "Maulap",
  rainy: "Maulan",
  stormy: "Bagyo",
};

export default function MobileWeatherMarquee({ forecast }: MobileWeatherMarqueeProps) {
  // Duplicate items for seamless infinite scroll
  const items = [...forecast.cities, ...forecast.cities];

  return (
    <motion.div
      className="mx-4 mt-4"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 overflow-hidden shadow-md shadow-blue-600/20">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-3 pb-2">
          <div className="flex items-center gap-2">
            <CloudIcon className="w-4 h-4 text-cyan-200" />
            <span className="font-heading font-bold text-white text-xs uppercase tracking-wide">
              Panahon Ngayon
            </span>
          </div>
          <span className="text-[10px] text-cyan-200">
            {forecast.asOf}
          </span>
        </div>

        {/* Marquee */}
        <div className="relative overflow-hidden pb-3">
          <motion.div
            className="flex gap-4 px-4 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {items.map((city, index) => (
              <div
                key={`${city.city}-${index}`}
                className="flex-shrink-0 flex items-center gap-2.5 bg-white/15 backdrop-blur-sm rounded-xl px-3.5 py-2"
              >
                <span className="text-lg leading-none">
                  {CONDITION_ICON[city.condition]}
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white leading-tight">
                    {city.city}
                  </span>
                  <span className="text-[10px] text-cyan-100 leading-tight">
                    {CONDITION_LABEL[city.condition]}
                  </span>
                </div>
                <div className="flex flex-col items-end ml-1">
                  <span className="text-sm font-black text-white leading-tight">
                    {city.temp}&deg;
                  </span>
                  <span className="text-[9px] text-cyan-200 leading-tight">
                    {city.humidity}% H
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
