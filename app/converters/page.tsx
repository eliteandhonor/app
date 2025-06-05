
import { Metadata } from 'next';
import { ArrowLeftRight } from 'lucide-react';
import { getToolsByCategory } from '@/lib/tools-data';
import { ToolCard } from '@/components/tool-card';
import { Breadcrumb } from '@/components/breadcrumb';

export const metadata: Metadata = {
  title: "Converters",
  description: "Convert between different units and formats including length, weight, currency, and color converters.",
};

export default function ConvertersPage() {
  const tools = getToolsByCategory('converters');

  const breadcrumbItems = [
    { label: 'Converters' }
  ];

  return (
    <div className="container-constrained py-8 space-y-8">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center">
            <ArrowLeftRight className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Converters</h1>
            <p className="text-lg text-muted-foreground">
              Convert between different units and formats
            </p>
          </div>
        </div>
        
        <p className="text-muted-foreground max-w-3xl">
          Our conversion tools help you quickly convert between different units of measurement, 
          currencies, and formats. Whether you need to convert length, weight, currency, or colors, 
          these tools provide accurate and instant results.
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
