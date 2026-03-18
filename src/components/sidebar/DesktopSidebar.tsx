"use client";

import FuelPriceSidebar from "./FuelPriceSidebar";
import TrendingSidebar from "./TrendingSidebar";
import MapSidebarWidget from "./MapSidebarWidget";
import NewsletterCTA from "./NewsletterCTA";
import BrandComparisonWidget from "./BrandComparisonWidget";
import AdSlot from "@/components/ui/AdSlot";

interface DesktopSidebarProps {
  showPrices?: boolean;
  showMap?: boolean;
  showTrending?: boolean;
  showNewsletter?: boolean;
  showComparison?: boolean;
  showAd?: boolean;
}

export default function DesktopSidebar({
  showPrices = true,
  showMap = true,
  showTrending = true,
  showNewsletter = true,
  showComparison = false,
  showAd = true,
}: DesktopSidebarProps) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-20 space-y-5">
        {showPrices && <FuelPriceSidebar />}
        {showComparison && <BrandComparisonWidget />}
        {showMap && <MapSidebarWidget />}
        {showTrending && <TrendingSidebar />}
        {showNewsletter && <NewsletterCTA />}
        {showAd && <AdSlot size="sidebar" />}
      </div>
    </aside>
  );
}
