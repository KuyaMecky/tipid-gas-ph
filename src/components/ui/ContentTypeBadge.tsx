import type { FeedContentType } from "@/lib/types";
import { cn } from "@/lib/utils";

const colorMap: Record<FeedContentType, { bg: string; text: string; dot?: string }> = {
  ALERT: { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" },
  TIPID: { bg: "bg-green-100", text: "text-green-700" },
  BALITA: { bg: "bg-orange-100", text: "text-orange-700" },
  KWENTO: { bg: "bg-yellow-100", text: "text-yellow-700" },
};

interface ContentTypeBadgeProps {
  type: FeedContentType;
  className?: string;
}

export default function ContentTypeBadge({ type, className }: ContentTypeBadgeProps) {
  const colors = colorMap[type];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
        colors.bg,
        colors.text,
        className
      )}
    >
      {type === "ALERT" && (
        <span className={cn("w-2 h-2 rounded-full urgency-pulse", colors.dot)} />
      )}
      {type}
    </span>
  );
}
