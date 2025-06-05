
import { Metadata } from 'next';
import { ToolLayout } from '@/components/tool-layout';
import { GradientGenerator } from '@/components/tools/gradient-generator';
import { getToolById } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: 'CSS Gradient Generator - Create Beautiful Gradients',
  description: 'Create beautiful CSS gradients with live preview and code export. Generate linear and radial gradients for web design.',
  keywords: ['css gradient', 'gradient generator', 'linear gradient', 'radial gradient', 'web design', 'css'],
};

export default function GradientGeneratorPage() {
  const tool = getToolById('gradient-generator')!;

  return (
    <ToolLayout tool={tool}>
      <GradientGenerator />
    </ToolLayout>
  );
}
