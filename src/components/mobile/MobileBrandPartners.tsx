"use client";

import Image from "next/image";
import Link from "next/link";
import MobileSectionHeader from "./MobileSectionHeader";

const BRANDS = [
  { name: "Petron", slug: "petron", logo: "/images/brands/petron.svg" },
  { name: "Shell", slug: "shell", logo: "/images/brands/shell.svg" },
  { name: "Caltex", slug: "caltex", logo: "/images/brands/caltex.svg" },
  { name: "Phoenix", slug: "phoenix", logo: "/images/brands/phoenix.svg" },
  { name: "Seaoil", slug: "seaoil", logo: "/images/brands/seaoil.svg" },
  { name: "PTT", slug: "ptt", logo: "/images/brands/ptt.svg" },
  { name: "Unioil", slug: "unioil", logo: "/images/brands/unioil.svg" },
  { name: "Cleanfuel", slug: "cleanfuel", logo: "/images/brands/cleanfuel.svg" },
  { name: "Jetti", slug: "jetti", logo: "/images/brands/jetti.svg" },
  { name: "Total", slug: "total", logo: "/images/brands/total.svg" },
];

export default function MobileBrandPartners() {
  return (
    <section role="region" aria-label="Partner Brands">
      <MobileSectionHeader title="Partner Brands" accentColor="bg-orange-500" />
      <div className="grid grid-cols-5 gap-2.5 px-4">
        {BRANDS.map((brand) => (
          <Link
            key={brand.slug}
            href={`/gasolina/${brand.slug}`}
            className="flex flex-col items-center gap-1 active:scale-95 transition-transform"
          >
            <div className="w-14 h-14 rounded-xl overflow-hidden shadow-sm">
              <Image
                src={brand.logo}
                alt={`${brand.name} logo`}
                width={56}
                height={56}
                className="w-full h-full"
              />
            </div>
            <span className="text-[9px] font-bold text-gray-600 text-center leading-tight">
              {brand.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
