
'use client';

import { useState } from 'react';
import { Activity, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface BMIResult {
  bmi: number;
  category: string;
  description: string;
  color: string;
}

export function BMICalculator() {
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [weightLbs, setWeightLbs] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [unit, setUnit] = useState('imperial');
  const [result, setResult] = useState<BMIResult | null>(null);

  const getBMICategory = (bmi: number): Omit<BMIResult, 'bmi'> => {
    if (bmi < 18.5) {
      return {
        category: 'Underweight',
        description: 'Below normal weight range',
        color: 'text-blue-600'
      };
    } else if (bmi < 25) {
      return {
        category: 'Normal weight',
        description: 'Healthy weight range',
        color: 'text-green-600'
      };
    } else if (bmi < 30) {
      return {
        category: 'Overweight',
        description: 'Above normal weight range',
        color: 'text-yellow-600'
      };
    } else {
      return {
        category: 'Obese',
        description: 'Significantly above normal weight range',
        color: 'text-red-600'
      };
    }
  };

  const calculateBMI = () => {
    let heightInMeters: number;
    let weightInKg: number;

    if (unit === 'imperial') {
      const feet = parseFloat(heightFeet) || 0;
      const inches = parseFloat(heightInches) || 0;
      const totalInches = feet * 12 + inches;
      heightInMeters = totalInches * 0.0254;
      weightInKg = parseFloat(weightLbs) * 0.453592;
    } else {
      heightInMeters = parseFloat(heightCm) / 100;
      weightInKg = parseFloat(weightKg);
    }

    if (heightInMeters > 0 && weightInKg > 0) {
      const bmi = weightInKg / (heightInMeters * heightInMeters);
      const category = getBMICategory(bmi);
      
      setResult({
        bmi,
        ...category
      });
    }
  };

  const getBMIRanges = () => [
    { range: 'Below 18.5', category: 'Underweight', color: 'bg-blue-100 text-blue-800' },
    { range: '18.5 - 24.9', category: 'Normal weight', color: 'bg-green-100 text-green-800' },
    { range: '25.0 - 29.9', category: 'Overweight', color: 'bg-yellow-100 text-yellow-800' },
    { range: '30.0 and above', category: 'Obese', color: 'bg-red-100 text-red-800' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Activity className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">BMI Calculator</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Calculate Your BMI</CardTitle>
          <CardDescription>Enter your height and weight to calculate your Body Mass Index</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs value={unit} onValueChange={setUnit} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="imperial">Imperial (ft/in, lbs)</TabsTrigger>
              <TabsTrigger value="metric">Metric (cm, kg)</TabsTrigger>
            </TabsList>

            <TabsContent value="imperial" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Label>Height</Label>
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <Input
                        type="number"
                        placeholder="Feet"
                        value={heightFeet}
                        onChange={(e) => setHeightFeet(e.target.value)}
                      />
                    </div>
                    <div className="flex-1">
                      <Input
                        type="number"
                        placeholder="Inches"
                        value={heightInches}
                        onChange={(e) => setHeightInches(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight-lbs">Weight (lbs)</Label>
                  <Input
                    id="weight-lbs"
                    type="number"
                    placeholder="Enter weight in pounds"
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="metric" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height-cm">Height (cm)</Label>
                  <Input
                    id="height-cm"
                    type="number"
                    placeholder="Enter height in centimeters"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight-kg">Weight (kg)</Label>
                  <Input
                    id="weight-kg"
                    type="number"
                    placeholder="Enter weight in kilograms"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <Button onClick={calculateBMI} className="w-full">
            Calculate BMI
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Scale className="h-5 w-5" />
              <span>Your BMI Result</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="space-y-2">
                <p className="text-4xl font-bold text-primary">{result.bmi.toFixed(1)}</p>
                <p className={`text-xl font-semibold ${result.color}`}>{result.category}</p>
                <p className="text-muted-foreground">{result.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">BMI Categories</CardTitle>
          <CardDescription>Understanding BMI ranges and what they mean</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {getBMIRanges().map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 rounded-lg border">
                <div>
                  <span className="font-medium">{item.category}</span>
                  <span className="text-muted-foreground ml-2">BMI {item.range}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.color}`}>
                  {item.category}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> BMI is a screening tool and not a diagnostic measure. 
              It doesn't account for muscle mass, bone density, or body composition. 
              Consult with a healthcare professional for a comprehensive health assessment.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
