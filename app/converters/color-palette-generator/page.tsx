
import { Metadata } from 'next';
import { ToolLayout } from '@/components/tool-layout';
import { ColorPaletteGenerator } from '@/components/tools/color-palette-generator';
import { getToolById } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: 'Color Palette Generator - Create Beautiful Color Schemes',
  description: 'Generate beautiful color palettes and schemes for design projects. Create complementary, triadic, analogous, and monochromatic color schemes.',
  keywords: ['color palette', 'color scheme', 'generator', 'design', 'complementary', 'triadic', 'analogous'],
};

export default function ColorPaletteGeneratorPage() {
  const tool = getToolById('color-palette-generator')!;

  return (
    <ToolLayout tool={tool}>
      <ColorPaletteGenerator />
    </ToolLayout>
  );
}
