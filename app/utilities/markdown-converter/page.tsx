
import { MarkdownConverter } from '@/components/tools/markdown-converter';
import { ToolLayout } from '@/components/tool-layout';
import { getToolById } from '@/lib/tools-data';

export default function MarkdownConverterPage() {
  const tool = getToolById('markdown-converter');
  
  if (!tool) {
    return <div>Tool not found</div>;
  }

  return (
    <ToolLayout tool={tool}>
      <MarkdownConverter />
    </ToolLayout>
  );
}
