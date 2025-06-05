
import { Metadata } from 'next';
import { ToolLayout } from '@/components/tool-layout';
import { TextAnalyzer } from '@/components/tools/text-analyzer';
import { getToolById } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: 'Text Analyzer - Word Count, Character Count, Reading Time | Mini Apps',
  description: 'Analyze text for word count, character count, reading time, and statistics. Get detailed text analysis including most common words and readability.',
  keywords: ['text analyzer', 'word count', 'character count', 'reading time', 'text statistics'],
  openGraph: {
    title: 'Text Analyzer - Word Count, Character Count, Reading Time',
    description: 'Analyze text for word count, character count, reading time, and statistics. Get detailed text analysis including most common words and readability.',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Text Counter & Analyzer',
  description: 'Count words, characters, paragraphs and analyze text statistics',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  permissions: 'browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

export default function TextAnalyzerPage() {
  const tool = getToolById('text-analyzer')!;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolLayout tool={tool}>
        <TextAnalyzer />
      </ToolLayout>
    </>
  );
}
