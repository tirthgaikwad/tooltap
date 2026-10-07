import type { Metadata } from 'next';
import AboutPage from '@/pages/AboutPage';

export const metadata: Metadata = {
  title: 'About ToolTap',
  description:
    'ToolTap is a curated directory of 500 AI tools organized into 25 domain categories. Built for students, developers, researchers, creators, and professionals.',
  openGraph: {
    title: 'About ToolTap',
    description:
      'ToolTap is a curated directory of 500 AI tools organized into 25 domain categories. Built for students, developers, researchers, creators, and professionals.',
  },
};

export default function Page() {
  return <AboutPage />;
}
