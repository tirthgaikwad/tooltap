import type { MetadataRoute } from 'next';

/**
 * Search Engine Crawler Directives for ToolTap (Next.js App Router)
 * Configures crawl directives and links the dynamic XML sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://tooltap.vercel.app').replace(/\/+$/, '');

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',
        '/admin/',
        '/dashboard',
        '/dashboard/',
        '/api/',
        '/saved-tools',
        '/saved',
        '/bookmarks',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
