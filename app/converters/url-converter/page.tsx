
import { UrlConverter } from '@/components/tools/url-converter';
import { ToolLayout } from '@/components/tool-layout';
import { getToolById } from '@/lib/tools-data';

export default function UrlConverterPage() {
  const tool = getToolById('url-converter');
  
  if (!tool) {
    return <div>Tool not found</div>;
  }

  return (
    <ToolLayout tool={tool}>
      <UrlConverter />
    </ToolLayout>
  );
}
