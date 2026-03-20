import Image from "next/image";
import { timeAgo, formatDate } from "@/lib/utils";

interface ArticleMetaProps {
  authorName: string;
  authorAvatar?: string;
  date: string;
  categoryName?: string;
  categorySlug?: string;
  showFullDate?: boolean;
}

export default function ArticleMeta({
  authorName,
  authorAvatar,
  date,
  categoryName,
  showFullDate = false,
}: ArticleMetaProps) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <div className="relative w-8 h-8 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
        {authorAvatar ? (
          <Image
            src={authorAvatar}
            alt={authorName}
            fill
            className="object-cover"
            sizes="32px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-orange-500 text-white font-bold text-xs">
            {authorName.charAt(0)}
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
        {categoryName && (
          <span className="text-orange-500 font-semibold">{categoryName}</span>
        )}
        <span className="text-gray-500">{timeAgo(date)}</span>
        {showFullDate && (
          <span className="text-gray-400">Date: {formatDate(date)}</span>
        )}
      </div>
    </div>
  );
}
