
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Receipt, Users, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export function TipCalculator() {
  const [billAmount, setBillAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState([18]);
  const [numberOfPeople, setNumberOfPeople] = useState('1');
  const [customTip, setCustomTip] = useState('');

  const bill = parseFloat(billAmount) || 0;
  const people = parseInt(numberOfPeople) || 1;
  const tipPercent = customTip ? parseFloat(customTip) : tipPercentage[0];
  
  const tipAmount = (bill * tipPercent) / 100;
  const totalAmount = bill + tipAmount;
  const perPersonBill = bill / people;
  const perPersonTip = tipAmount / people;
  const perPersonTotal = totalAmount / people;

  const quickTipButtons = [10, 15, 18, 20, 25];

  const setQuickTip = (percent: number) => {
    setTipPercentage([percent]);
    setCustomTip('');
  };

  const reset = () => {
    setBillAmount('');
    setTipPercentage([18]);
    setNumberOfPeople('1');
    setCustomTip('');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-primary" />
            Bill Details
          </CardTitle>
          <CardDescription>
            Enter your bill amount and tip preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="bill">Bill Amount ($)</Label>
            <Input
              id="bill"
              type="number"
              placeholder="0.00"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
              step="0.01"
              min="0"
            />
          </div>

          <div className="space-y-4">
            <Label>Tip Percentage</Label>
            <div className="flex gap-2 flex-wrap">
              {quickTipButtons.map((percent) => (
                <Button
                  key={percent}
                  variant={tipPercentage[0] === percent && !customTip ? "default" : "outline"}
                  size="sm"
                  onClick={() => setQuickTip(percent)}
                >
                  {percent}%
                </Button>
              ))}
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Custom: {customTip || tipPercentage[0]}%</span>
              </div>
              {!customTip && (
                <Slider
                  value={tipPercentage}
                  onValueChange={setTipPercentage}
                  max={50}
                  min={0}
                  step={1}
                  className="w-full"
                />
              )}
              <Input
                type="number"
                placeholder="Custom tip %"
                value={customTip}
                onChange={(e) => setCustomTip(e.target.value)}
                min="0"
                max="100"
                step="0.1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="people">Number of People</Label>
            <Input
              id="people"
              type="number"
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(e.target.value)}
              min="1"
              max="50"
            />
          </div>

          <Button onClick={reset} variant="outline" className="w-full">
            Reset Calculator
          </Button>
        </CardContent>
      </Card>

      {bill > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Total Bill
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold">${bill.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tip ({tipPercent}%):</span>
                  <span className="font-semibold text-accent">${tipAmount.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-primary">${totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {people > 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Per Person ({people} people)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Bill per person:</span>
                    <span className="font-semibold">${perPersonBill.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tip per person:</span>
                    <span className="font-semibold text-accent">${perPersonTip.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total per person:</span>
                      <span className="text-primary">${perPersonTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      )}
    </div>
  );
}
