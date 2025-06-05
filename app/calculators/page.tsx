
import { Metadata } from 'next';
import { Calculator } from 'lucide-react';
import { getToolsByCategory, getCategoryById } from '@/lib/tools-data';
import { ToolCard } from '@/components/tool-card';
import { Breadcrumb } from '@/components/breadcrumb';

export const metadata: Metadata = {
  title: "Calculators",
  description: "Essential calculation tools for everyday math including percentage, mortgage, compound interest, and BMI calculators.",
};

export default function CalculatorsPage() {
  const category = getCategoryById('calculators');
  const tools = getToolsByCategory('calculators');

  const breadcrumbItems = [
    { label: 'Calculators' }
  ];

  return (
    <div className="container-constrained py-8 space-y-8">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
            <Calculator className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Calculators</h1>
            <p className="text-lg text-muted-foreground">
              Essential calculation tools for everyday math
            </p>
          </div>
        </div>
        
        <p className="text-muted-foreground max-w-3xl">
          Our collection of calculators helps you solve common mathematical problems quickly and accurately. 
          From basic percentage calculations to complex mortgage and investment calculations, these tools are 
          designed to save you time and provide reliable results.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
}
