
import { FuelCostCalculator } from '@/components/tools/fuel-cost-calculator';
import { ToolLayout } from '@/components/tool-layout';
import { getToolById } from '@/lib/tools-data';

export default function FuelCostCalculatorPage() {
  const tool = getToolById('fuel-cost-calculator');
  
  if (!tool) {
    return <div>Tool not found</div>;
  }

  return (
    <ToolLayout tool={tool}>
      <FuelCostCalculator />
    </ToolLayout>
  );
}
