import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import FuelPriceTable from "@/components/article/FuelPriceTable";
import FAQSection from "@/components/ui/FAQSection";
import AdSlot from "@/components/ui/AdSlot";
import ArticleCard from "@/components/article/ArticleCard";
import { mockFuelPrices, mockArticles } from "@/lib/mock-data";
import Link from "next/link";
import type { FAQItem } from "@/lib/types";

interface Props {
  params: Promise<{ brand: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand } = await params;
  const fuelBrand = mockFuelPrices.find((f) => f.brandSlug === brand);
  const brandName = fuelBrand?.brand ?? brand.charAt(0).toUpperCase() + brand.slice(1);

  return {
    title: `Presyo ng ${brandName} Gasoline — Updated Daily`,
    description: `Alamin ang pinakabagong presyo ng gasolina, diesel, at premium fuel sa ${brandName}. Regular: ₱${fuelBrand?.regular.toFixed(2) ?? "N/A"}, Diesel: ₱${fuelBrand?.diesel.toFixed(2) ?? "N/A"}.`,
  };
}

export default async function BrandPage({ params }: Props) {
  const { brand } = await params;
  const fuelBrand = mockFuelPrices.find((f) => f.brandSlug === brand);
  const brandName = fuelBrand?.brand ?? brand.charAt(0).toUpperCase() + brand.slice(1);

  const brandFAQs: FAQItem[] = [
    {
      question: `Magkano ang regular gasoline sa ${brandName} ngayon?`,
      answer: `Ang presyo ng regular gasoline sa ${brandName} ay ₱${fuelBrand?.regular.toFixed(2) ?? "N/A"} per liter base sa pinakabagong update. Tandaan na ang presyo ay maaaring mag-iba depende sa lokasyon.`,
    },
    {
      question: `Magkano ang diesel sa ${brandName}?`,
      answer: `Ang presyo ng diesel sa ${brandName} ay ₱${fuelBrand?.diesel.toFixed(2) ?? "N/A"} per liter. Ang diesel prices ay karaniwang mas mura kaysa sa gasoline.`,
    },
    {
      question: `May loyalty card ba ang ${brandName}?`,
      answer: `Oo, ang ${brandName} ay may fuel loyalty/rewards program na nagbibigay ng points o discounts sa bawat pag-fill up. I-check ang kanilang official website para sa mga detalye ng promo.`,
    },
  ];

  const relatedArticles = mockArticles.slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/gasolina" className="hover:text-orange-500 transition-colors">Presyo ng Gas</Link>
        <span>/</span>
        <span className="text-gray-600">{brandName}</span>
      </nav>

      {/* Hero */}
      <AnimatedSection>
        <div className="text-center mb-10">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Presyo ng <span className="text-orange-500">{brandName}</span> Gasoline
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Updated daily — presyo ng gasolina, diesel, at premium fuel sa {brandName} stations sa Pilipinas.
          </p>
        </div>
      </AnimatedSection>

      {/* Brand specific prices */}
      {fuelBrand && (
        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: "Regular", price: fuelBrand.regular },
              { label: "Unleaded", price: fuelBrand.unleaded },
              { label: "Premium", price: fuelBrand.premium },
              { label: "Diesel", price: fuelBrand.diesel },
            ].map((item) => (
              <div key={item.label} className="text-center p-5 bg-white rounded-2xl border border-gray-200">
                <p className="text-sm text-gray-500">{item.label}</p>
                <p className="text-3xl font-extrabold text-orange-500 mt-1">
                  &#8369;{item.price.toFixed(2)}
                </p>
                <p className="text-xs text-gray-400 mt-1">per liter</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      )}

      {/* All brands comparison */}
      <AnimatedSection delay={0.15}>
        <FuelPriceTable caption={`I-compare ang ${brandName} sa iba pang fuel brands`} />
      </AnimatedSection>

      <AdSlot size="in-article" className="my-8" />

      {/* Brand content */}
      <AnimatedSection delay={0.2}>
        <div className="article-content my-10">
          <h2>Tungkol sa {brandName}</h2>
          <p>
            Ang {brandName} ay isa sa mga pinakakilalang fuel brand sa Pilipinas.
            Kilala sila sa kalidad ng kanilang products at malawak na network ng
            gas stations sa buong bansa — mula Metro Manila hanggang sa mga
            probinsya.
          </p>
          <p>
            Ang {brandName} ay nag-o-offer ng iba&apos;t ibang fuel grades para sa
            gasoline at diesel vehicles. Ang kanilang premium fuel products ay
            may enhanced performance additives na nakakatulong sa engine
            efficiency at cleanliness.
          </p>
        </div>
      </AnimatedSection>

      {/* Related articles */}
      <AnimatedSection delay={0.1}>
        <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6 tracking-tight">
          Mga Kaugnay na Artikulo
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedArticles.map((a, i) => (
            <ArticleCard key={a.id} article={a} index={i} variant="compact" />
          ))}
        </div>
      </AnimatedSection>

      {/* FAQ */}
      <FAQSection faqs={brandFAQs} heading={`Mga Madalas Itanong tungkol sa ${brandName}`} />
    </div>
  );
}
