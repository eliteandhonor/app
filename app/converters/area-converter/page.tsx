
import { Metadata } from 'next';
import { ToolLayout } from '@/components/tool-layout';
import { AreaConverter } from '@/components/tools/area-converter';
import { getToolById } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: 'Area & Volume Converter - Convert Units | Mini Apps',
  description: 'Convert between area and volume units including square feet, acres, liters, gallons, and more. Comprehensive unit conversion tool.',
  keywords: ['area converter', 'volume converter', 'square feet', 'acres', 'liters', 'gallons', 'unit conversion'],
  openGraph: {
    title: 'Area & Volume Converter - Convert Units',
    description: 'Convert between area and volume units including square feet, acres, liters, gallons, and more. Comprehensive unit conversion tool.',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Area & Volume Converter',
  description: 'Convert between area and volume units (sq ft, acres, liters, etc.)',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  permissions: 'browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

export default function AreaConverterPage() {
  const tool = getToolById('area-converter')!;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolLayout tool={tool}>
        <AreaConverter />
      </ToolLayout>
    </>
  );
}
