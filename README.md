<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/WordPress-CMS-21759B?style=for-the-badge&logo=wordpress&logoColor=white" alt="WordPress" />
  <img src="https://img.shields.io/badge/AWS-EC2-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" alt="AWS EC2" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-FF0080?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Leaflet-Maps-199900?style=for-the-badge&logo=leaflet&logoColor=white" alt="Leaflet" />
</p>

<h1 align="center">Latest Balita PH</h1>

<p align="center">
  <strong>Real-time fuel price tracker and Filipino news aggregator.</strong><br/>
  Live at <a href="https://latestbalita.ph">latestbalita.ph</a>
</p>

<p align="center">
  <img src="https://img.shields.io/website?url=https%3A%2F%2Flatestbalita.ph&style=flat-square&label=latestbalita.ph" alt="Website Status" />
  <img src="https://img.shields.io/badge/posts-25%2B-brightgreen?style=flat-square" alt="Posts" />
  <img src="https://img.shields.io/badge/routes-24-blue?style=flat-square" alt="Routes" />
  <img src="https://img.shields.io/badge/components-80%2B-orange?style=flat-square" alt="Components" />
  <img src="https://img.shields.io/github/license/KuyaMecky/tipid-gas-ph?style=flat-square" alt="License" />
</p>

---

## About

Latest Balita PH is a production-grade news publishing platform built for Filipino drivers and commuters. It tracks fuel prices across 10+ brands, aggregates news from 6 Philippine sources via RSS, and delivers content through a mobile-first, app-style experience.

The frontend is a statically-generated Next.js 16 application powered by a headless WordPress CMS. Content is published through an automated RSS scraping pipeline with manual editorial control via the WordPress admin panel.

---

## Features

| Feature | Description |
|---------|-------------|
| **Fuel Price Tracker** | Real-time gas, diesel, and LPG pricing with weekly change indicators and brand-by-brand comparison |
| **News Aggregation** | Automated RSS feed ingestion from GMA News, Rappler, Inquirer, Philstar, ABS-CBN, and Manila Bulletin |
| **Auto-Publisher** | Cron-driven pipeline that scrapes, deduplicates, and publishes articles to WordPress every 2 hours |
| **Image Proxy** | Server-side proxy for news images from major outlets, avoiding hotlink blocks with proper attribution |
| **Interactive Map** | OpenStreetMap-powered station finder with brand filtering, distance sorting, and one-tap navigation |
| **Mobile-First UI** | 29 mobile-specific components including hero alerts, action chips, trending sections, and sticky CTAs |
| **Pillar/Cluster SEO** | `/gasolina` pillar page with `/gasolina/[brand]` cluster pages, JSON-LD FAQ schema, E-E-A-T signals |
| **Content Categories** | Gasolina, Diesel, LPG, Balita, Tips, Eleksyon, Showbiz, Sports with smart urgency classification |
| **Admin APIs** | Fuel price CRUD, auto-publish trigger/stats, ISR revalidation, and search endpoints |
| **Filipino-First** | Taglish content, `lang="fil"`, `fil_PH` locale, matching the voice of GMA/ABS-CBN News |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, React 19, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion 12 |
| CMS | WordPress (Headless, REST API v2) |
| News Sources | NewsData.io API + RSS (rss-parser) |
| Scraping | Cheerio (Node.js) + DOMDocument (PHP) |
| Maps | Leaflet + react-leaflet (OpenStreetMap) |
| HTML Parsing | html-react-parser |
| Icons | @heroicons/react |
| Date Utils | date-fns |
| Hosting | AWS EC2 (Ubuntu 22.04), Nginx, PM2 |
| CDN/DNS | Cloudflare (proxied) |
| SSL | Let's Encrypt |

---

## Architecture

```
                    Cloudflare (DNS + CDN)
                           |
                      Nginx (SSL)
                     /           \
              Next.js (PM2)    WordPress (PHP 8.3)
              port 3000        /wp-json REST API
                  |                    |
           +------+------+     +------+------+
           |      |      |     |      |      |
         ISR   API    Static  Posts  Media  Categories
         Cache Routes  Pages
```

### Content Flow

```
RSS Feeds (6 sources) --> Auto-Publisher --> WordPress REST API
                                                    |
                              content.ts (fallback layer)
                                    |
                         Page Components (SSG/ISR)
                                    |
                              Client Render
```

### Data Sources

| Source | Purpose | Cache |
|--------|---------|-------|
| WordPress REST API | Articles, categories, featured images | ISR (revalidate on demand) |
| NewsData.io | Breaking Philippine news | 30-min disk cache |
| RSS Feeds | GMA, Rappler, Inquirer, Philstar, ABS-CBN, Manila Bulletin | 30-item merged pool |
| `data/fuel-prices.json` | Fuel price data (admin-updated) | Read on request |
| Mock data | Fallback when APIs are unavailable | Static |

---

## Project Structure

```
src/
  app/
    page.tsx                     # Homepage (SSG + ISR)
    HomePageClient.tsx           # Client-side homepage with feed + mobile layout
    globals.css                  # Theme tokens, utilities, animations
    layout.tsx                   # Root layout (Poppins, Noto Sans, Inter)
    gasolina/                    # Fuel price pillar + [brand] clusters
    mapa/                        # Interactive gas station map
    article/[slug]/              # WordPress article pages
    news/[id]/                   # RSS/API news article pages
    balita/ tips/ eleksyon/      # Category landing pages
    category/[slug]/             # Dynamic category archives
    about/ contact/ search/      # Utility pages
    api/
      admin/auto-publish/        # Auto-publisher trigger + stats
      admin/fuel-prices/         # Fuel price CRUD
      image-proxy/               # News image proxy
      news/                      # News API endpoint
      revalidate/                # ISR cache busting
      search/                    # Search endpoint
  components/
    mobile/    (29)              # Mobile-specific app-style components
    home/      (14)              # Desktop homepage sections
    article/   (5)               # Article cards, author bio, fuel tables
    map/       (6)               # Leaflet map, filters, station details
    layout/    (4)               # Header, Footer, BottomNav, Sidebar
    sidebar/   (6)               # Desktop sidebar widgets
    ui/        (9)               # Shared UI (Button, FAQSection, etc.)
  lib/
    content.ts                   # WP API fallback layer (never breaks)
    wordpress.ts                 # WordPress REST API client
    wp-publisher.ts              # WP write helper (Basic Auth)
    auto-publisher.ts            # RSS -> scrape -> publish orchestration
    scraper.ts                   # Per-source Cheerio scrapers
    news-api.ts                  # NewsData.io integration
    news-cache.ts                # Merged news disk cache (80 items)
    rss-feeds.ts                 # RSS aggregator (6 PH sources)
    fuel-prices.ts               # Fuel price reader + fallback
    image-proxy.ts               # Image proxy URL helper
    types.ts                     # TypeScript interfaces
    mock-data.ts                 # Development fallback data
    utils.ts                     # Distance, formatting helpers
    navigation.ts                # Google Maps / Waze URL builders
data/
  fuel-prices.json               # Server-side fuel prices (admin-updated)
  auto-publish-log.json          # Auto-publisher run history
public/
  images/
    categories/                  # Category hero photos (8 images)
    brands/                      # Fuel brand logos (10 brands)
    thumbnails/                  # Article thumbnail images
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- WordPress instance (optional, falls back to mock data)

### Installation

```bash
git clone https://github.com/KuyaMecky/tipid-gas-ph.git
cd tipid-gas-ph
npm install
```

### Environment Variables

Create `.env.local`:

```env
# WordPress (optional)
WORDPRESS_API_URL=https://your-domain.com/wp-json
WORDPRESS_INTERNAL_HOST=your-domain.com
WORDPRESS_APP_USER=your-wp-user
WORDPRESS_APP_PASSWORD=your-app-password

# NewsData.io (optional)
NEWSDATA_API_KEY=your-api-key

# Admin
REVALIDATE_SECRET=your-secret
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Production Build

```bash
npm run build
npm start
```

---

## Routes

| Route | Type | Description |
|-------|------|-------------|
| `/` | ISR | Homepage with hero alerts, trending news, feed, and mobile app layout |
| `/gasolina` | Static | Fuel price pillar page (all brands, comparison tables) |
| `/gasolina/[brand]` | Dynamic | Brand-specific cluster page (Petron, Shell, Caltex, etc.) |
| `/mapa` | Static | Interactive gas station map with brand filters |
| `/balita` | Static | Breaking news and industry updates |
| `/tips` | Static | Money-saving tips for drivers |
| `/eleksyon` | Static | Election impact on fuel policy |
| `/article/[slug]` | Dynamic | WordPress article detail page |
| `/news/[id]` | Dynamic | RSS/API news article page |
| `/category/[slug]` | Dynamic | Category archive page |
| `/search` | Dynamic | Full-text search results |
| `/about` | Static | About the platform |
| `/contact` | Static | Contact page |

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/admin/fuel-prices` | GET/POST | Read/update fuel prices (secret required) |
| `/api/admin/auto-publish` | GET/POST | Auto-publisher stats/trigger (secret required) |
| `/api/revalidate` | GET | ISR cache revalidation (secret required) |
| `/api/image-proxy` | GET | Proxy news images from external sources |
| `/api/news` | GET | Fetch cached news items |
| `/api/search` | GET | Search articles and news |

---

## Auto-Publisher System

The platform includes a dual auto-publishing system:

### Next.js Side (Cron-based)
- Runs every 2 hours via cron (`15 */2 * * *`)
- Fetches RSS feeds from 6 Philippine news sources
- Deduplicates by title fingerprint and source URL
- Scrapes full article content using Cheerio
- Uploads featured images to WordPress media library
- Creates posts with proper categories and attribution

### WordPress Plugin (LB Auto Publisher)
- Must-use plugin with full admin UI
- Single URL fetch with preview/edit before publishing
- PHP DOMDocument scraping for 6 domains
- RSS auto-fetch with WP-Cron scheduling
- Category auto-detection based on keywords and source

---

## Design System

### Color Palette — "Philippine Sun"

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `yellow-500` | Buttons, logos, active states |
| Alert | `red-600` | Price hike alerts, breaking news |
| News | `blue-600` | Balita content type |
| Tipid | `emerald-500` | Savings, rollbacks, tips |
| Kwento | `amber-500` | Stories, features |

### Typography

| Purpose | Font | Weight |
|---------|------|--------|
| Headings | Poppins | 700 / 800 |
| Body | Noto Sans | 400 / 500 |
| UI | Inter | 400 / 500 / 600 |

---

## Deployment

### Production (AWS EC2)

The site runs on AWS EC2 Seoul with the following stack:

```
Ubuntu 22.04 → Nginx (SSL) → PM2 → Next.js (port 3000)
                           → PHP 8.3 → WordPress
```

Managed with PM2:

```bash
pm2 restart latestbalita-ph    # Restart Next.js
pm2 logs latestbalita-ph       # View logs
```

### Vercel (Alternative)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/KuyaMecky/tipid-gas-ph)

---

## License

MIT

---

<p align="center">
  <strong>Latest Balita PH</strong> — Alamin. I-compare. Makatipid.<br/>
  <a href="https://latestbalita.ph">latestbalita.ph</a>
</p>
