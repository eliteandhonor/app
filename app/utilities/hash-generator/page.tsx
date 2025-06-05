
import { HashGenerator } from '@/components/tools/hash-generator';
import { ToolLayout } from '@/components/tool-layout';
import { getToolById } from '@/lib/tools-data';

export default function HashGeneratorPage() {
  const tool = getToolById('hash-generator');
  
  if (!tool) {
    return <div>Tool not found</div>;
  }

  return (
    <ToolLayout tool={tool}>
      <HashGenerator />
    </ToolLayout>
  );
}
