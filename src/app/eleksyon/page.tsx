import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ArticleCard from "@/components/article/ArticleCard";
import AdSlot from "@/components/ui/AdSlot";
import DesktopSidebar from "@/components/sidebar/DesktopSidebar";
import { getArticlesByCategory } from "@/lib/content";

export const metadata: Metadata = {
  title: "Epekto ng Eleksyon sa Presyo ng Gas — Election 2025",
  description:
    "Paano naaapektuhan ng eleksyon ang presyo ng gasolina at diesel sa Pilipinas? Alamin ang mga plataporma ng kandidato tungkol sa fuel pricing at energy policy.",
};

export default async function EleksyonPage() {
  const { data: allArticles } = await getArticlesByCategory("eleksyon", 1, 10);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
    <div>
      <AnimatedSection>
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Epekto ng <span className="text-orange-500">Eleksyon</span> sa Presyo ng Gas
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Paano naaapektuhan ng eleksyon at pulitika ang presyo ng fuel sa
            Pilipinas? Sinusuri natin ang mga plataporma at pangako ng mga
            kandidato.
          </p>
        </div>
      </AnimatedSection>

      <AdSlot size="leaderboard" className="mb-8" />

      {/* Articles */}
      <AnimatedSection delay={0.1}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {allArticles.map((article, i) => (
            <ArticleCard key={article.id} article={article} index={i} variant="compact" />
          ))}
        </div>
      </AnimatedSection>

      {/* SEO content */}
      <AnimatedSection delay={0.2}>
        <div className="article-content">
          <h2>Eleksyon at Fuel Prices: Ano ang Koneksyon?</h2>
          <p>
            Ang eleksyon sa Pilipinas ay palaging may epekto sa ekonomiya,
            kasama na ang presyo ng fuel. Ang mga kandidato ay may iba&apos;t
            ibang plataporma pagdating sa oil deregulation law, fuel subsidy,
            at energy policy.
          </p>
          <p>
            Importante na maintindihan ng mga botante kung paano maaapektuhan
            ng kanilang boto ang presyo ng gasolina at diesel sa mga susunod
            na taon. Sa seksyong ito, sinusuri natin ang mga posisyon ng
            iba&apos;t ibang kandidato at partido.
          </p>
          <h3>Mga Isyu sa Energy na Dapat Bantayan</h3>
          <ul>
            <li>Oil Deregulation Law review at possible amendments</li>
            <li>Fuel subsidy programs para sa public transport</li>
            <li>Excise tax adjustments sa petroleum products</li>
            <li>Renewable energy transition plans</li>
            <li>Electric vehicle incentives at infrastructure</li>
          </ul>
        </div>
      </AnimatedSection>

      <AdSlot size="in-article" className="mt-8" />
    </div>

    <DesktopSidebar showComparison />
    </div>
    </div>
  );
}
