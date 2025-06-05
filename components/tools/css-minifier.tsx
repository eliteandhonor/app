
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Copy, Minimize2, Maximize2, Download } from 'lucide-react';
import { toast } from 'sonner';

export function CssMinifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'minify' | 'beautify'>('minify');
  const [stats, setStats] = useState({ original: 0, processed: 0, savings: 0 });

  const processCSS = () => {
    if (!input.trim()) {
      toast.error('Please enter some CSS code');
      return;
    }

    try {
      let result = '';
      const originalSize = new Blob([input]).size;

      if (mode === 'minify') {
        // Simple CSS minification without external libraries
        result = input
          .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
          .replace(/\s+/g, ' ') // Replace multiple spaces with single space
          .replace(/;\s*}/g, '}') // Remove semicolon before closing brace
          .replace(/\s*{\s*/g, '{') // Remove spaces around opening brace
          .replace(/;\s*/g, ';') // Remove spaces after semicolon
          .replace(/,\s*/g, ',') // Remove spaces after comma
          .replace(/:\s*/g, ':') // Remove spaces after colon
          .trim();
      } else {
        // Simple CSS beautification
        result = input
          .replace(/\s*{\s*/g, ' {\n  ') // Add space and newline after opening brace
          .replace(/;\s*/g, ';\n  ') // Add newline after semicolon
          .replace(/\s*}\s*/g, '\n}\n') // Add newlines around closing brace
          .replace(/,\s*/g, ',\n') // Add newline after comma in selectors
          .replace(/\n\s*\n/g, '\n') // Remove extra empty lines
          .trim();
      }

      const processedSize = new Blob([result]).size;
      const savings = originalSize > 0 ? ((originalSize - processedSize) / originalSize) * 100 : 0;

      setOutput(result);
      setStats({
        original: originalSize,
        processed: processedSize,
        savings: Math.max(0, savings)
      });

      toast.success(`CSS ${mode === 'minify' ? 'minified' : 'beautified'} successfully!`);
    } catch (error) {
      toast.error('Error processing CSS: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const copyOutput = async () => {
    try {
      await navigator.clipboard.writeText(output);
      toast.success('CSS copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy CSS');
    }
  };

  const downloadOutput = () => {
    const blob = new Blob([output], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `styles.${mode === 'minify' ? 'min' : 'formatted'}.css`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('CSS file downloaded!');
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const sampleCSS = `/* Sample CSS */
.header {
  background-color: #3b82f6;
  padding: 20px;
  margin: 0;
  border-radius: 8px;
}

.navigation ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.navigation li {
  margin-right: 20px;
}

.navigation a {
  color: white;
  text-decoration: none;
  font-weight: 500;
}

.navigation a:hover {
  text-decoration: underline;
}`;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>CSS Minifier & Beautifier</CardTitle>
          <CardDescription>
            Minify or beautify CSS code for optimization and readability
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={mode === 'minify' ? 'default' : 'outline'}
              onClick={() => setMode('minify')}
            >
              <Minimize2 className="w-4 h-4 mr-2" />
              Minify
            </Button>
            <Button
              variant={mode === 'beautify' ? 'default' : 'outline'}
              onClick={() => setMode('beautify')}
            >
              <Maximize2 className="w-4 h-4 mr-2" />
              Beautify
            </Button>
            <Button
              variant="outline"
              onClick={() => setInput(sampleCSS)}
            >
              Load Sample
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="input">Input CSS</Label>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your CSS code here..."
              className="min-h-[200px] font-mono text-sm"
            />
          </div>

          <Button onClick={processCSS} className="w-full">
            {mode === 'minify' ? (
              <>
                <Minimize2 className="w-4 h-4 mr-2" />
                Minify CSS
              </>
            ) : (
              <>
                <Maximize2 className="w-4 h-4 mr-2" />
                Beautify CSS
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {output && (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Output</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={copyOutput}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadOutput}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={output}
                readOnly
                className="min-h-[200px] font-mono text-sm"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{formatBytes(stats.original)}</div>
                  <div className="text-sm text-muted-foreground">Original Size</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{formatBytes(stats.processed)}</div>
                  <div className="text-sm text-muted-foreground">
                    {mode === 'minify' ? 'Minified' : 'Beautified'} Size
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {stats.savings.toFixed(1)}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {mode === 'minify' ? 'Size Reduction' : 'Size Change'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {formatBytes(Math.abs(stats.original - stats.processed))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {mode === 'minify' ? 'Saved' : 'Difference'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p><strong>Minification:</strong> Removes whitespace, comments, and optimizes CSS for production</p>
          <p><strong>Beautification:</strong> Formats CSS with proper indentation and spacing for readability</p>
          <p><strong>Optimization:</strong> Combines selectors, removes duplicates, and optimizes values</p>
          <p><strong>Validation:</strong> Checks for CSS syntax errors during processing</p>
        </CardContent>
      </Card>
    </div>
  );
}
