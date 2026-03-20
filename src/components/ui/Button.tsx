import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "alert" | "feed";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

const variants = {
  primary:
    "bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700 shadow-sm",
  secondary:
    "bg-gray-900 text-white hover:bg-gray-800 active:bg-gray-700",
  outline:
    "border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white",
  ghost:
    "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
  alert:
    "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-md shadow-red-500/25",
  feed:
    "bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700 font-black uppercase tracking-wide shadow-md",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3 text-base",
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-orange-500/50",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
