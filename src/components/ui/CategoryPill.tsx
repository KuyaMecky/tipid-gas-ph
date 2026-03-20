"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface CategoryPillProps {
  name: string;
  slug: string;
  active?: boolean;
  count?: number;
  color?: "orange" | "red" | "green" | "yellow";
  onClick?: () => void;
}

const activeColors = {
  orange: "bg-orange-500 text-white shadow-md shadow-orange-500/25",
  red: "bg-red-600 text-white shadow-md shadow-red-500/25",
  green: "bg-green-600 text-white shadow-md shadow-green-500/25",
  yellow: "bg-yellow-500 text-white shadow-md shadow-yellow-500/25",
};

export default function CategoryPill({
  name,
  slug,
  active = false,
  count,
  color = "orange",
  onClick,
}: CategoryPillProps) {
  const classes = cn(
    "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap",
    active
      ? activeColors[color]
      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
  );

  const countEl = count !== undefined && (
    <span className={cn("text-xs", active ? "text-white/70" : "text-gray-400")}>
      {count}
    </span>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={classes}>
        {name}
        {countEl}
      </button>
    );
  }

  return (
    <Link
      href={slug === "all" ? "/" : `/category/${slug}`}
      className={classes}
    >
      {name}
      {countEl}
    </Link>
  );
}
