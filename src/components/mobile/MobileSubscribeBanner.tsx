"use client";

import { BellAlertIcon } from "@heroicons/react/24/solid";

interface MobileSubscribeBannerProps {
  variant: "inline" | "compact";
}

export default function MobileSubscribeBanner({ variant }: MobileSubscribeBannerProps) {
  if (variant === "compact") {
    return (
      <div className="bg-white rounded-2xl mobile-card-shadow p-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
            <BellAlertIcon className="w-4.5 h-4.5 text-yellow-600" />
          </div>
          <div className="min-w-0">
            <p className="font-heading font-extrabold text-sm text-gray-900">Get Daily Gas Alerts</p>
            <p className="text-xs text-gray-400">Compare prices now</p>
          </div>
        </div>
        <button
          type="button"
          className="flex-shrink-0 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-extrabold rounded-lg uppercase tracking-wide shadow-sm"
        >
          Subscribe Now
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-5">
      <div className="flex items-center gap-2 mb-2">
        <BellAlertIcon className="w-5 h-5 text-yellow-400" />
        <h3 className="font-heading font-bold text-lg text-white">
          Mag-subscribe para sa Daily Gas Alerts
        </h3>
      </div>
      <p className="text-gray-400 text-xs mb-4">
        Unang makakaalam ng price hike at rollback. Libre lang!
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="Email mo dito..."
          aria-label="Email address"
          className="flex-1 min-w-0 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          type="button"
          className="flex-shrink-0 px-5 py-2.5 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-sm rounded-xl transition-colors uppercase tracking-wide"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
}
