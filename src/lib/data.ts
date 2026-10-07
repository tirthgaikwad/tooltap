import toolsData from '@/data/tools.json';
import { CATEGORIES } from '@/types/tool';
import { matchSlug, normalizeSlug, getToolSlug, getCategorySlug } from '@/lib/slugs';
import type { Tool } from '@/types/tool';

export async function getToolBySlug(slug: string): Promise<Tool | null> {
  if (!slug) return null;
  const tools = (toolsData as Tool[]) || [];
  const found = tools.find((t) => matchSlug(t.name, slug));
  return found || null;
}

export async function getAllTools(): Promise<Tool[]> {
  return (toolsData as Tool[]) || [];
}

export async function getCategoryBySlug(slug: string): Promise<string | null> {
  if (!slug) return null;
  const target = normalizeSlug(slug);
  const found = CATEGORIES.find((cat) => normalizeSlug(cat) === target);
  return found || null;
}

export async function getAllCategories(): Promise<readonly string[]> {
  return CATEGORIES;
}

export { getToolSlug, getCategorySlug, normalizeSlug, matchSlug };
