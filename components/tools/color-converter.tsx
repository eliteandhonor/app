
'use client';

import { useState, useEffect } from 'react';
import { Palette, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ColorValues {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
}

export function ColorConverter() {
  const [color, setColor] = useState<ColorValues>({
    hex: '#3B82F6',
    rgb: { r: 59, g: 130, b: 246 },
    hsl: { h: 217, s: 91, l: 60 }
  });
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHex = (r: number, g: number, b: number): string => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
    h /= 360;
    s /= 100;
    l /= 100;

    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  };

  const updateFromHex = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (rgb) {
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      setColor({ hex, rgb, hsl });
    }
  };

  const updateFromRgb = (r: number, g: number, b: number) => {
    const hex = rgbToHex(r, g, b);
    const hsl = rgbToHsl(r, g, b);
    setColor({ hex, rgb: { r, g, b }, hsl });
  };

  const updateFromHsl = (h: number, s: number, l: number) => {
    const rgb = hslToRgb(h, s, l);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    setColor({ hex, rgb, hsl: { h, s, l } });
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const generatePalette = () => {
    const baseHue = color.hsl.h;
    const baseSat = color.hsl.s;
    const baseLit = color.hsl.l;

    return [
      // Complementary
      hslToRgb((baseHue + 180) % 360, baseSat, baseLit),
      // Triadic
      hslToRgb((baseHue + 120) % 360, baseSat, baseLit),
      hslToRgb((baseHue + 240) % 360, baseSat, baseLit),
      // Analogous
      hslToRgb((baseHue + 30) % 360, baseSat, baseLit),
      hslToRgb((baseHue - 30 + 360) % 360, baseSat, baseLit),
      // Lighter/Darker
      hslToRgb(baseHue, baseSat, Math.min(baseLit + 20, 100)),
      hslToRgb(baseHue, baseSat, Math.max(baseLit - 20, 0)),
    ].map(rgb => rgbToHex(rgb.r, rgb.g, rgb.b));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Palette className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Color Picker & Converter</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Color Preview</CardTitle>
          <CardDescription>Current color and its values</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div 
              className="w-24 h-24 rounded-lg border-2 border-border shadow-sm"
              style={{ backgroundColor: color.hex }}
            />
            <div className="flex-1 space-y-2">
              <div className="flex items-center space-x-2">
                <Input
                  type="color"
                  value={color.hex}
                  onChange={(e) => updateFromHex(e.target.value)}
                  className="w-16 h-10 p-1 border rounded"
                />
                <span className="text-sm text-muted-foreground">Click to pick a color</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="hex" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="hex">HEX</TabsTrigger>
          <TabsTrigger value="rgb">RGB</TabsTrigger>
          <TabsTrigger value="hsl">HSL</TabsTrigger>
        </TabsList>

        <TabsContent value="hex" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">HEX Color</CardTitle>
              <CardDescription>Hexadecimal color representation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  value={color.hex}
                  onChange={(e) => updateFromHex(e.target.value)}
                  placeholder="#000000"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(color.hex, 'hex')}
                >
                  {copiedField === 'hex' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rgb" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">RGB Color</CardTitle>
              <CardDescription>Red, Green, Blue values (0-255)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Red</Label>
                  <Input
                    type="number"
                    min="0"
                    max="255"
                    value={color.rgb.r}
                    onChange={(e) => updateFromRgb(parseInt(e.target.value) || 0, color.rgb.g, color.rgb.b)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Green</Label>
                  <Input
                    type="number"
                    min="0"
                    max="255"
                    value={color.rgb.g}
                    onChange={(e) => updateFromRgb(color.rgb.r, parseInt(e.target.value) || 0, color.rgb.b)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Blue</Label>
                  <Input
                    type="number"
                    min="0"
                    max="255"
                    value={color.rgb.b}
                    onChange={(e) => updateFromRgb(color.rgb.r, color.rgb.g, parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <Input
                  value={`rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`}
                  readOnly
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(`rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`, 'rgb')}
                >
                  {copiedField === 'rgb' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hsl" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">HSL Color</CardTitle>
              <CardDescription>Hue, Saturation, Lightness values</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Hue (0-360°)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="360"
                    value={color.hsl.h}
                    onChange={(e) => updateFromHsl(parseInt(e.target.value) || 0, color.hsl.s, color.hsl.l)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Saturation (0-100%)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={color.hsl.s}
                    onChange={(e) => updateFromHsl(color.hsl.h, parseInt(e.target.value) || 0, color.hsl.l)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Lightness (0-100%)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={color.hsl.l}
                    onChange={(e) => updateFromHsl(color.hsl.h, color.hsl.s, parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <Input
                  value={`hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`}
                  readOnly
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(`hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`, 'hsl')}
                >
                  {copiedField === 'hsl' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Color Palette</CardTitle>
          <CardDescription>Harmonious colors based on your selection</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
            {generatePalette().map((paletteColor, index) => (
              <div key={index} className="space-y-2">
                <div
                  className="w-full h-16 rounded-lg border cursor-pointer hover:scale-105 transition-transform"
                  style={{ backgroundColor: paletteColor }}
                  onClick={() => updateFromHex(paletteColor)}
                  title={`Click to use ${paletteColor}`}
                />
                <p className="text-xs text-center font-mono">{paletteColor}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Color Information</CardTitle>
          <CardDescription>Additional details about your color</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-medium">Brightness</h4>
              <p className="text-muted-foreground">
                {color.hsl.l > 50 ? 'Light' : 'Dark'} ({color.hsl.l}%)
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Saturation</h4>
              <p className="text-muted-foreground">
                {color.hsl.s > 75 ? 'Vivid' : color.hsl.s > 25 ? 'Moderate' : 'Muted'} ({color.hsl.s}%)
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Contrast</h4>
              <p className="text-muted-foreground">
                Use {color.hsl.l > 50 ? 'dark' : 'light'} text for best readability
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
