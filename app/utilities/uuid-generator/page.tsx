
import { Metadata } from 'next';
import { ToolLayout } from '@/components/tool-layout';
import { UuidGenerator } from '@/components/tools/uuid-generator';
import { getToolById } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: 'UUID Generator - Generate Unique Identifiers',
  description: 'Generate unique identifiers (UUIDs) in various formats. Create Version 1 or Version 4 UUIDs for your applications.',
  keywords: ['uuid', 'guid', 'unique identifier', 'generator', 'random', 'development'],
};

export default function UuidGeneratorPage() {
  const tool = getToolById('uuid-generator')!;

  return (
    <ToolLayout tool={tool}>
      <UuidGenerator />
    </ToolLayout>
  );
}
