
import { Metadata } from 'next';
import { ToolLayout } from '@/components/tool-layout';
import { RegexTester } from '@/components/tools/regex-tester';
import { getToolById } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: 'Regex Tester - Test Regular Expressions Online',
  description: 'Test and validate regular expressions with real-time matching. Debug regex patterns with live preview and common examples.',
  keywords: ['regex', 'regular expression', 'pattern', 'test', 'match', 'validation', 'debugging'],
};

export default function RegexTesterPage() {
  const tool = getToolById('regex-tester')!;

  return (
    <ToolLayout tool={tool}>
      <RegexTester />
    </ToolLayout>
  );
}
