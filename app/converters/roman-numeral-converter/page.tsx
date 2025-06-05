
import { RomanNumeralConverter } from '@/components/tools/roman-numeral-converter';
import { ToolLayout } from '@/components/tool-layout';
import { getToolById } from '@/lib/tools-data';

export default function RomanNumeralConverterPage() {
  const tool = getToolById('roman-numeral-converter');
  
  if (!tool) {
    return <div>Tool not found</div>;
  }

  return (
    <ToolLayout tool={tool}>
      <RomanNumeralConverter />
    </ToolLayout>
  );
}
