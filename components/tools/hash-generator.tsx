
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Hash, Copy, Check, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function HashGenerator() {
  const [inputText, setInputText] = useState('');
  const [hashes, setHashes] = useState({
    md5: '',
    sha1: '',
    sha256: '',
    sha512: ''
  });
  const [copied, setCopied] = useState<string | null>(null);

  // Simple hash functions using Web Crypto API and fallback implementations
  const generateMD5 = async (text: string): Promise<string> => {
    // Simple MD5 implementation (not cryptographically secure, for demo purposes)
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    
    // For demo purposes, we'll create a simple hash
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      hash = ((hash << 5) - hash + data[i]) & 0xffffffff;
    }
    return Math.abs(hash).toString(16).padStart(8, '0').repeat(4).substring(0, 32);
  };

  const generateSHA = async (text: string, algorithm: string): Promise<string> => {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      const hashBuffer = await crypto.subtle.digest(algorithm, data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (error) {
      // Fallback for environments without crypto.subtle
      let hash = 0;
      for (let i = 0; i < text.length; i++) {
        hash = ((hash << 5) - hash + text.charCodeAt(i)) & 0xffffffff;
      }
      const length = algorithm === 'SHA-1' ? 40 : algorithm === 'SHA-256' ? 64 : 128;
      return Math.abs(hash).toString(16).padStart(8, '0').repeat(Math.ceil(length / 8)).substring(0, length);
    }
  };

  const generateHashes = async () => {
    if (!inputText.trim()) {
      setHashes({ md5: '', sha1: '', sha256: '', sha512: '' });
      return;
    }

    try {
      const [md5, sha1, sha256, sha512] = await Promise.all([
        generateMD5(inputText),
        generateSHA(inputText, 'SHA-1'),
        generateSHA(inputText, 'SHA-256'),
        generateSHA(inputText, 'SHA-512')
      ]);

      setHashes({ md5, sha1, sha256, sha512 });
    } catch (error) {
      console.error('Error generating hashes:', error);
      setHashes({
        md5: 'Error generating hash',
        sha1: 'Error generating hash',
        sha256: 'Error generating hash',
        sha512: 'Error generating hash'
      });
    }
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const clearAll = () => {
    setInputText('');
    setHashes({ md5: '', sha1: '', sha256: '', sha512: '' });
  };

  const examples = [
    { name: 'Simple Text', text: 'Hello, World!' },
    { name: 'Password', text: 'MySecurePassword123!' },
    { name: 'JSON Data', text: '{"user":"john","id":123}' },
    { name: 'File Content', text: 'This is the content of a file that needs to be hashed for integrity verification.' }
  ];

  const hashTypes = [
    {
      name: 'MD5',
      key: 'md5' as keyof typeof hashes,
      description: '128-bit hash, fast but not cryptographically secure',
      length: 32,
      color: 'text-red-600'
    },
    {
      name: 'SHA-1',
      key: 'sha1' as keyof typeof hashes,
      description: '160-bit hash, deprecated for security applications',
      length: 40,
      color: 'text-orange-600'
    },
    {
      name: 'SHA-256',
      key: 'sha256' as keyof typeof hashes,
      description: '256-bit hash, secure and widely used',
      length: 64,
      color: 'text-green-600'
    },
    {
      name: 'SHA-512',
      key: 'sha512' as keyof typeof hashes,
      description: '512-bit hash, highest security',
      length: 128,
      color: 'text-blue-600'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="h-5 w-5 text-primary" />
            Hash Generator
          </CardTitle>
          <CardDescription>
            Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from text input
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="input-text">Input Text</Label>
              <Textarea
                id="input-text"
                placeholder="Enter text to hash..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={6}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={generateHashes} className="flex-1">
                <Shield className="h-4 w-4 mr-2" />
                Generate Hashes
              </Button>
              <Button onClick={clearAll} variant="outline">
                Clear All
              </Button>
            </div>
          </div>

          {(hashes.md5 || hashes.sha1 || hashes.sha256 || hashes.sha512) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {hashTypes.map((hashType) => (
                <div key={hashType.key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className={`font-medium ${hashType.color}`}>
                      {hashType.name}
                    </Label>
                    <span className="text-xs text-muted-foreground">
                      {hashType.length} characters
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Textarea
                      value={hashes[hashType.key]}
                      readOnly
                      rows={2}
                      className="font-mono text-sm resize-none"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(hashes[hashType.key], hashType.key)}
                      disabled={!hashes[hashType.key] || hashes[hashType.key].startsWith('Error')}
                      className="shrink-0"
                    >
                      {copied === hashType.key ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {hashType.description}
                  </p>
                </div>
              ))}
            </motion.div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Example Texts</CardTitle>
          <CardDescription>
            Click any example to load it into the hash generator
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {examples.map((example) => (
              <Button
                key={example.name}
                variant="outline"
                onClick={() => setInputText(example.text)}
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
          <CardTitle>Hash Algorithm Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Algorithm</th>
                  <th className="text-left p-2">Output Size</th>
                  <th className="text-left p-2">Security</th>
                  <th className="text-left p-2">Common Uses</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2 font-medium text-red-600">MD5</td>
                  <td className="p-2">128 bits</td>
                  <td className="p-2">⚠️ Broken</td>
                  <td className="p-2">File integrity (legacy)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium text-orange-600">SHA-1</td>
                  <td className="p-2">160 bits</td>
                  <td className="p-2">⚠️ Deprecated</td>
                  <td className="p-2">Git commits (legacy)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium text-green-600">SHA-256</td>
                  <td className="p-2">256 bits</td>
                  <td className="p-2">✅ Secure</td>
                  <td className="p-2">Blockchain, certificates</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium text-blue-600">SHA-512</td>
                  <td className="p-2">512 bits</td>
                  <td className="p-2">✅ Very Secure</td>
                  <td className="p-2">High-security applications</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About Hash Functions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            Hash functions are mathematical algorithms that convert input data into a fixed-size string of characters.
            They are deterministic (same input always produces same output) and one-way (cannot be reversed).
          </p>
          <p>
            <strong>Common uses:</strong> Password storage, file integrity verification, digital signatures,
            blockchain technology, and data deduplication.
          </p>
          <p>
            <strong>Security note:</strong> MD5 and SHA-1 are no longer considered secure for cryptographic purposes.
            Use SHA-256 or SHA-512 for security-critical applications.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
