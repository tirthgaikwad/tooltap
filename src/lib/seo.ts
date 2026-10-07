/**
 * Centralized SEO & Canonical URL utilities for ToolTap
 * Ensures consistent canonical URLs across Next.js App Router, Vite SPA, and sitemap.xml.
 */

export const DEFAULT_SITE_URL = 'https://tooltap.vercel.app';

export function getSiteUrl(): string {
  // 1. Next.js App Router public environment variable
  if (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, '');
  }

  // 2. Generic process.env SITE_URL
  if (typeof process !== 'undefined' && process.env?.SITE_URL) {
    return process.env.SITE_URL.replace(/\/+$/, '');
  }

  // 3. Vite client-side environment variable
  try {
    if (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SITE_URL) {
      return ((import.meta as any).env.VITE_SITE_URL as string).replace(/\/+$/, '');
    }
  } catch {
    // ignore
  }

  // 4. Browser origin fallback
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin.replace(/\/+$/, '');
  }

  return DEFAULT_SITE_URL;
}

/**
 * Normalizes a canonical path and constructs an absolute canonical URL.
 * Matches sitemap.xml and Google Search Console expectations.
 */
export function getCanonicalUrl(path = ''): string {
  const base = getSiteUrl();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (cleanPath === '/') {
    return `${base}/`;
  }
  return `${base}${cleanPath}`;
}
