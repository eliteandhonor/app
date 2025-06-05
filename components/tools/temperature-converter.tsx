
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Thermometer, ArrowLeftRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function TemperatureConverter() {
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('celsius');
  const [toUnit, setToUnit] = useState('fahrenheit');

  const units = [
    { value: 'celsius', label: 'Celsius (°C)', symbol: '°C' },
    { value: 'fahrenheit', label: 'Fahrenheit (°F)', symbol: '°F' },
    { value: 'kelvin', label: 'Kelvin (K)', symbol: 'K' }
  ];

  const convertTemperature = (value: number, from: string, to: string): number => {
    if (from === to) return value;

    // Convert to Celsius first
    let celsius: number;
    switch (from) {
      case 'fahrenheit':
        celsius = (value - 32) * 5/9;
        break;
      case 'kelvin':
        celsius = value - 273.15;
        break;
      default:
        celsius = value;
    }

    // Convert from Celsius to target unit
    switch (to) {
      case 'fahrenheit':
        return celsius * 9/5 + 32;
      case 'kelvin':
        return celsius + 273.15;
      default:
        return celsius;
    }
  };

  const inputNum = parseFloat(inputValue) || 0;
  const results = units.map(unit => ({
    unit,
    value: convertTemperature(inputNum, fromUnit, unit.value)
  }));

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const getTemperatureDescription = (celsius: number): string => {
    if (celsius < -40) return 'Extremely cold';
    if (celsius < -18) return 'Very cold';
    if (celsius < 0) return 'Freezing';
    if (celsius < 10) return 'Cold';
    if (celsius < 20) return 'Cool';
    if (celsius < 25) return 'Comfortable';
    if (celsius < 30) return 'Warm';
    if (celsius < 35) return 'Hot';
    if (celsius < 40) return 'Very hot';
    return 'Extremely hot';
  };

  const celsiusValue = convertTemperature(inputNum, fromUnit, 'celsius');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-primary" />
            Temperature Converter
          </CardTitle>
          <CardDescription>
            Convert between Celsius, Fahrenheit, and Kelvin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="input">Temperature</Label>
              <Input
                id="input"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter temperature"
                step="0.1"
              />
            </div>
            
            <div className="space-y-2">
              <Label>From</Label>
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {units.map(unit => (
                    <SelectItem key={unit.value} value={unit.value}>
                      {unit.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={swapUnits}
                className="flex items-center gap-2"
              >
                <ArrowLeftRight className="h-4 w-4" />
                Swap
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {inputValue && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {results.map(result => (
              <Card key={result.unit.value} className={result.unit.value === fromUnit ? 'ring-2 ring-primary' : ''}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{result.unit.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">
                    {result.value.toFixed(2)}{result.unit.symbol}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Temperature Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-semibold text-accent">
                {getTemperatureDescription(celsiusValue)}
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                Common reference points:
              </div>
              <div className="text-sm text-muted-foreground space-y-1 mt-1">
                <div>• Water freezes: 0°C / 32°F / 273.15K</div>
                <div>• Room temperature: ~20°C / 68°F / 293K</div>
                <div>• Body temperature: 37°C / 98.6°F / 310K</div>
                <div>• Water boils: 100°C / 212°F / 373.15K</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
