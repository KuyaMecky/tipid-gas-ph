import type { Article, Category, FuelPrice, AuthorProfile, FeedItem, FeedContentType, FeedUrgency, HookSlide, GasStation, FuelBrand, StationAmenity } from "./types";

// Mock data for development / demo before WordPress is connected

const PLACEHOLDER = "https://picsum.photos/seed/fuel1/800/420";
const PLACEHOLDER_2 = "https://picsum.photos/seed/fuel2/800/420";
const PLACEHOLDER_3 = "https://picsum.photos/seed/fuel3/800/420";
const PLACEHOLDER_4 = "https://picsum.photos/seed/fuel4/800/420";
const PLACEHOLDER_5 = "https://picsum.photos/seed/fuel5/800/420";
const PLACEHOLDER_6 = "https://picsum.photos/seed/fuel6/800/420";

export const mockCategories: Category[] = [
  { id: 1, name: "Gasolina", slug: "gasolina", description: "Presyo ng gasolina sa buong Pilipinas", count: 42 },
  { id: 2, name: "Diesel", slug: "diesel", description: "Presyo ng diesel at fuel updates", count: 35 },
  { id: 3, name: "LPG", slug: "lpg", description: "Presyo ng LPG at cooking gas", count: 18 },
  { id: 4, name: "Balita", slug: "balita", description: "Balita tungkol sa fuel industry", count: 28 },
  { id: 5, name: "Tips", slug: "tips", description: "Tips sa pagtitipid ng gas", count: 22 },
  { id: 6, name: "Eleksyon", slug: "eleksyon", description: "Epekto ng eleksyon sa presyo ng gas", count: 10 },
];

function makeArticle(overrides: Partial<Article> & { id: number; slug: string; title: string }): Article {
  return {
    excerpt: "<p>Alamin ang pinakabagong presyo ng gasolina at diesel sa Pilipinas ngayong linggo.</p>",
    content: "<p>Full article content here...</p>",
    date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    modified: new Date().toISOString(),
    featuredImage: { url: PLACEHOLDER, alt: "Fuel price image", width: 1200, height: 630 },
    author: { name: "Maria Santos", slug: "maria-santos", avatar: "" },
    categories: [{ name: "Gasolina", slug: "gasolina" }],
    tags: [{ name: "PresyoNgGas", slug: "presyo-ng-gas" }],
    ...overrides,
  };
}

export const mockArticles: Article[] = [
  makeArticle({
    id: 1,
    slug: "presyo-ng-gasolina-petron-ngayong-linggo",
    title: "Presyo ng Gasolina sa Petron Ngayong Linggo — March 2026 Update",
    excerpt: "<p>Alamin ang updated na presyo ng Petron Blaze 100, XCS, at Xtra Advance para sa linggong ito. May rollback ba o price hike?</p>",
    featuredImage: { url: PLACEHOLDER, alt: "Petron fuel prices", width: 1200, height: 630 },
    categories: [{ name: "Gasolina", slug: "gasolina" }, { name: "Balita", slug: "balita" }],
    author: { name: "Maria Santos", slug: "maria-santos", avatar: "" },
  }),
  makeArticle({
    id: 2,
    slug: "shell-vs-petron-vs-caltex-fuel-price-comparison",
    title: "Shell vs Petron vs Caltex: Alin ang Pinakamurang Gas Ngayon?",
    excerpt: "<p>Side-by-side comparison ng presyo ng tatlong pinakamalaking fuel brand sa Pilipinas. Alamin kung saan ka makakatipid!</p>",
    featuredImage: { url: PLACEHOLDER_2, alt: "Fuel brand comparison", width: 1200, height: 630 },
    categories: [{ name: "Gasolina", slug: "gasolina" }],
    author: { name: "Juan dela Cruz", slug: "juan-dela-cruz", avatar: "" },
  }),
  makeArticle({
    id: 3,
    slug: "paano-makatipid-sa-gas-10-tips",
    title: "Paano Makatipid sa Gas: 10 Tips para sa Filipino Drivers",
    excerpt: "<p>Nagtaas na naman ang presyo ng gas? Huwag mag-alala! Narito ang 10 proven tips para makatipid sa fuel expenses mo.</p>",
    featuredImage: { url: PLACEHOLDER_3, alt: "Gas saving tips", width: 1200, height: 630 },
    categories: [{ name: "Tips", slug: "tips" }],
    author: { name: "Ana Reyes", slug: "ana-reyes", avatar: "" },
  }),
  makeArticle({
    id: 4,
    slug: "diesel-price-update-march-2026",
    title: "Diesel Price Update: Magkano na ang Diesel Ngayong March 2026?",
    excerpt: "<p>Comprehensive update sa presyo ng diesel sa lahat ng major fuel brands. Kasama ang price history at trend analysis.</p>",
    featuredImage: { url: PLACEHOLDER_4, alt: "Diesel prices", width: 1200, height: 630 },
    categories: [{ name: "Diesel", slug: "diesel" }],
    author: { name: "Carlos Tan", slug: "carlos-tan", avatar: "" },
  }),
  makeArticle({
    id: 5,
    slug: "lpg-price-update-pilipinas",
    title: "LPG Price Update: Presyo ng Cooking Gas sa Pilipinas Ngayon",
    excerpt: "<p>Alamin ang pinakabagong presyo ng LPG mula sa Petron Gasul, Solane, Total, at iba pa. May dagdag na P2/kg ngayong linggo.</p>",
    featuredImage: { url: PLACEHOLDER_5, alt: "LPG prices Philippines", width: 1200, height: 630 },
    categories: [{ name: "LPG", slug: "lpg" }],
    author: { name: "Maria Santos", slug: "maria-santos", avatar: "" },
  }),
  makeArticle({
    id: 6,
    slug: "doe-fuel-price-rollback-announcement",
    title: "DOE Nag-anunsyo ng Fuel Price Rollback sa Susunod na Linggo",
    excerpt: "<p>Good news para sa mga motorista! Ayon sa Department of Energy, magkakaroon ng rollback sa gasolina at diesel sa susunod na Martes.</p>",
    featuredImage: { url: PLACEHOLDER_6, alt: "DOE fuel announcement", width: 1200, height: 630 },
    categories: [{ name: "Balita", slug: "balita" }, { name: "Gasolina", slug: "gasolina" }],
    author: { name: "Juan dela Cruz", slug: "juan-dela-cruz", avatar: "" },
  }),
  makeArticle({
    id: 7,
    slug: "epekto-ng-eleksyon-2025-sa-presyo-ng-gas",
    title: "Epekto ng Eleksyon sa Presyo ng Gas: Ano ang Mga Pangako ng Kandidato?",
    excerpt: "<p>Sinusuri natin ang mga plataporma ng mga kandidato pagdating sa fuel subsidy, oil deregulation, at presyo ng bilihin.</p>",
    featuredImage: { url: PLACEHOLDER, alt: "Election fuel impact", width: 1200, height: 630 },
    categories: [{ name: "Eleksyon", slug: "eleksyon" }],
    author: { name: "Ana Reyes", slug: "ana-reyes", avatar: "" },
  }),
  makeArticle({
    id: 8,
    slug: "phoenix-fuel-masters-promo-march-2026",
    title: "Phoenix Fuel Masters: May Bagong Promo at Discount para sa March!",
    excerpt: "<p>Alamin ang latest promo ng Phoenix Petroleum kasama ang SUPER97 at fuel card discounts para sa buwan ng Marso.</p>",
    featuredImage: { url: PLACEHOLDER_2, alt: "Phoenix fuel promo", width: 1200, height: 630 },
    categories: [{ name: "Gasolina", slug: "gasolina" }],
    author: { name: "Carlos Tan", slug: "carlos-tan", avatar: "" },
  }),
];

export const mockTrendingTags = [
  { name: "#PresyoNgGas", category: "Fuel Prices", count: "15k views" },
  { name: "#TipidTips", category: "Tips", count: "9.2k views" },
  { name: "#FuelUpdate", category: "Balita", count: "7.5k views" },
  { name: "#DieselWatch", category: "Diesel", count: "5.1k views" },
  { name: "#LPGPresyo", category: "LPG", count: "4k views" },
];

export const mockTrendingAuthors = [
  { name: "Maria Santos", mentions: "15.2k", avatar: "" },
  { name: "Juan dela Cruz", mentions: "12.8k", avatar: "" },
  { name: "Ana Reyes", mentions: "9.5k", avatar: "" },
  { name: "Carlos Tan", mentions: "7.1k", avatar: "" },
];

export const mockFuelPrices: FuelPrice[] = [
  { brand: "Petron", brandSlug: "petron", unleaded: 63.15, regular: 58.90, diesel: 55.40, premium: 72.36, lastUpdated: "2026-03-17T06:00:00Z" },
  { brand: "Shell", brandSlug: "shell", unleaded: 63.40, regular: 59.10, diesel: 55.60, premium: 73.15, lastUpdated: "2026-03-17T06:00:00Z" },
  { brand: "Caltex", brandSlug: "caltex", unleaded: 63.25, regular: 58.95, diesel: 55.45, premium: 72.80, lastUpdated: "2026-03-17T06:00:00Z" },
  { brand: "Phoenix", brandSlug: "phoenix", unleaded: 62.50, regular: 57.90, diesel: 54.80, premium: 71.50, lastUpdated: "2026-03-17T06:00:00Z" },
  { brand: "Seaoil", brandSlug: "seaoil", unleaded: 62.30, regular: 57.60, diesel: 54.50, premium: 71.20, lastUpdated: "2026-03-17T06:00:00Z" },
  { brand: "PTT", brandSlug: "ptt", unleaded: 62.80, regular: 58.20, diesel: 55.00, premium: 71.90, lastUpdated: "2026-03-17T06:00:00Z" },
  { brand: "Unioil", brandSlug: "unioil", unleaded: 62.60, regular: 58.00, diesel: 54.70, premium: 71.60, lastUpdated: "2026-03-17T06:00:00Z" },
  { brand: "Cleanfuel", brandSlug: "cleanfuel", unleaded: 61.90, regular: 57.30, diesel: 54.20, premium: 70.80, lastUpdated: "2026-03-17T06:00:00Z" },
  { brand: "Jetti", brandSlug: "jetti", unleaded: 62.40, regular: 57.70, diesel: 54.60, premium: 71.30, lastUpdated: "2026-03-17T06:00:00Z" },
  { brand: "Total", brandSlug: "total", unleaded: 63.00, regular: 58.50, diesel: 55.10, premium: 72.00, lastUpdated: "2026-03-17T06:00:00Z" },
];

export const mockAuthorProfiles: AuthorProfile[] = [
  {
    name: "Maria Santos",
    slug: "maria-santos",
    avatar: "",
    role: "Senior Energy Reporter",
    credentials: "BS Petroleum Engineering, UP Diliman. 12+ years covering Philippine fuel industry.",
    bio: "Si Maria ay isang award-winning energy journalist na may higit 12 taon na karanasan sa pag-cover ng oil and gas industry sa Pilipinas. Dating engineer sa isang oil refinery bago naging full-time journalist.",
    socialLinks: { twitter: "https://twitter.com/mariasantos", linkedin: "https://linkedin.com/in/mariasantos" },
  },
  {
    name: "Juan dela Cruz",
    slug: "juan-dela-cruz",
    avatar: "",
    role: "Business & Economy Editor",
    credentials: "MA Economics, Ateneo de Manila. Former DOE consultant.",
    bio: "Si Juan ay dating economic consultant ng Department of Energy. Ngayon ay nagsusulat siya ng in-depth analysis tungkol sa fuel pricing, oil deregulation, at energy policy sa Pilipinas.",
    socialLinks: { twitter: "https://twitter.com/juandelacruz", facebook: "https://facebook.com/juandelacruz" },
  },
  {
    name: "Ana Reyes",
    slug: "ana-reyes",
    avatar: "",
    role: "Consumer Advocacy Writer",
    credentials: "Licensed Professional Teacher. Consumer rights advocate since 2015.",
    bio: "Si Ana ay passionate advocate para sa consumer rights, lalo na pagdating sa fuel pricing transparency. Regular contributor sa mga consumer protection campaigns.",
    socialLinks: { linkedin: "https://linkedin.com/in/anareyes" },
  },
  {
    name: "Carlos Tan",
    slug: "carlos-tan",
    avatar: "",
    role: "Automotive & Fuel Tech Writer",
    credentials: "BS Mechanical Engineering, DLSU. Certified automotive technician.",
    bio: "Si Carlos ay certified mechanic at car enthusiast na nagsusulat ng practical tips tungkol sa fuel efficiency, vehicle maintenance, at automotive technology.",
    socialLinks: { twitter: "https://twitter.com/carlostan", linkedin: "https://linkedin.com/in/carlostan" },
  },
];

// Feed mock data

const FEED_IMG = (seed: string) => `https://picsum.photos/seed/${seed}/800/420`;

const feedAuthors = [
  { name: "Maria Santos", slug: "maria-santos", avatar: "" },
  { name: "Juan dela Cruz", slug: "juan-dela-cruz", avatar: "" },
  { name: "Ana Reyes", slug: "ana-reyes", avatar: "" },
  { name: "Carlos Tan", slug: "carlos-tan", avatar: "" },
];

function makeFeedItem(overrides: Partial<FeedItem> & {
  id: number;
  slug: string;
  hookHeadline: string;
  contentType: FeedContentType;
}): FeedItem {
  return {
    subHeadline: "Alamin ang detalye dito.",
    urgency: "normal" as FeedUrgency,
    actionLabel: "Basahin",
    actionHref: `/article/${overrides.slug}`,
    reactionCount: Math.floor(Math.random() * 2000) + 100,
    isBreaking: false,
    featuredImage: { url: FEED_IMG(`feed${overrides.id}`), alt: overrides.hookHeadline, width: 800, height: 420 },
    author: feedAuthors[overrides.id % feedAuthors.length],
    date: new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000).toISOString(),
    categories: [{ name: "Gasolina", slug: "gasolina" }],
    ...overrides,
  };
}

export const mockFeedItems: FeedItem[] = [
  // ALERT items (10)
  makeFeedItem({
    id: 101, slug: "taas-presyo-gasolina-bukas", contentType: "ALERT",
    hookHeadline: "TAAS-PRESYO: +P2.50/L sa Gasolina Bukas!",
    subHeadline: "Epektibo bukas ng 6AM. Mag-full tank na ngayon!",
    urgency: "critical", isBreaking: true, priceChange: "+P2.50/L",
    actionLabel: "Tingnan ang Presyo",
    categories: [{ name: "Gasolina", slug: "gasolina" }],
  }),
  makeFeedItem({
    id: 102, slug: "diesel-taas-presyo-alert", contentType: "ALERT",
    hookHeadline: "Diesel +P1.80/L — Truckers, Heads Up!",
    subHeadline: "Pangalawang taas-presyo sa loob ng dalawang linggo.",
    urgency: "high", priceChange: "+P1.80/L",
    actionLabel: "Detalye Dito",
    categories: [{ name: "Diesel", slug: "diesel" }],
  }),
  makeFeedItem({
    id: 103, slug: "rollback-gasolina-linggo", contentType: "ALERT",
    hookHeadline: "ROLLBACK: -P1.20/L sa Gasolina Next Week!",
    subHeadline: "DOE nag-confirm ng rollback sa lahat ng brands.",
    urgency: "high", priceChange: "-P1.20/L",
    actionLabel: "Magandang Balita!",
    categories: [{ name: "Gasolina", slug: "gasolina" }],
  }),
  makeFeedItem({
    id: 104, slug: "lpg-price-hike-march", contentType: "ALERT",
    hookHeadline: "LPG +P3.50/kg — Cooking Gas Sumirit!",
    subHeadline: "Petron Gasul, Solane, lahat apektado.",
    urgency: "high", priceChange: "+P3.50/kg",
    categories: [{ name: "LPG", slug: "lpg" }],
  }),
  makeFeedItem({
    id: 105, slug: "kerosene-price-update", contentType: "ALERT",
    hookHeadline: "Kerosene +P0.90/L — Unang Taas sa 2026",
    subHeadline: "Mga probinsya na gumagamit ng kerosene, apektado.",
    urgency: "normal", priceChange: "+P0.90/L",
    categories: [{ name: "Balita", slug: "balita" }],
  }),
  makeFeedItem({
    id: 106, slug: "shell-price-hike", contentType: "ALERT",
    hookHeadline: "Shell V-Power +P3.00/L — Pinakamataas sa 6 Months!",
    subHeadline: "Premium fuel users, brace yourselves.",
    urgency: "critical", priceChange: "+P3.00/L",
    actionLabel: "Compare Prices",
    categories: [{ name: "Gasolina", slug: "gasolina" }],
  }),
  makeFeedItem({
    id: 107, slug: "petron-rollback-diesel", contentType: "ALERT",
    hookHeadline: "Petron: Diesel -P0.65/L Rollback Bukas",
    subHeadline: "Mas mura na sa Petron kumpara sa Shell.",
    urgency: "normal", priceChange: "-P0.65/L",
    categories: [{ name: "Diesel", slug: "diesel" }],
  }),
  makeFeedItem({
    id: 108, slug: "fuel-tax-increase-april", contentType: "ALERT",
    hookHeadline: "TRAIN Law: +P1.00/L Dagdag Tax sa April!",
    subHeadline: "Susunod na tranche ng excise tax, epektibo April 1.",
    urgency: "high", priceChange: "+P1.00/L",
    categories: [{ name: "Balita", slug: "balita" }],
  }),
  makeFeedItem({
    id: 109, slug: "caltex-gas-hike-march", contentType: "ALERT",
    hookHeadline: "Caltex Silver +P2.10/L — Same Day Hike!",
    subHeadline: "Nagulat ang maraming motorista.",
    urgency: "normal", priceChange: "+P2.10/L",
    categories: [{ name: "Gasolina", slug: "gasolina" }],
  }),
  makeFeedItem({
    id: 110, slug: "phoenix-diesel-rollback", contentType: "ALERT",
    hookHeadline: "Phoenix Diesel -P1.50/L — Pinakamura Ngayon!",
    subHeadline: "Pansamantalang rollback, this week lang.",
    urgency: "normal", priceChange: "-P1.50/L",
    categories: [{ name: "Diesel", slug: "diesel" }],
  }),

  // TIPID items (10)
  makeFeedItem({
    id: 201, slug: "5-tricks-tipid-gas", contentType: "TIPID",
    hookHeadline: "5 Tricks Para Bumaba Gas Mo ng P500/Buwan",
    subHeadline: "Simple tips na pwede mong gawin ngayon na.",
    actionLabel: "I-try Ko To!",
    categories: [{ name: "Tips", slug: "tips" }],
  }),
  makeFeedItem({
    id: 202, slug: "fuel-card-discounts-guide", contentType: "TIPID",
    hookHeadline: "Fuel Card Hacks: Paano Mag-ipon ng P200/Fill-up",
    subHeadline: "Petron Value Card, Shell Go+, Caltex StarCash comparison.",
    actionLabel: "Alamin Paano",
    categories: [{ name: "Tips", slug: "tips" }],
  }),
  makeFeedItem({
    id: 203, slug: "eco-driving-techniques", contentType: "TIPID",
    hookHeadline: "Eco-Driving: Ang Secret ng 18km/L sa City",
    subHeadline: "Hindi kailangan ng hybrid. Technique lang.",
    actionLabel: "Turuan Mo Ko",
    categories: [{ name: "Tips", slug: "tips" }],
  }),
  makeFeedItem({
    id: 204, slug: "pinakamura-gas-station", contentType: "TIPID",
    hookHeadline: "Saan ang Pinakamura? Gas Station Price Map",
    subHeadline: "Alamin kung anong brand ang cheapest sa area mo.",
    actionLabel: "Hanapin Mo",
    categories: [{ name: "Gasolina", slug: "gasolina" }],
  }),
  makeFeedItem({
    id: 205, slug: "tire-pressure-fuel-savings", contentType: "TIPID",
    hookHeadline: "Tamang Tire Pressure = 7% Fuel Savings",
    subHeadline: "Maling pressure? Lugi ka sa gas.",
    actionLabel: "Basahin",
    categories: [{ name: "Tips", slug: "tips" }],
  }),
  makeFeedItem({
    id: 206, slug: "carpool-tips-metro-manila", contentType: "TIPID",
    hookHeadline: "Carpool Tips: Hatian sa Gas, P100 Lang Commute Mo!",
    subHeadline: "Safe, legal, at matipid na paraan ng pagbiyahe.",
    actionLabel: "Game!",
    categories: [{ name: "Tips", slug: "tips" }],
  }),
  makeFeedItem({
    id: 207, slug: "gas-app-comparison", contentType: "TIPID",
    hookHeadline: "Top 5 Gas Price Apps sa Pilipinas (2026 Ranked)",
    subHeadline: "Aling app ang pinaka-accurate at updated?",
    actionLabel: "I-download Na",
    categories: [{ name: "Tips", slug: "tips" }],
  }),
  makeFeedItem({
    id: 208, slug: "when-to-fill-up", contentType: "TIPID",
    hookHeadline: "Anong Araw Dapat Mag-gas? (Hint: Hindi Monday!)",
    subHeadline: "Data-backed na sagot kung kailan pinakamura.",
    actionLabel: "Reveal",
    categories: [{ name: "Tips", slug: "tips" }],
  }),
  makeFeedItem({
    id: 209, slug: "ac-vs-windows-gas", contentType: "TIPID",
    hookHeadline: "AC vs Bukas na Bintana: Alin Mas Matipid sa Gas?",
    subHeadline: "Depende sa speed mo. Alamin ang breakpoint.",
    actionLabel: "Sagot Dito",
    categories: [{ name: "Tips", slug: "tips" }],
  }),
  makeFeedItem({
    id: 210, slug: "monthly-gas-budget-planner", contentType: "TIPID",
    hookHeadline: "Gas Budget Planner: Magkano Talaga Dapat?",
    subHeadline: "Calculator para sa monthly fuel expenses mo.",
    actionLabel: "Compute Na",
    categories: [{ name: "Tips", slug: "tips" }],
  }),

  // BALITA items (10)
  makeFeedItem({
    id: 301, slug: "shell-vs-petron-comparison", contentType: "BALITA",
    hookHeadline: "Shell vs Petron: Sino Mas Mura Ngayon?",
    subHeadline: "Side-by-side comparison ng mga presyo ngayong linggo.",
    actionLabel: "I-compare",
    categories: [{ name: "Gasolina", slug: "gasolina" }],
  }),
  makeFeedItem({
    id: 302, slug: "doe-oil-monitor-report", contentType: "BALITA",
    hookHeadline: "DOE Oil Monitor: Ano ang Outlook sa April?",
    subHeadline: "Weekly report ng Department of Energy, buod dito.",
    actionLabel: "Buod Dito",
    categories: [{ name: "Balita", slug: "balita" }],
  }),
  makeFeedItem({
    id: 303, slug: "opec-production-cut-impact", contentType: "BALITA",
    hookHeadline: "OPEC Cut = Mas Mahal na Gas sa Pilipinas?",
    subHeadline: "Paano naaapektuhan ng OPEC decisions ang local prices.",
    actionLabel: "Explainer",
    categories: [{ name: "Balita", slug: "balita" }],
  }),
  makeFeedItem({
    id: 304, slug: "ev-charging-stations-ph", contentType: "BALITA",
    hookHeadline: "EV Charging Stations sa PH: 200+ Na Ngayon!",
    subHeadline: "Malapit na ba tayo sa EV-ready future?",
    actionLabel: "Map Dito",
    categories: [{ name: "Balita", slug: "balita" }],
  }),
  makeFeedItem({
    id: 305, slug: "excise-tax-suspension-bill", contentType: "BALITA",
    hookHeadline: "Kongreso: Bill na Mag-suspend ng Fuel Excise Tax Filed!",
    subHeadline: "Kung ma-approve, bababain ng P6/L ang gasolina.",
    actionLabel: "Detalye",
    categories: [{ name: "Balita", slug: "balita" }],
  }),
  makeFeedItem({
    id: 306, slug: "seaoil-new-stations-luzon", contentType: "BALITA",
    hookHeadline: "Seaoil: 50 Bagong Stations sa Luzon, Tuloy Pa Rin!",
    subHeadline: "Expansion plan ng pinakamurang fuel brand.",
    actionLabel: "Saan-saan?",
    categories: [{ name: "Balita", slug: "balita" }],
  }),
  makeFeedItem({
    id: 307, slug: "fuel-smuggling-crackdown", contentType: "BALITA",
    hookHeadline: "BOC: P2B Worth ng Smuggled Fuel, Na-seize!",
    subHeadline: "Bureau of Customs nag-intensify ng crackdown.",
    actionLabel: "Full Story",
    categories: [{ name: "Balita", slug: "balita" }],
  }),
  makeFeedItem({
    id: 308, slug: "oil-deregulation-debate", contentType: "BALITA",
    hookHeadline: "Oil Deregulation Law: Dapat Ba I-amend?",
    subHeadline: "Pros at cons mula sa mga eksperto.",
    actionLabel: "Opinyon",
    categories: [{ name: "Balita", slug: "balita" }],
  }),
  makeFeedItem({
    id: 309, slug: "jeepney-modernization-fuel", contentType: "BALITA",
    hookHeadline: "Jeepney Modernization: Euro 4 Engine = Mas Tipid sa Diesel?",
    subHeadline: "Data galing sa LTFRB pilot program.",
    actionLabel: "Study Dito",
    categories: [{ name: "Balita", slug: "balita" }],
  }),
  makeFeedItem({
    id: 310, slug: "philippine-peso-oil-prices", contentType: "BALITA",
    hookHeadline: "Peso Bumagsak sa P58/$1 — Ano Epekto sa Gas?",
    subHeadline: "Forex rate at fuel price connection, explained.",
    actionLabel: "Explainer",
    categories: [{ name: "Balita", slug: "balita" }],
  }),

  // KWENTO items (10)
  makeFeedItem({
    id: 401, slug: "driver-nagkamali-p500-sayang", contentType: "KWENTO",
    hookHeadline: "Driver Nagkamali — P500 ang Sayang",
    subHeadline: "Nag-premium sa halip na regular. Masakit sa bulsa!",
    actionLabel: "Kwento Dito",
    categories: [{ name: "Tips", slug: "tips" }],
  }),
  makeFeedItem({
    id: 402, slug: "grab-driver-fuel-tips", contentType: "KWENTO",
    hookHeadline: "Grab Driver: 'Paano Ako Nag-s-survive sa P65/L na Gas'",
    subHeadline: "Real talk mula sa isang full-time ride-hailing driver.",
    actionLabel: "Basahin",
    categories: [{ name: "Tips", slug: "tips" }],
  }),
  makeFeedItem({
    id: 403, slug: "electric-scooter-switch", contentType: "KWENTO",
    hookHeadline: "Nag-switch Ako sa E-Scooter: P0 sa Gas, P80/Day Lang!",
    subHeadline: "Real cost comparison mula sa commuter na nag-shift.",
    actionLabel: "Kwento Niya",
    categories: [{ name: "Tips", slug: "tips" }],
  }),
  makeFeedItem({
    id: 404, slug: "gas-station-attendant-story", contentType: "KWENTO",
    hookHeadline: "Confessions of a Gas Station Attendant",
    subHeadline: "Mga bagay na hindi sinasabi ng gasoline boy.",
    actionLabel: "Alamin",
    categories: [{ name: "Balita", slug: "balita" }],
  }),
  makeFeedItem({
    id: 405, slug: "family-road-trip-tipid", contentType: "KWENTO",
    hookHeadline: "Baguio Road Trip ng Pamilya: P1,500 Lang ang Gas!",
    subHeadline: "Paano namin na-budget ang fuel para sa 5-day trip.",
    actionLabel: "Itinerary Dito",
    categories: [{ name: "Tips", slug: "tips" }],
  }),
  makeFeedItem({
    id: 406, slug: "taxi-driver-diesel-switch", contentType: "KWENTO",
    hookHeadline: "Taxi Driver Nag-switch sa Diesel: 'P8,000/Buwan Natipid Ko'",
    subHeadline: "Honest review ng conversion experience.",
    actionLabel: "Kwento Niya",
    categories: [{ name: "Tips", slug: "tips" }],
  }),
  makeFeedItem({
    id: 407, slug: "wrong-fuel-car-story", contentType: "KWENTO",
    hookHeadline: "Naglagay Ako ng Diesel sa Gas Engine — Eto ang Nangyari",
    subHeadline: "Costly mistake na sana hindi mo na-experience.",
    actionLabel: "Warning!",
    categories: [{ name: "Tips", slug: "tips" }],
  }),
  makeFeedItem({
    id: 408, slug: "provincial-gas-prices", contentType: "KWENTO",
    hookHeadline: "Taga-Probinsya Kami: P72/L ang Gas Dito!",
    subHeadline: "Bakit mas mahal ang fuel sa rural areas?",
    actionLabel: "Kwento Nila",
    categories: [{ name: "Balita", slug: "balita" }],
  }),
  makeFeedItem({
    id: 409, slug: "motorcycle-fuel-efficiency", contentType: "KWENTO",
    hookHeadline: "Honda Click 125i: 55km/L — Totoo Ba? Sinubukan Ko!",
    subHeadline: "Real-world fuel consumption test, hindi lab test.",
    actionLabel: "Results",
    categories: [{ name: "Tips", slug: "tips" }],
  }),
  makeFeedItem({
    id: 410, slug: "carless-lifestyle-manila", contentType: "KWENTO",
    hookHeadline: "1 Taon Walang Kotse sa Manila: P120K ang Na-save Ko",
    subHeadline: "Commute, Grab, at e-scooter combo ang ginamit.",
    actionLabel: "Paano Niya?",
    categories: [{ name: "Tips", slug: "tips" }],
  }),
];

export const mockHookSlides: HookSlide[] = [
  {
    hookText: "TAAS-PRESYO: +P2.50/L Bukas!",
    subText: "Mag-full tank na ngayon bago tumaas ang presyo ng gasolina.",
    bgGradient: "from-red-600 to-orange-500",
    ctaLabel: "Tingnan ang Presyo",
    ctaHref: "/gasolina",
    urgency: "critical",
    image: "https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=1200&h=630&fit=crop",
    category: "Gasolina",
  },
  {
    hookText: "5 Tricks Para Bumaba ang Gas Bill Mo",
    subText: "Simple tips na P500/buwan ang mati-tipid mo agad.",
    bgGradient: "from-green-600 to-emerald-500",
    ctaLabel: "I-try Ko To!",
    ctaHref: "/tips",
    urgency: "normal",
    image: "https://images.unsplash.com/photo-1449965408869-ebd3fee4f2ed?w=1200&h=630&fit=crop",
    category: "Tips",
  },
  {
    hookText: "Shell vs Petron: Sino Mas Mura?",
    subText: "Real-time price comparison ng dalawang biggest brand.",
    bgGradient: "from-orange-500 to-amber-500",
    ctaLabel: "I-compare Ngayon",
    ctaHref: "/gasolina",
    urgency: "normal",
    image: "https://images.unsplash.com/photo-1545262810-a7c5b3580030?w=1200&h=630&fit=crop",
    category: "Gasolina",
  },
  {
    hookText: "Grab Driver: 'Paano Ako Nag-s-survive?'",
    subText: "Real talk mula sa driver na gumagastos P800/araw sa gas.",
    bgGradient: "from-yellow-500 to-orange-500",
    ctaLabel: "Basahin ang Kwento",
    ctaHref: "/article/grab-driver-fuel-tips",
    urgency: "normal",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=1200&h=630&fit=crop",
    category: "Kwento",
  },
  {
    hookText: "DOE Oil Monitor: Rollback sa Diesel!",
    subText: "Official: -P1.20/L rollback sa diesel, epektibo next Tuesday.",
    bgGradient: "from-blue-600 to-cyan-500",
    ctaLabel: "Buod Dito",
    ctaHref: "/balita",
    urgency: "high",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&h=630&fit=crop",
    category: "Balita",
  },
];

// Gas Station data

export const brandColors: Record<string, string> = {
  Petron: "#0047AB",
  Shell: "#DD1D21",
  Caltex: "#ED1C24",
  Phoenix: "#F58220",
  Seaoil: "#00A651",
  PTT: "#1E3A8A",
  Unioil: "#8B5CF6",
  Cleanfuel: "#059669",
  Jetti: "#DC2626",
  Total: "#003DA5",
};

export const MOCK_USER_LOCATION = { lat: 14.5794, lng: 121.0359 };

function makeGasStation(
  id: number,
  brand: FuelBrand,
  name: string,
  address: string,
  lat: number,
  lng: number,
  amenities: StationAmenity[],
  rating: number,
  hours: string,
  isOpen: boolean = true,
  priceVariance: number = 0
): GasStation {
  const basePrices = mockFuelPrices.find((p) => p.brand === brand);
  const v = priceVariance;
  return {
    id,
    brand,
    brandSlug: brand.toLowerCase().replace(/\s/g, ""),
    name,
    address,
    lat,
    lng,
    prices: {
      regular: +(basePrices?.regular ?? 58) + v,
      unleaded: +(basePrices?.unleaded ?? 63) + v,
      diesel: +(basePrices?.diesel ?? 55) + v,
      premium: +(basePrices?.premium ?? 72) + v,
      lastUpdated: "2026-03-17T06:00:00Z",
    },
    isOpen,
    amenities,
    rating,
    operatingHours: hours,
  };
}

export const mockGasStations: GasStation[] = [
  makeGasStation(1, "Petron", "Petron EDSA-Shaw", "EDSA cor. Shaw Blvd, Mandaluyong", 14.5818, 121.0346, ["restroom", "convenience-store", "air-pump", "atm"], 4.2, "24 hours", true, 0.30),
  makeGasStation(2, "Shell", "Shell Pioneer", "Pioneer St, Mandaluyong", 14.5728, 121.0345, ["restroom", "convenience-store", "food", "atm"], 4.5, "24 hours", true, 0.20),
  makeGasStation(3, "Caltex", "Caltex Boni", "Boni Ave, Mandaluyong", 14.5741, 121.0386, ["restroom", "convenience-store", "air-pump"], 4.0, "5:00 AM - 11:00 PM", true, -0.15),
  makeGasStation(4, "Phoenix", "Phoenix Ortigas", "Ortigas Ave, Pasig", 14.5873, 121.0615, ["restroom", "air-pump"], 3.8, "24 hours", true, 0.10),
  makeGasStation(5, "Seaoil", "Seaoil Shaw", "Shaw Blvd, Mandaluyong", 14.5785, 121.0442, ["restroom", "convenience-store"], 4.1, "5:00 AM - 12:00 MN", true, -0.25),
  makeGasStation(6, "Shell", "Shell Makati Ave", "Makati Ave, Makati", 14.5547, 121.0244, ["restroom", "convenience-store", "food", "car-wash", "atm"], 4.6, "24 hours", true, 0.50),
  makeGasStation(7, "Petron", "Petron BGC", "26th St, BGC, Taguig", 14.5499, 121.0517, ["restroom", "convenience-store", "air-pump", "food"], 4.3, "24 hours", true, 0.40),
  makeGasStation(8, "Caltex", "Caltex Katipunan", "Katipunan Ave, Quezon City", 14.6312, 121.0745, ["restroom", "convenience-store", "air-pump", "atm"], 4.1, "24 hours", true, 0.05),
  makeGasStation(9, "PTT", "PTT C5 Pasig", "C5 Road, Pasig", 14.5690, 121.0680, ["restroom", "convenience-store", "food"], 3.9, "24 hours", true, 0),
  makeGasStation(10, "Unioil", "Unioil Marikina", "Marcos Highway, Marikina", 14.6291, 121.1003, ["restroom", "air-pump"], 3.7, "5:00 AM - 10:00 PM", true, -0.40),
  makeGasStation(11, "Cleanfuel", "Cleanfuel Alabang", "Alabang-Zapote Rd, Muntinlupa", 14.4235, 121.0392, ["restroom", "convenience-store", "air-pump"], 4.0, "5:30 AM - 11:00 PM", true, -0.50),
  makeGasStation(12, "Jetti", "Jetti Commonwealth", "Commonwealth Ave, QC", 14.6810, 121.0722, ["restroom", "air-pump"], 3.6, "24 hours", true, 0.15),
  makeGasStation(13, "Shell", "Shell Quezon Ave", "Quezon Ave, Quezon City", 14.6341, 121.0195, ["restroom", "convenience-store", "car-wash", "food", "atm"], 4.4, "24 hours", true, 0.35),
  makeGasStation(14, "Petron", "Petron Pasay", "EDSA, Pasay", 14.5361, 121.0004, ["restroom", "convenience-store", "air-pump"], 3.9, "24 hours", true, 0.10),
  makeGasStation(15, "Phoenix", "Phoenix Sucat", "Dr. A. Santos Ave, Paranaque", 14.4682, 121.0365, ["restroom", "convenience-store"], 3.8, "5:00 AM - 11:00 PM", false, -0.20),
  makeGasStation(16, "Seaoil", "Seaoil Aurora", "Aurora Blvd, Quezon City", 14.6150, 121.0483, ["restroom", "convenience-store", "air-pump", "food"], 4.2, "24 hours", true, 0.05),
  makeGasStation(17, "Total", "Total Eastwood", "Eastwood City, Quezon City", 14.6105, 121.0801, ["restroom", "convenience-store", "atm"], 4.0, "24 hours", true, 0.20),
  makeGasStation(18, "Caltex", "Caltex SLEX", "South Luzon Expressway, Muntinlupa", 14.4390, 121.0222, ["restroom", "convenience-store", "food", "car-wash"], 4.3, "24 hours", true, 0.30),
];
