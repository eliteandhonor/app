
import { Metadata } from 'next';
import { Shuffle } from 'lucide-react';
import { getToolsByCategory } from '@/lib/tools-data';
import { ToolCard } from '@/components/tool-card';
import { Breadcrumb } from '@/components/breadcrumb';

export const metadata: Metadata = {
  title: "Random & Fun",
  description: "Random generators and fun utilities for entertainment and decision making.",
};

export default function RandomFunPage() {
  const tools = getToolsByCategory('random-fun');

  const breadcrumbItems = [
    { label: 'Random & Fun' }
  ];

  return (
    <div className="container-constrained py-8 space-y-8">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg bg-orange-500 flex items-center justify-center">
            <Shuffle className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Random & Fun</h1>
            <p className="text-lg text-muted-foreground">
              Random generators and fun utilities
            </p>
          </div>
        </div>
        
        <p className="text-muted-foreground max-w-3xl">
          Add some randomness to your life with our collection of random generators and fun tools. 
          Perfect for making decisions, games, and entertainment.
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
