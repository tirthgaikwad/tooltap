import type { Metadata } from 'next';
import PrivacyPage from '@/pages/PrivacyPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy policy and local storage details for ToolTap. Zero tracker cookies and transparent device-only persistence.',
  openGraph: {
    title: 'Privacy Policy',
    description:
      'Privacy policy and local storage details for ToolTap. Zero tracker cookies and transparent device-only persistence.',
  },
};

export default function Page() {
  return <PrivacyPage />;
}
