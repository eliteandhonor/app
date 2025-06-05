
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { v4 as uuidv4, v1 as uuidv1 } from 'uuid';

export function UuidGenerator() {
  const [version, setVersion] = useState('v4');
  const [count, setCount] = useState('1');
  const [uuids, setUuids] = useState<string[]>([]);

  const generateUuids = () => {
    const num = parseInt(count) || 1;
    const newUuids = [];

    for (let i = 0; i < num; i++) {
      if (version === 'v1') {
        newUuids.push(uuidv1());
      } else {
        newUuids.push(uuidv4());
      }
    }

    setUuids(newUuids);
  };

  const copyUuid = async (uuid: string) => {
    try {
      await navigator.clipboard.writeText(uuid);
      toast.success('UUID copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy UUID');
    }
  };

  const copyAllUuids = async () => {
    try {
      await navigator.clipboard.writeText(uuids.join('\n'));
      toast.success('All UUIDs copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy UUIDs');
    }
  };

  const clearUuids = () => {
    setUuids([]);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>UUID Generator</CardTitle>
          <CardDescription>
            Generate unique identifiers (UUIDs) in various formats
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="version">UUID Version</Label>
              <Select value={version} onValueChange={setVersion}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="v1">Version 1 (timestamp-based)</SelectItem>
                  <SelectItem value="v4">Version 4 (random)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="count">Count</Label>
              <Select value={count} onValueChange={setCount}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={generateUuids} className="flex-1">
              <RefreshCw className="w-4 h-4 mr-2" />
              Generate UUIDs
            </Button>
            {uuids.length > 0 && (
              <>
                <Button variant="outline" onClick={copyAllUuids}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy All
                </Button>
                <Button variant="outline" onClick={clearUuids}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {uuids.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Generated UUIDs ({uuids.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {uuids.map((uuid, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                  <Input
                    value={uuid}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyUuid(uuid)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>About UUIDs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p><strong>Version 1:</strong> Based on timestamp and MAC address. Guarantees uniqueness across space and time.</p>
          <p><strong>Version 4:</strong> Randomly generated. Most commonly used for general purposes.</p>
          <p>UUIDs are 128-bit values typically displayed as 32 hexadecimal digits separated by hyphens.</p>
        </CardContent>
      </Card>
    </div>
  );
}
