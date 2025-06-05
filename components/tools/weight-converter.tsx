
'use client';

import { useState, useEffect } from 'react';
import { Scale, ArrowLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface WeightUnit {
  id: string;
  name: string;
  symbol: string;
  toGrams: number; // Conversion factor to grams
}

const weightUnits: WeightUnit[] = [
  { id: 'mg', name: 'Milligrams', symbol: 'mg', toGrams: 0.001 },
  { id: 'g', name: 'Grams', symbol: 'g', toGrams: 1 },
  { id: 'kg', name: 'Kilograms', symbol: 'kg', toGrams: 1000 },
  { id: 'oz', name: 'Ounces', symbol: 'oz', toGrams: 28.3495 },
  { id: 'lb', name: 'Pounds', symbol: 'lb', toGrams: 453.592 },
  { id: 'st', name: 'Stones', symbol: 'st', toGrams: 6350.29 },
  { id: 't', name: 'Metric Tons', symbol: 't', toGrams: 1000000 },
];

export function WeightConverter() {
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('kg');
  const [toUnit, setToUnit] = useState('lb');
  const [result, setResult] = useState<number | null>(null);

  const convertWeight = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) return;

    const fromUnitData = weightUnits.find(u => u.id === fromUnit);
    const toUnitData = weightUnits.find(u => u.id === toUnit);

    if (!fromUnitData || !toUnitData) return;

    // Convert to grams first, then to target unit
    const grams = value * fromUnitData.toGrams;
    const converted = grams / toUnitData.toGrams;
    
    setResult(converted);
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
    if (result !== null) {
      setInputValue(result.toString());
      convertWeight();
    }
  };

  const getCommonConversions = () => {
    if (!inputValue || isNaN(parseFloat(inputValue))) return [];

    const value = parseFloat(inputValue);
    const fromUnitData = weightUnits.find(u => u.id === fromUnit);
    if (!fromUnitData) return [];

    const grams = value * fromUnitData.toGrams;
    
    return weightUnits
      .filter(unit => unit.id !== fromUnit)
      .map(unit => ({
        unit,
        value: grams / unit.toGrams
      }))
      .slice(0, 6);
  };

  useEffect(() => {
    if (inputValue) {
      convertWeight();
    }
  }, [inputValue, fromUnit, toUnit]);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Scale className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Weight Converter</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Convert Weight Units</CardTitle>
          <CardDescription>Convert between different units of weight and mass</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="input-value">Value</Label>
              <Input
                id="input-value"
                type="number"
                placeholder="Enter value"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>From</Label>
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {weightUnits.map((unit) => (
                    <SelectItem key={unit.id} value={unit.id}>
                      {unit.name} ({unit.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>To</Label>
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {weightUnits.map((unit) => (
                    <SelectItem key={unit.id} value={unit.id}>
                      {unit.name} ({unit.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center">
            <Button variant="outline" size="sm" onClick={swapUnits}>
              <ArrowLeftRight className="h-4 w-4" />
              <span className="sr-only">Swap units</span>
            </Button>
          </div>

          {result !== null && (
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-lg font-semibold text-center">
                {inputValue} {weightUnits.find(u => u.id === fromUnit)?.symbol} = 
                <span className="text-primary ml-2">
                  {result.toLocaleString(undefined, { maximumFractionDigits: 6 })} {weightUnits.find(u => u.id === toUnit)?.symbol}
                </span>
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {getCommonConversions().length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Common Conversions</CardTitle>
            <CardDescription>
              {inputValue} {weightUnits.find(u => u.id === fromUnit)?.name} equals:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {getCommonConversions().map(({ unit, value }) => (
                <div key={unit.id} className="p-3 bg-muted rounded-lg">
                  <p className="font-medium">{value.toLocaleString(undefined, { maximumFractionDigits: 6 })}</p>
                  <p className="text-sm text-muted-foreground">{unit.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Reference</CardTitle>
          <CardDescription>Common weight conversions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-medium">Metric System</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>1 kg = 1,000 g</li>
                <li>1 g = 1,000 mg</li>
                <li>1 t = 1,000 kg</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Imperial System</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>1 lb = 16 oz</li>
                <li>1 st = 14 lb</li>
                <li>1 ton = 2,000 lb</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Common Conversions</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>1 kg = 2.205 lb</li>
                <li>1 lb = 453.6 g</li>
                <li>1 oz = 28.35 g</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
