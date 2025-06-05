
'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Upload, Copy, Download, Image as ImageIcon, X } from 'lucide-react';
import { toast } from 'sonner';

export function ImageToBase64() {
  const [base64Result, setBase64Result] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [outputFormat, setOutputFormat] = useState<'data-url' | 'base64-only'>('data-url');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    setFileName(file.name);
    setFileSize(file.size);

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImagePreview(result);
      
      if (outputFormat === 'data-url') {
        setBase64Result(result);
      } else {
        // Remove the data URL prefix to get only base64
        const base64Only = result.split(',')[1];
        setBase64Result(base64Only);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      // Create a fake event to reuse the existing handler
      const fakeEvent = {
        target: { files: [file] }
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileSelect(fakeEvent);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(base64Result);
      toast.success('Base64 copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy Base64');
    }
  };

  const downloadResult = () => {
    const blob = new Blob([base64Result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName.split('.')[0]}-base64.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Base64 file downloaded!');
  };

  const clearAll = () => {
    setBase64Result('');
    setImagePreview(null);
    setFileName('');
    setFileSize(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const handleFormatChange = (newFormat: 'data-url' | 'base64-only') => {
    setOutputFormat(newFormat);
    
    if (imagePreview) {
      if (newFormat === 'data-url') {
        setBase64Result(imagePreview);
      } else {
        const base64Only = imagePreview.split(',')[1];
        setBase64Result(base64Only);
      }
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Image to Base64 Converter</CardTitle>
          <CardDescription>
            Convert images to Base64 encoded strings for embedding in code
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Output Format</Label>
            <Select value={outputFormat} onValueChange={handleFormatChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="data-url">Data URL (with MIME type)</SelectItem>
                <SelectItem value="base64-only">Base64 only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div
            className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <ImageIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-2">Drop an image here or click to select</p>
            <p className="text-sm text-muted-foreground">
              Supports JPG, PNG, GIF, WebP, SVG (max 10MB)
            </p>
          </div>

          {fileName && (
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <ImageIcon className="w-5 h-5" />
                <div>
                  <div className="font-medium">{fileName}</div>
                  <div className="text-sm text-muted-foreground">{formatFileSize(fileSize)}</div>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={clearAll}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {imagePreview && (
        <Card>
          <CardHeader>
            <CardTitle>Image Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-full max-h-64 object-contain rounded-lg border"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {base64Result && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Base64 Result</CardTitle>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary">
                    {formatFileSize(base64Result.length)}
                  </Badge>
                  <Badge variant="outline">
                    {outputFormat === 'data-url' ? 'Data URL' : 'Base64 Only'}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyResult}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" size="sm" onClick={downloadResult}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={base64Result}
              readOnly
              className="min-h-[150px] font-mono text-xs"
              placeholder="Base64 result will appear here..."
            />
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Usage Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">HTML Image Tag:</h4>
            <code className="block p-2 bg-muted rounded text-sm">
              {outputFormat === 'data-url' 
                ? `<img src="${base64Result || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=='}" alt="Image" />`
                : `<img src="data:image/png;base64,${base64Result || 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=='}" alt="Image" />`
              }
            </code>
          </div>
          <div>
            <h4 className="font-medium mb-2">CSS Background:</h4>
            <code className="block p-2 bg-muted rounded text-sm">
              {outputFormat === 'data-url'
                ? `background-image: url('${base64Result || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=='}');`
                : `background-image: url('data:image/png;base64,${base64Result || 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=='}');`
              }
            </code>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About Base64 Encoding</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p><strong>Data URL:</strong> Includes MIME type and is ready to use directly in HTML/CSS</p>
          <p><strong>Base64 Only:</strong> Just the encoded data, useful when you need to add your own MIME type</p>
          <p><strong>Use Cases:</strong> Embedding small images in CSS, HTML emails, or reducing HTTP requests</p>
          <p><strong>Note:</strong> Base64 encoding increases file size by approximately 33%</p>
        </CardContent>
      </Card>
    </div>
  );
}
