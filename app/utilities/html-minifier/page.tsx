
import { Metadata } from 'next';
import { ToolLayout } from '@/components/tool-layout';
import { HtmlMinifier } from '@/components/tools/html-minifier';
import { getToolById } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: 'HTML Minifier & Beautifier - Optimize HTML Code',
  description: 'Minify or beautify HTML code for optimization and readability. Compress HTML files and format markup with proper indentation.',
  keywords: ['html minifier', 'html beautifier', 'html optimizer', 'compress html', 'format html'],
};

export default function HtmlMinifierPage() {
  const tool = getToolById('html-minifier')!;

  return (
    <ToolLayout tool={tool}>
      <HtmlMinifier />
    </ToolLayout>
  );
}
