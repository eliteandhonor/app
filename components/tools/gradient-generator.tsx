
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface ColorStop {
  color: string;
  position: number;
}

export function GradientGenerator() {
  const [type, setType] = useState<'linear' | 'radial'>('linear');
  const [direction, setDirection] = useState('to right');
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { color: '#3b82f6', position: 0 },
    { color: '#8b5cf6', position: 100 }
  ]);

  const directions = [
    { value: 'to right', label: 'To Right' },
    { value: 'to left', label: 'To Left' },
    { value: 'to bottom', label: 'To Bottom' },
    { value: 'to top', label: 'To Top' },
    { value: 'to bottom right', label: 'To Bottom Right' },
    { value: 'to bottom left', label: 'To Bottom Left' },
    { value: 'to top right', label: 'To Top Right' },
    { value: 'to top left', label: 'To Top Left' },
    { value: '45deg', label: '45°' },
    { value: '90deg', label: '90°' },
    { value: '135deg', label: '135°' },
    { value: '180deg', label: '180°' }
  ];

  const radialShapes = [
    { value: 'circle', label: 'Circle' },
    { value: 'ellipse', label: 'Ellipse' },
    { value: 'circle at center', label: 'Circle at Center' },
    { value: 'ellipse at center', label: 'Ellipse at Center' },
    { value: 'circle at top left', label: 'Circle at Top Left' },
    { value: 'circle at top right', label: 'Circle at Top Right' },
    { value: 'circle at bottom left', label: 'Circle at Bottom Left' },
    { value: 'circle at bottom right', label: 'Circle at Bottom Right' }
  ];

  const generateCSS = () => {
    const stops = colorStops
      .sort((a, b) => a.position - b.position)
      .map(stop => `${stop.color} ${stop.position}%`)
      .join(', ');

    if (type === 'linear') {
      return `background: linear-gradient(${direction}, ${stops});`;
    } else {
      return `background: radial-gradient(${direction}, ${stops});`;
    }
  };

  const generateGradientStyle = () => {
    const stops = colorStops
      .sort((a, b) => a.position - b.position)
      .map(stop => `${stop.color} ${stop.position}%`)
      .join(', ');

    if (type === 'linear') {
      return `linear-gradient(${direction}, ${stops})`;
    } else {
      return `radial-gradient(${direction}, ${stops})`;
    }
  };

  const addColorStop = () => {
    const newPosition = colorStops.length > 0 
      ? Math.max(...colorStops.map(s => s.position)) + 10 
      : 50;
    setColorStops([...colorStops, { color: '#ff0000', position: Math.min(newPosition, 100) }]);
  };

  const removeColorStop = (index: number) => {
    if (colorStops.length > 2) {
      setColorStops(colorStops.filter((_, i) => i !== index));
    }
  };

  const updateColorStop = (index: number, field: keyof ColorStop, value: string | number) => {
    const updated = [...colorStops];
    updated[index] = { ...updated[index], [field]: value };
    setColorStops(updated);
  };

  const copyCSS = async () => {
    try {
      await navigator.clipboard.writeText(generateCSS());
      toast.success('CSS copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy CSS');
    }
  };

  const presetGradients = [
    { name: 'Ocean Blue', stops: [{ color: '#2196F3', position: 0 }, { color: '#21CBF3', position: 100 }] },
    { name: 'Sunset', stops: [{ color: '#FF5722', position: 0 }, { color: '#FF9800', position: 50 }, { color: '#FFC107', position: 100 }] },
    { name: 'Purple Rain', stops: [{ color: '#9C27B0', position: 0 }, { color: '#673AB7', position: 100 }] },
    { name: 'Green Forest', stops: [{ color: '#4CAF50', position: 0 }, { color: '#8BC34A', position: 100 }] }
  ];

  const applyPreset = (preset: typeof presetGradients[0]) => {
    setColorStops(preset.stops);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>CSS Gradient Generator</CardTitle>
          <CardDescription>
            Create beautiful CSS gradients with live preview and code export
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Gradient Type</Label>
              <Select value={type} onValueChange={(value: any) => setType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="linear">Linear</SelectItem>
                  <SelectItem value="radial">Radial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Direction/Shape</Label>
              <Select value={direction} onValueChange={setDirection}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(type === 'linear' ? directions : radialShapes).map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Color Stops</Label>
              <Button variant="outline" size="sm" onClick={addColorStop}>
                <Plus className="w-4 h-4 mr-2" />
                Add Stop
              </Button>
            </div>
            {colorStops.map((stop, index) => (
              <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                <input
                  type="color"
                  value={stop.color}
                  onChange={(e) => updateColorStop(index, 'color', e.target.value)}
                  className="w-12 h-8 rounded border"
                />
                <Input
                  value={stop.color}
                  onChange={(e) => updateColorStop(index, 'color', e.target.value)}
                  className="flex-1 font-mono text-sm"
                />
                <div className="flex items-center gap-2 min-w-[120px]">
                  <Slider
                    value={[stop.position]}
                    onValueChange={([value]) => updateColorStop(index, 'position', value)}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm w-8">{stop.position}%</span>
                </div>
                {colorStops.length > 2 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeColorStop(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="w-full h-48 rounded-lg border"
            style={{ background: generateGradientStyle() }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>CSS Code</CardTitle>
            <Button variant="outline" onClick={copyCSS}>
              <Copy className="w-4 h-4 mr-2" />
              Copy CSS
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Textarea
            value={generateCSS()}
            readOnly
            className="font-mono text-sm"
            rows={3}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preset Gradients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {presetGradients.map((preset, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-20 p-2 flex flex-col"
                onClick={() => applyPreset(preset)}
              >
                <div
                  className="w-full h-8 rounded mb-2"
                  style={{
                    background: `linear-gradient(to right, ${preset.stops.map(s => `${s.color} ${s.position}%`).join(', ')})`
                  }}
                />
                <span className="text-xs">{preset.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
