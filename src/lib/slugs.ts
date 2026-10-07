export const normalizeSlug = (value: string = ""): string =>
  (value || "")
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export function getCategorySlug(categoryName: string): string {
  return normalizeSlug(categoryName);
}

export function getToolSlug(toolName: string): string {
  return normalizeSlug(toolName);
}

export function simpleSlug(value: string = ""): string {
  return (value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function matchSlug(s1: string = "", s2: string = ""): boolean {
  if (!s1 || !s2) return false;
  const n1 = normalizeSlug(s1);
  const n2 = normalizeSlug(s2);
  if (n1 && n1 === n2) return true;

  const sim1 = simpleSlug(s1);
  const sim2 = simpleSlug(s2);
  return Boolean(sim1 && sim1 === sim2);
}

export function matchCategory(cat1: string = "", cat2: string = ""): boolean {
  return matchSlug(cat1, cat2);
}

