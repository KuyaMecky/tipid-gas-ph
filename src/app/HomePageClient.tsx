"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FireIcon,
  TruckIcon,
  BoltIcon,
  NewspaperIcon,
  LightBulbIcon,
  MegaphoneIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import HookHero from "@/components/home/HookHero";
import QuickPriceStrip from "@/components/home/QuickPriceStrip";
import FeedCard from "@/components/home/FeedCard";
import AlertBanner from "@/components/home/AlertBanner";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import MapPreviewCard from "@/components/home/MapPreviewCard";
import AdSlot from "@/components/ui/AdSlot";
import DesktopSidebar from "@/components/sidebar/DesktopSidebar";
import MobileStickySubscribe from "@/components/mobile/MobileStickySubscribe";
import MobileCategoryTabs from "@/components/mobile/MobileCategoryTabs";
import MobileHeroCard from "@/components/mobile/MobileHeroCard";
import MobileSecondaryCard from "@/components/mobile/MobileSecondaryCard";
import MobileHotNewsSection from "@/components/mobile/MobileHotNewsSection";
import MobileTipidTipsSection from "@/components/mobile/MobileTipidTipsSection";
import MobileTwoColumnFeature from "@/components/mobile/MobileTwoColumnFeature";
import MobilePollWidget from "@/components/mobile/MobilePollWidget";
import MobileOpinionsSection from "@/components/mobile/MobileOpinionsSection";
import MobilePopularCategories from "@/components/mobile/MobilePopularCategories";
import MobileTrendingNews from "@/components/mobile/MobileTrendingNews";
import MobileFuelNewsBanner from "@/components/mobile/MobileFuelNewsBanner";
import MobileWeatherMarquee from "@/components/mobile/MobileWeatherMarquee";
import MobileNotificationOptIn from "@/components/mobile/MobileNotificationOptIn";
import MobileDealsSection from "@/components/mobile/MobileDealsSection";
import MobileSponsoredCarousel from "@/components/mobile/MobileSponsoredCarousel";
import MobileFuelQuiz from "@/components/mobile/MobileFuelQuiz";
import MobileBookmarkBar from "@/components/mobile/MobileBookmarkBar";
import TrendingNewsSection from "@/components/home/TrendingNewsSection";
import FuelNewsHeroBanner from "@/components/home/FuelNewsHeroBanner";
import FAQSection from "@/components/ui/FAQSection";
import type { FeedContentType, TrendingNewsItem } from "@/lib/types";
import { mockFeedItems, mockHookSlides, mockFuelPrices, mockPollData, mockHomeFAQs, mockCategories, mockWeatherForecast, mockSponsoredProducts, mockFuelQuizData, mockFuelDeals, mockBookmarkBarData } from "@/lib/mock-data";

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

const ITEMS_PER_LOAD = 8;
const INITIAL_VISIBLE = 12;

interface HomePageClientProps {
  trendingNews?: TrendingNewsItem[];
  fuelNews?: TrendingNewsItem[];
}

export default function HomePageClient({ trendingNews = [], fuelNews = [] }: HomePageClientProps) {
  const [activeFilter, setActiveFilter] = useState<FeedContentType | "ALL">("ALL");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [mobileTab, setMobileTab] = useState("trending");

  const breakingItem = mockFeedItems.find(
    (item) => item.isBreaking && item.urgency === "critical"
  );

  // Desktop feed filtering
  const filteredItems = useMemo(() => {
    if (activeFilter === "ALL") return mockFeedItems;
    return mockFeedItems.filter((item) => item.contentType === activeFilter);
  }, [activeFilter]);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  // Desktop layout sections
  const heroItem = visibleItems[0];
  const standardBatch1 = visibleItems.slice(1, 3);
  const trendingItems = visibleItems.slice(3, 7);
  const standardBatch2 = visibleItems.slice(7, 11);
  const standardBatch3 = visibleItems.slice(11);

  // Mobile: split feed items by content type
  const mobileAlertItems = useMemo(
    () => mockFeedItems.filter((item) => item.contentType === "ALERT"),
    []
  );
  const mobileBalitaItems = useMemo(
    () => mockFeedItems.filter((item) => item.contentType === "BALITA"),
    []
  );
  const mobileTipidItems = useMemo(
    () => mockFeedItems.filter((item) => item.contentType === "TIPID"),
    []
  );
  const mobileKwentoItems = useMemo(
    () => mockFeedItems.filter((item) => item.contentType === "KWENTO"),
    []
  );

  function handleFilterChange(value: FeedContentType | "ALL") {
    setActiveFilter(value);
    setVisibleCount(INITIAL_VISIBLE);
  }

  return (
    <>
      {/* Alert Banner — shows on both mobile and desktop */}
      {breakingItem && <AlertBanner item={breakingItem} />}

      {/* ===== MOBILE LAYOUT ===== */}
      <div className="lg:hidden">
        {/* 0. Fuel News Banner — real-time gas prices + news */}
        {fuelNews.length > 0 && (
          <MobileFuelNewsBanner fuelNews={fuelNews} prices={mockFuelPrices} />
        )}

        {/* 1. Category Tabs */}
        <MobileCategoryTabs activeTab={mobileTab} onTabChange={setMobileTab} />

        {/* 2. Weather Forecast Marquee */}
        <MobileWeatherMarquee forecast={mockWeatherForecast} />

        {/* 3. Hero Card (with ShareWidget embedded) */}
        {mobileAlertItems[0] && <MobileHeroCard item={mobileAlertItems[0]} />}

        {/* 4. Secondary Card (with ShareWidget embedded) */}
        {mobileBalitaItems[0] && (
          <MobileSecondaryCard item={mobileBalitaItems[0]} />
        )}

        {/* 5. Notification Opt-In */}
        <MobileNotificationOptIn />

        {/* 6. Popular Categories */}
        <div className="mt-6">
          <MobilePopularCategories categories={mockCategories} />
        </div>

        {/* 4. Ad Slot */}
        <div className="px-4 mt-4">
          <AdSlot size="in-article" />
        </div>

        {/* 7. Hot News Grid */}
        <div className="mt-6">
          <MobileHotNewsSection items={mobileBalitaItems.slice(1)} />
        </div>

        {/* 8. Deals Section */}
        <div className="mt-6">
          <MobileDealsSection deals={mockFuelDeals} />
        </div>

        {/* 9. Trending News — Real-time from NewsData.io */}
        {trendingNews.length > 0 && (
          <div className="mt-6">
            <MobileTrendingNews items={trendingNews} />
          </div>
        )}

        {/* 10. Tipid Tips Scroll */}
        <div className="mt-6">
          <MobileTipidTipsSection items={mobileTipidItems} />
        </div>

        {/* 11. Sponsored Carousel */}
        <div className="mt-6">
          <MobileSponsoredCarousel products={mockSponsoredProducts} />
        </div>

        {/* 12. Two Column Feature */}
        <div className="mt-6">
          <MobileTwoColumnFeature
            leftItem={mobileAlertItems[1]}
            rightItem={mobileKwentoItems[0]}
          />
        </div>

        {/* 8. Ad Slot */}
        <div className="px-4 mt-6">
          <AdSlot size="in-article" />
        </div>

        {/* 14. Poll Widget */}
        <div className="mt-6">
          <MobilePollWidget poll={mockPollData} />
        </div>

        {/* 15. Fuel Quiz */}
        <MobileFuelQuiz quiz={mockFuelQuizData} />

        {/* 16. Opinions Carousel */}
        <div className="mt-6">
          <MobileOpinionsSection items={mobileKwentoItems} />
        </div>

        {/* 11. FAQ Section */}
        <div className="px-4 mt-6">
          <FAQSection faqs={mockHomeFAQs} heading="Mga Madalas Itanong tungkol sa Gas Prices" />
        </div>

        {/* 12. Quick Links */}
        <div className="px-4 mt-6">
          <section className="bg-white rounded-2xl border border-gray-200 p-5">
            <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">
              Quick Links
            </h2>
            <div className="flex flex-wrap gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 rounded-full bg-gray-50 text-sm font-medium text-gray-700 hover:bg-yellow-50 hover:text-red-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* 13. SEO Content Block */}
        <div className="px-4 mt-6">
          <section className="bg-gray-50 rounded-2xl p-5">
            <h2 className="font-heading font-semibold text-base text-gray-700 mb-3">
              Latest Balita PH — Ang Pinaka-Updated na Fuel Price Guide
            </h2>
            <div className="space-y-2 text-sm text-gray-500 leading-relaxed">
              <p>
                Ang Latest Balita PH ang iyong go-to source para sa real-time na presyo ng gasolina,
                diesel, at LPG sa buong Pilipinas. I-compare ang mga presyo ng{" "}
                <Link href="/gasolina" className="text-red-600 hover:underline">
                  lahat ng major fuel brands
                </Link>{" "}
                tulad ng Petron, Shell, Caltex, Phoenix, Seaoil, at iba pa — updated linggo-linggo base
                sa DOE oil monitor.
              </p>
              <p>
                Bukod sa price monitoring, nag-o-offer din kami ng{" "}
                <Link href="/tips" className="text-red-600 hover:underline">
                  mga tipid tips
                </Link>{" "}
                para makatipid sa fuel expenses, pati na rin ang{" "}
                <Link href="/balita" className="text-red-600 hover:underline">
                  pinakabagong balita
                </Link>{" "}
                tungkol sa oil industry sa Pilipinas.
              </p>
              <p>
                Gamitin ang aming{" "}
                <Link href="/mapa" className="text-red-600 hover:underline">
                  gas station map
                </Link>{" "}
                para mahanap ang pinakamalapit at pinakamura na gas station sa inyong area. Laging
                updated, laging tipid — iyan ang Latest Balita PH.
              </p>
            </div>
          </section>
        </div>

        {/* 14. Bottom padding for BottomNav */}
        <div className="h-24" />
      </div>

      {/* ===== DESKTOP LAYOUT ===== */}
      <div className="hidden lg:block">
        {/* Hook Hero */}
        <HookHero slides={mockHookSlides} />

        {/* Fuel News Hero Banner — real-time gas prices + news */}
        {fuelNews.length > 0 && (
          <FuelNewsHeroBanner fuelNews={fuelNews} prices={mockFuelPrices} />
        )}

        {/* Quick Price Strip */}
        <QuickPriceStrip prices={mockFuelPrices} />

        {/* Feed + Sidebar Layout */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
            {/* Feed Column */}
            <div>
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

                  {/* Popular Categories */}
                  <section>
                    <h2 className="font-heading font-bold text-xl text-gray-900 mb-4">
                      Popular na Kategorya
                    </h2>
                    <div className="grid grid-cols-3 gap-3">
                      {mockCategories.map((cat) => {
                        const colorMap: Record<string, { gradient: string; badge: string; Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }> = {
                          gasolina: { gradient: "from-yellow-900/80 via-yellow-700/50 to-yellow-500/20", badge: "bg-yellow-500", Icon: FireIcon },
                          diesel: { gradient: "from-blue-900/80 via-blue-700/50 to-blue-500/20", badge: "bg-blue-600", Icon: TruckIcon },
                          lpg: { gradient: "from-amber-900/80 via-amber-700/50 to-amber-500/20", badge: "bg-amber-500", Icon: BoltIcon },
                          balita: { gradient: "from-red-900/80 via-red-700/50 to-red-500/20", badge: "bg-red-600", Icon: NewspaperIcon },
                          tips: { gradient: "from-emerald-900/80 via-emerald-700/50 to-emerald-500/20", badge: "bg-emerald-500", Icon: LightBulbIcon },
                          eleksyon: { gradient: "from-orange-900/80 via-orange-700/50 to-orange-500/20", badge: "bg-orange-500", Icon: MegaphoneIcon },
                          showbiz: { gradient: "from-pink-900/80 via-pink-700/50 to-pink-500/20", badge: "bg-pink-500", Icon: StarIcon },
                        };
                        const meta = colorMap[cat.slug] || colorMap.balita;
                        const { Icon } = meta;
                        const hrefMap: Record<string, string> = {
                          gasolina: "/gasolina", balita: "/balita", tips: "/tips", eleksyon: "/eleksyon",
                        };
                        const href = hrefMap[cat.slug] || `/category/${cat.slug}`;
                        return (
                          <Link
                            key={cat.id}
                            href={href}
                            className="block relative rounded-2xl overflow-hidden group"
                          >
                            <div className="aspect-[4/3] relative">
                              {cat.image ? (
                                <Image
                                  src={cat.image}
                                  alt={cat.name}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                  sizes="33vw"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-200" />
                              )}
                              <div className={`absolute inset-0 bg-gradient-to-t ${meta.gradient}`} />
                              {/* Icon — top-right */}
                              <div className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <Icon className="w-5 h-5 text-white" />
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 p-3">
                                <h3 className="font-heading font-bold text-base text-white leading-snug">
                                  {cat.name}
                                </h3>
                                <div className={`inline-flex items-center mt-1.5 px-2 py-0.5 rounded-full ${meta.badge}`}>
                                  <span className="text-[10px] font-bold text-white">
                                    {cat.count} articles
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </section>

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

                  {/* Trending News — Real-time from NewsData.io */}
                  {trendingNews.length > 0 && (
                    <TrendingNewsSection items={trendingNews} />
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
                          className="px-4 py-2 rounded-full bg-gray-50 text-sm font-medium text-gray-700 hover:bg-yellow-50 hover:text-red-600 transition-colors"
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
      </div>

      {/* Floating Action Button — handles own responsive visibility */}
      <FloatingActionButton />

      {/* Mobile Bookmark Bar — floating above BottomNav */}
      <MobileBookmarkBar data={mockBookmarkBarData} />

      {/* Mobile Sticky Subscribe — handles own lg:hidden */}
      <MobileStickySubscribe />
    </>
  );
}
