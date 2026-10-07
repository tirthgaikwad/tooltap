import type { Metadata } from 'next';
import HomePage from '@/pages/HomePage';

export const metadata: Metadata = {
  title: 'ToolTap - Discover & Compare AI Tools',
  description:
    'ToolTap helps students, creators, developers, and professionals discover, compare, and save the best AI tools for any task.',
  openGraph: {
    title: 'ToolTap - Discover & Compare AI Tools',
    description:
      'ToolTap helps students, creators, developers, and professionals discover, compare, and save the best AI tools for any task.',
  },
};

export default function Page() {
  return <HomePage />;
}
