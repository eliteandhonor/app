
'use client';

import { useState } from 'react';
import { Dices, Shuffle, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

export function RandomNumberPicker() {
  // Random Number state
  const [minNumber, setMinNumber] = useState('1');
  const [maxNumber, setMaxNumber] = useState('100');
  const [quantity, setQuantity] = useState('1');
  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Random Name/Item Picker state
  const [itemList, setItemList] = useState('');
  const [customItems, setCustomItems] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isPickingItem, setIsPickingItem] = useState(false);

  const generateRandomNumbers = () => {
    const min = parseInt(minNumber) || 1;
    const max = parseInt(maxNumber) || 100;
    const qty = Math.min(parseInt(quantity) || 1, 100); // Limit to 100 numbers

    if (min >= max) {
      alert('Minimum number must be less than maximum number');
      return;
    }

    setIsGenerating(true);
    
    // Animate the generation
    setTimeout(() => {
      const numbers: number[] = [];
      const range = max - min + 1;
      
      if (qty > range) {
        // If quantity is more than possible unique numbers, allow duplicates
        for (let i = 0; i < qty; i++) {
          numbers.push(Math.floor(Math.random() * range) + min);
        }
      } else {
        // Generate unique numbers
        const availableNumbers = Array.from({ length: range }, (_, i) => i + min);
        for (let i = 0; i < qty; i++) {
          const randomIndex = Math.floor(Math.random() * availableNumbers.length);
          numbers.push(availableNumbers.splice(randomIndex, 1)[0]);
        }
      }
      
      setRandomNumbers(numbers);
      setIsGenerating(false);
    }, 500);
  };

  const addCustomItem = () => {
    if (itemList.trim()) {
      setCustomItems(prev => [...prev, itemList.trim()]);
      setItemList('');
    }
  };

  const removeCustomItem = (index: number) => {
    setCustomItems(prev => prev.filter((_, i) => i !== index));
  };

  const pickRandomItem = () => {
    const items = customItems.length > 0 ? customItems : getDefaultItems();
    
    if (items.length === 0) {
      alert('Please add some items to pick from');
      return;
    }

    setIsPickingItem(true);
    setSelectedItem(null);

    // Animate the picking process
    let animationCount = 0;
    const animationInterval = setInterval(() => {
      const randomItem = items[Math.floor(Math.random() * items.length)];
      setSelectedItem(randomItem);
      animationCount++;

      if (animationCount >= 10) {
        clearInterval(animationInterval);
        setIsPickingItem(false);
      }
    }, 100);
  };

  const getDefaultItems = (): string[] => {
    return [
      'Apple', 'Banana', 'Cherry', 'Date', 'Elderberry',
      'Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon'
    ];
  };

  const loadSampleItems = (type: string) => {
    const samples = {
      fruits: ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon'],
      colors: ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink', 'Brown', 'Black', 'White'],
      animals: ['Dog', 'Cat', 'Bird', 'Fish', 'Rabbit', 'Hamster', 'Turtle', 'Horse', 'Cow', 'Sheep'],
      names: ['Alice', 'Bob', 'Charlie', 'Diana', 'Edward', 'Fiona', 'George', 'Hannah', 'Ian', 'Julia']
    };
    
    setCustomItems(samples[type as keyof typeof samples] || []);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Dices className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Random Number & Name Picker</h2>
      </div>

      <Tabs defaultValue="numbers" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="numbers">Random Numbers</TabsTrigger>
          <TabsTrigger value="picker">Item Picker</TabsTrigger>
        </TabsList>

        <TabsContent value="numbers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Random Number Generator</CardTitle>
              <CardDescription>Generate random numbers within a specified range</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="min-number">Minimum</Label>
                  <Input
                    id="min-number"
                    type="number"
                    placeholder="1"
                    value={minNumber}
                    onChange={(e) => setMinNumber(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-number">Maximum</Label>
                  <Input
                    id="max-number"
                    type="number"
                    placeholder="100"
                    value={maxNumber}
                    onChange={(e) => setMaxNumber(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max="100"
                    placeholder="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
              </div>

              <Button 
                onClick={generateRandomNumbers} 
                className="w-full" 
                size="lg"
                disabled={isGenerating}
              >
                <Dices className={`h-5 w-5 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
                {isGenerating ? 'Generating...' : 'Generate Random Numbers'}
              </Button>

              {randomNumbers.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-semibold">Generated Numbers:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {randomNumbers.map((number, index) => (
                      <div
                        key={index}
                        className="p-4 bg-primary text-primary-foreground rounded-lg text-center font-bold text-xl animate-count"
                      >
                        {number}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setMinNumber('1');
                    setMaxNumber('6');
                    setQuantity('1');
                  }}
                >
                  Dice (1-6)
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setMinNumber('1');
                    setMaxNumber('10');
                    setQuantity('1');
                  }}
                >
                  1-10
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setMinNumber('1');
                    setMaxNumber('100');
                    setQuantity('1');
                  }}
                >
                  1-100
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setMinNumber('1');
                    setMaxNumber('1000');
                    setQuantity('1');
                  }}
                >
                  1-1000
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="picker" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Random Item Picker</CardTitle>
              <CardDescription>Pick a random item from your custom list</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter an item..."
                  value={itemList}
                  onChange={(e) => setItemList(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addCustomItem()}
                />
                <Button onClick={addCustomItem}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => loadSampleItems('fruits')}>
                  Load Fruits
                </Button>
                <Button variant="outline" size="sm" onClick={() => loadSampleItems('colors')}>
                  Load Colors
                </Button>
                <Button variant="outline" size="sm" onClick={() => loadSampleItems('animals')}>
                  Load Animals
                </Button>
                <Button variant="outline" size="sm" onClick={() => loadSampleItems('names')}>
                  Load Names
                </Button>
              </div>

              {customItems.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold">Your Items ({customItems.length}):</h3>
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {customItems.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                        <span>{item}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCustomItem(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button 
                onClick={pickRandomItem} 
                className="w-full" 
                size="lg"
                disabled={isPickingItem || (customItems.length === 0 && getDefaultItems().length === 0)}
              >
                <Shuffle className={`h-5 w-5 mr-2 ${isPickingItem ? 'animate-spin' : ''}`} />
                {isPickingItem ? 'Picking...' : 'Pick Random Item'}
              </Button>

              {selectedItem && (
                <div className="text-center space-y-4">
                  <h3 className="font-semibold">Selected Item:</h3>
                  <div className="p-6 bg-accent text-accent-foreground rounded-lg">
                    <div className="text-3xl font-bold animate-count">
                      🎉 {selectedItem} 🎉
                    </div>
                  </div>
                </div>
              )}

              {customItems.length === 0 && (
                <div className="p-4 bg-muted rounded-lg text-center text-muted-foreground">
                  Add items above or use sample data to get started
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
