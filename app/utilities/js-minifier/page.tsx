
import { Metadata } from 'next';
import { ToolLayout } from '@/components/tool-layout';
import { JsMinifier } from '@/components/tools/js-minifier';
import { getToolById } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: 'JavaScript Minifier & Beautifier - Optimize JS Code',
  description: 'Minify or beautify JavaScript code for optimization and readability. Compress JS files and format code with proper indentation.',
  keywords: ['javascript minifier', 'js beautifier', 'js optimizer', 'compress javascript', 'format js'],
};

export default function JsMinifierPage() {
  const tool = getToolById('js-minifier')!;

  return (
    <ToolLayout tool={tool}>
      <JsMinifier />
    </ToolLayout>
  );
}
