
import { Metadata } from 'next';
import { ToolLayout } from '@/components/tool-layout';
import { TipCalculator } from '@/components/tools/tip-calculator';
import { getToolById } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: 'Tip Calculator - Calculate Tips and Split Bills | Mini Apps',
  description: 'Calculate tips and split restaurant bills easily. Customize tip percentages, split between multiple people, and get exact amounts for each person.',
  keywords: ['tip calculator', 'bill splitter', 'restaurant tip', 'gratuity calculator', 'split bill'],
  openGraph: {
    title: 'Tip Calculator - Calculate Tips and Split Bills',
    description: 'Calculate tips and split restaurant bills easily. Customize tip percentages, split between multiple people, and get exact amounts for each person.',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Tip Calculator',
  description: 'Calculate tips and split bills with customizable tip percentages',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  permissions: 'browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

export default function TipCalculatorPage() {
  const tool = getToolById('tip-calculator')!;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolLayout tool={tool}>
        <TipCalculator />
      </ToolLayout>
    </>
  );
}
