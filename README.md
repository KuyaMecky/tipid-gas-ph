<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-FF0080?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Leaflet-Maps-199900?style=for-the-badge&logo=leaflet&logoColor=white" alt="Leaflet" />
</p>

# Tipid Gas PH

**Real-time fuel price tracker for Filipino drivers.** Compare gas prices across 10+ brands, find the cheapest station near you, and get instant price hike/rollback alerts — all in one app-style experience.

> Built as a headless WordPress publishing site with a Next.js 16 frontend. Currently running on mock data for development; production will connect to WP REST API v2.

---

## Features

| Feature | Description |
|---------|-------------|
| **Price Alerts** | Breaking news-style alerts for fuel price hikes and rollbacks with urgency levels |
| **Brand Comparison** | Side-by-side pricing for Petron, Shell, Caltex, Phoenix, Seaoil, and 5 more brands |
| **Station Finder** | Interactive OpenStreetMap with 18+ Metro Manila stations, distance sorting, and brand filtering |
| **Directions** | One-tap Google Maps and Waze navigation to any station |
| **Mobile-First** | App-style homepage with hero alerts, action chips, price cards, and sticky CTAs |
| **Content Feed** | Filterable feed with ALERT, TIPID, BALITA, and KWENTO content types |
| **Pillar/Cluster SEO** | `/gasolina` pillar page with `/gasolina/[brand]` cluster pages |
| **E-E-A-T** | Author bio cards with credentials, social links, and expertise signals |
| **FAQ Schema** | JSON-LD FAQPage markup for rich search results |
| **Filipino-First** | Taglish content, `lang="fil"`, `fil_PH` locale throughout |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"` syntax) |
| Animations | Framer Motion |
| Maps | Leaflet + react-leaflet (OpenStreetMap) |
| CMS | Headless WordPress (REST API v2) |
| Icons | @heroicons/react |
| Fonts | Poppins (headings), Noto Sans (body), Inter (UI) |
| HTML Parsing | html-react-parser |
| Date Utils | date-fns |

---

## Project Structure

```
src/
  app/
    page.tsx                    # Homepage (SSG)
    HomePageClient.tsx          # Client-side homepage with feed + mobile layout
    globals.css                 # Theme tokens, utilities, animations
    gasolina/                   # Pillar page + [brand] cluster pages
    mapa/                       # Interactive gas station map
    article/[slug]/             # Article detail pages
    balita/ tips/ eleksyon/     # Category landing pages
    about/ contact/ search/     # Utility pages
  components/
    mobile/                     # Mobile-only app-style components
      MobileHeroAlert.tsx       # Hero card with price alert
      MobileActionChips.tsx     # Save Today / Cheapest Nearby / Weekly Trend
      MobilePriceCard.tsx       # Gradient alert card with image
      MobileCheapestCard.tsx    # Cheapest brand card with station modal
      MobileSubscribeBanner.tsx # Subscribe CTA (inline + compact variants)
      MobileStickySubscribe.tsx # Fixed bottom subscribe bar
      StationDetailModal.tsx    # Bottom sheet modal with directions
    home/                       # Desktop homepage components
    map/                        # Map, BottomSheet, StationDetail, filters
    article/                    # Article cards, author bio, fuel tables
    layout/                     # Header, Footer, BottomNav
    sidebar/                    # Desktop sidebar widgets
    ui/                         # Shared UI (Button, AdSlot, FAQSection, etc.)
  lib/
    types.ts                    # TypeScript interfaces
    mock-data.ts                # Development mock data (articles, prices, stations)
    wordpress.ts                # WP REST API client
    utils.ts                    # Helpers (distance, formatting, etc.)
    navigation.ts               # Google Maps / Waze URL builders
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
git clone https://github.com/KuyaMecky/tipid-gas-ph.git
cd tipid-gas-ph
npm install
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
| `/` | Static | Homepage with feed, alerts, and mobile app layout |
| `/gasolina` | Static | Fuel price pillar page (all brands) |
| `/gasolina/[brand]` | Dynamic | Brand-specific cluster page |
| `/mapa` | Static | Interactive gas station map |
| `/balita` | Static | Fuel industry news |
| `/tips` | Static | Money-saving tips |
| `/eleksyon` | Static | Election impact on fuel |
| `/article/[slug]` | Dynamic | Article detail page |
| `/category/[slug]` | Dynamic | Category archive |
| `/search` | Dynamic | Search results |
| `/about` | Static | About page |
| `/contact` | Static | Contact page |

---

## Design System

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `orange-500` | Buttons, logos, active states |
| Primary Hover | `orange-600` | Hover states, gradient ends |
| Alert | `red-600` | Price hike alerts |
| Tipid | `green-600` | Savings, rollbacks |
| Balita | `orange-600` | News content |
| Kwento | `yellow-500` | Stories |

### Typography

- **Headings**: Poppins (700/800) — bold, compact tracking
- **Body**: Noto Sans — readable, clean
- **UI**: Inter — system-like, functional

---

## Deployment

Deploy on [Vercel](https://vercel.com) for zero-config Next.js hosting:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/KuyaMecky/tipid-gas-ph)

---

## License

MIT

---

<p align="center">
  <strong>Tipid Gas PH</strong> — Alamin. I-compare. Makatipid.
</p>
