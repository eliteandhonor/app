
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Type } from 'lucide-react';
import { toast } from 'sonner';

export function CaseConverter() {
  const [inputText, setInputText] = useState('');

  const conversions = [
    {
      name: 'UPPER CASE',
      description: 'Convert to uppercase',
      convert: (text: string) => text.toUpperCase(),
      example: 'HELLO WORLD'
    },
    {
      name: 'lower case',
      description: 'Convert to lowercase',
      convert: (text: string) => text.toLowerCase(),
      example: 'hello world'
    },
    {
      name: 'Title Case',
      description: 'Capitalize first letter of each word',
      convert: (text: string) => text.replace(/\w\S*/g, (txt) => 
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      ),
      example: 'Hello World'
    },
    {
      name: 'Sentence case',
      description: 'Capitalize first letter of each sentence',
      convert: (text: string) => text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()),
      example: 'Hello world. This is a sentence.'
    },
    {
      name: 'camelCase',
      description: 'Convert to camelCase',
      convert: (text: string) => {
        return text
          .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
          })
          .replace(/\s+/g, '');
      },
      example: 'helloWorld'
    },
    {
      name: 'PascalCase',
      description: 'Convert to PascalCase',
      convert: (text: string) => {
        return text
          .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
          .replace(/\s+/g, '');
      },
      example: 'HelloWorld'
    },
    {
      name: 'snake_case',
      description: 'Convert to snake_case',
      convert: (text: string) => {
        return text
          .replace(/\W+/g, ' ')
          .split(/ |\B(?=[A-Z])/)
          .map(word => word.toLowerCase())
          .join('_');
      },
      example: 'hello_world'
    },
    {
      name: 'kebab-case',
      description: 'Convert to kebab-case',
      convert: (text: string) => {
        return text
          .replace(/\W+/g, ' ')
          .split(/ |\B(?=[A-Z])/)
          .map(word => word.toLowerCase())
          .join('-');
      },
      example: 'hello-world'
    },
    {
      name: 'CONSTANT_CASE',
      description: 'Convert to CONSTANT_CASE',
      convert: (text: string) => {
        return text
          .replace(/\W+/g, ' ')
          .split(/ |\B(?=[A-Z])/)
          .map(word => word.toUpperCase())
          .join('_');
      },
      example: 'HELLO_WORLD'
    },
    {
      name: 'dot.case',
      description: 'Convert to dot.case',
      convert: (text: string) => {
        return text
          .replace(/\W+/g, ' ')
          .split(/ |\B(?=[A-Z])/)
          .map(word => word.toLowerCase())
          .join('.');
      },
      example: 'hello.world'
    },
    {
      name: 'path/case',
      description: 'Convert to path/case',
      convert: (text: string) => {
        return text
          .replace(/\W+/g, ' ')
          .split(/ |\B(?=[A-Z])/)
          .map(word => word.toLowerCase())
          .join('/');
      },
      example: 'hello/world'
    },
    {
      name: 'aLtErNaTiNg CaSe',
      description: 'Convert to alternating case',
      convert: (text: string) => {
        return text
          .split('')
          .map((char, index) => 
            index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
          )
          .join('');
      },
      example: 'hElLo WoRlD'
    }
  ];

  const copyText = async (text: string, caseName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${caseName} copied to clipboard!`);
    } catch (err) {
      toast.error('Failed to copy text');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Text Case Converter</CardTitle>
          <CardDescription>
            Convert text between different cases: upper, lower, title, camel, snake, and more
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="input" className="text-sm font-medium">
              Enter your text
            </label>
            <Textarea
              id="input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type or paste your text here..."
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>

      {inputText && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {conversions.map((conversion, index) => {
            const convertedText = conversion.convert(inputText);
            return (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{conversion.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {conversion.description}
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyText(convertedText, conversion.name)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="font-mono text-sm break-all">
                      {convertedText || 'No output'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {!inputText && (
        <Card>
          <CardHeader>
            <CardTitle>Examples</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {conversions.map((conversion, index) => (
                <div key={index} className="space-y-2">
                  <div className="font-medium text-sm">{conversion.name}</div>
                  <div className="p-2 bg-muted rounded text-sm font-mono">
                    {conversion.example}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
