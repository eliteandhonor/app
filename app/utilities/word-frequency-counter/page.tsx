
import { Metadata } from 'next';
import { ToolLayout } from '@/components/tool-layout';
import { WordFrequencyCounter } from '@/components/tools/word-frequency-counter';
import { getToolById } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: 'Word Frequency Counter - Analyze Text Statistics',
  description: 'Analyze text and count word frequency with detailed statistics. Text analysis tool for content optimization and research.',
  keywords: ['word frequency', 'text analysis', 'word count', 'text statistics', 'content analysis'],
};

export default function WordFrequencyCounterPage() {
  const tool = getToolById('word-frequency-counter')!;

  return (
    <ToolLayout tool={tool}>
      <WordFrequencyCounter />
    </ToolLayout>
  );
}
