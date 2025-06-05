
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { GitCompare, Copy, Download } from 'lucide-react';
import { toast } from 'sonner';

interface DiffResult {
  added?: boolean;
  removed?: boolean;
  value: string;
  count?: number;
}

export function TextDiffChecker() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [diffType, setDiffType] = useState<'chars' | 'words' | 'lines'>('lines');
  const [diffResult, setDiffResult] = useState<DiffResult[]>([]);
  const [stats, setStats] = useState({ additions: 0, deletions: 0, unchanged: 0 });

  const calculateDiff = () => {
    if (!text1.trim() && !text2.trim()) {
      toast.error('Please enter text in both fields');
      return;
    }

    let result: DiffResult[] = [];
    let items1: string[] = [];
    let items2: string[] = [];

    // Split text based on diff type
    switch (diffType) {
      case 'chars':
        items1 = text1.split('');
        items2 = text2.split('');
        break;
      case 'words':
        items1 = text1.split(/\s+/);
        items2 = text2.split(/\s+/);
        break;
      case 'lines':
        items1 = text1.split('\n');
        items2 = text2.split('\n');
        break;
    }

    // Simple diff algorithm (Myers algorithm simplified)
    const lcs = longestCommonSubsequence(items1, items2);
    result = createDiffResult(items1, items2, lcs, diffType);

    setDiffResult(result);

    // Calculate statistics
    const additions = result.filter(part => part.added).reduce((sum, part) => sum + (part.count || 0), 0);
    const deletions = result.filter(part => part.removed).reduce((sum, part) => sum + (part.count || 0), 0);
    const unchanged = result.filter(part => !part.added && !part.removed).reduce((sum, part) => sum + (part.count || 0), 0);

    setStats({ additions, deletions, unchanged });
    toast.success('Diff calculated successfully!');
  };

  // Simple LCS implementation
  const longestCommonSubsequence = (a: string[], b: string[]): number[][] => {
    const m = a.length;
    const n = b.length;
    const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (a[i - 1] === b[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }

    return dp;
  };

  const createDiffResult = (a: string[], b: string[], lcs: number[][], type: string): DiffResult[] => {
    const result: DiffResult[] = [];
    let i = a.length;
    let j = b.length;

    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
        const separator = type === 'chars' ? '' : type === 'words' ? ' ' : '\n';
        result.unshift({
          value: a[i - 1] + separator,
          count: 1
        });
        i--;
        j--;
      } else if (j > 0 && (i === 0 || lcs[i][j - 1] >= lcs[i - 1][j])) {
        const separator = type === 'chars' ? '' : type === 'words' ? ' ' : '\n';
        result.unshift({
          added: true,
          value: b[j - 1] + separator,
          count: 1
        });
        j--;
      } else if (i > 0 && (j === 0 || lcs[i][j - 1] < lcs[i - 1][j])) {
        const separator = type === 'chars' ? '' : type === 'words' ? ' ' : '\n';
        result.unshift({
          removed: true,
          value: a[i - 1] + separator,
          count: 1
        });
        i--;
      }
    }

    return result;
  };

  const copyDiff = async () => {
    try {
      const diffText = diffResult.map(part => {
        if (part.added) return `+ ${part.value}`;
        if (part.removed) return `- ${part.value}`;
        return `  ${part.value}`;
      }).join('');
      
      await navigator.clipboard.writeText(diffText);
      toast.success('Diff copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy diff');
    }
  };

  const downloadDiff = () => {
    const diffText = diffResult.map(part => {
      if (part.added) return `+ ${part.value}`;
      if (part.removed) return `- ${part.value}`;
      return `  ${part.value}`;
    }).join('');

    const blob = new Blob([diffText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diff-result.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Diff file downloaded!');
  };

  const loadSample = () => {
    setText1(`The quick brown fox jumps over the lazy dog.
This is the first version of the text.
It contains some sample content for testing.
Line four has some content.
Final line of the original text.`);

    setText2(`The quick brown fox leaps over the lazy dog.
This is the second version of the text.
It contains some sample content for testing.
Line four has different content.
Final line of the modified text.
An additional line was added here.`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Text Diff Checker</CardTitle>
          <CardDescription>
            Compare two texts and highlight differences line by line
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Select value={diffType} onValueChange={(value: any) => setDiffType(value)}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lines">Line by Line</SelectItem>
                <SelectItem value="words">Word by Word</SelectItem>
                <SelectItem value="chars">Character by Character</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={loadSample}>
              Load Sample
            </Button>
            <Button onClick={calculateDiff} className="flex-1">
              <GitCompare className="w-4 h-4 mr-2" />
              Compare Texts
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="text1">Original Text</Label>
              <Textarea
                id="text1"
                value={text1}
                onChange={(e) => setText1(e.target.value)}
                placeholder="Enter the original text here..."
                className="min-h-[200px] font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="text2">Modified Text</Label>
              <Textarea
                id="text2"
                value={text2}
                onChange={(e) => setText2(e.target.value)}
                placeholder="Enter the modified text here..."
                className="min-h-[200px] font-mono text-sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {diffResult.length > 0 && (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Diff Results</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={copyDiff}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadDiff}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <div className="flex gap-4">
                  <Badge variant="destructive">
                    -{stats.deletions} Deletions
                  </Badge>
                  <Badge variant="default" className="bg-green-500">
                    +{stats.additions} Additions
                  </Badge>
                  <Badge variant="secondary">
                    {stats.unchanged} Unchanged
                  </Badge>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 bg-muted/30 max-h-96 overflow-y-auto">
                <pre className="text-sm font-mono whitespace-pre-wrap">
                  {diffResult.map((part, index) => {
                    if (part.added) {
                      return (
                        <span key={index} className="bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200">
                          {part.value}
                        </span>
                      );
                    }
                    if (part.removed) {
                      return (
                        <span key={index} className="bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 line-through">
                          {part.value}
                        </span>
                      );
                    }
                    return <span key={index}>{part.value}</span>;
                  })}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Legend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-200 dark:bg-green-800 rounded"></div>
                <span className="text-sm">Added text</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-200 dark:bg-red-800 rounded"></div>
                <span className="text-sm">Removed text</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-muted rounded"></div>
                <span className="text-sm">Unchanged text</span>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Diff Types</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p><strong>Line by Line:</strong> Compares texts line by line, best for code and structured text</p>
          <p><strong>Word by Word:</strong> Compares individual words, good for prose and documents</p>
          <p><strong>Character by Character:</strong> Compares every character, most detailed comparison</p>
        </CardContent>
      </Card>
    </div>
  );
}
