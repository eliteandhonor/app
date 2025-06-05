
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Trash2, Crown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  unitPrice: number;
}

export function UnitPriceCalculator() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Product A', price: 0, quantity: 0, unit: 'oz', unitPrice: 0 },
    { id: 2, name: 'Product B', price: 0, quantity: 0, unit: 'oz', unitPrice: 0 }
  ]);

  const updateProduct = (id: number, field: keyof Product, value: string | number) => {
    setProducts(prev => prev.map(product => {
      if (product.id === id) {
        const updated = { ...product, [field]: value };
        // Recalculate unit price when price or quantity changes
        if (field === 'price' || field === 'quantity') {
          const price = field === 'price' ? Number(value) : updated.price;
          const quantity = field === 'quantity' ? Number(value) : updated.quantity;
          updated.unitPrice = quantity > 0 ? price / quantity : 0;
        }
        return updated;
      }
      return product;
    }));
  };

  const addProduct = () => {
    const newId = Math.max(...products.map(p => p.id)) + 1;
    setProducts(prev => [...prev, {
      id: newId,
      name: `Product ${String.fromCharCode(65 + prev.length)}`,
      price: 0,
      quantity: 0,
      unit: 'oz',
      unitPrice: 0
    }]);
  };

  const removeProduct = (id: number) => {
    if (products.length > 2) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const validProducts = products.filter(p => p.price > 0 && p.quantity > 0);
  const bestValue = validProducts.length > 0 
    ? validProducts.reduce((best, current) => 
        current.unitPrice < best.unitPrice ? current : best
      )
    : null;

  const commonUnits = ['oz', 'lb', 'g', 'kg', 'ml', 'l', 'fl oz', 'qt', 'gal', 'each', 'pack'];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-primary" />
            Unit Price Comparison
          </CardTitle>
          <CardDescription>
            Compare unit prices to find the best value between products
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 border rounded-lg ${
                  bestValue && product.id === bestValue.id 
                    ? 'border-green-500 bg-green-50 dark:bg-green-950/20' 
                    : 'border-border'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Label className="font-medium">{product.name}</Label>
                    {bestValue && product.id === bestValue.id && (
                      <Crown className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                  {products.length > 2 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor={`name-${product.id}`}>Product Name</Label>
                    <Input
                      id={`name-${product.id}`}
                      value={product.name}
                      onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
                      placeholder="Product name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`price-${product.id}`}>Price ($)</Label>
                    <Input
                      id={`price-${product.id}`}
                      type="number"
                      step="0.01"
                      value={product.price || ''}
                      onChange={(e) => updateProduct(product.id, 'price', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`quantity-${product.id}`}>Quantity</Label>
                    <div className="flex gap-2">
                      <Input
                        id={`quantity-${product.id}`}
                        type="number"
                        step="0.01"
                        value={product.quantity || ''}
                        onChange={(e) => updateProduct(product.id, 'quantity', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                        className="flex-1"
                      />
                      <select
                        value={product.unit}
                        onChange={(e) => updateProduct(product.id, 'unit', e.target.value)}
                        className="px-3 py-2 border border-input bg-background rounded-md text-sm"
                      >
                        {commonUnits.map(unit => (
                          <option key={unit} value={unit}>{unit}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Unit Price</Label>
                    <div className="p-2 bg-muted rounded-md text-center">
                      <div className="font-bold text-primary">
                        ${product.unitPrice.toFixed(3)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        per {product.unit}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <Button onClick={addProduct} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>

          {bestValue && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-green-50 dark:bg-green-950/20 border-green-500">
                <CardContent className="pt-6">
                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <Crown className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-700 dark:text-green-400">
                        Best Value
                      </span>
                    </div>
                    <div className="text-xl font-bold">{bestValue.name}</div>
                    <div className="text-lg text-green-600">
                      ${bestValue.unitPrice.toFixed(3)} per {bestValue.unit}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ${bestValue.price} for {bestValue.quantity} {bestValue.unit}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
