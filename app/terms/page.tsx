import type { Metadata } from 'next';
import TermsPage from '@/pages/TermsPage';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of service and usage conditions for the ToolTap AI directory and community platform.',
  openGraph: {
    title: 'Terms of Service',
    description:
      'Terms of service and usage conditions for the ToolTap AI directory and community platform.',
  },
};

export default function Page() {
  return <TermsPage />;
}
