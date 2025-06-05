
'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ScanLine, Download, Copy, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function BarcodeGenerator() {
  const [inputText, setInputText] = useState('');
  const [barcodeType, setBarcodeType] = useState('code128');
  const [barcodeData, setBarcodeData] = useState('');
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simple barcode generation (Code 128 simulation)
  const generateBarcode = () => {
    if (!inputText.trim()) {
      setBarcodeData('');
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 400;
    canvas.height = 100;

    // Clear canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Generate simple barcode pattern
    ctx.fillStyle = 'black';
    
    // Create a simple pattern based on input text
    const text = inputText.toUpperCase();
    const barWidth = 2;
    const barHeight = 60;
    const startY = 20;
    let x = 20;

    // Start pattern
    for (let i = 0; i < 3; i++) {
      ctx.fillRect(x, startY, barWidth, barHeight);
      x += barWidth * 2;
    }

    // Data pattern (simplified)
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);
      const pattern = charCode % 8; // Simple pattern generation
      
      for (let j = 0; j < 8; j++) {
        if ((pattern >> j) & 1) {
          ctx.fillRect(x, startY, barWidth, barHeight);
        }
        x += barWidth;
      }
      x += barWidth; // Space between characters
    }

    // End pattern
    for (let i = 0; i < 3; i++) {
      ctx.fillRect(x, startY, barWidth, barHeight);
      x += barWidth * 2;
    }

    // Add text below barcode
    ctx.fillStyle = 'black';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(inputText, canvas.width / 2, startY + barHeight + 15);

    // Convert to data URL
    setBarcodeData(canvas.toDataURL());
  };

  const downloadBarcode = () => {
    if (!barcodeData) return;

    const link = document.createElement('a');
    link.download = `barcode-${inputText}.png`;
    link.href = barcodeData;
    link.click();
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(inputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const clearAll = () => {
    setInputText('');
    setBarcodeData('');
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const examples = [
    { name: 'Product Code', text: '1234567890123' },
    { name: 'ISBN', text: '9781234567890' },
    { name: 'Custom Text', text: 'HELLO-WORLD' },
    { name: 'Order Number', text: 'ORD-2024-001' },
    { name: 'Serial Number', text: 'SN123456789' },
    { name: 'Website URL', text: 'EXAMPLE.COM' }
  ];

  const barcodeTypes = [
    { value: 'code128', name: 'Code 128', description: 'Most versatile, supports all ASCII characters' },
    { value: 'code39', name: 'Code 39', description: 'Alphanumeric, widely supported' },
    { value: 'ean13', name: 'EAN-13', description: 'European Article Number, 13 digits' },
    { value: 'upc', name: 'UPC-A', description: 'Universal Product Code, 12 digits' },
    { value: 'qr', name: 'QR Code', description: '2D barcode, high data capacity' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ScanLine className="h-5 w-5 text-primary" />
            Barcode Generator
          </CardTitle>
          <CardDescription>
            Generate various types of barcodes from text or numbers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="barcode-type">Barcode Type</Label>
                <Select value={barcodeType} onValueChange={setBarcodeType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {barcodeTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  {barcodeTypes.find(t => t.value === barcodeType)?.description}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="input-text">Text/Number to Encode</Label>
                <div className="flex gap-2">
                  <Input
                    id="input-text"
                    placeholder="Enter text or numbers..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    onClick={copyToClipboard}
                    disabled={!inputText}
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={generateBarcode} className="flex-1">
                  <ScanLine className="h-4 w-4 mr-2" />
                  Generate Barcode
                </Button>
                <Button onClick={clearAll} variant="outline">
                  Clear
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {barcodeData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <Card className="bg-muted/50">
                    <CardContent className="pt-6">
                      <div className="text-center space-y-4">
                        <div className="bg-white p-4 rounded border inline-block">
                          <img 
                            src={barcodeData} 
                            alt="Generated barcode"
                            className="max-w-full h-auto"
                          />
                        </div>
                        <Button onClick={downloadBarcode} className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Download Barcode
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>

          {/* Hidden canvas for barcode generation */}
          <canvas
            ref={canvasRef}
            style={{ display: 'none' }}
            width={400}
            height={100}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Example Texts</CardTitle>
          <CardDescription>
            Click any example to load it into the generator
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {examples.map((example) => (
              <Button
                key={example.name}
                variant="outline"
                onClick={() => setInputText(example.text)}
                className="h-auto p-3 text-left"
              >
                <div>
                  <div className="font-medium">{example.name}</div>
                  <div className="text-sm text-muted-foreground font-mono">
                    {example.text}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Barcode Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {barcodeTypes.map((type) => (
              <div key={type.value} className="flex items-center justify-between p-3 border rounded">
                <div>
                  <div className="font-medium">{type.name}</div>
                  <div className="text-sm text-muted-foreground">{type.description}</div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setBarcodeType(type.value)}
                >
                  Select
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About Barcodes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            Barcodes are machine-readable representations of data that can be quickly scanned and processed.
            They're widely used in retail, inventory management, and identification systems.
          </p>
          <p>
            <strong>1D Barcodes:</strong> Store data horizontally in varying widths of lines and spaces.
            Examples: Code 128, Code 39, EAN-13, UPC-A.
          </p>
          <p>
            <strong>2D Barcodes:</strong> Store data in both horizontal and vertical dimensions, allowing for much more data.
            Examples: QR codes, Data Matrix, PDF417.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
