
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Clock, ArrowRight, Copy, Check } from 'lucide-react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Combobox } from '@/components/ui/combobox';
import { 
  POPULAR_TIMEZONES, 
  ALL_TIMEZONES, 
  TIMEZONES_BY_REGION,
  getTimezoneInfo,
  type TimezoneInfo 
} from '@/lib/timezones';

// Extend dayjs with timezone plugins
dayjs.extend(utc);
dayjs.extend(timezone);

export function TimezoneConverter() {
  const [inputTime, setInputTime] = useState('');
  const [inputDate, setInputDate] = useState('');
  const [fromTimezone, setFromTimezone] = useState('UTC');
  const [toTimezone, setToTimezone] = useState('America/New_York');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [is24HourFormat, setIs24HourFormat] = useState(true);

  // Prepare combobox options with groups
  const timezoneOptions = [
    // Popular timezones first
    ...POPULAR_TIMEZONES.map(tz => ({
      value: tz.value,
      label: tz.label,
      group: 'Popular'
    })),
    // All other timezones grouped by region
    ...Object.entries(TIMEZONES_BY_REGION)
      .filter(([region]) => region !== 'UTC') // Skip UTC as it's in popular
      .flatMap(([region, timezones]) =>
        timezones.map(tz => ({
          value: tz.value,
          label: tz.label,
          group: region
        }))
      )
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Set default values
    const now = new Date();
    setInputDate(now.toISOString().split('T')[0]);
    setInputTime(now.toTimeString().slice(0, 5));
    
    // Detect user's timezone
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const matchingTimezone = ALL_TIMEZONES.find(tz => tz.value === userTimezone);
    if (matchingTimezone) {
      setFromTimezone(userTimezone);
    }

    return () => clearInterval(timer);
  }, []);

  const formatTime = (datetime: dayjs.Dayjs) => {
    const timeFormat = is24HourFormat ? 'HH:mm:ss' : 'h:mm:ss A';
    return datetime.format(`YYYY-MM-DD ${timeFormat}`);
  };

  const formatTimeOnly = (datetime: dayjs.Dayjs) => {
    return is24HourFormat ? datetime.format('HH:mm:ss') : datetime.format('h:mm:ss A');
  };

  const convertTime = () => {
    if (!inputDate || !inputTime || !fromTimezone || !toTimezone) return null;

    try {
      // Create a dayjs object in the source timezone
      const sourceDateTime = dayjs.tz(`${inputDate} ${inputTime}`, fromTimezone);
      
      // Convert to target timezone
      const targetDateTime = sourceDateTime.tz(toTimezone);

      return {
        source: {
          datetime: sourceDateTime,
          formatted: formatTime(sourceDateTime),
          timezone: getTimezoneInfo(fromTimezone)
        },
        target: {
          datetime: targetDateTime,
          formatted: formatTime(targetDateTime),
          timezone: getTimezoneInfo(toTimezone)
        }
      };
    } catch (error) {
      console.error('Time conversion error:', error);
      return null;
    }
  };

  const conversion = convertTime();

  const getCurrentTimeInTimezone = (timezoneValue: string) => {
    try {
      return formatTimeOnly(dayjs().tz(timezoneValue));
    } catch {
      return 'Invalid';
    }
  };

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }));
      }, 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const swapTimezones = () => {
    const temp = fromTimezone;
    setFromTimezone(toTimezone);
    setToTimezone(temp);
  };

  return (
    <div className="space-y-6">
      {/* Main Converter */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Time Zone Converter
              </CardTitle>
              <CardDescription>
                Convert time between any two time zones worldwide with automatic DST handling
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="time-format" className="text-sm font-medium">
                24h
              </Label>
              <Switch
                id="time-format"
                checked={is24HourFormat}
                onCheckedChange={setIs24HourFormat}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={inputTime}
                onChange={(e) => setInputTime(e.target.value)}
                step="60"
              />
            </div>
          </div>

          {/* Timezone Selection */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <Label>From Timezone</Label>
              <Combobox
                options={timezoneOptions}
                value={fromTimezone}
                onValueChange={setFromTimezone}
                placeholder="Select source timezone..."
                searchPlaceholder="Search timezones..."
                emptyText="No timezone found."
              />
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                size="icon"
                onClick={swapTimezones}
                className="rounded-full"
                title="Swap timezones"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label>To Timezone</Label>
              <Combobox
                options={timezoneOptions}
                value={toTimezone}
                onValueChange={setToTimezone}
                placeholder="Select target timezone..."
                searchPlaceholder="Search timezones..."
                emptyText="No timezone found."
              />
            </div>
          </div>

          {/* Conversion Result */}
          {conversion && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg"
            >
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">
                  {conversion.source.timezone?.label}
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-lg font-bold text-primary">
                    {conversion.source.formatted}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(conversion.source.formatted, 'source')}
                    className="h-6 w-6 p-0"
                  >
                    {copiedStates.source ? (
                      <Check className="h-3 w-3 text-green-600" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">
                  {conversion.target.timezone?.label}
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-lg font-bold text-primary">
                    {conversion.target.formatted}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(conversion.target.formatted, 'target')}
                    className="h-6 w-6 p-0"
                  >
                    {copiedStates.target ? (
                      <Check className="h-3 w-3 text-green-600" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* World Clock */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            World Clock
          </CardTitle>
          <CardDescription>
            Current time in popular time zones around the world
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {POPULAR_TIMEZONES.slice(1).map(timezone => { // Skip UTC as it's first
              const currentTimeInZone = getCurrentTimeInTimezone(timezone.value);
              const currentDateInZone = dayjs().tz(timezone.value).format('MMM DD');
              
              return (
                <motion.div
                  key={timezone.value}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    {timezone.label.split(' ')[0]}
                  </div>
                  <div className="text-lg font-bold text-primary">
                    {currentTimeInZone}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {currentDateInZone}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <div className="text-sm text-muted-foreground">
              Current UTC Time
            </div>
            <div className="text-xl font-bold text-primary">
              {formatTime(dayjs.utc())} UTC
            </div>
            <div className="text-xs text-muted-foreground">
              All conversions automatically handle Daylight Saving Time (DST)
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
