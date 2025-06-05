
import { UnitPriceCalculator } from '@/components/tools/unit-price-calculator';
import { ToolLayout } from '@/components/tool-layout';
import { getToolById } from '@/lib/tools-data';

export default function UnitPriceCalculatorPage() {
  const tool = getToolById('unit-price-calculator');
  
  if (!tool) {
    return <div>Tool not found</div>;
  }

  return (
    <ToolLayout tool={tool}>
      <UnitPriceCalculator />
    </ToolLayout>
  );
}
