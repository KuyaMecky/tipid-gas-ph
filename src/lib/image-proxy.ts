/**
 * Wraps an external news image URL through our proxy to avoid hotlinking blocks.
 * Only proxies known news domains; returns the original URL for others.
 */
const PROXY_DOMAINS = [
  "images.gmanews.tv",
  "images.gmanetwork.com",
  "www.gmanetwork.com",
  "assets.rappler.com",
  "media.inquirer.net",
  "newsinfo.inquirer.net",
  "www.inquirer.net",
  "media.philstar.com",
  "www.philstar.com",
  "abs-cbn.com",
  "static.abs-cbn.com",
  "www.abs-cbn.com",
  "newsdata.io",
];

export function proxyImageUrl(url: string | null): string | null {
  if (!url) return null;
  try {
    const hostname = new URL(url).hostname;
    const shouldProxy = PROXY_DOMAINS.some(
      (d) => hostname === d || hostname.endsWith(`.${d}`)
    );
    if (shouldProxy) {
      return `/api/image-proxy?url=${encodeURIComponent(url)}`;
    }
    return url;
  } catch {
    return url;
  }
}
