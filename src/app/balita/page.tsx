import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ArticleCard from "@/components/article/ArticleCard";
import AdSlot from "@/components/ui/AdSlot";
import DesktopSidebar from "@/components/sidebar/DesktopSidebar";
import { mockArticles } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Balita — Fuel Industry News sa Pilipinas",
  description:
    "Pinakabagong balita tungkol sa fuel industry sa Pilipinas. Oil price updates, DOE announcements, at mga development sa energy sector.",
};

export default function BalitaPage() {
  const newsArticles = mockArticles;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
    <div>
      <AnimatedSection>
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            <span className="text-orange-500">Balita</span> sa Fuel Industry
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Pinakabagong balita tungkol sa oil prices, DOE announcements,
            at mga development sa energy sector ng Pilipinas.
          </p>
        </div>
      </AnimatedSection>

      <AdSlot size="leaderboard" className="mb-8" />

      {/* News grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsArticles.map((article, i) => (
          <AnimatedSection key={article.id} delay={i * 0.08}>
            <ArticleCard article={article} index={i} variant="compact" />
          </AnimatedSection>
        ))}
      </div>

      <AdSlot size="in-article" className="mt-10" />

      {/* SEO content */}
      <AnimatedSection delay={0.2}>
        <div className="article-content mt-12">
          <h2>Tungkol sa Fuel News sa Pilipinas</h2>
          <p>
            Ang Latest Balita PH ay nagbibigay ng pinakabagong at pinaka-accurate
            na balita tungkol sa fuel industry sa Pilipinas. Mula sa weekly
            oil price adjustments hanggang sa mga policy changes ng DOE,
            ini-cover namin ang lahat ng importanteng impormasyon para sa
            mga Filipino motorista at consumers.
          </p>
          <p>
            Ang aming team ng experienced energy journalists ay nag-aanalisa
            ng global at local oil market trends para maibigay sa inyo ang
            context sa likod ng bawat price movement.
          </p>
        </div>
      </AnimatedSection>
    </div>

    <DesktopSidebar showComparison />
    </div>
    </div>
  );
}
