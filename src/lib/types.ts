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
