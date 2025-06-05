
import { Metadata } from 'next';
import { Clock } from 'lucide-react';
import { getToolsByCategory } from '@/lib/tools-data';
import { ToolCard } from '@/components/tool-card';
import { Breadcrumb } from '@/components/breadcrumb';

export const metadata: Metadata = {
  title: "Time Tools",
  description: "Timers, stopwatches, and time utilities for productivity and time management.",
};

export default function TimeToolsPage() {
  const tools = getToolsByCategory('time-tools');

  const breadcrumbItems = [
    { label: 'Time Tools' }
  ];

  return (
    <div className="container-constrained py-8 space-y-8">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg bg-purple-500 flex items-center justify-center">
            <Clock className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Time Tools</h1>
            <p className="text-lg text-muted-foreground">
              Timers, stopwatches, and time utilities
            </p>
          </div>
        </div>
        
        <p className="text-muted-foreground max-w-3xl">
          Manage your time effectively with our collection of time-based tools. 
          Perfect for productivity, workouts, cooking, and any activity that requires precise timing.
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
