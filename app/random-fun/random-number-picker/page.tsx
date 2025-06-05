
import { Metadata } from 'next';
import { RandomNumberPicker } from '@/components/tools/random-number-picker';
import { ToolLayout } from '@/components/tool-layout';
import { getToolById, getToolsByCategory } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: "Random Number & Name Picker",
  description: "Generate random numbers and pick random names from lists. Perfect for games, decision making, and random selections.",
};

export default function RandomNumberPickerPage() {
  const tool = getToolById('random-number-picker')!;
  const relatedTools = getToolsByCategory('random-fun').filter(t => t.id !== tool.id).slice(0, 4);

  const faq = [
    {
      question: "How random are the generated numbers?",
      answer: "The numbers are generated using JavaScript's Math.random() function, which produces pseudo-random numbers suitable for most applications. For cryptographic purposes, use a dedicated cryptographic random number generator."
    },
    {
      question: "Can I generate unique numbers only?",
      answer: "Yes! When the quantity is less than or equal to the range of possible numbers, the generator ensures all numbers are unique. If you request more numbers than the range allows, duplicates may occur."
    },
    {
      question: "What's the maximum number of items I can add to the picker?",
      answer: "There's no strict limit, but for best performance, we recommend keeping your list under 1000 items. The picker works efficiently with any reasonable number of items."
    },
    {
      question: "Can I save my custom lists?",
      answer: "Currently, custom lists are stored in your browser session. To save lists permanently, copy your items to a text file. We may add list saving features in future updates."
    }
  ];

  return (
    <ToolLayout tool={tool} faq={faq} relatedTools={relatedTools}>
      <RandomNumberPicker />
    </ToolLayout>
  );
}
