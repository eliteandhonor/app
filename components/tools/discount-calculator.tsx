
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, Calculator, Percent } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPercent, setDiscountPercent] = useState('');
  const [discountAmount, setDiscountAmount] = useState('');
  const [finalPrice, setFinalPrice] = useState('');

  const calculateFromPercent = () => {
    const price = parseFloat(originalPrice);
    const percent = parseFloat(discountPercent);
    
    if (isNaN(price) || isNaN(percent)) return;
    
    const discount = (price * percent) / 100;
    const final = price - discount;
    
    setDiscountAmount(discount.toFixed(2));
    setFinalPrice(final.toFixed(2));
  };

  const calculateFromAmount = () => {
    const price = parseFloat(originalPrice);
    const amount = parseFloat(discountAmount);
    
    if (isNaN(price) || isNaN(amount)) return;
    
    const percent = (amount / price) * 100;
    const final = price - amount;
    
    setDiscountPercent(percent.toFixed(2));
    setFinalPrice(final.toFixed(2));
  };

  const calculateFromFinal = () => {
    const price = parseFloat(originalPrice);
    const final = parseFloat(finalPrice);
    
    if (isNaN(price) || isNaN(final)) return;
    
    const amount = price - final;
    const percent = (amount / price) * 100;
    
    setDiscountAmount(amount.toFixed(2));
    setDiscountPercent(percent.toFixed(2));
  };

  const clearAll = () => {
    setOriginalPrice('');
    setDiscountPercent('');
    setDiscountAmount('');
    setFinalPrice('');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5 text-primary" />
            Discount Calculator
          </CardTitle>
          <CardDescription>
            Calculate discounts, sale prices, and savings amounts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="original-price">Original Price ($)</Label>
                <Input
                  id="original-price"
                  type="number"
                  placeholder="100.00"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="discount-percent">Discount Percentage (%)</Label>
                <div className="flex gap-2">
                  <Input
                    id="discount-percent"
                    type="number"
                    placeholder="20"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(e.target.value)}
                  />
                  <Button onClick={calculateFromPercent} size="sm">
                    <Calculator className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="discount-amount">Discount Amount ($)</Label>
                <div className="flex gap-2">
                  <Input
                    id="discount-amount"
                    type="number"
                    placeholder="20.00"
                    value={discountAmount}
                    onChange={(e) => setDiscountAmount(e.target.value)}
                  />
                  <Button onClick={calculateFromAmount} size="sm">
                    <Calculator className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="final-price">Final Price ($)</Label>
                <div className="flex gap-2">
                  <Input
                    id="final-price"
                    type="number"
                    placeholder="80.00"
                    value={finalPrice}
                    onChange={(e) => setFinalPrice(e.target.value)}
                  />
                  <Button onClick={calculateFromFinal} size="sm">
                    <Calculator className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button onClick={clearAll} variant="outline" className="w-full">
                Clear All
              </Button>
            </div>

            <div className="space-y-4">
              {originalPrice && discountPercent && discountAmount && finalPrice && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <Card className="bg-muted/50">
                    <CardContent className="pt-6">
                      <div className="text-center space-y-2">
                        <div className="text-sm text-muted-foreground">You Save</div>
                        <div className="text-2xl font-bold text-green-600">
                          ${discountAmount}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ({discountPercent}% off)
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-primary/5">
                    <CardContent className="pt-6">
                      <div className="text-center space-y-2">
                        <div className="text-sm text-muted-foreground">Final Price</div>
                        <div className="text-3xl font-bold text-primary">
                          ${finalPrice}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Original: ${originalPrice}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Percent className="h-4 w-4 text-primary" />
            Quick Discount Examples
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[10, 15, 20, 25, 30, 40, 50, 75].map((percent) => (
              <Button
                key={percent}
                variant="outline"
                onClick={() => {
                  setDiscountPercent(percent.toString());
                  if (originalPrice) {
                    const price = parseFloat(originalPrice);
                    const discount = (price * percent) / 100;
                    const final = price - discount;
                    setDiscountAmount(discount.toFixed(2));
                    setFinalPrice(final.toFixed(2));
                  }
                }}
                className="h-auto py-3"
              >
                <div className="text-center">
                  <div className="font-bold">{percent}%</div>
                  <div className="text-xs text-muted-foreground">off</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
