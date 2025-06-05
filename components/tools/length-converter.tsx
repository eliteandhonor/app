
'use client';

import { useState, useEffect } from 'react';
import { Ruler, ArrowLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LengthUnit {
  id: string;
  name: string;
  symbol: string;
  toMeters: number; // Conversion factor to meters
}

const lengthUnits: LengthUnit[] = [
  { id: 'mm', name: 'Millimeters', symbol: 'mm', toMeters: 0.001 },
  { id: 'cm', name: 'Centimeters', symbol: 'cm', toMeters: 0.01 },
  { id: 'm', name: 'Meters', symbol: 'm', toMeters: 1 },
  { id: 'km', name: 'Kilometers', symbol: 'km', toMeters: 1000 },
  { id: 'in', name: 'Inches', symbol: 'in', toMeters: 0.0254 },
  { id: 'ft', name: 'Feet', symbol: 'ft', toMeters: 0.3048 },
  { id: 'yd', name: 'Yards', symbol: 'yd', toMeters: 0.9144 },
  { id: 'mi', name: 'Miles', symbol: 'mi', toMeters: 1609.344 },
];

export function LengthConverter() {
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('ft');
  const [result, setResult] = useState<number | null>(null);

  const convertLength = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) return;

    const fromUnitData = lengthUnits.find(u => u.id === fromUnit);
    const toUnitData = lengthUnits.find(u => u.id === toUnit);

    if (!fromUnitData || !toUnitData) return;

    // Convert to meters first, then to target unit
    const meters = value * fromUnitData.toMeters;
    const converted = meters / toUnitData.toMeters;
    
    setResult(converted);
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
    if (result !== null) {
      setInputValue(result.toString());
      convertLength();
    }
  };

  const getCommonConversions = () => {
    if (!inputValue || isNaN(parseFloat(inputValue))) return [];

    const value = parseFloat(inputValue);
    const fromUnitData = lengthUnits.find(u => u.id === fromUnit);
    if (!fromUnitData) return [];

    const meters = value * fromUnitData.toMeters;
    
    return lengthUnits
      .filter(unit => unit.id !== fromUnit)
      .map(unit => ({
        unit,
        value: meters / unit.toMeters
      }))
      .slice(0, 6);
  };

  useEffect(() => {
    if (inputValue) {
      convertLength();
    }
  }, [inputValue, fromUnit, toUnit]);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Ruler className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Length Converter</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Convert Length Units</CardTitle>
          <CardDescription>Convert between different units of length and distance</CardDescription>
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
                  {lengthUnits.map((unit) => (
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
                  {lengthUnits.map((unit) => (
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
                {inputValue} {lengthUnits.find(u => u.id === fromUnit)?.symbol} = 
                <span className="text-primary ml-2">
                  {result.toLocaleString(undefined, { maximumFractionDigits: 6 })} {lengthUnits.find(u => u.id === toUnit)?.symbol}
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
              {inputValue} {lengthUnits.find(u => u.id === fromUnit)?.name} equals:
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
          <CardDescription>Common length conversions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-medium">Metric System</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>1 km = 1,000 m</li>
                <li>1 m = 100 cm</li>
                <li>1 cm = 10 mm</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Imperial System</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>1 mi = 5,280 ft</li>
                <li>1 yd = 3 ft</li>
                <li>1 ft = 12 in</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Common Conversions</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>1 in = 2.54 cm</li>
                <li>1 ft = 0.3048 m</li>
                <li>1 mi = 1.609 km</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
