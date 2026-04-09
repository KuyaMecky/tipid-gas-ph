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
import MobileBrandPartners from "@/components/mobile/MobileBrandPartners";
import TrendingNewsSection from "@/components/home/TrendingNewsSection";
import FuelNewsHeroBanner from "@/components/home/FuelNewsHeroBanner";
import FAQSection from "@/components/ui/FAQSection";
import type { Category, FeedContentType, FeedItem, FuelPrice, TrendingNewsItem, HookSlide } from "@/lib/types";
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
  wpFeedItems?: FeedItem[];
  wpCategories?: Category[];
  fuelPrices?: FuelPrice[];
  rssNews?: TrendingNewsItem[];
  hookHeroSlides?: HookSlide[];
}

export default function HomePageClient({ trendingNews = [], fuelNews = [], wpFeedItems = [], wpCategories, fuelPrices, rssNews = [], hookHeroSlides }: HomePageClientProps) {
  const prices = fuelPrices && fuelPrices.length > 0 ? fuelPrices : mockFuelPrices;
  // Merge RSS news into trending (RSS first since it's real-time, then NewsData.io)
  const allTrendingNews = useMemo(() => {
    if (rssNews.length === 0) return trendingNews;
    if (trendingNews.length === 0) return rssNews;
    const seen = new Set<string>();
    const merged: TrendingNewsItem[] = [];
    for (const item of [...rssNews, ...trendingNews]) {
      const key = item.title.toLowerCase().slice(0, 40);
      if (!seen.has(key)) {
        seen.add(key);
        merged.push(item);
      }
    }
    return merged;
  }, [rssNews, trendingNews]);
  const [activeFilter, setActiveFilter] = useState<FeedContentType | "ALL">("ALL");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [mobileTab, setMobileTab] = useState("trending");

  // Merge WP feed items at the front, then fill with mock data (dedup by id)
  const allFeedItems = useMemo(() => {
    if (wpFeedItems.length === 0) return mockFeedItems;
    const wpIds = new Set(wpFeedItems.map((i) => i.id));
    const remaining = mockFeedItems.filter((i) => !wpIds.has(i.id));
    return [...wpFeedItems, ...remaining];
  }, [wpFeedItems]);

  const breakingItem = allFeedItems.find(
    (item) => item.isBreaking && item.urgency === "critical"
  );

  // Desktop feed filtering
  const filteredItems = useMemo(() => {
    if (activeFilter === "ALL") return allFeedItems;
    return allFeedItems.filter((item) => item.contentType === activeFilter);
  }, [activeFilter, allFeedItems]);

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
    () => allFeedItems.filter((item) => item.contentType === "ALERT"),
    [allFeedItems]
  );
  const mobileBalitaItems = useMemo(
    () => allFeedItems.filter((item) => item.contentType === "BALITA"),
    [allFeedItems]
  );
  const mobileTipidItems = useMemo(
    () => allFeedItems.filter((item) => item.contentType === "TIPID"),
    [allFeedItems]
  );
  const mobileKwentoItems = useMemo(
    () => allFeedItems.filter((item) => item.contentType === "KWENTO"),
    [allFeedItems]
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
        {/* 0. Fuel News Banner — real-time gas prices + news (always renders with fallback chain) */}
        <MobileFuelNewsBanner fuelNews={fuelNews} prices={prices} />

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
          <MobilePopularCategories categories={wpCategories && wpCategories.length > 0 ? wpCategories : mockCategories} />
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

        {/* 8b. Brand Partners */}
        <div className="mt-6">
          <MobileBrandPartners />
        </div>

        {/* 9. Trending News — Real-time from NewsData.io */}
        {allTrendingNews.length > 0 && (
          <div className="mt-6">
            <MobileTrendingNews items={allTrendingNews} />
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
        {/* Hook Hero — real WP featured articles, fallback to mock */}
        <HookHero slides={hookHeroSlides && hookHeroSlides.length > 0 ? hookHeroSlides : mockHookSlides} />

        {/* Fuel News Hero Banner — always renders with fallback chain */}
        <FuelNewsHeroBanner fuelNews={fuelNews} prices={prices} />

        {/* Quick Price Strip */}
        <QuickPriceStrip prices={prices} />

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
                      {(wpCategories && wpCategories.length > 0 ? wpCategories : mockCategories).map((cat) => {
                        const colorMap: Record<string, { badge: string; image: string; Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }> = {
                          gasolina: { badge: "bg-yellow-500", image: "/images/categories/gasolina.jpg", Icon: FireIcon },
                          diesel: { badge: "bg-blue-600", image: "/images/categories/diesel.jpg", Icon: TruckIcon },
                          lpg: { badge: "bg-amber-500", image: "/images/categories/lpg.jpg", Icon: BoltIcon },
                          balita: { badge: "bg-red-600", image: "/images/categories/balita.jpg", Icon: NewspaperIcon },
                          tips: { badge: "bg-emerald-500", image: "/images/categories/tips.jpg", Icon: LightBulbIcon },
                          eleksyon: { badge: "bg-orange-500", image: "/images/categories/eleksyon.jpg", Icon: MegaphoneIcon },
                          showbiz: { badge: "bg-pink-500", image: "/images/categories/showbiz.jpg", Icon: StarIcon },
                          sports: { badge: "bg-teal-500", image: "/images/categories/sports.jpg", Icon: StarIcon },
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
                              <Image
                                src={meta.image}
                                alt={cat.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                sizes="33vw"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
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

                  {/* Trending News — Real-time from RSS + NewsData.io */}
                  {allTrendingNews.length > 0 && (
                    <TrendingNewsSection items={allTrendingNews} />
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
