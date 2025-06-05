
import { Metadata } from 'next';
import { WeightConverter } from '@/components/tools/weight-converter';
import { ToolLayout } from '@/components/tool-layout';
import { getToolById, getToolsByCategory } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: "Weight Converter",
  description: "Convert between different weight units including kilograms, pounds, ounces, grams, and stones. Accurate weight and mass conversions.",
};

export default function WeightConverterPage() {
  const tool = getToolById('weight-converter')!;
  const relatedTools = getToolsByCategory('converters').filter(t => t.id !== tool.id).slice(0, 4);

  const faq = [
    {
      question: "What's the difference between weight and mass?",
      answer: "Mass is the amount of matter in an object and doesn't change with location. Weight is the force of gravity on that mass and can vary with location. In everyday use, the terms are often used interchangeably."
    },
    {
      question: "How do I convert pounds to kilograms?",
      answer: "To convert pounds to kilograms, divide the weight in pounds by 2.205. For example, 150 pounds ÷ 2.205 = 68.04 kilograms. Alternatively, multiply by 0.453592."
    },
    {
      question: "What is a stone in weight measurement?",
      answer: "A stone is a unit of weight used primarily in the UK and Ireland. One stone equals 14 pounds or approximately 6.35 kilograms. It's commonly used for measuring body weight."
    },
    {
      question: "How accurate are the weight conversions?",
      answer: "Our weight converter uses precise conversion factors and provides results accurate to 6 decimal places, which is more than sufficient for most practical applications."
    }
  ];

  return (
    <ToolLayout tool={tool} faq={faq} relatedTools={relatedTools}>
      <WeightConverter />
    </ToolLayout>
  );
}
