
import { Metadata } from 'next';
import { ToolLayout } from '@/components/tool-layout';
import { PasswordGenerator } from '@/components/tools/password-generator';
import { getToolById } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: 'Password Generator - Generate Secure Passwords | Mini Apps',
  description: 'Generate secure passwords with customizable length and complexity. Include uppercase, lowercase, numbers, and symbols for maximum security.',
  keywords: ['password generator', 'secure password', 'random password', 'strong password', 'password security'],
  openGraph: {
    title: 'Password Generator - Generate Secure Passwords',
    description: 'Generate secure passwords with customizable length and complexity. Include uppercase, lowercase, numbers, and symbols for maximum security.',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Password Generator',
  description: 'Generate secure passwords with customizable length and complexity',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  permissions: 'browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

export default function PasswordGeneratorPage() {
  const tool = getToolById('password-generator')!;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolLayout tool={tool}>
        <PasswordGenerator />
      </ToolLayout>
    </>
  );
}
