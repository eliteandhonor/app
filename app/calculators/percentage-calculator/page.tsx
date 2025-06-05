
import { Metadata } from 'next';
import { PercentageCalculator } from '@/components/tools/percentage-calculator';
import { ToolLayout } from '@/components/tool-layout';
import { getToolById, getToolsByCategory } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: "Percentage Calculator",
  description: "Calculate percentages, percentage increase/decrease, and find what percent one number is of another. Fast and accurate percentage calculations.",
};

export default function PercentageCalculatorPage() {
  const tool = getToolById('percentage-calculator')!;
  const relatedTools = getToolsByCategory('calculators').filter(t => t.id !== tool.id).slice(0, 4);

  const faq = [
    {
      question: "How do I calculate what percentage one number is of another?",
      answer: "To find what percentage A is of B, divide A by B and multiply by 100. For example, to find what percentage 25 is of 100: (25 ÷ 100) × 100 = 25%."
    },
    {
      question: "How do I calculate percentage increase?",
      answer: "To calculate percentage increase, subtract the original value from the new value, divide by the original value, and multiply by 100. Formula: ((New Value - Original Value) ÷ Original Value) × 100."
    },
    {
      question: "What's the difference between percentage and percentage points?",
      answer: "Percentage refers to a proportion out of 100, while percentage points refer to the arithmetic difference between two percentages. For example, if something increases from 20% to 25%, that's a 5 percentage point increase, but a 25% relative increase."
    },
    {
      question: "How do I calculate a percentage of a number?",
      answer: "To calculate a percentage of a number, multiply the number by the percentage and divide by 100. For example, 20% of 150 = (150 × 20) ÷ 100 = 30."
    }
  ];

  return (
    <ToolLayout tool={tool} faq={faq} relatedTools={relatedTools}>
      <PercentageCalculator />
    </ToolLayout>
  );
}
