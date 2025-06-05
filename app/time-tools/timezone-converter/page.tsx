
import { Metadata } from 'next';
import { ToolLayout } from '@/components/tool-layout';
import { TimezoneConverter } from '@/components/tools/timezone-converter';
import { getToolById } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: 'Time Zone Converter - Convert Time Between Time Zones | Mini Apps',
  description: 'Convert time between different time zones worldwide. See current time in major cities and convert specific times across time zones.',
  keywords: ['timezone converter', 'time zone', 'world clock', 'time conversion', 'UTC converter'],
  openGraph: {
    title: 'Time Zone Converter - Convert Time Between Time Zones',
    description: 'Convert time between different time zones worldwide. See current time in major cities and convert specific times across time zones.',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Time Zone Converter',
  description: 'Convert time between different time zones worldwide',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  permissions: 'browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

export default function TimezoneConverterPage() {
  const tool = getToolById('timezone-converter')!;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolLayout tool={tool}>
        <TimezoneConverter />
      </ToolLayout>
    </>
  );
}
