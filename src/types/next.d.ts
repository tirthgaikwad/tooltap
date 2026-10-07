export namespace MetadataRoute {
  export type Sitemap = Array<{
    url: string;
    lastModified?: string | Date;
    changeFrequency?:
      | 'always'
      | 'hourly'
      | 'daily'
      | 'weekly'
      | 'monthly'
      | 'yearly'
      | 'never';
    priority?: number;
    alternates?: {
      languages?: Record<string, string>;
    };
  }>;

  export type Robots = {
    rules:
      | {
          userAgent?: string | string[];
          allow?: string | string[];
          disallow?: string | string[];
          crawlDelay?: number;
        }
      | Array<{
          userAgent?: string | string[];
          allow?: string | string[];
          disallow?: string | string[];
          crawlDelay?: number;
        }>;
    sitemap?: string | string[];
    host?: string;
  };
}

export interface Metadata {
  metadataBase?: URL | null;
  title?:
    | string
    | {
        default: string;
        template?: string;
        absolute?: string;
      }
    | null;
  description?: string | null;
  applicationName?: string | null;
  authors?: Array<{ name: string; url?: string }> | null;
  generator?: string | null;
  keywords?: string[] | string | null;
  referrer?: string | null;
  themeColor?: string | null;
  colorScheme?: string | null;
  viewport?: string | null;
  creator?: string | null;
  publisher?: string | null;
  robots?: any;
  icons?: any;
  manifest?: string | URL | null;
  openGraph?: {
    title?: string | null;
    description?: string | null;
    url?: string | URL | null;
    siteName?: string | null;
    images?: any;
    locale?: string | null;
    type?: string | null;
  } | null;
  twitter?: {
    card?: string | null;
    title?: string | null;
    description?: string | null;
    site?: string | null;
    creator?: string | null;
    images?: any;
  } | null;
  alternates?: {
    canonical?: string | URL | null;
    languages?: Record<string, string>;
  } | null;
  category?: string | null;
  classification?: string | null;
  other?: Record<string, string | number | (string | number)[]>;
}

export type ResolvingMetadata = Promise<Metadata>;

declare module 'next' {
  export import MetadataRoute = MetadataRoute;
  export type Metadata = Metadata;
  export type ResolvingMetadata = ResolvingMetadata;
}
