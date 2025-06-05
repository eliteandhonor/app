
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Star, Zap, Shield, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { categories, getPopularTools, tools } from '@/lib/tools-data';
import { ToolCard } from '@/components/tool-card';
import { SearchHero } from '@/components/search-hero';

export const metadata: Metadata = {
  title: "Mini Apps - Tiny Tools, Mighty Utility",
  description: "Fast, mobile-first collection of essential calculators, converters, timers, and utilities. Pure functionality for everyday tasks.",
};

export default function HomePage() {
  const popularTools = getPopularTools();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
        <div className="container-constrained">
          <div className="mx-auto max-w-4xl text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                Tiny Tools,{' '}
                <span className="text-primary">Mighty</span>{' '}
                Utility
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
                Fast, mobile-first collection of essential calculators, converters, and utilities. 
                Pure functionality for everyday tasks.
              </p>
            </div>

            <SearchHero />

            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <span>Lightning Fast</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-primary" />
                <span>Mobile First</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span>Privacy Focused</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tools Section */}
      <section className="py-16 lg:py-24">
        <div className="container-constrained">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                <h2 className="text-3xl font-bold">Popular Tools</h2>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Most used utilities by our community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container-constrained">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">Explore Categories</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover tools organized by functionality
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => {
                const categoryTools = tools.filter(tool => tool.category === category.id);
                return (
                  <Card key={category.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader className="text-center">
                      <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                        <div className="text-white text-xl">
                          {category.icon === 'Calculator' && '🧮'}
                          {category.icon === 'ArrowLeftRight' && '🔄'}
                          {category.icon === 'Clock' && '⏰'}
                          {category.icon === 'Shuffle' && '🎲'}
                        </div>
                      </div>
                      <CardTitle className="text-xl">{category.name}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="text-sm text-muted-foreground">
                          {categoryTools.length} tools available
                        </div>
                        <Button asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <Link href={category.path}>
                            Explore {category.name}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24">
        <div className="container-constrained">
          <div className="mx-auto max-w-4xl text-center space-y-8">
            <h2 className="text-3xl font-bold">Why Choose Mini Apps?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  Optimized for speed with instant calculations and minimal loading times.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto">
                  <Smartphone className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Mobile First</h3>
                <p className="text-muted-foreground">
                  Designed for mobile devices with responsive layouts that work everywhere.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mx-auto">
                  <Shield className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold">Privacy Focused</h3>
                <p className="text-muted-foreground">
                  Your privacy is our priority. Simple tools, no complications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
