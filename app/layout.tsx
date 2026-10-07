import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://tooltap.ai'),
  title: {
    default: 'ToolTap - Discover & Compare AI Tools',
    template: '%s | ToolTap',
  },
  description:
    'Search, compare, and discover verified AI tools with official links, transparent pricing, and practical use cases.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'ToolTap',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#121212] text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
