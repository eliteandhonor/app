
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertCircle, CheckCircle, Copy } from 'lucide-react';
import { toast } from 'sonner';

export function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState({
    global: true,
    ignoreCase: false,
    multiline: false
  });
  const [testString, setTestString] = useState('');
  const [matches, setMatches] = useState<RegExpMatchArray[]>([]);
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState('');

  const commonPatterns = [
    { name: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}' },
    { name: 'Phone (US)', pattern: '\\(?\\d{3}\\)?[-.]?\\d{3}[-.]?\\d{4}' },
    { name: 'URL', pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)' },
    { name: 'IPv4', pattern: '\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b' },
    { name: 'Date (YYYY-MM-DD)', pattern: '\\d{4}-\\d{2}-\\d{2}' },
    { name: 'Hex Color', pattern: '#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3}' }
  ];

  useEffect(() => {
    if (!pattern) {
      setMatches([]);
      setIsValid(true);
      setError('');
      return;
    }

    try {
      const flagString = Object.entries(flags)
        .filter(([_, value]) => value)
        .map(([key, _]) => key === 'global' ? 'g' : key === 'ignoreCase' ? 'i' : 'm')
        .join('');

      const regex = new RegExp(pattern, flagString);
      setIsValid(true);
      setError('');

      if (testString) {
        const allMatches = [];
        let match;
        
        if (flags.global) {
          while ((match = regex.exec(testString)) !== null) {
            allMatches.push(match);
            if (!flags.global) break;
          }
        } else {
          match = regex.exec(testString);
          if (match) allMatches.push(match);
        }
        
        setMatches(allMatches);
      } else {
        setMatches([]);
      }
    } catch (err) {
      setIsValid(false);
      setError(err instanceof Error ? err.message : 'Invalid regular expression');
      setMatches([]);
    }
  }, [pattern, flags, testString]);

  const highlightMatches = (text: string) => {
    if (!pattern || !isValid || matches.length === 0) {
      return text;
    }

    let result = text;
    let offset = 0;

    matches.forEach((match, index) => {
      if (match.index !== undefined) {
        const start = match.index + offset;
        const end = start + match[0].length;
        const highlighted = `<mark class="bg-yellow-200 dark:bg-yellow-800">${match[0]}</mark>`;
        result = result.slice(0, start) + highlighted + result.slice(end);
        offset += highlighted.length - match[0].length;
      }
    });

    return result;
  };

  const copyPattern = async () => {
    try {
      await navigator.clipboard.writeText(pattern);
      toast.success('Pattern copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy pattern');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Regular Expression Tester</CardTitle>
          <CardDescription>
            Test and validate regular expressions with real-time matching
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pattern">Regular Expression Pattern</Label>
            <div className="flex gap-2">
              <Input
                id="pattern"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="Enter your regex pattern..."
                className={`font-mono ${!isValid ? 'border-red-500' : ''}`}
              />
              <Button variant="outline" onClick={copyPattern} disabled={!pattern}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            {!isValid && (
              <div className="flex items-center gap-2 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
            {isValid && pattern && (
              <div className="flex items-center gap-2 text-green-500 text-sm">
                <CheckCircle className="w-4 h-4" />
                Valid pattern
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Flags</Label>
            <div className="flex gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="global"
                  checked={flags.global}
                  onCheckedChange={(checked) => 
                    setFlags(prev => ({ ...prev, global: !!checked }))
                  }
                />
                <Label htmlFor="global" className="text-sm">Global (g)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="ignoreCase"
                  checked={flags.ignoreCase}
                  onCheckedChange={(checked) => 
                    setFlags(prev => ({ ...prev, ignoreCase: !!checked }))
                  }
                />
                <Label htmlFor="ignoreCase" className="text-sm">Ignore Case (i)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="multiline"
                  checked={flags.multiline}
                  onCheckedChange={(checked) => 
                    setFlags(prev => ({ ...prev, multiline: !!checked }))
                  }
                />
                <Label htmlFor="multiline" className="text-sm">Multiline (m)</Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="testString">Test String</Label>
            <Textarea
              id="testString"
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              placeholder="Enter text to test against your regex..."
              className="min-h-[100px] font-mono text-sm"
            />
          </div>
        </CardContent>
      </Card>

      {matches.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Matches ({matches.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <div 
                  className="font-mono text-sm whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: highlightMatches(testString) }}
                />
              </div>
              <div className="space-y-2">
                {matches.map((match, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Badge variant="secondary">Match {index + 1}</Badge>
                    <code className="px-2 py-1 bg-muted rounded text-sm">{match[0]}</code>
                    <span className="text-sm text-muted-foreground">
                      at position {match.index}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Common Patterns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {commonPatterns.map((item, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start h-auto p-3"
                onClick={() => setPattern(item.pattern)}
              >
                <div className="text-left">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-muted-foreground font-mono truncate">
                    {item.pattern}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
