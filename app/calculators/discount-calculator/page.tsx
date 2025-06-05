
import { DiscountCalculator } from '@/components/tools/discount-calculator';
import { ToolLayout } from '@/components/tool-layout';
import { getToolById } from '@/lib/tools-data';

export default function DiscountCalculatorPage() {
  const tool = getToolById('discount-calculator');
  
  if (!tool) {
    return <div>Tool not found</div>;
  }

  return (
    <ToolLayout tool={tool}>
      <DiscountCalculator />
    </ToolLayout>
  );
}
