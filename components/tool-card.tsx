
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tool } from '@/lib/tools-data';

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: string } = {
      'Percent': '📊',
      'Home': '🏠',
      'TrendingUp': '📈',
      'Activity': '⚡',
      'Ruler': '📏',
      'Scale': '⚖️',
      'DollarSign': '💰',
      'Palette': '🎨',
      'Timer': '⏱️',
      'Dices': '🎲',
    };
    return iconMap[iconName] || '🔧';
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <span className="text-lg">{getIconComponent(tool.icon)}</span>
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {tool.name}
              </CardTitle>
              {tool.popular && (
                <Badge variant="secondary" className="mt-1">
                  <Star className="w-3 h-3 mr-1" />
                  Popular
                </Badge>
              )}
            </div>
          </div>
        </div>
        <CardDescription className="text-sm leading-relaxed">
          {tool.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Link
          href={tool.path}
          className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors focus-visible:focus-visible"
        >
          Try it now
          <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
        </Link>
      </CardContent>
    </Card>
  );
}
