import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";
import { mockFeedItems } from "@/lib/mock-data";
import { fetchTrendingNews, fetchFuelNews } from "@/lib/news-api";

export const metadata: Metadata = {
  title: "Latest Balita PH — Presyo ng Gasolina, Diesel, at LPG sa Pilipinas",
  description:
    "Real-time fuel price alerts, tipid tips, at balita tungkol sa gasolina, diesel, at LPG sa Pilipinas. I-compare ang presyo ng Petron, Shell, Caltex, Phoenix, at iba pa.",
};

function HomePageJsonLd() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Latest Balita PH",
    url: "https://latestbalitaph.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://latestbalitaph.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Latest Balita PH",
    url: "https://latestbalitaph.com",
    logo: "https://latestbalitaph.com/logo.png",
    sameAs: [],
    description:
      "Ang pinaka-updated na fuel price guide sa Pilipinas. Real-time presyo ng gasolina, diesel, at LPG mula sa lahat ng major brands.",
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: mockFeedItems.slice(0, 10).map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://latestbalitaph.com${item.actionHref}`,
      name: item.hookHeadline,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
    </>
  );
}

export default async function HomePage() {
  const [trendingNews, fuelNews] = await Promise.all([
    fetchTrendingNews({ category: "top", size: 10 }),
    fetchFuelNews(5),
  ]);

  return (
    <>
      <HomePageJsonLd />
      <HomePageClient trendingNews={trendingNews} fuelNews={fuelNews} />
    </>
  );
}
