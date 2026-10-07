import type { Metadata } from 'next';
import ComparePage from '@/pages/ComparePage';

export const metadata: Metadata = {
  title: 'Compare AI Tools',
  description:
    'Use the Multi-Vector Radar Matrix to compare AI tools based on speed, quality, pricing, and ease of use to find your perfect workflow.',
  openGraph: {
    title: 'Compare AI Tools',
    description:
      'Use the Multi-Vector Radar Matrix to compare AI tools based on speed, quality, pricing, and ease of use to find your perfect workflow.',
  },
};

export default function Page() {
  return <ComparePage />;
}
