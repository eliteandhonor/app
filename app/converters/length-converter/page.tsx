
import { Metadata } from 'next';
import { LengthConverter } from '@/components/tools/length-converter';
import { ToolLayout } from '@/components/tool-layout';
import { getToolById, getToolsByCategory } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: "Length Converter",
  description: "Convert between different length units including meters, feet, inches, centimeters, kilometers, and miles. Instant and accurate conversions.",
};

export default function LengthConverterPage() {
  const tool = getToolById('length-converter')!;
  const relatedTools = getToolsByCategory('converters').filter(t => t.id !== tool.id).slice(0, 4);

  const faq = [
    {
      question: "How accurate are the length conversions?",
      answer: "Our length converter uses precise conversion factors defined by international standards. Results are accurate to 6 decimal places for most practical applications."
    },
    {
      question: "What's the difference between metric and imperial units?",
      answer: "Metric units (meters, centimeters, kilometers) are based on powers of 10 and used worldwide. Imperial units (feet, inches, miles) are primarily used in the United States and a few other countries."
    },
    {
      question: "How do I convert feet and inches to centimeters?",
      answer: "First convert feet to inches (multiply by 12), add any additional inches, then multiply the total inches by 2.54 to get centimeters. For example: 5'6\" = (5×12 + 6) × 2.54 = 167.64 cm."
    },
    {
      question: "What are the most common length conversions?",
      answer: "Common conversions include: 1 inch = 2.54 cm, 1 foot = 30.48 cm, 1 meter = 3.28 feet, 1 kilometer = 0.62 miles, and 1 mile = 1.61 kilometers."
    }
  ];

  return (
    <ToolLayout tool={tool} faq={faq} relatedTools={relatedTools}>
      <LengthConverter />
    </ToolLayout>
  );
}
