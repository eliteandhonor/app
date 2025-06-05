
'use client';

import { useState } from 'react';
import { Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function PercentageCalculator() {
  const [basicValue, setBasicValue] = useState('');
  const [basicPercent, setBasicPercent] = useState('');
  const [basicResult, setBasicResult] = useState<number | null>(null);

  const [increaseOriginal, setIncreaseOriginal] = useState('');
  const [increasePercent, setIncreasePercent] = useState('');
  const [increaseResult, setIncreaseResult] = useState<number | null>(null);

  const [partValue, setPartValue] = useState('');
  const [wholeValue, setWholeValue] = useState('');
  const [percentOfResult, setPercentOfResult] = useState<number | null>(null);

  const calculateBasic = () => {
    const value = parseFloat(basicValue);
    const percent = parseFloat(basicPercent);
    if (!isNaN(value) && !isNaN(percent)) {
      setBasicResult((value * percent) / 100);
    }
  };

  const calculateIncrease = () => {
    const original = parseFloat(increaseOriginal);
    const percent = parseFloat(increasePercent);
    if (!isNaN(original) && !isNaN(percent)) {
      setIncreaseResult(original + (original * percent) / 100);
    }
  };

  const calculatePercentOf = () => {
    const part = parseFloat(partValue);
    const whole = parseFloat(wholeValue);
    if (!isNaN(part) && !isNaN(whole) && whole !== 0) {
      setPercentOfResult((part / whole) * 100);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Calculator className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Percentage Calculator</h2>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic %</TabsTrigger>
          <TabsTrigger value="increase">% Increase</TabsTrigger>
          <TabsTrigger value="percent-of">% Of</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Calculate Percentage</CardTitle>
              <CardDescription>Find what percentage of a number is</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="basic-value">Value</Label>
                  <Input
                    id="basic-value"
                    type="number"
                    placeholder="Enter value"
                    value={basicValue}
                    onChange={(e) => setBasicValue(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="basic-percent">Percentage</Label>
                  <Input
                    id="basic-percent"
                    type="number"
                    placeholder="Enter percentage"
                    value={basicPercent}
                    onChange={(e) => setBasicPercent(e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={calculateBasic} className="w-full">
                Calculate
              </Button>
              {basicResult !== null && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-lg font-semibold">
                    {basicPercent}% of {basicValue} = <span className="text-primary">{basicResult.toFixed(2)}</span>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="increase" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Percentage Increase</CardTitle>
              <CardDescription>Calculate value after percentage increase</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="increase-original">Original Value</Label>
                  <Input
                    id="increase-original"
                    type="number"
                    placeholder="Enter original value"
                    value={increaseOriginal}
                    onChange={(e) => setIncreaseOriginal(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="increase-percent">Increase %</Label>
                  <Input
                    id="increase-percent"
                    type="number"
                    placeholder="Enter increase percentage"
                    value={increasePercent}
                    onChange={(e) => setIncreasePercent(e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={calculateIncrease} className="w-full">
                Calculate
              </Button>
              {increaseResult !== null && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-lg font-semibold">
                    {increaseOriginal} + {increasePercent}% = <span className="text-primary">{increaseResult.toFixed(2)}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Increase amount: {((increaseResult - parseFloat(increaseOriginal)) || 0).toFixed(2)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="percent-of" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What Percent Of</CardTitle>
              <CardDescription>Find what percent one number is of another</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="part-value">Part Value</Label>
                  <Input
                    id="part-value"
                    type="number"
                    placeholder="Enter part value"
                    value={partValue}
                    onChange={(e) => setPartValue(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whole-value">Whole Value</Label>
                  <Input
                    id="whole-value"
                    type="number"
                    placeholder="Enter whole value"
                    value={wholeValue}
                    onChange={(e) => setWholeValue(e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={calculatePercentOf} className="w-full">
                Calculate
              </Button>
              {percentOfResult !== null && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-lg font-semibold">
                    {partValue} is <span className="text-primary">{percentOfResult.toFixed(2)}%</span> of {wholeValue}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
