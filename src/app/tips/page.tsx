import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ArticleCard from "@/components/article/ArticleCard";
import FAQSection from "@/components/ui/FAQSection";
import AdSlot from "@/components/ui/AdSlot";
import DesktopSidebar from "@/components/sidebar/DesktopSidebar";
import { mockArticles } from "@/lib/mock-data";
import type { FAQItem } from "@/lib/types";

export const metadata: Metadata = {
  title: "Tips sa Pagtitipid ng Gas — Paano Makatipid sa Fuel",
  description:
    "Mga practical na tips para makatipid sa gasolina at diesel. Fuel-efficient driving techniques, maintenance tips, at smart fueling strategies para sa Filipino drivers.",
};

const tipsFAQs: FAQItem[] = [
  {
    question: "Paano makatipid sa gas kapag traffic?",
    answer:
      "Sa traffic, iwasan ang madalas na pag-accelerate at pag-brake. Panatilihin ang steady pace, gumamit ng engine braking, at i-off ang engine kapag matagal ang hintay (higit 1 minuto). Ang eco mode ng sasakyan ay nakakatulong din.",
  },
  {
    question: "Anong oras pinakamaganda mag-fill up?",
    answer:
      "Pinakamaganda mag-fill up sa umaga o gabi kapag malamig ang temperatura. Mas dense ang fuel kapag malamig kaya mas marami kang makukuha per liter. Also, mag-fill up bago ang price hike (usually announced Monday for Tuesday implementation).",
  },
  {
    question: "Mas tipid ba ang diesel kaysa gasoline?",
    answer:
      "Oo, ang diesel vehicles ay generally mas fuel-efficient kaysa sa gasoline. Ang diesel engines ay may mas mataas na compression ratio na nagre-result sa better fuel economy. Ang presyo ng diesel ay karaniwang mas mura rin ng ₱3-5 per liter.",
  },
];

export default function TipsPage() {
  const tipsArticles = mockArticles.filter(
    (a) => a.categories.some((c) => c.slug === "tips")
  );
  const allArticles = tipsArticles.length > 0 ? tipsArticles : mockArticles.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
    <div>
      <AnimatedSection>
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Paano <span className="text-orange-500">Makatipid</span> sa Gas
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Practical na tips at strategies para mabawasan ang fuel expenses mo.
            Mula sa driving techniques hanggang sa smart fueling habits.
          </p>
        </div>
      </AnimatedSection>

      {/* Quick tips */}
      <AnimatedSection delay={0.1}>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white mb-10">
          <h2 className="font-heading text-2xl font-bold mb-6">Top 5 Quick Tips</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Mag-fill up bago ang price hike — usually tuwing Martes",
              "Maintain proper tire pressure — saves up to 3% fuel",
              "Iwasan ang aggressive driving — sudden accel/braking wastes fuel",
              "Gumamit ng cruise control sa highway trips",
              "I-compare ang presyo ng brands bago mag-fill up",
            ].map((tip, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="bg-white/20 rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <p className="text-orange-100 text-sm leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AdSlot size="leaderboard" className="mb-8" />

      {/* Tips articles */}
      <AnimatedSection delay={0.15}>
        <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6 tracking-tight">
          Mga Artikulo tungkol sa Pagtitipid
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {allArticles.map((article, i) => (
            <ArticleCard key={article.id} article={article} index={i} variant="compact" />
          ))}
        </div>
      </AnimatedSection>

      {/* Long-form SEO content */}
      <AnimatedSection delay={0.2}>
        <div className="article-content mt-12">
          <h2>Complete Guide: Paano Makatipid sa Gasolina</h2>
          <p>
            Sa pagtaas ng presyo ng gasolina, importante na alam mo ang mga
            tamang strategies para mabawasan ang iyong fuel expenses. Hindi
            lang ito tungkol sa paghahanap ng pinakamurang gas station —
            maraming factors ang nakakaapekto sa iyong fuel consumption.
          </p>
          <h3>Fuel-Efficient Driving Techniques</h3>
          <p>
            Ang iyong driving habits ay may malaking epekto sa fuel consumption.
            Ayon sa mga eksperto, ang aggressive driving (mabilis na acceleration,
            hard braking) ay maaaring mag-increase ng fuel consumption ng hanggang
            33% sa highway at 5% sa city driving.
          </p>
          <h3>Vehicle Maintenance Tips</h3>
          <p>
            Ang regular na maintenance ng iyong sasakyan ay nakakatulong sa
            fuel efficiency. Siguraduhing tama ang tire pressure, regular ang
            oil change, at malinis ang air filter. Ang isang well-maintained
            na engine ay mas fuel-efficient.
          </p>
        </div>
      </AnimatedSection>

      {/* FAQ */}
      <FAQSection faqs={tipsFAQs} heading="Mga Madalas Itanong tungkol sa Pagtitipid ng Gas" />
    </div>

    <DesktopSidebar showComparison />
    </div>
    </div>
  );
}
