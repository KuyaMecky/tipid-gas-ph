"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="font-heading text-6xl font-bold text-gray-900 mb-4">
          500
        </h1>
        <h2 className="font-heading text-xl font-semibold text-gray-700 mb-3">
          May problema sa server
        </h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Paumanhin, nagkaroon ng error sa aming sistema. Subukan muli o
          bumalik sa homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors"
          >
            Subukan Muli
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-orange-500 hover:text-orange-500 transition-colors"
          >
            Bumalik sa Home
          </Link>
        </div>
        <div className="mt-10 flex justify-center gap-6 text-sm text-gray-400">
          <Link href="/gasolina" className="hover:text-orange-500 transition-colors">
            Presyo ng Gas
          </Link>
          <Link href="/category/balita" className="hover:text-orange-500 transition-colors">
            Balita
          </Link>
          <Link href="/category/tips" className="hover:text-orange-500 transition-colors">
            Tipid Tips
          </Link>
        </div>
      </div>
    </div>
  );
}
