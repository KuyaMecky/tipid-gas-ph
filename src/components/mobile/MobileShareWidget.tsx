"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShareIcon, LinkIcon } from "@heroicons/react/24/solid";

interface MobileShareWidgetProps {
  articleUrl: string;
  articleTitle: string;
  shareCount?: number;
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function ViberIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.398.002C9.473.028 5.331.344 3.014 2.467 1.294 4.177.533 6.697.47 9.837c-.063 3.14-.143 9.028 5.53 10.572l.003.001-.002 2.42s-.04.98.61 1.178c.783.244 1.245-.504 1.996-1.308.413-.44.978-1.089 1.407-1.585 3.875.326 6.86-.418 7.2-.532.784-.264 5.22-.824 5.943-6.726.746-6.084-.36-9.93-2.357-11.667C18.614.756 14.248-.04 11.398.002zm.297 1.902c2.513-.036 6.283.6 8.144 2.166 1.612 1.397 2.397 4.742 1.76 9.897-.583 4.748-3.997 5.393-4.65 5.614-.284.095-2.834.73-6.12.505 0 0-2.424 2.925-3.181 3.688-.119.12-.26.168-.354.145-.132-.033-.168-.189-.166-.417l.02-4.016c-4.57-1.241-4.302-6.002-4.252-8.513.05-2.51.633-4.576 2.042-5.974C6.673 3.262 9.182 1.94 11.695 1.904z" />
    </svg>
  );
}

export default function MobileShareWidget({ articleUrl, articleTitle, shareCount = 0 }: MobileShareWidgetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
    }
  }, [articleUrl]);

  const encodedUrl = encodeURIComponent(articleUrl);
  const encodedTitle = encodeURIComponent(articleTitle);

  const shareLinks = [
    {
      name: "Facebook",
      icon: FacebookIcon,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "bg-blue-600 text-white",
    },
    {
      name: "X",
      icon: XIcon,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "bg-gray-900 text-white",
    },
    {
      name: "Viber",
      icon: ViberIcon,
      url: `viber://forward?text=${encodedTitle}%20${encodedUrl}`,
      color: "bg-purple-600 text-white",
    },
  ];

  return (
    <div className="flex items-center gap-2.5 mt-3 pt-3 border-t border-white/10">
      {shareCount > 0 && (
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
          <ShareIcon className="w-3.5 h-3.5 text-white/60" />
        </div>
      )}
      {shareCount > 0 && (
        <span className="text-[11px] font-semibold text-white/50 -ml-1 mr-0.5">
          {shareCount >= 1000
            ? `${(shareCount / 1000).toFixed(1)}k`
            : shareCount}
        </span>
      )}
      {shareLinks.map((link) => {
        const Icon = link.icon;
        return (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-8 h-8 rounded-full ${link.color} flex items-center justify-center`}
            whileTap={{ scale: 0.85 }}
            aria-label={`Share on ${link.name}`}
          >
            <Icon className="w-3.5 h-3.5" />
          </motion.a>
        );
      })}
      <div className="relative">
        <motion.button
          type="button"
          onClick={handleCopy}
          className="w-8 h-8 rounded-full bg-white/10 text-white/60 flex items-center justify-center"
          whileTap={{ scale: 0.85 }}
          aria-label="Copy link"
        >
          <LinkIcon className="w-3.5 h-3.5" />
        </motion.button>
        <AnimatePresence>
          {copied && (
            <motion.span
              className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-[10px] font-medium rounded-md whitespace-nowrap"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2 }}
            >
              Copied!
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
