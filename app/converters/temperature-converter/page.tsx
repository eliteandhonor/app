
import { Metadata } from 'next';
import { ToolLayout } from '@/components/tool-layout';
import { TemperatureConverter } from '@/components/tools/temperature-converter';
import { getToolById } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: 'Temperature Converter - Convert Celsius, Fahrenheit, Kelvin | Mini Apps',
  description: 'Convert temperatures between Celsius, Fahrenheit, and Kelvin. Get instant conversions with temperature descriptions and common reference points.',
  keywords: ['temperature converter', 'celsius to fahrenheit', 'fahrenheit to celsius', 'kelvin converter', 'temperature conversion'],
  openGraph: {
    title: 'Temperature Converter - Convert Celsius, Fahrenheit, Kelvin',
    description: 'Convert temperatures between Celsius, Fahrenheit, and Kelvin. Get instant conversions with temperature descriptions and common reference points.',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Temperature Converter',
  description: 'Convert between Celsius, Fahrenheit, and Kelvin temperatures',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  permissions: 'browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

export default function TemperatureConverterPage() {
  const tool = getToolById('temperature-converter')!;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolLayout tool={tool}>
        <TemperatureConverter />
      </ToolLayout>
    </>
  );
}
