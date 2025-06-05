
import { SalesTaxCalculator } from '@/components/tools/sales-tax-calculator';
import { ToolLayout } from '@/components/tool-layout';
import { getToolById } from '@/lib/tools-data';

export default function SalesTaxCalculatorPage() {
  const tool = getToolById('sales-tax-calculator');
  
  if (!tool) {
    return <div>Tool not found</div>;
  }

  return (
    <ToolLayout tool={tool}>
      <SalesTaxCalculator />
    </ToolLayout>
  );
}
