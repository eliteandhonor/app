
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Clock, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export function TimestampConverter() {
  const [timestamp, setTimestamp] = useState('');
  const [unit, setUnit] = useState<'seconds' | 'milliseconds'>('seconds');
  const [humanDate, setHumanDate] = useState('');
  const [currentTimestamp, setCurrentTimestamp] = useState('');

  useEffect(() => {
    const updateCurrentTimestamp = () => {
      const now = Math.floor(Date.now() / 1000);
      setCurrentTimestamp(now.toString());
    };

    updateCurrentTimestamp();
    const interval = setInterval(updateCurrentTimestamp, 1000);
    return () => clearInterval(interval);
  }, []);

  const convertToHuman = (ts: string, tsUnit: 'seconds' | 'milliseconds') => {
    try {
      const num = parseInt(ts);
      if (isNaN(num)) return '';

      const date = new Date(tsUnit === 'seconds' ? num * 1000 : num);
      if (isNaN(date.getTime())) return '';

      return date.toISOString().replace('T', ' ').replace('.000Z', ' UTC');
    } catch {
      return '';
    }
  };

  const convertToTimestamp = (dateStr: string, tsUnit: 'seconds' | 'milliseconds') => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return '';

      const timestamp = date.getTime();
      return tsUnit === 'seconds' ? Math.floor(timestamp / 1000).toString() : timestamp.toString();
    } catch {
      return '';
    }
  };

  const handleTimestampChange = (value: string) => {
    setTimestamp(value);
    if (value.trim()) {
      const human = convertToHuman(value, unit);
      setHumanDate(human);
    } else {
      setHumanDate('');
    }
  };

  const handleDateChange = (value: string) => {
    setHumanDate(value);
    if (value.trim()) {
      const ts = convertToTimestamp(value, unit);
      setTimestamp(ts);
    } else {
      setTimestamp('');
    }
  };

  const handleUnitChange = (newUnit: 'seconds' | 'milliseconds') => {
    setUnit(newUnit);
    if (timestamp) {
      const human = convertToHuman(timestamp, newUnit);
      setHumanDate(human);
    }
  };

  const useCurrentTimestamp = () => {
    setTimestamp(currentTimestamp);
    const human = convertToHuman(currentTimestamp, unit);
    setHumanDate(human);
  };

  const copyTimestamp = async () => {
    try {
      await navigator.clipboard.writeText(timestamp);
      toast.success('Timestamp copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy timestamp');
    }
  };

  const copyDate = async () => {
    try {
      await navigator.clipboard.writeText(humanDate);
      toast.success('Date copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy date');
    }
  };

  const formatExamples = [
    { format: 'ISO 8601', example: '2024-01-15T10:30:00Z' },
    { format: 'RFC 2822', example: 'Mon, 15 Jan 2024 10:30:00 GMT' },
    { format: 'US Format', example: '01/15/2024 10:30:00 AM' },
    { format: 'European Format', example: '15/01/2024 10:30:00' },
    { format: 'Simple', example: '2024-01-15 10:30:00' }
  ];

  const commonTimestamps = [
    { name: 'Unix Epoch', timestamp: '0', date: '1970-01-01 00:00:00 UTC' },
    { name: 'Y2K', timestamp: '946684800', date: '2000-01-01 00:00:00 UTC' },
    { name: 'JavaScript Epoch', timestamp: '0', date: '1970-01-01 00:00:00 UTC' },
    { name: 'Current Time', timestamp: currentTimestamp, date: convertToHuman(currentTimestamp, 'seconds') }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Timestamp Converter</CardTitle>
          <CardDescription>
            Convert between Unix timestamps and human-readable dates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Current Unix Timestamp</Label>
            <div className="flex gap-2">
              <Input
                value={currentTimestamp}
                readOnly
                className="font-mono"
              />
              <Button variant="outline" onClick={useCurrentTimestamp}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Use Current
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="unit">Timestamp Unit</Label>
            <Select value={unit} onValueChange={handleUnitChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="seconds">Seconds (Unix timestamp)</SelectItem>
                <SelectItem value="milliseconds">Milliseconds (JavaScript timestamp)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timestamp">Timestamp</Label>
              <div className="flex gap-2">
                <Input
                  id="timestamp"
                  value={timestamp}
                  onChange={(e) => handleTimestampChange(e.target.value)}
                  placeholder={unit === 'seconds' ? '1705312200' : '1705312200000'}
                  className="font-mono"
                />
                <Button variant="outline" size="sm" onClick={copyTimestamp} disabled={!timestamp}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="humanDate">Human-Readable Date</Label>
              <div className="flex gap-2">
                <Input
                  id="humanDate"
                  value={humanDate}
                  onChange={(e) => handleDateChange(e.target.value)}
                  placeholder="2024-01-15 10:30:00 UTC"
                  className="font-mono"
                />
                <Button variant="outline" size="sm" onClick={copyDate} disabled={!humanDate}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common Timestamps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {commonTimestamps.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-muted-foreground font-mono">{item.date}</div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setTimestamp(item.timestamp);
                    setHumanDate(item.date);
                  }}
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Use
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Supported Date Formats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {formatExamples.map((format, index) => (
              <div key={index} className="flex justify-between items-center py-2">
                <span className="font-medium">{format.format}:</span>
                <code className="text-sm bg-muted px-2 py-1 rounded">{format.example}</code>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About Timestamps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p><strong>Unix Timestamp:</strong> Seconds since January 1, 1970, 00:00:00 UTC</p>
          <p><strong>JavaScript Timestamp:</strong> Milliseconds since January 1, 1970, 00:00:00 UTC</p>
          <p><strong>Range:</strong> Unix timestamps are valid until January 19, 2038 (32-bit systems)</p>
          <p><strong>Timezone:</strong> All timestamps are in UTC. Local timezone conversion happens during display.</p>
        </CardContent>
      </Card>
    </div>
  );
}
