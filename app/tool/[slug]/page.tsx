import type { Metadata, ResolvingMetadata } from 'next';
import { getToolBySlug } from '@/lib/data';
import ToolDetailPage from '@/pages/ToolDetailPage';

type Props = { params: { slug: string } };

export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  // Fetch tool data based on the URL slug
  const tool = await getToolBySlug(params.slug);

  if (!tool) {
    return {
      title: 'Tool Not Found',
      description: 'The requested AI tool could not be found on ToolTap.',
    };
  }

  const description =
    (tool as any).shortDescription ||
    tool.why ||
    `Discover features, pricing, and alternatives for ${tool.name}.`;

  return {
    title: tool.name, // Renders as "ToolName | ToolTap" due to the layout template
    description,
    openGraph: {
      title: tool.name,
      description,
    },
  };
}

export default function Page() {
  return <ToolDetailPage />;
}
