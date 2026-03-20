"use client";

import { mockAuthorProfiles } from "@/lib/mock-data";

interface AuthorBioProps {
  authorSlug: string;
}

export default function AuthorBio({ authorSlug }: AuthorBioProps) {
  const author = mockAuthorProfiles.find((a) => a.slug === authorSlug);
  if (!author) return null;

  return (
    <div className="mt-10 pt-8 border-t border-gray-200">
      <div className="flex flex-col sm:flex-row gap-5 p-6 bg-gray-50 rounded-2xl">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
          {author.name.split(" ").map((n) => n[0]).join("")}
        </div>

        {/* Info */}
        <div className="flex-1">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Tungkol sa Author</p>
          <h3 className="font-heading font-bold text-lg text-gray-900">{author.name}</h3>
          <p className="text-sm text-orange-500 font-semibold">{author.role}</p>
          <p className="text-xs text-gray-500 mt-1">{author.credentials}</p>
          <p className="text-sm text-gray-600 mt-3 leading-relaxed">{author.bio}</p>

          {/* Social links */}
          <div className="flex gap-3 mt-4">
            {author.socialLinks.twitter && (
              <a
                href={author.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
              >
                Twitter
              </a>
            )}
            {author.socialLinks.linkedin && (
              <a
                href={author.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
              >
                LinkedIn
              </a>
            )}
            {author.socialLinks.facebook && (
              <a
                href={author.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
              >
                Facebook
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
