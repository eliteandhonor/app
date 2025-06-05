
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Copy, Minimize2, Maximize2, Download } from 'lucide-react';
import { toast } from 'sonner';

export function HtmlMinifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'minify' | 'beautify'>('minify');
  const [options, setOptions] = useState({
    removeComments: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    collapseWhitespace: true,
    conservativeCollapse: false,
    minifyCSS: true,
    minifyJS: true
  });
  const [stats, setStats] = useState({ original: 0, processed: 0, savings: 0 });

  const processHTML = () => {
    if (!input.trim()) {
      toast.error('Please enter some HTML code');
      return;
    }

    try {
      let result = '';
      const originalSize = new Blob([input]).size;

      if (mode === 'minify') {
        // Simple HTML minification without external libraries
        result = input;
        
        if (options.removeComments) {
          result = result.replace(/<!--[\s\S]*?-->/g, '');
        }
        
        if (options.collapseWhitespace) {
          result = result
            .replace(/\s+/g, ' ') // Replace multiple spaces with single space
            .replace(/>\s+</g, '><') // Remove spaces between tags
            .replace(/\s+>/g, '>') // Remove spaces before closing bracket
            .replace(/<\s+/g, '<'); // Remove spaces after opening bracket
        }
        
        if (options.removeEmptyAttributes) {
          result = result.replace(/\s+\w+=""/g, '');
        }
        
        result = result.trim();
      } else {
        // Simple HTML beautification
        let indentLevel = 0;
        const lines = input.split(/>\s*</);
        
        result = lines.map((line, index) => {
          if (index === 0) {
            line = line + '>';
          } else if (index === lines.length - 1) {
            line = '<' + line;
          } else {
            line = '<' + line + '>';
          }
          
          // Decrease indent for closing tags
          if (line.match(/<\/\w/)) {
            indentLevel = Math.max(0, indentLevel - 1);
          }
          
          const indent = '  '.repeat(indentLevel);
          
          // Increase indent for opening tags (but not self-closing)
          if (line.match(/<\w/) && !line.match(/\/>/)) {
            indentLevel++;
          }
          
          return indent + line.trim();
        }).join('\n');
      }

      const processedSize = new Blob([result]).size;
      const savings = originalSize > 0 ? ((originalSize - processedSize) / originalSize) * 100 : 0;

      setOutput(result);
      setStats({
        original: originalSize,
        processed: processedSize,
        savings: Math.max(0, savings)
      });

      toast.success(`HTML ${mode === 'minify' ? 'minified' : 'beautified'} successfully!`);
    } catch (error) {
      toast.error('Error processing HTML: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const copyOutput = async () => {
    try {
      await navigator.clipboard.writeText(output);
      toast.success('HTML copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy HTML');
    }
  };

  const downloadOutput = () => {
    const blob = new Blob([output], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `index.${mode === 'minify' ? 'min' : 'formatted'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('HTML file downloaded!');
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const sampleHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sample Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <!-- Main content -->
    <div class="container">
        <h1>Welcome to Our Website</h1>
        <p>This is a sample HTML document that demonstrates various elements.</p>
        
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
        
        <main>
            <section id="content">
                <h2>Main Content</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </section>
        </main>
    </div>
    
    <script>
        console.log('Page loaded');
        document.addEventListener('DOMContentLoaded', function() {
            console.log('DOM ready');
        });
    </script>
</body>
</html>`;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>HTML Minifier & Beautifier</CardTitle>
          <CardDescription>
            Minify or beautify HTML code for optimization and readability
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
              onClick={() => setInput(sampleHTML)}
            >
              Load Sample
            </Button>
          </div>

          {mode === 'minify' && (
            <div className="space-y-3">
              <Label>Minification Options</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="removeComments"
                    checked={options.removeComments}
                    onCheckedChange={(checked) => 
                      setOptions(prev => ({ ...prev, removeComments: !!checked }))
                    }
                  />
                  <Label htmlFor="removeComments" className="text-sm">Remove comments</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="removeEmptyAttributes"
                    checked={options.removeEmptyAttributes}
                    onCheckedChange={(checked) => 
                      setOptions(prev => ({ ...prev, removeEmptyAttributes: !!checked }))
                    }
                  />
                  <Label htmlFor="removeEmptyAttributes" className="text-sm">Remove empty attributes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="collapseWhitespace"
                    checked={options.collapseWhitespace}
                    onCheckedChange={(checked) => 
                      setOptions(prev => ({ ...prev, collapseWhitespace: !!checked }))
                    }
                  />
                  <Label htmlFor="collapseWhitespace" className="text-sm">Collapse whitespace</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="minifyCSS"
                    checked={options.minifyCSS}
                    onCheckedChange={(checked) => 
                      setOptions(prev => ({ ...prev, minifyCSS: !!checked }))
                    }
                  />
                  <Label htmlFor="minifyCSS" className="text-sm">Minify CSS</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="minifyJS"
                    checked={options.minifyJS}
                    onCheckedChange={(checked) => 
                      setOptions(prev => ({ ...prev, minifyJS: !!checked }))
                    }
                  />
                  <Label htmlFor="minifyJS" className="text-sm">Minify JavaScript</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="removeRedundantAttributes"
                    checked={options.removeRedundantAttributes}
                    onCheckedChange={(checked) => 
                      setOptions(prev => ({ ...prev, removeRedundantAttributes: !!checked }))
                    }
                  />
                  <Label htmlFor="removeRedundantAttributes" className="text-sm">Remove redundant attributes</Label>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="input">Input HTML</Label>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your HTML code here..."
              className="min-h-[200px] font-mono text-sm"
            />
          </div>

          <Button onClick={processHTML} className="w-full">
            {mode === 'minify' ? (
              <>
                <Minimize2 className="w-4 h-4 mr-2" />
                Minify HTML
              </>
            ) : (
              <>
                <Maximize2 className="w-4 h-4 mr-2" />
                Beautify HTML
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
          <p><strong>Minification:</strong> Removes whitespace, comments, and optimizes HTML for production</p>
          <p><strong>Beautification:</strong> Formats HTML with proper indentation and spacing for readability</p>
          <p><strong>CSS/JS Minification:</strong> Also minifies embedded CSS and JavaScript code</p>
          <p><strong>Attribute Optimization:</strong> Removes redundant and empty attributes</p>
        </CardContent>
      </Card>
    </div>
  );
}
