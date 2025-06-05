
import { Metadata } from 'next';
import { ToolLayout } from '@/components/tool-layout';
import { TimestampConverter } from '@/components/tools/timestamp-converter';
import { getToolById } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: 'Timestamp Converter - Unix Timestamp to Date Converter',
  description: 'Convert between Unix timestamps and human-readable dates. Support for seconds and milliseconds timestamps.',
  keywords: ['timestamp converter', 'unix timestamp', 'epoch time', 'date converter', 'time conversion'],
};

export default function TimestampConverterPage() {
  const tool = getToolById('timestamp-converter')!;

  return (
    <ToolLayout tool={tool}>
      <TimestampConverter />
    </ToolLayout>
  );
}
