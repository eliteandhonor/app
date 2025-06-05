
import { Metadata } from 'next';
import { ToolLayout } from '@/components/tool-layout';
import { QRCodeGenerator } from '@/components/tools/qr-code-generator';
import { getToolById } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: 'QR Code Generator - Generate QR Codes for Text, URLs, WiFi | Mini Apps',
  description: 'Generate QR codes for text, URLs, emails, phone numbers, and WiFi credentials. Download high-quality QR codes in multiple sizes.',
  keywords: ['QR code generator', 'QR code', 'barcode generator', 'WiFi QR code', 'URL QR code'],
  openGraph: {
    title: 'QR Code Generator - Generate QR Codes for Text, URLs, WiFi',
    description: 'Generate QR codes for text, URLs, emails, phone numbers, and WiFi credentials. Download high-quality QR codes in multiple sizes.',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'QR Code Generator',
  description: 'Generate QR codes from text, URLs, and other data',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  permissions: 'browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

export default function QRCodeGeneratorPage() {
  const tool = getToolById('qr-code-generator')!;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolLayout tool={tool}>
        <QRCodeGenerator />
      </ToolLayout>
    </>
  );
}
