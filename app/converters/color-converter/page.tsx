
import { Metadata } from 'next';
import { ColorConverter } from '@/components/tools/color-converter';
import { ToolLayout } from '@/components/tool-layout';
import { getToolById, getToolsByCategory } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: "Color Picker & Converter",
  description: "Pick colors and convert between HEX, RGB, HSL formats. Generate color palettes and get design inspiration.",
};

export default function ColorConverterPage() {
  const tool = getToolById('color-converter')!;
  const relatedTools = getToolsByCategory('converters').filter(t => t.id !== tool.id).slice(0, 4);

  const faq = [
    {
      question: "What's the difference between HEX, RGB, and HSL?",
      answer: "HEX uses hexadecimal notation (#FF0000), RGB uses red/green/blue values (0-255), and HSL uses hue/saturation/lightness which is more intuitive for color adjustments."
    },
    {
      question: "How do I choose colors that work well together?",
      answer: "Use the generated palette which includes complementary (opposite on color wheel), triadic (evenly spaced), and analogous (adjacent) colors that naturally harmonize."
    },
    {
      question: "What makes a good color contrast for accessibility?",
      answer: "For accessibility, ensure sufficient contrast between text and background. Dark text on light backgrounds or light text on dark backgrounds typically provide the best readability."
    },
    {
      question: "How do I use these color values in my designs?",
      answer: "Copy the color values and paste them into your design software, CSS, or any application that accepts color codes. HEX is most common for web design, RGB for digital graphics."
    }
  ];

  return (
    <ToolLayout tool={tool} faq={faq} relatedTools={relatedTools}>
      <ColorConverter />
    </ToolLayout>
  );
}
