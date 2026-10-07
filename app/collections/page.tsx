import type { Metadata } from 'next';
import CollectionsPage from '@/pages/CollectionsPage';

export const metadata: Metadata = {
  title: 'Curated AI Collections',
  description:
    'Explore curated stacks of AI tools grouped by practical workflows, student needs, developer stacks, and open-source models.',
  openGraph: {
    title: 'Curated AI Collections',
    description:
      'Explore curated stacks of AI tools grouped by practical workflows, student needs, developer stacks, and open-source models.',
  },
};

export default function Page() {
  return <CollectionsPage />;
}
