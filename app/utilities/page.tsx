
import { Metadata } from 'next';
import { CategoryLayout } from '@/components/category-layout';
import { getToolsByCategory } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: 'Utilities - Productivity Tools and Text Utilities | Mini Apps',
  description: 'Essential productivity tools including password generator, QR code generator, and text analyzer. Boost your productivity with these handy utilities.',
  keywords: ['utilities', 'productivity tools', 'password generator', 'QR code', 'text analyzer'],
  openGraph: {
    title: 'Utilities - Productivity Tools and Text Utilities',
    description: 'Essential productivity tools including password generator, QR code generator, and text analyzer. Boost your productivity with these handy utilities.',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Utilities',
  description: 'Productivity tools and text utilities',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: getToolsByCategory('utilities').map((tool, index) => ({
      '@type': 'SoftwareApplication',
      position: index + 1,
      name: tool.name,
      description: tool.description,
      url: `https://miniapps.ai${tool.path}`,
      applicationCategory: 'UtilityApplication',
    })),
  },
};

export default function UtilitiesPage() {
  const tools = getToolsByCategory('utilities');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CategoryLayout
        title="Utilities"
        description="Productivity tools and text utilities for everyday tasks"
        tools={tools}
        breadcrumbs={[
          { label: 'Utilities', href: '/utilities' }
        ]}
      />
    </>
  );
}
