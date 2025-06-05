
import { Base64Converter } from '@/components/tools/base64-converter';
import { ToolLayout } from '@/components/tool-layout';
import { getToolById } from '@/lib/tools-data';

export default function Base64ConverterPage() {
  const tool = getToolById('base64-converter');
  
  if (!tool) {
    return <div>Tool not found</div>;
  }

  return (
    <ToolLayout tool={tool}>
      <Base64Converter />
    </ToolLayout>
  );
}
