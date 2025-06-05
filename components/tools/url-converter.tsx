
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, ArrowUpDown, Copy, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function UrlConverter() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [encodedUrl, setEncodedUrl] = useState('');
  const [copied, setCopied] = useState<'original' | 'encoded' | null>(null);

  const encodeUrl = () => {
    try {
      const encoded = encodeURIComponent(originalUrl);
      setEncodedUrl(encoded);
    } catch (error) {
      setEncodedUrl('Error: Invalid input for encoding');
    }
  };

  const decodeUrl = () => {
    try {
      const decoded = decodeURIComponent(encodedUrl);
      setOriginalUrl(decoded);
    } catch (error) {
      setOriginalUrl('Error: Invalid URL encoding');
    }
  };

  const copyToClipboard = async (text: string, type: 'original' | 'encoded') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const clearAll = () => {
    setOriginalUrl('');
    setEncodedUrl('');
  };

  const examples = [
    { 
      name: 'URL with Spaces', 
      url: 'https://example.com/search?q=hello world' 
    },
    { 
      name: 'Special Characters', 
      url: 'https://example.com/path?name=John&email=john@example.com&message=Hello, how are you?' 
    },
    { 
      name: 'Non-ASCII Characters', 
      url: 'https://example.com/café/naïve?query=résumé' 
    },
    { 
      name: 'Complex Query', 
      url: 'https://api.example.com/search?q=javascript&category=programming&sort=date&filter=recent' 
    }
  ];

  const commonCharacters = [
    { char: ' ', encoded: '%20', name: 'Space' },
    { char: '!', encoded: '%21', name: 'Exclamation' },
    { char: '"', encoded: '%22', name: 'Quote' },
    { char: '#', encoded: '%23', name: 'Hash' },
    { char: '$', encoded: '%24', name: 'Dollar' },
    { char: '%', encoded: '%25', name: 'Percent' },
    { char: '&', encoded: '%26', name: 'Ampersand' },
    { char: '+', encoded: '%2B', name: 'Plus' },
    { char: '=', encoded: '%3D', name: 'Equals' },
    { char: '?', encoded: '%3F', name: 'Question' },
    { char: '@', encoded: '%40', name: 'At' },
    { char: '[', encoded: '%5B', name: 'Left Bracket' },
    { char: ']', encoded: '%5D', name: 'Right Bracket' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="h-5 w-5 text-primary" />
            URL Encoder/Decoder
          </CardTitle>
          <CardDescription>
            Encode and decode URLs for safe transmission and proper formatting
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="encode" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="encode">Encode</TabsTrigger>
              <TabsTrigger value="decode">Decode</TabsTrigger>
            </TabsList>
            
            <TabsContent value="encode" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="original-url">Original URL</Label>
                <Textarea
                  id="original-url"
                  placeholder="Enter URL to encode..."
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  rows={4}
                />
                <div className="flex gap-2">
                  <Button onClick={encodeUrl} className="flex-1">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    Encode URL
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(originalUrl, 'original')}
                    disabled={!originalUrl}
                  >
                    {copied === 'original' ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="encoded-output">Encoded URL</Label>
                <Textarea
                  id="encoded-output"
                  value={encodedUrl}
                  readOnly
                  rows={4}
                  className="font-mono text-sm"
                />
                <Button
                  variant="outline"
                  onClick={() => copyToClipboard(encodedUrl, 'encoded')}
                  disabled={!encodedUrl}
                  className="w-full"
                >
                  {copied === 'encoded' ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Encoded URL
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="decode" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="encoded-input">Encoded URL</Label>
                <Textarea
                  id="encoded-input"
                  placeholder="Enter encoded URL to decode..."
                  value={encodedUrl}
                  onChange={(e) => setEncodedUrl(e.target.value)}
                  rows={4}
                  className="font-mono text-sm"
                />
                <div className="flex gap-2">
                  <Button onClick={decodeUrl} className="flex-1">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    Decode URL
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(encodedUrl, 'encoded')}
                    disabled={!encodedUrl}
                  >
                    {copied === 'encoded' ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="original-output">Decoded URL</Label>
                <Textarea
                  id="original-output"
                  value={originalUrl}
                  readOnly
                  rows={4}
                />
                <Button
                  variant="outline"
                  onClick={() => copyToClipboard(originalUrl, 'original')}
                  disabled={!originalUrl}
                  className="w-full"
                >
                  {copied === 'original' ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Decoded URL
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex gap-2">
            <Button onClick={clearAll} variant="outline" className="flex-1">
              Clear All
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Example URLs</CardTitle>
          <CardDescription>
            Click any example to load it into the encoder
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {examples.map((example) => (
              <Button
                key={example.name}
                variant="outline"
                onClick={() => setOriginalUrl(example.url)}
                className="w-full h-auto p-3 text-left"
              >
                <div className="w-full">
                  <div className="font-medium mb-1">{example.name}</div>
                  <div className="text-xs text-muted-foreground break-all">
                    {example.url}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common URL Encodings</CardTitle>
          <CardDescription>
            Reference for frequently encoded characters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {commonCharacters.map((item) => (
              <div
                key={item.char}
                className="flex items-center justify-between p-2 border rounded text-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono bg-muted px-2 py-1 rounded">
                    {item.char}
                  </span>
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-mono text-primary">{item.encoded}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About URL Encoding</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            URL encoding (percent encoding) converts characters into a format that can be transmitted over the Internet.
            URLs can only be sent over the Internet using the ASCII character-set.
          </p>
          <p>
            <strong>When to use:</strong> When URLs contain spaces, special characters, or non-ASCII characters.
            Essential for query parameters, form data, and API requests.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
