# Changelog

All notable changes to this project are documented here, organized by development week.

---

## Week 3 — April 3 - 13, 2026

### Auto-Publish System
- Built automated RSS-to-WordPress publishing pipeline running every 2 hours via cron
- Implemented per-source Cheerio scrapers for GMA News, Rappler, Inquirer, and Philstar
- Added title fingerprint + source URL deduplication to prevent duplicate posts
- Created `wp-publisher.ts` for WordPress REST API write operations with Basic Auth
- Built `/api/admin/auto-publish` endpoint (GET for stats, POST to trigger runs)
- Added auto-publish run logging with 500-entry cap in `data/auto-publish-log.json`

### WordPress Plugin (LB Auto Publisher)
- Developed must-use WordPress plugin with full admin interface
- Implemented single URL fetch with live preview and editable fields (title, category, image, content, excerpt)
- Added PHP DOMDocument + DOMXPath scraping for 6 Philippine news domains
- Built RSS auto-fetch with WP-Cron scheduling (2-hour intervals)
- Created `[lb_recent_posts]` shortcode for embedding recent articles
- Added smart category detection based on fuel keywords and source domain

### Content & SEO
- Rewrote all 24 WordPress posts to 443-575 words each (previously 60-82 words)
- Applied SEO structure to every article: lead, data section, expert quotes, context, impact, forecast
- Added realistic quotes from DOE, DOF, and LTFRB officials
- Maintained Taglish editorial voice matching major Philippine outlets

---

## Week 2 — March 27 - April 2, 2026

### Production Deployment
- Deployed to AWS EC2 Seoul (Ubuntu 22.04) with Nginx, PM2, and PHP 8.3
- Configured SSL via Let's Encrypt with HTTPS redirect
- Set up Cloudflare DNS proxy with internal WordPress API routing
- Created PM2 ecosystem config for process management
- Configured Nginx reverse proxy for Next.js (port 3000) and WordPress

### WordPress CMS Integration
- Connected headless WordPress via REST API v2 with fallback layer
- Created 25 WordPress posts with real content sourced from GMA News
- Set up 9 categories: Gasolina, Diesel, LPG, Balita, Tips, Eleksyon, Featured, Showbiz, Sports
- Built `content.ts` abstraction layer that tries WP API first, falls back to mock data
- Implemented ISR revalidation API (`/api/revalidate`) for on-demand cache busting

### Image System
- Built `/api/image-proxy` to proxy images from GMA, Rappler, Inquirer, and Philstar
- Added "Photo: GMA News" attribution badges on all news cards and article pages
- Uploaded matching featured images for all 25 posts (WP attachment IDs 127-179)
- Replaced category placeholder images with real photographs

### News Aggregation
- Integrated NewsData.io API for real-time Philippine news (200 credits/day)
- Built RSS aggregator pulling from 6 sources (GMA News, GMA Sports, GMA Showbiz, Rappler, Inquirer, Philstar)
- Implemented merged disk cache with 80-item limit and 30-minute TTL
- Added deduplication by first 40 characters of title

### Fuel Prices
- Created `data/fuel-prices.json` for server-side fuel price data
- Built admin API (`/api/admin/fuel-prices`) for reading and updating prices
- Added auto-revalidation of homepage and gasolina pages after price updates
- Updated to April 2026 rollback prices (Gas P95-98, Diesel P125-128)

### Hero & Banner System
- Implemented hero banner fallback chain: NewsData.io -> WP featured articles -> RSS fuel items
- Converted HookHero carousel to use real WordPress featured articles
- Ensured hero banners always render regardless of API availability

---

## Week 1 — March 20 - 26, 2026

### Project Foundation
- Initialized Next.js 16 project with App Router, TypeScript 5, and Turbopack
- Configured Tailwind CSS v4 with `@import "tailwindcss"` syntax
- Set up font stack: Poppins (headings), Noto Sans (body), Inter (UI)
- Created TypeScript interfaces for fuel data, articles, stations, and feed items
- Built mock data layer for development (articles, prices, stations)

### Core Pages & Routes
- Created 24 routes: homepage, gasolina pillar, brand clusters, mapa, balita, tips, eleksyon, article/[slug], category/[slug], news/[id], search, about, contact
- Built pillar/cluster SEO architecture for `/gasolina` and `/gasolina/[brand]`
- Added JSON-LD FAQPage schema and E-E-A-T author bio components
- Configured metadata, Open Graph, Twitter cards, and `lang="fil"` throughout

### Mobile-First Components (29 components)
- Built MobileHeroAlert with gradient overlay and dual CTA buttons
- Created MobileActionChips (Save Today, Cheapest Nearby, Weekly Trend)
- Developed MobilePriceCard with color-coded gradients for hikes vs rollbacks
- Added MobileCheapestCard with station modal and savings calculation
- Built subscribe system (inline banner, compact variant, sticky bottom bar)
- Created MobileTrendingNews, MobileFuelNewsBanner, MobileCategoryTabs
- Added MobilePollWidget, MobileFuelQuiz, MobileDealsSection
- Implemented MobileWeatherMarquee, MobileBookmarkBar, MobileShareWidget

### Desktop Components (14 components)
- Built FuelNewsHeroBanner with NewsData.io integration
- Created TrendingNewsSection with real-time news cards
- Developed HookHero carousel for featured articles
- Added CategorySection, FeaturedArticle, FeedCard, FuelPriceWidget
- Built LatestNewsGrid, MapPreviewCard, QuickPriceStrip

### Interactive Map
- Integrated Leaflet + react-leaflet with OpenStreetMap tiles (no API key)
- Built DynamicMap with lazy loading for client-side rendering
- Added BrandFilterChips for filtering stations by fuel brand
- Created BottomSheet with station list and distance sorting
- Implemented one-tap Google Maps and Waze navigation links

### Layout & Navigation
- Built responsive Header with mobile hamburger menu
- Created Footer with category links and social icons
- Added BottomNav for mobile app-style navigation
- Developed DesktopSidebar with price widget, brand comparison, and map preview

### Shared UI Components
- AnimatedSection (Framer Motion scroll-reveal)
- Button, CategoryPill, ContentTypeBadge
- FAQSection with accordion and JSON-LD
- FloatingActionButton, NewsletterForm, SearchBar, AdSlot

---

## Summary

| Metric | Count |
|--------|-------|
| Total routes | 24 |
| API endpoints | 6 |
| React components | 80+ |
| WordPress posts | 25+ |
| RSS sources | 6 |
| Fuel brands tracked | 10+ |
| Mobile components | 29 |
| Development period | 3 weeks |
