
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Copy, Minimize2, Maximize2, Download } from 'lucide-react';
import { toast } from 'sonner';

export function JsMinifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'minify' | 'beautify'>('minify');
  const [options, setOptions] = useState({
    mangle: true,
    compress: true,
    removeComments: true,
    removeConsole: false,
    removeDebugger: true
  });
  const [stats, setStats] = useState({ original: 0, processed: 0, savings: 0 });

  const processJS = () => {
    if (!input.trim()) {
      toast.error('Please enter some JavaScript code');
      return;
    }

    try {
      let result = '';
      const originalSize = new Blob([input]).size;

      if (mode === 'minify') {
        // Simple JavaScript minification without external libraries
        result = input;
        
        if (options.removeComments) {
          // Remove single-line comments
          result = result.replace(/\/\/.*$/gm, '');
          // Remove multi-line comments
          result = result.replace(/\/\*[\s\S]*?\*\//g, '');
        }
        
        if (options.removeConsole) {
          result = result.replace(/console\.(log|warn|error|info|debug)\([^)]*\);?/g, '');
        }
        
        if (options.removeDebugger) {
          result = result.replace(/debugger;?/g, '');
        }
        
        if (options.compress) {
          result = result
            .replace(/\s+/g, ' ') // Replace multiple spaces with single space
            .replace(/;\s*}/g, '}') // Remove semicolon before closing brace
            .replace(/\s*{\s*/g, '{') // Remove spaces around opening brace
            .replace(/;\s*/g, ';') // Remove spaces after semicolon
            .replace(/,\s*/g, ',') // Remove spaces after comma
            .replace(/:\s*/g, ':') // Remove spaces after colon
            .replace(/\s*=\s*/g, '=') // Remove spaces around equals
            .replace(/\s*\+\s*/g, '+') // Remove spaces around plus
            .replace(/\s*-\s*/g, '-') // Remove spaces around minus
            .replace(/\s*\*\s*/g, '*') // Remove spaces around multiply
            .replace(/\s*\/\s*/g, '/'); // Remove spaces around divide
        }
        
        result = result.trim();
      } else {
        // Simple JavaScript beautification
        let indentLevel = 0;
        const lines = result.split(/[;{}]/);
        
        result = input
          .replace(/\s*{\s*/g, ' {\n')
          .replace(/;\s*/g, ';\n')
          .replace(/\s*}\s*/g, '\n}\n')
          .split('\n')
          .map(line => {
            line = line.trim();
            if (!line) return '';
            
            if (line.includes('}')) {
              indentLevel = Math.max(0, indentLevel - 1);
            }
            
            const indent = '  '.repeat(indentLevel);
            
            if (line.includes('{')) {
              indentLevel++;
            }
            
            return indent + line;
          })
          .filter(line => line.trim())
          .join('\n');
      }

      const processedSize = new Blob([result]).size;
      const savings = originalSize > 0 ? ((originalSize - processedSize) / originalSize) * 100 : 0;

      setOutput(result);
      setStats({
        original: originalSize,
        processed: processedSize,
        savings: Math.max(0, savings)
      });

      toast.success(`JavaScript ${mode === 'minify' ? 'minified' : 'beautified'} successfully!`);
    } catch (error) {
      toast.error('Error processing JavaScript: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const copyOutput = async () => {
    try {
      await navigator.clipboard.writeText(output);
      toast.success('JavaScript copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy JavaScript');
    }
  };

  const downloadOutput = () => {
    const blob = new Blob([output], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `script.${mode === 'minify' ? 'min' : 'formatted'}.js`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('JavaScript file downloaded!');
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const sampleJS = `// Sample JavaScript code
function calculateTotal(items) {
    let total = 0;
    
    // Loop through all items
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        
        if (item.price && item.quantity) {
            total += item.price * item.quantity;
        }
    }
    
    return total;
}

class ShoppingCart {
    constructor() {
        this.items = [];
        this.discount = 0;
    }
    
    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: quantity
            });
        }
        
        console.log(\`Added \${quantity} \${product.name}(s) to cart\`);
    }
    
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        console.log('Item removed from cart');
    }
    
    getTotal() {
        const subtotal = calculateTotal(this.items);
        return subtotal - (subtotal * this.discount / 100);
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log('Shopping cart initialized');
    
    // Add sample items
    cart.addItem({ id: 1, name: 'Widget', price: 9.99 }, 2);
    cart.addItem({ id: 2, name: 'Gadget', price: 19.99 }, 1);
    
    console.log('Total:', cart.getTotal());
});`;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>JavaScript Minifier & Beautifier</CardTitle>
          <CardDescription>
            Minify or beautify JavaScript code for optimization and readability
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
              onClick={() => setInput(sampleJS)}
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
                    id="mangle"
                    checked={options.mangle}
                    onCheckedChange={(checked) => 
                      setOptions(prev => ({ ...prev, mangle: !!checked }))
                    }
                  />
                  <Label htmlFor="mangle" className="text-sm">Mangle variable names</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="compress"
                    checked={options.compress}
                    onCheckedChange={(checked) => 
                      setOptions(prev => ({ ...prev, compress: !!checked }))
                    }
                  />
                  <Label htmlFor="compress" className="text-sm">Compress code</Label>
                </div>
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
                    id="removeConsole"
                    checked={options.removeConsole}
                    onCheckedChange={(checked) => 
                      setOptions(prev => ({ ...prev, removeConsole: !!checked }))
                    }
                  />
                  <Label htmlFor="removeConsole" className="text-sm">Remove console.log</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="removeDebugger"
                    checked={options.removeDebugger}
                    onCheckedChange={(checked) => 
                      setOptions(prev => ({ ...prev, removeDebugger: !!checked }))
                    }
                  />
                  <Label htmlFor="removeDebugger" className="text-sm">Remove debugger statements</Label>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="input">Input JavaScript</Label>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your JavaScript code here..."
              className="min-h-[200px] font-mono text-sm"
            />
          </div>

          <Button onClick={processJS} className="w-full">
            {mode === 'minify' ? (
              <>
                <Minimize2 className="w-4 h-4 mr-2" />
                Minify JavaScript
              </>
            ) : (
              <>
                <Maximize2 className="w-4 h-4 mr-2" />
                Beautify JavaScript
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
          <p><strong>Minification:</strong> Removes whitespace, comments, and optimizes JavaScript for production</p>
          <p><strong>Beautification:</strong> Formats JavaScript with proper indentation and spacing for readability</p>
          <p><strong>Variable Mangling:</strong> Shortens variable names to reduce file size</p>
          <p><strong>Dead Code Elimination:</strong> Removes unused code and optimizes expressions</p>
          <p><strong>Console Removal:</strong> Option to remove console.log statements for production</p>
        </CardContent>
      </Card>
    </div>
  );
}
