"use client";

import { useState, useCallback } from "react";
import type { AutoPublishLogEntry, AutoPublishRunResult } from "@/lib/types";

interface Stats {
  lastRun: string | null;
  totalPublished: number;
  recentCount: number;
  recentEntries: AutoPublishLogEntry[];
}

export default function AutoPublishPage() {
  const [secret, setSecret] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);
  const [runResult, setRunResult] = useState<AutoPublishRunResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    if (!secret) {
      setError("Enter the admin secret");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/auto-publish?secret=${encodeURIComponent(secret)}`);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      const data = await res.json();
      setStats(data);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }, [secret]);

  const triggerRun = useCallback(async () => {
    if (!secret) {
      setError("Enter the admin secret");
      return;
    }
    setError(null);
    setRunResult(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/auto-publish?secret=${encodeURIComponent(secret)}`, {
        method: "POST",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      const data = (await res.json()) as AutoPublishRunResult;
      setRunResult(data);
      // Refresh stats after run
      fetchStats();
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }, [secret, fetchStats]);

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      published: "bg-emerald-100 text-emerald-800",
      skipped: "bg-gray-100 text-gray-600",
      failed: "bg-red-100 text-red-800",
    };
    return (
      <span
        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${colors[status] || "bg-gray-100 text-gray-600"}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-gray-900">
        Auto-Publish Dashboard
      </h1>

      {/* Secret input */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Admin Secret
        </label>
        <div className="flex gap-3">
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Enter secret..."
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
          />
          <button
            onClick={fetchStats}
            disabled={loading}
            className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 disabled:opacity-50 transition-colors"
          >
            Load Stats
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">
          {error}
        </div>
      )}

      {/* Stats cards */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <p className="text-xs font-medium text-gray-500 uppercase">Last Run</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {stats.lastRun
                ? new Date(stats.lastRun).toLocaleString("en-PH", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })
                : "Never"}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <p className="text-xs font-medium text-gray-500 uppercase">
              Total Published
            </p>
            <p className="mt-1 text-lg font-semibold text-emerald-600">
              {stats.totalPublished}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <p className="text-xs font-medium text-gray-500 uppercase">
              Log Entries
            </p>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {stats.recentEntries?.length || 0}
            </p>
          </div>
        </div>
      )}

      {/* Run button */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-semibold text-gray-900">
              Trigger Auto-Publish
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Fetches RSS, scrapes articles, publishes to WordPress (max 10 per run)
            </p>
          </div>
          <button
            onClick={triggerRun}
            disabled={loading || !secret}
            className="px-6 py-2.5 bg-yellow-500 text-gray-900 font-semibold rounded-md hover:bg-yellow-400 disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            {loading && (
              <svg
                className="animate-spin h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            )}
            {loading ? "Running..." : "Run Now"}
          </button>
        </div>
      </div>

      {/* Run result */}
      {runResult && (
        <div className="bg-white rounded-lg shadow-sm border p-4 space-y-4">
          <h2 className="font-heading font-semibold text-gray-900">
            Run Result
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-emerald-50 rounded-lg">
              <p className="text-2xl font-bold text-emerald-600">
                {runResult.published}
              </p>
              <p className="text-xs text-emerald-700">Published</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-500">
                {runResult.skipped}
              </p>
              <p className="text-xs text-gray-600">Skipped</p>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">
                {runResult.failed}
              </p>
              <p className="text-xs text-red-700">Failed</p>
            </div>
          </div>
          {runResult.errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm font-medium text-red-800 mb-1">Errors:</p>
              <ul className="text-sm text-red-700 list-disc list-inside">
                {runResult.errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Log table */}
      {stats?.recentEntries && stats.recentEntries.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="px-4 py-3 border-b">
            <h2 className="font-heading font-semibold text-gray-900">
              Recent Log
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-2 font-medium text-gray-600">
                    Title
                  </th>
                  <th className="text-left px-4 py-2 font-medium text-gray-600">
                    Source
                  </th>
                  <th className="text-left px-4 py-2 font-medium text-gray-600">
                    Category
                  </th>
                  <th className="text-left px-4 py-2 font-medium text-gray-600">
                    Status
                  </th>
                  <th className="text-left px-4 py-2 font-medium text-gray-600">
                    WP
                  </th>
                  <th className="text-left px-4 py-2 font-medium text-gray-600">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stats.recentEntries.map((entry, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-2 max-w-xs truncate" title={entry.title}>
                      <a
                        href={entry.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {entry.title.slice(0, 60)}
                        {entry.title.length > 60 ? "..." : ""}
                      </a>
                    </td>
                    <td className="px-4 py-2 text-gray-600 whitespace-nowrap">
                      {entry.sourceName}
                    </td>
                    <td className="px-4 py-2 text-gray-600 whitespace-nowrap">
                      {entry.categorySlug || "-"}
                    </td>
                    <td className="px-4 py-2">{statusBadge(entry.status)}</td>
                    <td className="px-4 py-2">
                      {entry.wpPostId ? (
                        <a
                          href={`https://latestbalita.ph/wp-admin/post.php?post=${entry.wpPostId}&action=edit`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-xs"
                        >
                          #{entry.wpPostId}
                        </a>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-gray-500 whitespace-nowrap text-xs">
                      {new Date(entry.publishedAt).toLocaleString("en-PH", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
