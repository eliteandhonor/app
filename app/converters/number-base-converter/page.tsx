
import { NumberBaseConverter } from '@/components/tools/number-base-converter';
import { ToolLayout } from '@/components/tool-layout';
import { getToolById } from '@/lib/tools-data';

export default function NumberBaseConverterPage() {
  const tool = getToolById('number-base-converter');
  
  if (!tool) {
    return <div>Tool not found</div>;
  }

  return (
    <ToolLayout tool={tool}>
      <NumberBaseConverter />
    </ToolLayout>
  );
}
