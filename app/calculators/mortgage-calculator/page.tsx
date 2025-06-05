
import { Metadata } from 'next';
import { MortgageCalculator } from '@/components/tools/mortgage-calculator';
import { ToolLayout } from '@/components/tool-layout';
import { getToolById, getToolsByCategory } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: "Mortgage Calculator",
  description: "Calculate monthly mortgage payments and view detailed amortization schedule. Plan your home loan with accurate payment breakdowns.",
};

export default function MortgageCalculatorPage() {
  const tool = getToolById('mortgage-calculator')!;
  const relatedTools = getToolsByCategory('calculators').filter(t => t.id !== tool.id).slice(0, 4);

  const faq = [
    {
      question: "How is my monthly mortgage payment calculated?",
      answer: "Your monthly payment is calculated using the loan amount, interest rate, and loan term. The formula considers the principal and interest, creating equal monthly payments over the life of the loan."
    },
    {
      question: "What is an amortization schedule?",
      answer: "An amortization schedule shows how each monthly payment is split between principal and interest over the life of the loan. Early payments have more interest, while later payments have more principal."
    },
    {
      question: "Should I include property taxes and insurance?",
      answer: "This calculator shows principal and interest only. Your actual monthly payment will also include property taxes, homeowners insurance, and possibly PMI (Private Mortgage Insurance)."
    },
    {
      question: "How does the interest rate affect my payment?",
      answer: "Higher interest rates result in higher monthly payments and more total interest paid over the life of the loan. Even small rate differences can significantly impact your total cost."
    }
  ];

  return (
    <ToolLayout tool={tool} faq={faq} relatedTools={relatedTools}>
      <MortgageCalculator />
    </ToolLayout>
  );
}
