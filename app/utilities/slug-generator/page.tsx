
import { Metadata } from 'next';
import { ToolLayout } from '@/components/tool-layout';
import { SlugGenerator } from '@/components/tools/slug-generator';
import { getToolById } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: 'URL Slug Generator - Create SEO-Friendly URLs',
  description: 'Generate SEO-friendly URL slugs from text input. Create clean, readable URLs for better search engine optimization.',
  keywords: ['url slug', 'seo', 'generator', 'permalink', 'friendly url', 'web development'],
};

export default function SlugGeneratorPage() {
  const tool = getToolById('slug-generator')!;

  return (
    <ToolLayout tool={tool}>
      <SlugGenerator />
    </ToolLayout>
  );
}
