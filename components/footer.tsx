
import Link from 'next/link';
import { Calculator, Github, Heart } from 'lucide-react';
import { categories, tools } from '@/lib/tools-data';

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container-constrained py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Calculator className="h-5 w-5 text-primary" />
              <span className="font-bold">Mini Apps</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Fast, mobile-first collection of essential tools for everyday productivity.
            </p>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-3 w-3 text-red-500 fill-current" />
              <span>for productivity</span>
            </div>
          </div>

          {/* Categories */}
          {categories.map((category) => (
            <div key={category.id} className="space-y-4">
              <h3 className="font-semibold">{category.name}</h3>
              <ul className="space-y-2">
                {tools
                  .filter(tool => tool.category === category.id)
                  .map((tool) => (
                    <li key={tool.id}>
                      <Link
                        href={tool.path}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:focus-visible"
                      >
                        {tool.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2025 Mini Apps. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <Link
              href="/contact"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:focus-visible"
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:focus-visible"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:focus-visible"
            >
              Terms of Service
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors focus-visible:focus-visible"
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
