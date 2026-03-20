import type { Metadata } from "next";
import MapaPageClient from "./MapaPageClient";

export const metadata: Metadata = {
  title: "Mapa ng Gas Stations — Hanapin ang Pinakamalapit",
  description:
    "Hanapin ang pinakamalapit at pinakamurang gas station sa area mo. Real-time na presyo ng gasolina, diesel, at premium fuel mula sa Petron, Shell, Caltex, Phoenix, at iba pa.",
  openGraph: {
    title: "Mapa ng Gas Stations — Tipid Gas PH",
    description:
      "Hanapin ang pinakamalapit at pinakamurang gas station. Real-time fuel prices at directions.",
  },
};

export default function MapaPage() {
  return <MapaPageClient />;
}
