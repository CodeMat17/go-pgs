const convexHost = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_CONVEX_URL ?? "").host;
  } catch {
    return null;
  }
})();

/**
 * Convex storage URLs only resolve on the deployment that issued them. Some
 * older records still point at a retired deployment and 404, so treat those
 * as missing and let the caller render its placeholder instead.
 */
export function liveAssetUrl(url?: string | null): string | undefined {
  if (!url) return undefined;
  try {
    const { host } = new URL(url);
    if (host.endsWith(".convex.cloud") && convexHost && host !== convexHost) {
      return undefined;
    }
  } catch {
    // Relative paths (e.g. /hero-bg.avif) are fine as-is.
  }
  return url;
}
