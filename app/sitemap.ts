import type { MetadataRoute } from 'next';
import toolsData from '../src/data/tools.json';
import { CATEGORIES } from '../src/types/tool';
import { getToolSlug, getCategorySlug } from '../src/lib/slugs';
import type { Tool } from '../src/types/tool';

// Revalidate sitemap once every 24 hours (86,400 seconds) for Next.js ISR caching
export const revalidate = 86400;

/**
 * Dynamic XML Sitemap Generation for ToolTap Directory (Next.js App Router)
 * Indexes 500+ verified AI tools and 25 categories efficiently.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://tooltap.vercel.app').replace(/\/+$/, '');
  const now = new Date();

  // 1. Core Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/collections`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/documentation`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/how-to-use`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // 2. Dynamic Category Routes (25 categories)
  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((category) => {
    const slug = getCategorySlug(category);
    return {
      url: `${baseUrl}/category/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    };
  });

  // 3. Dynamic Tool Routes (500+ verified tools)
  const tools = (toolsData as Tool[]) || [];
  const toolRoutes: MetadataRoute.Sitemap = tools.map((tool) => {
    const slug = getToolSlug(tool.name);
    return {
      url: `${baseUrl}/tool/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    };
  });

  return [...staticRoutes, ...categoryRoutes, ...toolRoutes];
}
