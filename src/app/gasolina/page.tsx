import type { Metadata } from "next";
import FuelPriceTable from "@/components/article/FuelPriceTable";
import FAQSection from "@/components/ui/FAQSection";
import AdSlot from "@/components/ui/AdSlot";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ArticleCard from "@/components/article/ArticleCard";
import DesktopSidebar from "@/components/sidebar/DesktopSidebar";
import { getFuelPrices } from "@/lib/fuel-prices";
import { getArticlesByCategory } from "@/lib/content";
import Link from "next/link";
import type { FAQItem } from "@/lib/types";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://latestbalita.ph";

export const metadata: Metadata = {
  title: "Presyo ng Gasolina sa Pilipinas — Updated Daily",
  description:
    "Alamin ang pinakabagong presyo ng gasolina, diesel, at premium fuel sa lahat ng gas stations sa Pilipinas. I-compare ang Petron, Shell, Caltex, Phoenix, at iba pa.",
  alternates: {
    canonical: `${siteUrl}/gasolina`,
  },
};

const gasolinaFAQs: FAQItem[] = [
  {
    question: "Magkano ang presyo ng gasolina ngayon sa Pilipinas?",
    answer:
      "Ang presyo ng regular gasoline ay nasa range ng P89-92 per liter, habang ang unleaded ay nasa P93-96 per liter depende sa brand at lokasyon. Ang diesel naman ay nasa P118-121 per liter. I-check ang aming updated price table sa itaas para sa exact prices.",
  },
  {
    question: "Kailan nagbabago ang presyo ng gas sa Pilipinas?",
    answer:
      "Ang fuel price adjustments sa Pilipinas ay karaniwang ipinapatupad tuwing Martes ng umaga (12:01 AM). Ang DOE ay nag-aanunsyo ng price movements bago ang actual adjustment date.",
  },
  {
    question: "Alin ang pinakamurang gas station sa Pilipinas?",
    answer:
      "Ang independent fuel brands tulad ng Cleanfuel, Seaoil, at Phoenix ay karaniwang mas mura kaysa sa big three (Petron, Shell, Caltex) ng P1-3 per liter. Gayunpaman, ang actual prices ay nag-iiba base sa lokasyon.",
  },
  {
    question: "Paano makatipid sa gasolina?",
    answer:
      "May ilang tips para makatipid: (1) Mag-fill up bago ang price hike, (2) Gumamit ng fuel-efficient driving techniques, (3) I-compare ang prices ng iba't ibang brands, (4) Regular maintenance ng sasakyan, (5) Gumamit ng loyalty cards at fuel discount apps.",
  },
  {
    question: "Bakit mahal ang gas sa Pilipinas?",
    answer:
      "Ang presyo ng gas sa Pilipinas ay affected ng global crude oil prices, exchange rate ng peso vs US dollar, taxes (excise tax, VAT), at transportation costs. Ang oil deregulation law ay nagpapahintulot sa free market pricing ng fuel products.",
  },
];

export default async function GasolinaPage() {
  const [{ data: fuelArticles }, fuelPrices] = await Promise.all([
    getArticlesByCategory("gasolina", 1, 6),
    getFuelPrices(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
    {/* BreadcrumbList JSON-LD */}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: siteUrl,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Presyo ng Gasolina",
            },
          ],
        }),
      }}
    />
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
    <div>
      {/* Hero */}
      <AnimatedSection>
        <div className="text-center mb-10">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Presyo ng <span className="text-orange-500">Gasolina</span> sa Pilipinas
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Updated daily — i-compare ang presyo ng gasolina, diesel, at premium fuel
            sa lahat ng major fuel brands sa Pilipinas.
          </p>
        </div>
      </AnimatedSection>

      {/* Fuel Price Table */}
      <AnimatedSection delay={0.1}>
        <FuelPriceTable prices={fuelPrices} />
      </AnimatedSection>

      {/* Brand quick links */}
      <AnimatedSection delay={0.15}>
        <div className="my-10">
          <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4 tracking-tight">
            Presyo per Brand
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {fuelPrices.map((fuel) => (
              <Link
                key={fuel.brandSlug}
                href={`/gasolina/${fuel.brandSlug}`}
                className="text-center p-4 bg-white rounded-xl border border-gray-200 hover:border-orange-500/30 hover:shadow-md transition-all"
              >
                <p className="font-bold text-gray-900">{fuel.brand}</p>
                <p className="text-sm text-orange-500 font-semibold mt-1">
                  &#8369;{fuel.regular.toFixed(2)}
                </p>
                <p className="text-xs text-gray-400">Regular</p>
              </Link>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AdSlot size="in-article" className="my-8" />

      {/* Long-form SEO content */}
      <AnimatedSection delay={0.2}>
        <div className="article-content my-10">
          <h2>Gabay sa Presyo ng Gasolina sa Pilipinas 2026</h2>
          <p>
            Ang Pilipinas ay isa sa mga bansa sa Southeast Asia na may
            deregulated oil industry. Ibig sabihin, ang mga fuel companies ay
            malayang magtakda ng kanilang presyo base sa global oil market
            conditions, exchange rate, at iba pang factors.
          </p>
          <p>
            Sa Latest Balita PH, layunin naming bigyan ka ng pinaka-updated na
            impormasyon tungkol sa presyo ng gasolina, diesel, at LPG para
            makatulong sa iyo na mag-plan ng iyong fuel budget at makatipid.
          </p>

          <h3>Paano Namin Kino-collect ang Fuel Prices</h3>
          <p>
            Ang aming fuel price data ay nanggagaling sa official announcements
            ng mga fuel companies at DOE monitoring reports. Ina-update namin
            ang presyo tuwing may bagong price adjustment, na karaniwang
            nangyayari tuwing Martes.
          </p>
        </div>
      </AnimatedSection>

      {/* Related articles */}
      <AnimatedSection delay={0.1}>
        <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6 tracking-tight">
          Mga Kaugnay na Artikulo
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fuelArticles.slice(0, 3).map((a, i) => (
            <ArticleCard key={a.id} article={a} index={i} variant="compact" />
          ))}
        </div>
      </AnimatedSection>

      {/* FAQ Section with Schema */}
      <FAQSection faqs={gasolinaFAQs} />

      <AdSlot size="leaderboard" className="mt-8" />
    </div>

    <DesktopSidebar showPrices={false} showMap showTrending showNewsletter showComparison />
    </div>
    </div>
  );
}
