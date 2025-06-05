
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Palette } from 'lucide-react';
import { toast } from 'sonner';

interface Color {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
}

export function ColorPaletteGenerator() {
  const [baseColor, setBaseColor] = useState('#3b82f6');
  const [paletteType, setPaletteType] = useState('complementary');
  const [palette, setPalette] = useState<Color[]>([]);

  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
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

    return { h: h * 360, s: s * 100, l: l * 100 };
  };

  const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
    h /= 360;
    s /= 100;
    l /= 100;

    const hue2rgb = (p: number, q: number, t: number) => {
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

  const rgbToHex = (r: number, g: number, b: number): string => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  const createColor = (hex: string): Color => {
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    return { hex, rgb, hsl };
  };

  const generatePalette = () => {
    const baseRgb = hexToRgb(baseColor);
    const baseHsl = rgbToHsl(baseRgb.r, baseRgb.g, baseRgb.b);
    const colors: Color[] = [createColor(baseColor)];

    switch (paletteType) {
      case 'complementary':
        const compHue = (baseHsl.h + 180) % 360;
        const compRgb = hslToRgb(compHue, baseHsl.s, baseHsl.l);
        colors.push(createColor(rgbToHex(compRgb.r, compRgb.g, compRgb.b)));
        break;

      case 'triadic':
        for (let i = 1; i < 3; i++) {
          const triadicHue = (baseHsl.h + i * 120) % 360;
          const triadicRgb = hslToRgb(triadicHue, baseHsl.s, baseHsl.l);
          colors.push(createColor(rgbToHex(triadicRgb.r, triadicRgb.g, triadicRgb.b)));
        }
        break;

      case 'analogous':
        for (let i = 1; i <= 4; i++) {
          const analogousHue = (baseHsl.h + i * 30) % 360;
          const analogousRgb = hslToRgb(analogousHue, baseHsl.s, baseHsl.l);
          colors.push(createColor(rgbToHex(analogousRgb.r, analogousRgb.g, analogousRgb.b)));
        }
        break;

      case 'monochromatic':
        const lightnesses = [20, 40, 60, 80];
        lightnesses.forEach(lightness => {
          const monoRgb = hslToRgb(baseHsl.h, baseHsl.s, lightness);
          colors.push(createColor(rgbToHex(monoRgb.r, monoRgb.g, monoRgb.b)));
        });
        break;

      case 'tetradic':
        const tetHues = [90, 180, 270];
        tetHues.forEach(offset => {
          const tetHue = (baseHsl.h + offset) % 360;
          const tetRgb = hslToRgb(tetHue, baseHsl.s, baseHsl.l);
          colors.push(createColor(rgbToHex(tetRgb.r, tetRgb.g, tetRgb.b)));
        });
        break;
    }

    setPalette(colors);
  };

  const copyColor = async (color: Color) => {
    try {
      await navigator.clipboard.writeText(color.hex);
      toast.success(`Color ${color.hex} copied to clipboard!`);
    } catch (err) {
      toast.error('Failed to copy color');
    }
  };

  const copyPalette = async () => {
    try {
      const paletteText = palette.map(color => color.hex).join('\n');
      await navigator.clipboard.writeText(paletteText);
      toast.success('Palette copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy palette');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Color Palette Generator</CardTitle>
          <CardDescription>
            Generate beautiful color palettes and schemes for design projects
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="baseColor">Base Color</Label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="w-12 h-10 rounded border border-input"
                />
                <input
                  type="text"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="flex-1 px-3 py-2 border border-input rounded-md font-mono text-sm"
                  placeholder="#3b82f6"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="paletteType">Palette Type</Label>
              <Select value={paletteType} onValueChange={setPaletteType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="complementary">Complementary</SelectItem>
                  <SelectItem value="triadic">Triadic</SelectItem>
                  <SelectItem value="analogous">Analogous</SelectItem>
                  <SelectItem value="monochromatic">Monochromatic</SelectItem>
                  <SelectItem value="tetradic">Tetradic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={generatePalette} className="flex-1">
              <Palette className="w-4 h-4 mr-2" />
              Generate Palette
            </Button>
            {palette.length > 0 && (
              <Button variant="outline" onClick={copyPalette}>
                <Copy className="w-4 h-4 mr-2" />
                Copy All
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {palette.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Palette</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {palette.map((color, index) => (
                <div key={index} className="space-y-2">
                  <div
                    className="w-full h-24 rounded-lg border cursor-pointer transition-transform hover:scale-105"
                    style={{ backgroundColor: color.hex }}
                    onClick={() => copyColor(color)}
                  />
                  <div className="space-y-1 text-sm">
                    <div className="font-mono font-medium">{color.hex}</div>
                    <div className="text-muted-foreground">
                      RGB({color.rgb.r}, {color.rgb.g}, {color.rgb.b})
                    </div>
                    <div className="text-muted-foreground">
                      HSL({Math.round(color.hsl.h)}°, {Math.round(color.hsl.s)}%, {Math.round(color.hsl.l)}%)
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Palette Types</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p><strong>Complementary:</strong> Colors opposite each other on the color wheel</p>
          <p><strong>Triadic:</strong> Three colors evenly spaced around the color wheel</p>
          <p><strong>Analogous:</strong> Colors adjacent to each other on the color wheel</p>
          <p><strong>Monochromatic:</strong> Different shades and tints of the same color</p>
          <p><strong>Tetradic:</strong> Four colors forming a rectangle on the color wheel</p>
        </CardContent>
      </Card>
    </div>
  );
}
