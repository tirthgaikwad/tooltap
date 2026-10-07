import type { Metadata } from 'next';
import CategoriesPage from '@/pages/CategoriesPage';

export const metadata: Metadata = {
  title: 'AI Tool Categories',
  description:
    'Browse 25 domain categories of verified AI tools ranging from coding and writing to image generation, 3D, and analytics.',
  openGraph: {
    title: 'AI Tool Categories',
    description:
      'Browse 25 domain categories of verified AI tools ranging from coding and writing to image generation, 3D, and analytics.',
  },
};

export default function Page() {
  return <CategoriesPage />;
}
