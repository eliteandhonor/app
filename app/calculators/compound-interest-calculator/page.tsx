
import { Metadata } from 'next';
import { CompoundInterestCalculator } from '@/components/tools/compound-interest-calculator';
import { ToolLayout } from '@/components/tool-layout';
import { getToolById, getToolsByCategory } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: "Compound Interest Calculator",
  description: "Calculate compound interest growth with interactive charts. Plan your investments and see how your money grows over time.",
};

export default function CompoundInterestCalculatorPage() {
  const tool = getToolById('compound-interest-calculator')!;
  const relatedTools = getToolsByCategory('calculators').filter(t => t.id !== tool.id).slice(0, 4);

  const faq = [
    {
      question: "What is compound interest?",
      answer: "Compound interest is interest calculated on the initial principal and also on the accumulated interest from previous periods. It's essentially 'interest on interest' and can significantly accelerate wealth building over time."
    },
    {
      question: "How often should interest be compounded?",
      answer: "More frequent compounding generally results in higher returns. Daily compounding typically yields the best results, followed by monthly, quarterly, semi-annually, and annually."
    },
    {
      question: "What's the difference between simple and compound interest?",
      answer: "Simple interest is calculated only on the principal amount, while compound interest is calculated on both the principal and accumulated interest. Compound interest grows exponentially over time."
    },
    {
      question: "How do regular contributions affect compound growth?",
      answer: "Regular contributions significantly boost compound growth by adding more principal that can earn interest. The earlier and more consistently you contribute, the greater the compounding effect."
    }
  ];

  return (
    <ToolLayout tool={tool} faq={faq} relatedTools={relatedTools}>
      <CompoundInterestCalculator />
    </ToolLayout>
  );
}
