
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Braces, Copy, Check, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function JsonFormatter() {
  const [inputJson, setInputJson] = useState('');
  const [formattedJson, setFormattedJson] = useState('');
  const [minifiedJson, setMinifiedJson] = useState('');
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    error?: string;
    stats?: {
      characters: number;
      lines: number;
      objects: number;
      arrays: number;
      properties: number;
    };
  } | null>(null);
  const [indentSize, setIndentSize] = useState('2');
  const [copied, setCopied] = useState<string | null>(null);

  const validateAndFormat = () => {
    if (!inputJson.trim()) {
      setFormattedJson('');
      setMinifiedJson('');
      setValidationResult(null);
      return;
    }

    try {
      const parsed = JSON.parse(inputJson);
      const indent = parseInt(indentSize);
      
      // Format with specified indentation
      const formatted = JSON.stringify(parsed, null, indent);
      setFormattedJson(formatted);
      
      // Minify
      const minified = JSON.stringify(parsed);
      setMinifiedJson(minified);

      // Calculate statistics
      const stats = calculateStats(parsed, formatted);
      
      setValidationResult({
        isValid: true,
        stats
      });
    } catch (error) {
      setFormattedJson('');
      setMinifiedJson('');
      setValidationResult({
        isValid: false,
        error: error instanceof Error ? error.message : 'Invalid JSON'
      });
    }
  };

  const calculateStats = (parsed: any, formatted: string) => {
    const characters = formatted.length;
    const lines = formatted.split('\n').length;
    
    let objects = 0;
    let arrays = 0;
    let properties = 0;

    const countElements = (obj: any) => {
      if (Array.isArray(obj)) {
        arrays++;
        obj.forEach(countElements);
      } else if (obj !== null && typeof obj === 'object') {
        objects++;
        properties += Object.keys(obj).length;
        Object.values(obj).forEach(countElements);
      }
    };

    countElements(parsed);

    return { characters, lines, objects, arrays, properties };
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const clearAll = () => {
    setInputJson('');
    setFormattedJson('');
    setMinifiedJson('');
    setValidationResult(null);
  };

  const examples = [
    {
      name: 'Simple Object',
      json: '{"name":"John","age":30,"city":"New York"}'
    },
    {
      name: 'Nested Object',
      json: '{"user":{"name":"John","details":{"age":30,"email":"john@example.com"}},"active":true}'
    },
    {
      name: 'Array of Objects',
      json: '[{"id":1,"name":"John"},{"id":2,"name":"Jane"},{"id":3,"name":"Bob"}]'
    },
    {
      name: 'Complex Structure',
      json: '{"users":[{"id":1,"name":"John","roles":["admin","user"],"settings":{"theme":"dark","notifications":true}}],"meta":{"total":1,"page":1}}'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Braces className="h-5 w-5 text-primary" />
            JSON Formatter/Validator
          </CardTitle>
          <CardDescription>
            Format, validate, and beautify JSON data with syntax highlighting
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="input-json">Input JSON</Label>
              <Textarea
                id="input-json"
                placeholder="Paste your JSON here..."
                value={inputJson}
                onChange={(e) => setInputJson(e.target.value)}
                rows={8}
                className="font-mono text-sm"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="indent-size">Indent Size:</Label>
                <Select value={indentSize} onValueChange={setIndentSize}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="8">8</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={validateAndFormat} className="flex-1">
                <Braces className="h-4 w-4 mr-2" />
                Format & Validate
              </Button>
              
              <Button onClick={clearAll} variant="outline">
                Clear All
              </Button>
            </div>

            {validationResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className={validationResult.isValid ? 'border-green-500 bg-green-50 dark:bg-green-950/20' : 'border-red-500 bg-red-50 dark:bg-red-950/20'}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-2">
                      {validationResult.isValid ? (
                        <>
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span className="font-medium text-green-700 dark:text-green-400">
                            Valid JSON
                          </span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-5 w-5 text-red-600" />
                          <span className="font-medium text-red-700 dark:text-red-400">
                            Invalid JSON
                          </span>
                        </>
                      )}
                    </div>
                    
                    {validationResult.isValid && validationResult.stats ? (
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                        <div>
                          <div className="font-medium">Characters</div>
                          <div className="text-muted-foreground">{validationResult.stats.characters}</div>
                        </div>
                        <div>
                          <div className="font-medium">Lines</div>
                          <div className="text-muted-foreground">{validationResult.stats.lines}</div>
                        </div>
                        <div>
                          <div className="font-medium">Objects</div>
                          <div className="text-muted-foreground">{validationResult.stats.objects}</div>
                        </div>
                        <div>
                          <div className="font-medium">Arrays</div>
                          <div className="text-muted-foreground">{validationResult.stats.arrays}</div>
                        </div>
                        <div>
                          <div className="font-medium">Properties</div>
                          <div className="text-muted-foreground">{validationResult.stats.properties}</div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-red-600 dark:text-red-400">
                        {validationResult.error}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {validationResult?.isValid && (
            <Tabs defaultValue="formatted" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="formatted">Formatted</TabsTrigger>
                <TabsTrigger value="minified">Minified</TabsTrigger>
              </TabsList>
              
              <TabsContent value="formatted" className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Formatted JSON</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(formattedJson, 'formatted')}
                    disabled={!formattedJson}
                  >
                    {copied === 'formatted' ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Formatted
                      </>
                    )}
                  </Button>
                </div>
                <Textarea
                  value={formattedJson}
                  readOnly
                  rows={12}
                  className="font-mono text-sm"
                />
              </TabsContent>

              <TabsContent value="minified" className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Minified JSON</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(minifiedJson, 'minified')}
                    disabled={!minifiedJson}
                  >
                    {copied === 'minified' ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Minified
                      </>
                    )}
                  </Button>
                </div>
                <Textarea
                  value={minifiedJson}
                  readOnly
                  rows={6}
                  className="font-mono text-sm"
                />
                <div className="text-sm text-muted-foreground">
                  Size reduction: {inputJson.length > 0 && minifiedJson.length > 0 
                    ? `${Math.round((1 - minifiedJson.length / formattedJson.length) * 100)}%`
                    : '0%'
                  } ({formattedJson.length} → {minifiedJson.length} characters)
                </div>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Example JSON</CardTitle>
          <CardDescription>
            Click any example to load it into the formatter
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {examples.map((example) => (
              <Button
                key={example.name}
                variant="outline"
                onClick={() => setInputJson(example.json)}
                className="w-full h-auto p-3 text-left"
              >
                <div className="w-full">
                  <div className="font-medium mb-1">{example.name}</div>
                  <div className="text-xs text-muted-foreground font-mono break-all">
                    {example.json}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>JSON Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            <strong>Formatting:</strong> Proper indentation makes JSON more readable and easier to debug.
            Use 2 or 4 spaces for consistent formatting.
          </p>
          <p>
            <strong>Validation:</strong> Always validate JSON before using it in applications to avoid runtime errors.
            Common issues include trailing commas, unquoted keys, and single quotes.
          </p>
          <p>
            <strong>Minification:</strong> Remove whitespace and formatting for production to reduce file size
            and improve loading times.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
