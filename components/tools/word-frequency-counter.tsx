
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Copy, Download } from 'lucide-react';
import { toast } from 'sonner';

interface WordFrequency {
  word: string;
  count: number;
  percentage: number;
}

export function WordFrequencyCounter() {
  const [text, setText] = useState('');
  const [minLength, setMinLength] = useState(1);
  const [options, setOptions] = useState({
    caseSensitive: false,
    includeNumbers: true,
    removeStopWords: false
  });
  const [frequencies, setFrequencies] = useState<WordFrequency[]>([]);
  const [stats, setStats] = useState({
    totalWords: 0,
    uniqueWords: 0,
    totalCharacters: 0,
    averageWordLength: 0
  });

  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
    'by', 'from', 'up', 'about', 'into', 'through', 'during', 'before', 'after',
    'above', 'below', 'between', 'among', 'is', 'are', 'was', 'were', 'be', 'been',
    'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
    'should', 'may', 'might', 'must', 'can', 'shall', 'this', 'that', 'these',
    'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her',
    'us', 'them', 'my', 'your', 'his', 'its', 'our', 'their'
  ]);

  const analyzeText = () => {
    if (!text.trim()) {
      toast.error('Please enter some text to analyze');
      return;
    }

    // Clean and split text into words
    let words = text
      .replace(/[^\w\s]/g, ' ') // Remove punctuation
      .split(/\s+/)
      .filter(word => word.length >= minLength);

    if (!options.caseSensitive) {
      words = words.map(word => word.toLowerCase());
    }

    if (!options.includeNumbers) {
      words = words.filter(word => !/^\d+$/.test(word));
    }

    if (options.removeStopWords) {
      words = words.filter(word => !stopWords.has(word.toLowerCase()));
    }

    // Count word frequencies
    const wordCounts = new Map<string, number>();
    words.forEach(word => {
      wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
    });

    // Convert to array and sort by frequency
    const totalWords = words.length;
    const frequencies: WordFrequency[] = Array.from(wordCounts.entries())
      .map(([word, count]) => ({
        word,
        count,
        percentage: (count / totalWords) * 100
      }))
      .sort((a, b) => b.count - a.count);

    setFrequencies(frequencies);

    // Calculate statistics
    const uniqueWords = frequencies.length;
    const totalCharacters = text.length;
    const averageWordLength = words.reduce((sum, word) => sum + word.length, 0) / totalWords;

    setStats({
      totalWords,
      uniqueWords,
      totalCharacters,
      averageWordLength
    });

    toast.success('Text analysis completed!');
  };

  const copyResults = async () => {
    try {
      const results = frequencies
        .map(item => `${item.word}: ${item.count} (${item.percentage.toFixed(1)}%)`)
        .join('\n');
      
      await navigator.clipboard.writeText(results);
      toast.success('Results copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy results');
    }
  };

  const downloadResults = () => {
    const results = [
      'Word Frequency Analysis',
      '========================',
      '',
      'Statistics:',
      `Total Words: ${stats.totalWords}`,
      `Unique Words: ${stats.uniqueWords}`,
      `Total Characters: ${stats.totalCharacters}`,
      `Average Word Length: ${stats.averageWordLength.toFixed(1)}`,
      '',
      'Word Frequencies:',
      '================',
      ...frequencies.map(item => `${item.word}: ${item.count} (${item.percentage.toFixed(1)}%)`)
    ].join('\n');

    const blob = new Blob([results], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'word-frequency-analysis.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Results downloaded!');
  };

  const loadSample = () => {
    setText(`The quick brown fox jumps over the lazy dog. The dog was sleeping peacefully under the warm sun. 
    The fox was very clever and quick, always looking for new adventures in the forest. 
    Every day, the fox would explore different parts of the forest, meeting various animals along the way.
    The forest was full of life, with birds singing in the trees and small creatures scurrying about.
    This is a sample text to demonstrate the word frequency analysis tool.`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Word Frequency Counter</CardTitle>
          <CardDescription>
            Analyze text and count word frequency with detailed statistics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="text">Text to Analyze</Label>
            <Textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter or paste your text here..."
              className="min-h-[150px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minLength">Minimum Word Length</Label>
              <Input
                id="minLength"
                type="number"
                value={minLength}
                onChange={(e) => setMinLength(parseInt(e.target.value) || 1)}
                min="1"
                max="20"
              />
            </div>
            <div className="space-y-3">
              <Label>Options</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="caseSensitive"
                    checked={options.caseSensitive}
                    onCheckedChange={(checked) => 
                      setOptions(prev => ({ ...prev, caseSensitive: !!checked }))
                    }
                  />
                  <Label htmlFor="caseSensitive" className="text-sm">Case sensitive</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includeNumbers"
                    checked={options.includeNumbers}
                    onCheckedChange={(checked) => 
                      setOptions(prev => ({ ...prev, includeNumbers: !!checked }))
                    }
                  />
                  <Label htmlFor="includeNumbers" className="text-sm">Include numbers</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="removeStopWords"
                    checked={options.removeStopWords}
                    onCheckedChange={(checked) => 
                      setOptions(prev => ({ ...prev, removeStopWords: !!checked }))
                    }
                  />
                  <Label htmlFor="removeStopWords" className="text-sm">Remove stop words</Label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={analyzeText} className="flex-1">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analyze Text
            </Button>
            <Button variant="outline" onClick={loadSample}>
              Load Sample
            </Button>
          </div>
        </CardContent>
      </Card>

      {frequencies.length > 0 && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{stats.totalWords}</div>
                  <div className="text-sm text-muted-foreground">Total Words</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{stats.uniqueWords}</div>
                  <div className="text-sm text-muted-foreground">Unique Words</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{stats.totalCharacters}</div>
                  <div className="text-sm text-muted-foreground">Total Characters</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{stats.averageWordLength.toFixed(1)}</div>
                  <div className="text-sm text-muted-foreground">Avg Word Length</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Word Frequencies (Top 50)</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={copyResults}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadResults}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {frequencies.slice(0, 50).map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="w-8 text-center">
                        {index + 1}
                      </Badge>
                      <span className="font-mono font-medium">{item.word}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-medium">{item.count}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.percentage.toFixed(1)}%
                        </div>
                      </div>
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${Math.min(item.percentage * 5, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {frequencies.length > 50 && (
                <div className="text-center text-sm text-muted-foreground mt-4">
                  Showing top 50 of {frequencies.length} unique words
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}

      <Card>
        <CardHeader>
          <CardTitle>About Stop Words</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p>
            Stop words are common words (like "the", "and", "is") that are often filtered out 
            in text analysis because they appear frequently but don't carry much meaning. 
            Enable "Remove stop words" to focus on more meaningful content words.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
