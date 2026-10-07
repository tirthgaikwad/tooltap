import type { Metadata, ResolvingMetadata } from 'next';
import { getCategoryBySlug } from '@/lib/data';
import CategoryDetailPage from '@/pages/CategoryDetailPage';

type Props = { params: { slug: string } };

export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);

  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The requested AI tool category could not be found on ToolTap.',
    };
  }

  const description = `Discover and compare top ${category} AI tools with free plan details, verified ratings, and direct links.`;

  return {
    title: `${category} AI Tools`,
    description,
    openGraph: {
      title: `${category} AI Tools`,
      description,
    },
  };
}

export default function Page() {
  return <CategoryDetailPage />;
}
