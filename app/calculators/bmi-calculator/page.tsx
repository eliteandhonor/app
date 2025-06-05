
import { Metadata } from 'next';
import { BMICalculator } from '@/components/tools/bmi-calculator';
import { ToolLayout } from '@/components/tool-layout';
import { getToolById, getToolsByCategory } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: "BMI Calculator",
  description: "Calculate your Body Mass Index (BMI) and understand your health category. Supports both imperial and metric units.",
};

export default function BMICalculatorPage() {
  const tool = getToolById('bmi-calculator')!;
  const relatedTools = getToolsByCategory('calculators').filter(t => t.id !== tool.id).slice(0, 4);

  const faq = [
    {
      question: "What is BMI and how is it calculated?",
      answer: "BMI (Body Mass Index) is a measure of body fat based on height and weight. It's calculated by dividing weight in kilograms by height in meters squared (kg/m²)."
    },
    {
      question: "Is BMI accurate for everyone?",
      answer: "BMI is a useful screening tool but has limitations. It doesn't distinguish between muscle and fat mass, so athletes or very muscular individuals may have high BMIs despite being healthy."
    },
    {
      question: "What BMI range is considered healthy?",
      answer: "A BMI between 18.5 and 24.9 is generally considered normal or healthy weight. However, optimal BMI can vary based on age, ethnicity, and individual factors."
    },
    {
      question: "Should I be concerned if my BMI is outside the normal range?",
      answer: "BMI outside the normal range may indicate health risks, but it's just one factor. Consult with a healthcare professional who can assess your overall health, body composition, and other risk factors."
    }
  ];

  return (
    <ToolLayout tool={tool} faq={faq} relatedTools={relatedTools}>
      <BMICalculator />
    </ToolLayout>
  );
}
