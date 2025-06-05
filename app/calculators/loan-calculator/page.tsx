
import { Metadata } from 'next';
import { ToolLayout } from '@/components/tool-layout';
import { LoanCalculator } from '@/components/tools/loan-calculator';
import { getToolById } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: 'Loan Calculator - Calculate Loan Payments and Interest | Mini Apps',
  description: 'Calculate loan payments, total interest, and payoff dates. Support for various loan terms and interest rates with detailed payment breakdowns.',
  keywords: ['loan calculator', 'loan payment', 'interest calculator', 'amortization', 'finance calculator'],
  openGraph: {
    title: 'Loan Calculator - Calculate Loan Payments and Interest',
    description: 'Calculate loan payments, total interest, and payoff dates. Support for various loan terms and interest rates with detailed payment breakdowns.',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Loan Calculator',
  description: 'Calculate loan payments, interest, and amortization schedules',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  permissions: 'browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

export default function LoanCalculatorPage() {
  const tool = getToolById('loan-calculator')!;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolLayout tool={tool}>
        <LoanCalculator />
      </ToolLayout>
    </>
  );
}
