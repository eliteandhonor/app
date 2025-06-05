
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { searchTools, Tool } from '@/lib/tools-data';

export function SearchHero() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Tool[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.trim()) {
      const searchResults = searchTools(searchQuery);
      setResults(searchResults);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleToolSelect = (tool: Tool) => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    router.push(tool.path);
  };

  return (
    <div className="relative mx-auto max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search calculators, converters..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-4 py-3 text-base focus-visible:focus-visible"
          onFocus={() => query && setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        />
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {results.map((tool) => (
            <button
              key={tool.id}
              onClick={() => handleToolSelect(tool)}
              className="w-full text-left p-3 hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg focus-visible:focus-visible"
            >
              <div className="font-medium">{tool.name}</div>
              <div className="text-sm text-muted-foreground truncate">{tool.description}</div>
            </button>
          ))}
        </div>
      )}

      {isOpen && query && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-lg shadow-lg z-50 p-4 text-center text-muted-foreground">
          No tools found for "{query}"
        </div>
      )}
    </div>
  );
}
