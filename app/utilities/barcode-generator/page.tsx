
import { BarcodeGenerator } from '@/components/tools/barcode-generator';
import { ToolLayout } from '@/components/tool-layout';
import { getToolById } from '@/lib/tools-data';

export default function BarcodeGeneratorPage() {
  const tool = getToolById('barcode-generator');
  
  if (!tool) {
    return <div>Tool not found</div>;
  }

  return (
    <ToolLayout tool={tool}>
      <BarcodeGenerator />
    </ToolLayout>
  );
}
