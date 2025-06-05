
import { Metadata } from 'next';
import { ToolLayout } from '@/components/tool-layout';
import { CaseConverter } from '@/components/tools/case-converter';
import { getToolById } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: 'Text Case Converter - Convert Text Cases Online',
  description: 'Convert text between different cases: uppercase, lowercase, title case, camelCase, snake_case, kebab-case, and more.',
  keywords: ['case converter', 'text converter', 'uppercase', 'lowercase', 'camelcase', 'snake case', 'kebab case'],
};

export default function CaseConverterPage() {
  const tool = getToolById('case-converter')!;

  return (
    <ToolLayout tool={tool}>
      <CaseConverter />
    </ToolLayout>
  );
}
