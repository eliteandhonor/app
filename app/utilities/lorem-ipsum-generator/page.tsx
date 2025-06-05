
import { Metadata } from 'next';
import { ToolLayout } from '@/components/tool-layout';
import { LoremIpsumGenerator } from '@/components/tools/lorem-ipsum-generator';
import { getToolById } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: 'Lorem Ipsum Generator - Generate Placeholder Text',
  description: 'Generate Lorem Ipsum placeholder text for design and development projects. Create words, sentences, or paragraphs of dummy text.',
  keywords: ['lorem ipsum', 'placeholder text', 'dummy text', 'generator', 'design', 'development'],
};

export default function LoremIpsumGeneratorPage() {
  const tool = getToolById('lorem-ipsum-generator')!;

  return (
    <ToolLayout tool={tool}>
      <LoremIpsumGenerator />
    </ToolLayout>
  );
}
