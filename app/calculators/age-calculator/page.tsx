
import { Metadata } from 'next';
import { ToolLayout } from '@/components/tool-layout';
import { AgeCalculator } from '@/components/tools/age-calculator';
import { getToolById } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: 'Age Calculator - Calculate Exact Age from Birthdate | Mini Apps',
  description: 'Calculate your exact age in years, months, and days from your birthdate. Get detailed age statistics including total days lived, weeks, and time until next birthday.',
  keywords: ['age calculator', 'birthdate calculator', 'age in days', 'birthday calculator', 'exact age'],
  openGraph: {
    title: 'Age Calculator - Calculate Exact Age from Birthdate',
    description: 'Calculate your exact age in years, months, and days from your birthdate. Get detailed age statistics including total days lived, weeks, and time until next birthday.',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Age Calculator',
  description: 'Calculate exact age from birthdate with years, months, and days',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  permissions: 'browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

export default function AgeCalculatorPage() {
  const tool = getToolById('age-calculator')!;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolLayout tool={tool}>
        <AgeCalculator />
      </ToolLayout>
    </>
  );
}
