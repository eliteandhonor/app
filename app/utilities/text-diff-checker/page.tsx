
import { Metadata } from 'next';
import { ToolLayout } from '@/components/tool-layout';
import { TextDiffChecker } from '@/components/tools/text-diff-checker';
import { getToolById } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: 'Text Diff Checker - Compare Text Differences',
  description: 'Compare two texts and highlight differences line by line. Visual diff tool for text comparison and change detection.',
  keywords: ['text diff', 'compare text', 'text comparison', 'diff checker', 'text differences', 'merge tool'],
};

export default function TextDiffCheckerPage() {
  const tool = getToolById('text-diff-checker')!;

  return (
    <ToolLayout tool={tool}>
      <TextDiffChecker />
    </ToolLayout>
  );
}
