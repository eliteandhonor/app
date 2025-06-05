
import { ReactNode } from 'react';
import { Breadcrumb } from '@/components/breadcrumb';
import { ToolCard } from '@/components/tool-card';
import { Tool } from '@/lib/tools-data';

interface CategoryLayoutProps {
  title: string;
  description: string;
  tools: Tool[];
  breadcrumbs: Array<{ label: string; href?: string }>;
}

export function CategoryLayout({ title, description, tools, breadcrumbs }: CategoryLayoutProps) {
  return (
    <div className="container-constrained py-8 space-y-8">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbs} />

      {/* Category Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
}
