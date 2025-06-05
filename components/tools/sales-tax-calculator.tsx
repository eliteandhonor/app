
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Receipt, Calculator, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

export function SalesTaxCalculator() {
  const [price, setPrice] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [taxInclusive, setTaxInclusive] = useState(false);

  const calculateTax = () => {
    const priceNum = parseFloat(price);
    const rateNum = parseFloat(taxRate);
    
    if (isNaN(priceNum) || isNaN(rateNum)) return null;
    
    if (taxInclusive) {
      // Price includes tax - calculate base price and tax amount
      const basePrice = priceNum / (1 + rateNum / 100);
      const taxAmount = priceNum - basePrice;
      return {
        basePrice: basePrice.toFixed(2),
        taxAmount: taxAmount.toFixed(2),
        totalPrice: priceNum.toFixed(2)
      };
    } else {
      // Price excludes tax - calculate tax amount and total
      const taxAmount = (priceNum * rateNum) / 100;
      const totalPrice = priceNum + taxAmount;
      return {
        basePrice: priceNum.toFixed(2),
        taxAmount: taxAmount.toFixed(2),
        totalPrice: totalPrice.toFixed(2)
      };
    }
  };

  const result = calculateTax();

  const commonTaxRates = [
    { name: 'No Tax', rate: 0 },
    { name: 'Low', rate: 5 },
    { name: 'Standard', rate: 8.25 },
    { name: 'High', rate: 10 },
    { name: 'VAT (UK)', rate: 20 },
    { name: 'GST (Canada)', rate: 13 }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-primary" />
            Sales Tax Calculator
          </CardTitle>
          <CardDescription>
            Calculate sales tax and total price with tax included or excluded
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="100.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                <Input
                  id="tax-rate"
                  type="number"
                  placeholder="8.25"
                  step="0.01"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="tax-inclusive"
                  checked={taxInclusive}
                  onCheckedChange={setTaxInclusive}
                />
                <Label htmlFor="tax-inclusive">
                  Price includes tax
                </Label>
              </div>

              <div className="text-sm text-muted-foreground">
                {taxInclusive 
                  ? "The entered price already includes tax. We'll calculate the base price and tax amount."
                  : "The entered price excludes tax. We'll calculate the tax amount and total price."
                }
              </div>
            </div>

            <div className="space-y-4">
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <Card className="bg-muted/50">
                    <CardContent className="pt-6 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Base Price:</span>
                        <span className="font-medium">${result.basePrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax ({taxRate}%):</span>
                        <span className="font-medium text-orange-600">${result.taxAmount}</span>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between">
                          <span className="font-medium">Total Price:</span>
                          <span className="text-xl font-bold text-primary">${result.totalPrice}</span>
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
            <Calculator className="h-4 w-4 text-primary" />
            Common Tax Rates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {commonTaxRates.map((tax) => (
              <Button
                key={tax.name}
                variant="outline"
                onClick={() => setTaxRate(tax.rate.toString())}
                className="h-auto py-3"
              >
                <div className="text-center">
                  <div className="font-medium">{tax.name}</div>
                  <div className="text-sm text-muted-foreground">{tax.rate}%</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
