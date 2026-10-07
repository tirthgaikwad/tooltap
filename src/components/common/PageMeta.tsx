import { useEffect, ReactNode } from 'react';
import { Toaster } from 'sonner';
import { getCanonicalUrl } from '@/lib/seo';

interface PageMetaProps {
  title: string;
  description?: string;
  canonicalPath?: string;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
  type?: string;
  noIndex?: boolean;
}

export default function PageMeta({
  title,
  description,
  canonicalPath,
  schema,
  type = 'website',
  noIndex = false,
}: PageMetaProps) {
  useEffect(() => {
    // 1. Title
    const fullTitle = title.includes('ToolTap') ? title : `${title} | ToolTap`;
    document.title = fullTitle;

    // Helper to set or create meta tag
    const setMetaTag = (selector: string, attrName: string, attrVal: string, content: string) => {
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attrName, attrVal);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // 2. Meta description
    if (description) {
      setMetaTag('meta[name="description"]', 'name', 'description', description);
      setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
      setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    }

    // 3. OpenGraph & Twitter Titles
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', type);

    // 4. Robots directive (noindex if requested)
    if (noIndex) {
      setMetaTag('meta[name="robots"]', 'name', 'robots', 'noindex, nofollow');
    } else {
      const robotsMeta = document.querySelector('meta[name="robots"]');
      if (robotsMeta) {
        robotsMeta.setAttribute('content', 'index, follow');
      }
    }

    // 5. Canonical Link & Canonical OG URL
    // Auto-detect current pathname if canonicalPath is not explicitly supplied
    const effectivePath = canonicalPath !== undefined
      ? canonicalPath
      : (typeof window !== 'undefined' ? window.location.pathname : '/');
    const canonicalUrl = getCanonicalUrl(effectivePath);

    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    // Sync og:url and twitter:url with canonical URL
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMetaTag('meta[name="twitter:url"]', 'name', 'twitter:url', canonicalUrl);

    // 6. Schema.org JSON-LD Structured Data
    const scriptId = 'tooltap-structured-data';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (schema) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schema);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [title, description, canonicalPath, schema, type, noIndex]);

  return null;
}

export function AppWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="bottom-right"
        theme="dark"
        richColors
        toastOptions={{
          style: {
            background: '#1F1F24',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#F3F4F6',
          },
        }}
      />
    </>
  );
}
