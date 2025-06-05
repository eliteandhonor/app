
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Binary, Copy, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function NumberBaseConverter() {
  const [inputValue, setInputValue] = useState('');
  const [inputBase, setInputBase] = useState('10');
  const [results, setResults] = useState({
    binary: '',
    octal: '',
    decimal: '',
    hexadecimal: ''
  });
  const [copied, setCopied] = useState<string | null>(null);

  const bases = [
    { value: '2', name: 'Binary', prefix: '0b' },
    { value: '8', name: 'Octal', prefix: '0o' },
    { value: '10', name: 'Decimal', prefix: '' },
    { value: '16', name: 'Hexadecimal', prefix: '0x' }
  ];

  const convertNumber = () => {
    if (!inputValue.trim()) {
      setResults({ binary: '', octal: '', decimal: '', hexadecimal: '' });
      return;
    }

    try {
      // Parse the input number from the specified base
      const decimalValue = parseInt(inputValue.replace(/^(0b|0o|0x)/i, ''), parseInt(inputBase));
      
      if (isNaN(decimalValue) || decimalValue < 0) {
        setResults({
          binary: 'Invalid input',
          octal: 'Invalid input',
          decimal: 'Invalid input',
          hexadecimal: 'Invalid input'
        });
        return;
      }

      setResults({
        binary: decimalValue.toString(2),
        octal: decimalValue.toString(8),
        decimal: decimalValue.toString(10),
        hexadecimal: decimalValue.toString(16).toUpperCase()
      });
    } catch (error) {
      setResults({
        binary: 'Error',
        octal: 'Error',
        decimal: 'Error',
        hexadecimal: 'Error'
      });
    }
  };

  const copyToClipboard = async (text: string, base: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(base);
      setTimeout(() => setCopied(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const clearAll = () => {
    setInputValue('');
    setResults({ binary: '', octal: '', decimal: '', hexadecimal: '' });
  };

  const examples = [
    { name: 'Small Number', value: '42', base: '10' },
    { name: 'Binary Example', value: '1010', base: '2' },
    { name: 'Hex Color', value: 'FF0000', base: '16' },
    { name: 'Octal Permission', value: '755', base: '8' },
    { name: 'Large Number', value: '1024', base: '10' },
    { name: 'Hex Address', value: 'DEADBEEF', base: '16' }
  ];

  const getValidCharacters = (base: string) => {
    switch (base) {
      case '2': return '01';
      case '8': return '01234567';
      case '10': return '0123456789';
      case '16': return '0123456789ABCDEFabcdef';
      default: return '';
    }
  };

  const validateInput = (value: string, base: string) => {
    const validChars = getValidCharacters(base);
    const cleanValue = value.replace(/^(0b|0o|0x)/i, '');
    return cleanValue.split('').every(char => validChars.includes(char));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Binary className="h-5 w-5 text-primary" />
            Number Base Converter
          </CardTitle>
          <CardDescription>
            Convert between binary, octal, decimal, and hexadecimal number systems
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="input-base">Input Base</Label>
                <Select value={inputBase} onValueChange={setInputBase}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {bases.map((base) => (
                      <SelectItem key={base.value} value={base.value}>
                        {base.name} (Base {base.value})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="input-value">
                  Input Value
                  {inputBase !== '10' && (
                    <span className="text-muted-foreground ml-2">
                      (Valid chars: {getValidCharacters(inputBase)})
                    </span>
                  )}
                </Label>
                <Input
                  id="input-value"
                  placeholder={`Enter ${bases.find(b => b.value === inputBase)?.name.toLowerCase()} number...`}
                  value={inputValue}
                  onChange={(e) => {
                    const value = e.target.value.toUpperCase();
                    setInputValue(value);
                  }}
                  className={`font-mono ${
                    inputValue && !validateInput(inputValue, inputBase) 
                      ? 'border-red-500' 
                      : ''
                  }`}
                />
                {inputValue && !validateInput(inputValue, inputBase) && (
                  <p className="text-sm text-red-500">
                    Invalid characters for base {inputBase}
                  </p>
                )}
              </div>

              <Button onClick={convertNumber} className="w-full">
                Convert Number
              </Button>

              <Button onClick={clearAll} variant="outline" className="w-full">
                Clear All
              </Button>
            </div>

            <div className="space-y-4">
              {results.decimal && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  <div className="space-y-2">
                    <Label>Binary (Base 2)</Label>
                    <div className="flex gap-2">
                      <Input
                        value={results.binary.startsWith('Invalid') || results.binary.startsWith('Error') ? results.binary : `0b${results.binary}`}
                        readOnly
                        className="font-mono"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(`0b${results.binary}`, 'binary')}
                        disabled={results.binary.startsWith('Invalid') || results.binary.startsWith('Error')}
                      >
                        {copied === 'binary' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Octal (Base 8)</Label>
                    <div className="flex gap-2">
                      <Input
                        value={results.octal.startsWith('Invalid') || results.octal.startsWith('Error') ? results.octal : `0o${results.octal}`}
                        readOnly
                        className="font-mono"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(`0o${results.octal}`, 'octal')}
                        disabled={results.octal.startsWith('Invalid') || results.octal.startsWith('Error')}
                      >
                        {copied === 'octal' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Decimal (Base 10)</Label>
                    <div className="flex gap-2">
                      <Input
                        value={results.decimal}
                        readOnly
                        className="font-mono"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(results.decimal, 'decimal')}
                        disabled={results.decimal.startsWith('Invalid') || results.decimal.startsWith('Error')}
                      >
                        {copied === 'decimal' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Hexadecimal (Base 16)</Label>
                    <div className="flex gap-2">
                      <Input
                        value={results.hexadecimal.startsWith('Invalid') || results.hexadecimal.startsWith('Error') ? results.hexadecimal : `0x${results.hexadecimal}`}
                        readOnly
                        className="font-mono"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(`0x${results.hexadecimal}`, 'hexadecimal')}
                        disabled={results.hexadecimal.startsWith('Invalid') || results.hexadecimal.startsWith('Error')}
                      >
                        {copied === 'hexadecimal' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Example Numbers</CardTitle>
          <CardDescription>
            Click any example to load it into the converter
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {examples.map((example) => (
              <Button
                key={`${example.value}-${example.base}`}
                variant="outline"
                onClick={() => {
                  setInputValue(example.value);
                  setInputBase(example.base);
                }}
                className="h-auto p-3 text-left"
              >
                <div>
                  <div className="font-medium">{example.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {example.value} (Base {example.base})
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Number Base Reference</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <div>
            <strong>Binary (Base 2):</strong> Uses digits 0-1. Common in computer science and digital electronics.
            Prefix: 0b (e.g., 0b1010 = 10 in decimal)
          </div>
          <div>
            <strong>Octal (Base 8):</strong> Uses digits 0-7. Often used for file permissions in Unix systems.
            Prefix: 0o (e.g., 0o755 = 493 in decimal)
          </div>
          <div>
            <strong>Decimal (Base 10):</strong> Uses digits 0-9. The standard number system we use daily.
            No prefix needed.
          </div>
          <div>
            <strong>Hexadecimal (Base 16):</strong> Uses digits 0-9 and letters A-F. Common for colors, memory addresses.
            Prefix: 0x (e.g., 0xFF = 255 in decimal)
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
