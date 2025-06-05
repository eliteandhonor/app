
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Square, ArrowLeftRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function AreaConverter() {
  const [areaValue, setAreaValue] = useState('');
  const [areaFromUnit, setAreaFromUnit] = useState('square-meter');
  const [volumeValue, setVolumeValue] = useState('');
  const [volumeFromUnit, setVolumeFromUnit] = useState('liter');

  const areaUnits = [
    { value: 'square-meter', label: 'Square Meter (m²)', factor: 1 },
    { value: 'square-kilometer', label: 'Square Kilometer (km²)', factor: 1000000 },
    { value: 'square-centimeter', label: 'Square Centimeter (cm²)', factor: 0.0001 },
    { value: 'square-foot', label: 'Square Foot (ft²)', factor: 0.092903 },
    { value: 'square-inch', label: 'Square Inch (in²)', factor: 0.00064516 },
    { value: 'square-yard', label: 'Square Yard (yd²)', factor: 0.836127 },
    { value: 'acre', label: 'Acre', factor: 4046.86 },
    { value: 'hectare', label: 'Hectare (ha)', factor: 10000 }
  ];

  const volumeUnits = [
    { value: 'liter', label: 'Liter (L)', factor: 1 },
    { value: 'milliliter', label: 'Milliliter (mL)', factor: 0.001 },
    { value: 'cubic-meter', label: 'Cubic Meter (m³)', factor: 1000 },
    { value: 'cubic-centimeter', label: 'Cubic Centimeter (cm³)', factor: 0.001 },
    { value: 'gallon-us', label: 'US Gallon', factor: 3.78541 },
    { value: 'gallon-uk', label: 'UK Gallon', factor: 4.54609 },
    { value: 'quart-us', label: 'US Quart', factor: 0.946353 },
    { value: 'pint-us', label: 'US Pint', factor: 0.473176 },
    { value: 'cup-us', label: 'US Cup', factor: 0.236588 },
    { value: 'fluid-ounce-us', label: 'US Fluid Ounce', factor: 0.0295735 },
    { value: 'tablespoon', label: 'Tablespoon', factor: 0.0147868 },
    { value: 'teaspoon', label: 'Teaspoon', factor: 0.00492892 }
  ];

  const convertArea = (value: number, fromUnit: string): { unit: any; value: number }[] => {
    const fromFactor = areaUnits.find(u => u.value === fromUnit)?.factor || 1;
    const baseValue = value * fromFactor; // Convert to square meters

    return areaUnits.map(unit => ({
      unit,
      value: baseValue / unit.factor
    }));
  };

  const convertVolume = (value: number, fromUnit: string): { unit: any; value: number }[] => {
    const fromFactor = volumeUnits.find(u => u.value === fromUnit)?.factor || 1;
    const baseValue = value * fromFactor; // Convert to liters

    return volumeUnits.map(unit => ({
      unit,
      value: baseValue / unit.factor
    }));
  };

  const areaResults = areaValue ? convertArea(parseFloat(areaValue) || 0, areaFromUnit) : [];
  const volumeResults = volumeValue ? convertVolume(parseFloat(volumeValue) || 0, volumeFromUnit) : [];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Square className="h-5 w-5 text-primary" />
            Area & Volume Converter
          </CardTitle>
          <CardDescription>
            Convert between different area and volume units
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="area" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="area">Area</TabsTrigger>
              <TabsTrigger value="volume">Volume</TabsTrigger>
            </TabsList>
            
            <TabsContent value="area" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="area-input">Area Value</Label>
                  <Input
                    id="area-input"
                    type="number"
                    value={areaValue}
                    onChange={(e) => setAreaValue(e.target.value)}
                    placeholder="Enter area"
                    step="0.01"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Unit</Label>
                  <Select value={areaFromUnit} onValueChange={setAreaFromUnit}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {areaUnits.map(unit => (
                        <SelectItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="volume" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="volume-input">Volume Value</Label>
                  <Input
                    id="volume-input"
                    type="number"
                    value={volumeValue}
                    onChange={(e) => setVolumeValue(e.target.value)}
                    placeholder="Enter volume"
                    step="0.01"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Unit</Label>
                  <Select value={volumeFromUnit} onValueChange={setVolumeFromUnit}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {volumeUnits.map(unit => (
                        <SelectItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {(areaResults.length > 0 || volumeResults.length > 0) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {areaResults.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Area Conversions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {areaResults.map(({ unit, value }) => (
                  <Card key={unit.value} className={unit.value === areaFromUnit ? 'ring-2 ring-primary' : ''}>
                    <CardContent className="p-4">
                      <div className="text-sm text-muted-foreground">{unit.label}</div>
                      <div className="text-lg font-bold text-primary">
                        {value.toExponential(3)}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {volumeResults.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Volume Conversions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {volumeResults.map(({ unit, value }) => (
                  <Card key={unit.value} className={unit.value === volumeFromUnit ? 'ring-2 ring-primary' : ''}>
                    <CardContent className="p-4">
                      <div className="text-sm text-muted-foreground">{unit.label}</div>
                      <div className="text-lg font-bold text-primary">
                        {value < 0.001 || value > 1000000 ? value.toExponential(3) : value.toFixed(6)}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
