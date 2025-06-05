
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, ArrowUpDown, Copy, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function Base64Converter() {
  const [plainText, setPlainText] = useState('');
  const [base64Text, setBase64Text] = useState('');
  const [copied, setCopied] = useState<'plain' | 'base64' | null>(null);

  const encodeToBase64 = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(plainText)));
      setBase64Text(encoded);
    } catch (error) {
      setBase64Text('Error: Invalid input for encoding');
    }
  };

  const decodeFromBase64 = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(base64Text)));
      setPlainText(decoded);
    } catch (error) {
      setPlainText('Error: Invalid Base64 input');
    }
  };

  const copyToClipboard = async (text: string, type: 'plain' | 'base64') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const clearAll = () => {
    setPlainText('');
    setBase64Text('');
  };

  const examples = [
    { name: 'Simple Text', text: 'Hello, World!' },
    { name: 'JSON Data', text: '{"name": "John", "age": 30}' },
    { name: 'URL', text: 'https://example.com/path?param=value' },
    { name: 'Special Characters', text: 'Café & Naïve résumé 🚀' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5 text-primary" />
            Base64 Encoder/Decoder
          </CardTitle>
          <CardDescription>
            Encode and decode text to/from Base64 format for safe data transmission
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
                <Label htmlFor="plain-text">Plain Text</Label>
                <Textarea
                  id="plain-text"
                  placeholder="Enter text to encode..."
                  value={plainText}
                  onChange={(e) => setPlainText(e.target.value)}
                  rows={6}
                />
                <div className="flex gap-2">
                  <Button onClick={encodeToBase64} className="flex-1">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    Encode to Base64
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(plainText, 'plain')}
                    disabled={!plainText}
                  >
                    {copied === 'plain' ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="base64-output">Base64 Output</Label>
                <Textarea
                  id="base64-output"
                  value={base64Text}
                  readOnly
                  rows={6}
                  className="font-mono text-sm"
                />
                <Button
                  variant="outline"
                  onClick={() => copyToClipboard(base64Text, 'base64')}
                  disabled={!base64Text}
                  className="w-full"
                >
                  {copied === 'base64' ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Base64
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="decode" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="base64-input">Base64 Input</Label>
                <Textarea
                  id="base64-input"
                  placeholder="Enter Base64 text to decode..."
                  value={base64Text}
                  onChange={(e) => setBase64Text(e.target.value)}
                  rows={6}
                  className="font-mono text-sm"
                />
                <div className="flex gap-2">
                  <Button onClick={decodeFromBase64} className="flex-1">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    Decode from Base64
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(base64Text, 'base64')}
                    disabled={!base64Text}
                  >
                    {copied === 'base64' ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="plain-output">Plain Text Output</Label>
                <Textarea
                  id="plain-output"
                  value={plainText}
                  readOnly
                  rows={6}
                />
                <Button
                  variant="outline"
                  onClick={() => copyToClipboard(plainText, 'plain')}
                  disabled={!plainText}
                  className="w-full"
                >
                  {copied === 'plain' ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Text
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
          <CardTitle>Example Texts</CardTitle>
          <CardDescription>
            Click any example to load it into the encoder
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {examples.map((example) => (
              <Button
                key={example.name}
                variant="outline"
                onClick={() => setPlainText(example.text)}
                className="h-auto p-3 text-left"
              >
                <div>
                  <div className="font-medium">{example.name}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {example.text}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About Base64</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format.
            It's commonly used for encoding data in email, web forms, and APIs.
          </p>
          <p>
            <strong>Use cases:</strong> Email attachments, data URLs, API authentication tokens, 
            storing binary data in text-based formats like JSON or XML.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
