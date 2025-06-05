
import { Metadata } from 'next';
import { ToolLayout } from '@/components/tool-layout';
import { GradeCalculator } from '@/components/tools/grade-calculator';
import { getToolById } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: 'Grade Calculator - Calculate Weighted Grades and GPA | Mini Apps',
  description: 'Calculate weighted grades and GPA with multiple assignments. Add custom assignments with different weights to get your overall grade and letter grade.',
  keywords: ['grade calculator', 'GPA calculator', 'weighted grades', 'school grades', 'assignment calculator'],
  openGraph: {
    title: 'Grade Calculator - Calculate Weighted Grades and GPA',
    description: 'Calculate weighted grades and GPA with multiple assignments. Add custom assignments with different weights to get your overall grade and letter grade.',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Grade Calculator',
  description: 'Calculate weighted grades and GPA with multiple assignments',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  permissions: 'browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

export default function GradeCalculatorPage() {
  const tool = getToolById('grade-calculator')!;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolLayout tool={tool}>
        <GradeCalculator />
      </ToolLayout>
    </>
  );
}
