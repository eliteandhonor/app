
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Columns, ArrowUpDown, Copy, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function RomanNumeralConverter() {
  const [decimal, setDecimal] = useState('');
  const [roman, setRoman] = useState('');
  const [copied, setCopied] = useState<'decimal' | 'roman' | null>(null);

  const romanNumerals = [
    { value: 1000, numeral: 'M' },
    { value: 900, numeral: 'CM' },
    { value: 500, numeral: 'D' },
    { value: 400, numeral: 'CD' },
    { value: 100, numeral: 'C' },
    { value: 90, numeral: 'XC' },
    { value: 50, numeral: 'L' },
    { value: 40, numeral: 'XL' },
    { value: 10, numeral: 'X' },
    { value: 9, numeral: 'IX' },
    { value: 5, numeral: 'V' },
    { value: 4, numeral: 'IV' },
    { value: 1, numeral: 'I' }
  ];

  const decimalToRoman = (num: number): string => {
    if (num <= 0 || num > 3999) {
      return 'Error: Number must be between 1 and 3999';
    }

    let result = '';
    for (const { value, numeral } of romanNumerals) {
      while (num >= value) {
        result += numeral;
        num -= value;
      }
    }
    return result;
  };

  const romanToDecimal = (romanStr: string): number => {
    const romanMap: { [key: string]: number } = {
      'I': 1, 'V': 5, 'X': 10, 'L': 50,
      'C': 100, 'D': 500, 'M': 1000
    };

    let result = 0;
    const upperRoman = romanStr.toUpperCase();

    for (let i = 0; i < upperRoman.length; i++) {
      const current = romanMap[upperRoman[i]];
      const next = romanMap[upperRoman[i + 1]];

      if (!current) {
        return -1; // Invalid character
      }

      if (next && current < next) {
        result += next - current;
        i++; // Skip next character
      } else {
        result += current;
      }
    }

    return result;
  };

  const convertToRoman = () => {
    const num = parseInt(decimal);
    if (isNaN(num)) {
      setRoman('Error: Please enter a valid number');
      return;
    }
    setRoman(decimalToRoman(num));
  };

  const convertToDecimal = () => {
    if (!roman.trim()) {
      setDecimal('');
      return;
    }
    const num = romanToDecimal(roman);
    if (num === -1) {
      setDecimal('Error: Invalid Roman numeral');
    } else {
      setDecimal(num.toString());
    }
  };

  const copyToClipboard = async (text: string, type: 'decimal' | 'roman') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const clearAll = () => {
    setDecimal('');
    setRoman('');
  };

  const examples = [
    { decimal: 1, roman: 'I' },
    { decimal: 4, roman: 'IV' },
    { decimal: 9, roman: 'IX' },
    { decimal: 27, roman: 'XXVII' },
    { decimal: 48, roman: 'XLVIII' },
    { decimal: 99, roman: 'XCIX' },
    { decimal: 444, roman: 'CDXLIV' },
    { decimal: 1994, roman: 'MCMXCIV' },
    { decimal: 2024, roman: 'MMXXIV' },
    { decimal: 3999, roman: 'MMMCMXCIX' }
  ];

  const basicNumerals = [
    { symbol: 'I', value: 1 },
    { symbol: 'V', value: 5 },
    { symbol: 'X', value: 10 },
    { symbol: 'L', value: 50 },
    { symbol: 'C', value: 100 },
    { symbol: 'D', value: 500 },
    { symbol: 'M', value: 1000 }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Columns className="h-5 w-5 text-primary" />
            Roman Numeral Converter
          </CardTitle>
          <CardDescription>
            Convert between Roman numerals and decimal numbers (1-3999)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="to-roman" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="to-roman">To Roman</TabsTrigger>
              <TabsTrigger value="to-decimal">To Decimal</TabsTrigger>
            </TabsList>
            
            <TabsContent value="to-roman" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="decimal-input">Decimal Number (1-3999)</Label>
                <div className="flex gap-2">
                  <Input
                    id="decimal-input"
                    type="number"
                    min="1"
                    max="3999"
                    placeholder="Enter number..."
                    value={decimal}
                    onChange={(e) => setDecimal(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(decimal, 'decimal')}
                    disabled={!decimal}
                  >
                    {copied === 'decimal' ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <Button onClick={convertToRoman} className="w-full">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  Convert to Roman
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="roman-output">Roman Numeral</Label>
                <div className="flex gap-2">
                  <Input
                    id="roman-output"
                    value={roman}
                    readOnly
                    className="flex-1 font-mono text-lg"
                  />
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(roman, 'roman')}
                    disabled={!roman || roman.startsWith('Error')}
                  >
                    {copied === 'roman' ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="to-decimal" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="roman-input">Roman Numeral</Label>
                <div className="flex gap-2">
                  <Input
                    id="roman-input"
                    placeholder="Enter Roman numeral..."
                    value={roman}
                    onChange={(e) => setRoman(e.target.value.toUpperCase())}
                    className="flex-1 font-mono text-lg"
                  />
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(roman, 'roman')}
                    disabled={!roman}
                  >
                    {copied === 'roman' ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <Button onClick={convertToDecimal} className="w-full">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  Convert to Decimal
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="decimal-output">Decimal Number</Label>
                <div className="flex gap-2">
                  <Input
                    id="decimal-output"
                    value={decimal}
                    readOnly
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(decimal, 'decimal')}
                    disabled={!decimal || decimal.startsWith('Error')}
                  >
                    {copied === 'decimal' ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <Button onClick={clearAll} variant="outline" className="w-full">
            Clear All
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Roman Numerals</CardTitle>
            <CardDescription>
              The seven basic symbols used in Roman numerals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {basicNumerals.map((numeral) => (
                <div
                  key={numeral.symbol}
                  className="flex items-center justify-between p-2 border rounded"
                >
                  <span className="font-mono text-lg font-bold">
                    {numeral.symbol}
                  </span>
                  <span className="text-muted-foreground">
                    {numeral.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Example Conversions</CardTitle>
            <CardDescription>
              Click any example to load it
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {examples.map((example) => (
                <Button
                  key={example.decimal}
                  variant="outline"
                  onClick={() => {
                    setDecimal(example.decimal.toString());
                    setRoman(example.roman);
                  }}
                  className="w-full justify-between"
                >
                  <span>{example.decimal}</span>
                  <span className="font-mono">{example.roman}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Roman Numeral Rules</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            <strong>Addition:</strong> When a smaller numeral appears after a larger one, add the values (VI = 6).
          </p>
          <p>
            <strong>Subtraction:</strong> When a smaller numeral appears before a larger one, subtract the smaller from the larger (IV = 4).
          </p>
          <p>
            <strong>Repetition:</strong> A numeral can be repeated up to three times in succession (III = 3).
          </p>
          <p>
            <strong>Subtractive combinations:</strong> Only I, X, and C can be used as subtractive numerals, and only before the next two higher numerals.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
