import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";

export const metadata: Metadata = {
  title: "Tipid Gas PH — Presyo ng Gasolina, Diesel, at LPG sa Pilipinas",
  description:
    "Real-time fuel price alerts, tipid tips, at balita tungkol sa gasolina, diesel, at LPG sa Pilipinas. I-compare ang presyo ng Petron, Shell, Caltex, Phoenix, at iba pa.",
};

export default function HomePage() {
  return <HomePageClient />;
}
