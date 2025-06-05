
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Copy, Link2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export function SlugGenerator() {
  const [inputText, setInputText] = useState('');
  const [options, setOptions] = useState({
    lowercase: true,
    removeSpecialChars: true,
    removeNumbers: false,
    maxLength: 0
  });
  const [slug, setSlug] = useState('');

  const generateSlug = (text: string = inputText) => {
    let result = text;

    // Remove HTML tags
    result = result.replace(/<[^>]*>/g, '');

    // Convert to lowercase
    if (options.lowercase) {
      result = result.toLowerCase();
    }

    // Remove special characters and replace with spaces
    if (options.removeSpecialChars) {
      result = result.replace(/[^\w\s-]/g, ' ');
    }

    // Remove numbers
    if (options.removeNumbers) {
      result = result.replace(/\d/g, '');
    }

    // Replace multiple spaces with single space
    result = result.replace(/\s+/g, ' ');

    // Trim spaces
    result = result.trim();

    // Replace spaces with hyphens
    result = result.replace(/\s/g, '-');

    // Remove multiple consecutive hyphens
    result = result.replace(/-+/g, '-');

    // Remove leading and trailing hyphens
    result = result.replace(/^-+|-+$/g, '');

    // Apply max length
    if (options.maxLength > 0) {
      result = result.substring(0, options.maxLength);
      // Remove trailing hyphen if cut off
      result = result.replace(/-+$/, '');
    }

    setSlug(result);
    return result;
  };

  const handleInputChange = (text: string) => {
    setInputText(text);
    if (text.trim()) {
      generateSlug(text);
    } else {
      setSlug('');
    }
  };

  const handleOptionChange = (option: keyof typeof options, value: boolean | number) => {
    const newOptions = { ...options, [option]: value };
    setOptions(newOptions);
    if (inputText.trim()) {
      generateSlug();
    }
  };

  const copySlug = async () => {
    try {
      await navigator.clipboard.writeText(slug);
      toast.success('Slug copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy slug');
    }
  };

  const examples = [
    { input: 'How to Create SEO-Friendly URLs', output: 'how-to-create-seo-friendly-urls' },
    { input: 'Best Practices for Web Development', output: 'best-practices-for-web-development' },
    { input: 'JavaScript Tips & Tricks (2024)', output: 'javascript-tips-tricks-2024' },
    { input: 'The Ultimate Guide to React.js', output: 'the-ultimate-guide-to-react-js' }
  ];

  const useExample = (example: typeof examples[0]) => {
    setInputText(example.input);
    generateSlug(example.input);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>URL Slug Generator</CardTitle>
          <CardDescription>
            Generate SEO-friendly URL slugs from text input
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="input">Input Text</Label>
            <Textarea
              id="input"
              value={inputText}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Enter your title or text here..."
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-4">
            <Label>Options</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lowercase"
                  checked={options.lowercase}
                  onCheckedChange={(checked) => handleOptionChange('lowercase', !!checked)}
                />
                <Label htmlFor="lowercase" className="text-sm">Convert to lowercase</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="removeSpecialChars"
                  checked={options.removeSpecialChars}
                  onCheckedChange={(checked) => handleOptionChange('removeSpecialChars', !!checked)}
                />
                <Label htmlFor="removeSpecialChars" className="text-sm">Remove special characters</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="removeNumbers"
                  checked={options.removeNumbers}
                  onCheckedChange={(checked) => handleOptionChange('removeNumbers', !!checked)}
                />
                <Label htmlFor="removeNumbers" className="text-sm">Remove numbers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="maxLength" className="text-sm">Max length:</Label>
                <Input
                  id="maxLength"
                  type="number"
                  value={options.maxLength || ''}
                  onChange={(e) => handleOptionChange('maxLength', parseInt(e.target.value) || 0)}
                  placeholder="0 = no limit"
                  className="w-32"
                />
              </div>
            </div>
          </div>

          <Button onClick={() => generateSlug()} className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate Slug
          </Button>
        </CardContent>
      </Card>

      {slug && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Generated Slug</CardTitle>
              <Button variant="outline" onClick={copySlug}>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-muted rounded-lg">
              <p className="font-mono text-lg break-all">{slug}</p>
            </div>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>Preview URL:</strong> https://example.com/{slug}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {examples.map((example, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="text-sm">
                      <strong>Input:</strong> {example.input}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <strong>Output:</strong> <code className="bg-muted px-1 rounded">{example.output}</code>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => useExample(example)}
                  >
                    <Link2 className="w-4 h-4 mr-2" />
                    Use
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SEO Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Keep slugs short and descriptive (under 60 characters)</p>
          <p>• Use hyphens to separate words, not underscores</p>
          <p>• Include target keywords when relevant</p>
          <p>• Avoid stop words (a, an, the, and, or, but, etc.) when possible</p>
          <p>• Make slugs readable and meaningful to users</p>
        </CardContent>
      </Card>
    </div>
  );
}
