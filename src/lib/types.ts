// WordPress REST API Types

export interface WPMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details: {
    width: number;
    height: number;
    sizes: {
      thumbnail?: { source_url: string; width: number; height: number };
      medium?: { source_url: string; width: number; height: number };
      medium_large?: { source_url: string; width: number; height: number };
      large?: { source_url: string; width: number; height: number };
      full?: { source_url: string; width: number; height: number };
    };
  };
}

export interface WPAuthor {
  id: number;
  name: string;
  slug: string;
  avatar_urls: {
    "24": string;
    "48": string;
    "96": string;
  };
  description: string;
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
  parent: number;
}

export interface WPTag {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  modified: string;
  featured_media: number;
  author: number;
  categories: number[];
  tags: number[];
  status: string;
  _embedded?: {
    author?: WPAuthor[];
    "wp:featuredmedia"?: WPMedia[];
    "wp:term"?: [WPCategory[], WPTag[]];
  };
}

export interface WPPage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  featured_media: number;
  _embedded?: {
    "wp:featuredmedia"?: WPMedia[];
  };
}

// Frontend-friendly types
export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  modified: string;
  featuredImage: {
    url: string;
    alt: string;
    width: number;
    height: number;
  } | null;
  author: {
    name: string;
    slug: string;
    avatar: string;
  };
  categories: { name: string; slug: string }[];
  tags: { name: string; slug: string }[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
  image?: string;
}

export interface SiteSettings {
  name: string;
  description: string;
  url: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  totalPages: number;
}

// Fuel price types
export interface FuelPrice {
  brand: string;
  brandSlug: string;
  unleaded: number;
  regular: number;
  diesel: number;
  premium: number;
  lastUpdated: string;
}

export type FuelBrand =
  | "Petron"
  | "Shell"
  | "Caltex"
  | "Phoenix"
  | "Seaoil"
  | "PTT"
  | "Unioil"
  | "Cleanfuel"
  | "Jetti"
  | "Total";

// E-E-A-T Author profile
export interface AuthorProfile {
  name: string;
  slug: string;
  avatar: string;
  role: string;
  credentials: string;
  bio: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
  };
}

// FAQ types
export interface FAQItem {
  question: string;
  answer: string;
}

// Feed types
export type FeedContentType = "ALERT" | "TIPID" | "BALITA" | "KWENTO";
export type FeedUrgency = "critical" | "high" | "normal";

export interface FeedItem {
  id: number;
  slug: string;
  contentType: FeedContentType;
  urgency: FeedUrgency;
  hookHeadline: string;
  subHeadline: string;
  actionLabel: string;
  actionHref: string;
  reactionCount: number;
  isBreaking: boolean;
  priceChange?: string;
  featuredImage: {
    url: string;
    alt: string;
    width: number;
    height: number;
  } | null;
  author: {
    name: string;
    slug: string;
    avatar: string;
  };
  date: string;
  categories: { name: string; slug: string }[];
}

export interface HookSlide {
  hookText: string;
  subText: string;
  bgGradient: string;
  ctaLabel: string;
  ctaHref: string;
  urgency: FeedUrgency;
  image: string;
  category: string;
}

// Poll types
export interface PollOption {
  id: string;
  label: string;
  votes: number;
}

export interface PollData {
  question: string;
  options: PollOption[];
  totalVotes: number;
}

// Gas station types
export type StationAmenity =
  | "restroom"
  | "convenience-store"
  | "air-pump"
  | "car-wash"
  | "atm"
  | "food";

export interface StationPrices {
  regular: number;
  unleaded: number;
  diesel: number;
  premium: number;
  lastUpdated: string;
}

// NewsData.io API types
export interface NewsDataArticle {
  article_id: string;
  title: string;
  link: string;
  keywords: string[] | null;
  creator: string[] | null;
  description: string | null;
  content: string | null;
  pubDate: string;
  pubDateTZ: string;
  image_url: string | null;
  source_id: string;
  source_name: string;
  source_url: string;
  source_icon: string | null;
  language: string;
  country: string[];
  category: string[];
  duplicate: boolean;
}

export interface NewsDataResponse {
  status: string;
  totalResults: number;
  results: NewsDataArticle[];
  nextPage: string | null;
}

// Normalized trending news item (from external API)
export interface TrendingNewsItem {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl: string | null;
  source: string;
  sourceIcon: string | null;
  publishedAt: string;
  category: string;
}

export interface GasStation {
  id: number;
  brand: FuelBrand;
  brandSlug: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  prices: StationPrices;
  distance?: number;
  isOpen: boolean;
  amenities: StationAmenity[];
  rating: number;
  operatingHours: string;
}

// Sponsored product types
export interface SponsoredProduct {
  id: number;
  brand: string;
  productName: string;
  description: string;
  imageUrl: string;
  ctaLabel: string;
  ctaHref: string;
}

// Weather forecast types
export type WeatherCondition = "sunny" | "cloudy" | "rainy" | "stormy" | "partly-cloudy";

export interface CityWeather {
  city: string;
  temp: number;
  condition: WeatherCondition;
  humidity: number;
}

export interface WeatherForecastData {
  cities: CityWeather[];
  asOf: string;
}

// Fuel quiz types
export interface FuelQuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface FuelQuizData {
  title: string;
  questions: FuelQuizQuestion[];
}

// Fuel deal types
export type DealType = "hot" | "new" | "limited";

export interface FuelDeal {
  id: number;
  brand: string;
  discount: string;
  description: string;
  validUntil: string;
  dealType: DealType;
  ctaLabel: string;
  ctaHref: string;
}

// Bookmark bar types
export interface BookmarkBarData {
  savedCount: number;
}
