"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import HookHero from "@/components/home/HookHero";
import QuickPriceStrip from "@/components/home/QuickPriceStrip";
import FeedCard from "@/components/home/FeedCard";
import AlertBanner from "@/components/home/AlertBanner";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import MapPreviewCard from "@/components/home/MapPreviewCard";
import AdSlot from "@/components/ui/AdSlot";
import DesktopSidebar from "@/components/sidebar/DesktopSidebar";
import MobileHeroAlert from "@/components/mobile/MobileHeroAlert";
import MobileActionChips from "@/components/mobile/MobileActionChips";
import MobilePriceCard from "@/components/mobile/MobilePriceCard";
import MobileCheapestCard from "@/components/mobile/MobileCheapestCard";
import MobileSubscribeBanner from "@/components/mobile/MobileSubscribeBanner";
import MobileStickySubscribe from "@/components/mobile/MobileStickySubscribe";
import type { FeedContentType } from "@/lib/types";
import { mockFeedItems, mockHookSlides, mockFuelPrices } from "@/lib/mock-data";

const quickLinks = [
  { name: "Presyo ng Gasolina", href: "/gasolina" },
  { name: "Balita sa Fuel", href: "/balita" },
  { name: "Tips sa Pagtitipid", href: "/tips" },
  { name: "Petron Prices", href: "/gasolina/petron" },
  { name: "Shell Prices", href: "/gasolina/shell" },
  { name: "Caltex Prices", href: "/gasolina/caltex" },
];

const FILTERS: { label: string; value: FeedContentType | "ALL" }[] = [
  { label: "Lahat", value: "ALL" },
  { label: "ALERT", value: "ALERT" },
  { label: "TIPID", value: "TIPID" },
  { label: "BALITA", value: "BALITA" },
  { label: "KWENTO", value: "KWENTO" },
];

const filterColors: Record<string, "orange" | "red" | "green" | "yellow"> = {
  ALL: "orange",
  ALERT: "red",
  TIPID: "green",
  BALITA: "orange",
  KWENTO: "yellow",
};

const ITEMS_PER_LOAD = 8;
const INITIAL_VISIBLE = 12;

export default function HomePageClient() {
  const [activeFilter, setActiveFilter] = useState<FeedContentType | "ALL">("ALL");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const breakingItem = mockFeedItems.find(
    (item) => item.isBreaking && item.urgency === "critical"
  );

  const filteredItems = useMemo(() => {
    if (activeFilter === "ALL") return mockFeedItems;
    return mockFeedItems.filter((item) => item.contentType === activeFilter);
  }, [activeFilter]);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  // Split items for layout sections
  const heroItem = visibleItems[0];
  const standardBatch1 = visibleItems.slice(1, 3);
  const trendingItems = visibleItems.slice(3, 7);
  const standardBatch2 = visibleItems.slice(7, 11);
  const standardBatch3 = visibleItems.slice(11);

  // Mobile: top 2 ALERT items for price cards
  const mobileAlertItems = mockFeedItems
    .filter((item) => item.contentType === "ALERT" && item.priceChange)
    .slice(0, 2);

  function handleFilterChange(value: FeedContentType | "ALL") {
    setActiveFilter(value);
    setVisibleCount(INITIAL_VISIBLE);
  }

  return (
    <>
      {/* Alert Banner */}
      {breakingItem && <AlertBanner item={breakingItem} />}

      {/* Hook Hero — desktop */}
      <div className="hidden lg:block">
        <HookHero slides={mockHookSlides} />
      </div>
      {/* Mobile Hero Alert */}
      <div className="lg:hidden">
        <MobileHeroAlert slide={mockHookSlides[0]} breakingItem={breakingItem} />
      </div>

      {/* Quick Price Strip — desktop */}
      <div className="hidden lg:block">
        <QuickPriceStrip prices={mockFuelPrices} />
      </div>
      {/* Mobile Action Chips */}
      <div className="lg:hidden">
        <MobileActionChips />
      </div>

      {/* Feed + Sidebar Layout */}
      <div className="max-w-7xl mx-auto px-4 pt-4 lg:py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
      {/* Feed Column */}
      <div>
        {/* Mobile Price Cards */}
        <div className="lg:hidden space-y-4 mb-4">
          {mobileAlertItems[0] && <MobilePriceCard item={mobileAlertItems[0]} />}
          <MobileCheapestCard />
          <MobileSubscribeBanner variant="compact" />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-4">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => handleFilterChange(f.value)}
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activeFilter === f.value
                  ? f.value === "ALERT"
                    ? "bg-red-600 text-white shadow-md shadow-red-500/25"
                    : f.value === "TIPID"
                    ? "bg-green-600 text-white shadow-md shadow-green-500/25"
                    : f.value === "KWENTO"
                    ? "bg-yellow-500 text-white shadow-md shadow-yellow-500/25"
                    : "bg-orange-500 text-white shadow-md shadow-orange-500/25"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              aria-label={`Filter by ${f.label}`}
              aria-pressed={activeFilter === f.value}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Feed Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* Hero Card */}
            {heroItem && <FeedCard item={heroItem} variant="hero" />}

            {/* Ad */}
            <AdSlot size="leaderboard" />

            {/* Standard Cards Batch 1 */}
            {standardBatch1.length > 0 && (
              <div className="space-y-6">
                {standardBatch1.map((item) => (
                  <FeedCard key={item.id} item={item} variant="standard" />
                ))}
              </div>
            )}

            {/* Trending Section */}
            {trendingItems.length > 0 && (
              <section>
                <h2 className="font-heading font-bold text-xl text-gray-900 mb-4">
                  Trending Ngayon
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {trendingItems.map((item) => (
                    <FeedCard key={item.id} item={item} variant="compact" />
                  ))}
                </div>
              </section>
            )}

            {/* Map Preview */}
            <MapPreviewCard />

            {/* Standard Cards Batch 2 with Ad */}
            {standardBatch2.length > 0 && (
              <div className="space-y-6">
                {standardBatch2.map((item, i) => (
                  <div key={item.id}>
                    <FeedCard item={item} variant="standard" />
                    {i === 1 && <div className="mt-6"><AdSlot size="in-article" /></div>}
                  </div>
                ))}
              </div>
            )}

            {/* Quick Links */}
            <section className="bg-white rounded-2xl border border-gray-200 p-5">
              <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">
                Quick Links
              </h2>
              <div className="flex flex-wrap gap-2">
                {quickLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="px-4 py-2 rounded-full bg-gray-50 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </section>

            {/* Standard Cards Batch 3 */}
            {standardBatch3.length > 0 && (
              <div className="space-y-6">
                {standardBatch3.map((item) => (
                  <FeedCard key={item.id} item={item} variant="standard" />
                ))}
              </div>
            )}

            {/* Load More / Exhausted */}
            <div className="flex justify-center pt-4 pb-8">
              {hasMore ? (
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_LOAD)}
                  className="px-8 py-3 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-800 transition-colors shadow-md text-sm"
                  aria-label="Load more articles"
                >
                  Mag-load pa
                </button>
              ) : (
                <p className="text-sm text-gray-400 font-medium">
                  Wala na — nakita mo na lahat!
                </p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Desktop Sidebar */}
      <DesktopSidebar showComparison />
      </div>
      </div>

      {/* Mobile Inline Subscribe Banner */}
      <div className="lg:hidden max-w-7xl mx-auto px-4 py-4">
        <MobileSubscribeBanner variant="inline" />
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton />

      {/* Mobile Sticky Subscribe */}
      <MobileStickySubscribe />
    </>
  );
}
