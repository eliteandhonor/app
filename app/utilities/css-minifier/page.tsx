
import { Metadata } from 'next';
import { ToolLayout } from '@/components/tool-layout';
import { CssMinifier } from '@/components/tools/css-minifier';
import { getToolById } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: 'CSS Minifier & Beautifier - Optimize CSS Code',
  description: 'Minify or beautify CSS code for optimization and readability. Compress CSS files and format code with proper indentation.',
  keywords: ['css minifier', 'css beautifier', 'css optimizer', 'compress css', 'format css'],
};

export default function CssMinifierPage() {
  const tool = getToolById('css-minifier')!;

  return (
    <ToolLayout tool={tool}>
      <CssMinifier />
    </ToolLayout>
  );
}
