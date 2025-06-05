
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileCode, Copy, Check, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function MarkdownConverter() {
  const [markdown, setMarkdown] = useState('');
  const [html, setHtml] = useState('');
  const [copied, setCopied] = useState<'markdown' | 'html' | null>(null);

  // Simple markdown to HTML converter
  const convertMarkdownToHtml = (md: string): string => {
    if (!md.trim()) return '';

    let html = md;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/_(.*?)_/g, '<em>$1</em>');

    // Code blocks
    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    
    // Inline code
    html = html.replace(/`(.*?)`/g, '<code>$1</code>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Images
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" />');

    // Unordered lists
    html = html.replace(/^\* (.+)$/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

    // Ordered lists
    html = html.replace(/^\d+\. (.+)$/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, (match) => {
      if (!match.includes('<ul>')) {
        return `<ol>${match}</ol>`;
      }
      return match;
    });

    // Blockquotes
    html = html.replace(/^> (.+)$/gim, '<blockquote>$1</blockquote>');

    // Horizontal rules
    html = html.replace(/^---$/gim, '<hr>');
    html = html.replace(/^\*\*\*$/gim, '<hr>');

    // Line breaks
    html = html.replace(/\n\n/g, '</p><p>');
    html = html.replace(/\n/g, '<br>');

    // Wrap in paragraphs
    if (html && !html.startsWith('<')) {
      html = '<p>' + html + '</p>';
    }

    return html;
  };

  const handleConvert = () => {
    const convertedHtml = convertMarkdownToHtml(markdown);
    setHtml(convertedHtml);
  };

  const copyToClipboard = async (text: string, type: 'markdown' | 'html') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const clearAll = () => {
    setMarkdown('');
    setHtml('');
  };

  const examples = [
    {
      name: 'Basic Formatting',
      markdown: `# Heading 1
## Heading 2
### Heading 3

This is **bold text** and this is *italic text*.

Here's some \`inline code\` and a [link](https://example.com).`
    },
    {
      name: 'Lists and Quotes',
      markdown: `## Todo List

* First item
* Second item
* Third item

## Numbered List

1. Step one
2. Step two
3. Step three

> This is a blockquote
> It can span multiple lines`
    },
    {
      name: 'Code and Images',
      markdown: `## Code Example

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

## Image

![Alt text](https://i.ytimg.com/vi/NVg0GfEtGQA/maxresdefault.jpg)

---

That's all folks!`
    },
    {
      name: 'Documentation',
      markdown: `# Project Documentation

## Installation

1. Clone the repository
2. Run \`npm install\`
3. Start with \`npm start\`

## Features

* **Fast**: Optimized for performance
* **Secure**: Built with security in mind
* **Scalable**: Designed to grow with your needs

## API Reference

### \`getData()\`

Returns the current data.

\`\`\`javascript
const data = getData();
console.log(data);
\`\`\`

> **Note**: This function is asynchronous.`
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCode className="h-5 w-5 text-primary" />
            Markdown to HTML Converter
          </CardTitle>
          <CardDescription>
            Convert Markdown text to HTML with live preview
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="markdown-input">Markdown Input</Label>
                <Textarea
                  id="markdown-input"
                  placeholder="Enter your Markdown here..."
                  value={markdown}
                  onChange={(e) => setMarkdown(e.target.value)}
                  rows={12}
                  className="font-mono text-sm"
                />
                <div className="flex gap-2">
                  <Button onClick={handleConvert} className="flex-1">
                    <FileCode className="h-4 w-4 mr-2" />
                    Convert to HTML
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(markdown, 'markdown')}
                    disabled={!markdown}
                  >
                    {copied === 'markdown' ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {html && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <Tabs defaultValue="html" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="html">HTML Code</TabsTrigger>
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="html" className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>HTML Output</Label>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(html, 'html')}
                          disabled={!html}
                        >
                          {copied === 'html' ? (
                            <>
                              <Check className="h-4 w-4 mr-2" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4 mr-2" />
                              Copy HTML
                            </>
                          )}
                        </Button>
                      </div>
                      <Textarea
                        value={html}
                        readOnly
                        rows={12}
                        className="font-mono text-sm"
                      />
                    </TabsContent>

                    <TabsContent value="preview" className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        <Label>Live Preview</Label>
                      </div>
                      <div 
                        className="border rounded-lg p-4 bg-background min-h-[300px] prose prose-sm max-w-none dark:prose-invert"
                        dangerouslySetInnerHTML={{ __html: html }}
                      />
                    </TabsContent>
                  </Tabs>
                </motion.div>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={clearAll} variant="outline" className="flex-1">
              Clear All
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Example Markdown</CardTitle>
          <CardDescription>
            Click any example to load it into the converter
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {examples.map((example) => (
              <Button
                key={example.name}
                variant="outline"
                onClick={() => setMarkdown(example.markdown)}
                className="w-full h-auto p-3 text-left"
              >
                <div className="w-full">
                  <div className="font-medium mb-1">{example.name}</div>
                  <div className="text-xs text-muted-foreground font-mono whitespace-pre-wrap">
                    {example.markdown.substring(0, 100)}...
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Markdown Syntax Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div><code># Heading 1</code> → <strong>H1</strong></div>
              <div><code>## Heading 2</code> → <strong>H2</strong></div>
              <div><code>**bold**</code> → <strong>bold</strong></div>
              <div><code>*italic*</code> → <em>italic</em></div>
              <div><code>`code`</code> → <code>code</code></div>
            </div>
            <div className="space-y-2">
              <div><code>[link](url)</code> → link</div>
              <div><code>![alt](image.jpg)</code> → image</div>
              <div><code>* item</code> → bullet list</div>
              <div><code>1. item</code> → numbered list</div>
              <div><code>&gt; quote</code> → blockquote</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
