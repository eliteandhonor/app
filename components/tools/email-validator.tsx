
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Mail, Upload } from 'lucide-react';

interface ValidationResult {
  email: string;
  isValid: boolean;
  errors: string[];
}

export function EmailValidator() {
  const [singleEmail, setSingleEmail] = useState('');
  const [bulkEmails, setBulkEmails] = useState('');
  const [results, setResults] = useState<ValidationResult[]>([]);
  const [mode, setMode] = useState<'single' | 'bulk'>('single');

  const validateEmail = (email: string): ValidationResult => {
    const errors: string[] = [];
    const trimmedEmail = email.trim();

    // Basic format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      errors.push('Invalid email format');
    }

    // Length check
    if (trimmedEmail.length > 254) {
      errors.push('Email too long (max 254 characters)');
    }

    // Local part checks (before @)
    const [localPart, domain] = trimmedEmail.split('@');
    
    if (localPart) {
      if (localPart.length > 64) {
        errors.push('Local part too long (max 64 characters)');
      }
      
      if (localPart.startsWith('.') || localPart.endsWith('.')) {
        errors.push('Local part cannot start or end with a dot');
      }
      
      if (localPart.includes('..')) {
        errors.push('Local part cannot contain consecutive dots');
      }
      
      // Check for invalid characters
      const invalidChars = /[<>()[\]\\,;:\s@"]/;
      if (invalidChars.test(localPart.replace(/"/g, ''))) {
        errors.push('Local part contains invalid characters');
      }
    }

    // Domain checks (after @)
    if (domain) {
      if (domain.length > 253) {
        errors.push('Domain too long (max 253 characters)');
      }
      
      if (domain.startsWith('.') || domain.endsWith('.')) {
        errors.push('Domain cannot start or end with a dot');
      }
      
      if (domain.includes('..')) {
        errors.push('Domain cannot contain consecutive dots');
      }
      
      // Check for valid domain format
      const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if (!domainRegex.test(domain)) {
        errors.push('Invalid domain format');
      }
      
      // Check for TLD
      const parts = domain.split('.');
      const tld = parts[parts.length - 1];
      if (tld.length < 2) {
        errors.push('Invalid top-level domain');
      }
    }

    // Check for common typos
    const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com'];
    const commonTypos = {
      'gmial.com': 'gmail.com',
      'gmai.com': 'gmail.com',
      'yahooo.com': 'yahoo.com',
      'hotmial.com': 'hotmail.com',
      'outlok.com': 'outlook.com'
    };
    
    if (domain && (commonTypos as any)[domain]) {
      errors.push(`Did you mean ${(commonTypos as any)[domain]}?`);
    }

    return {
      email: trimmedEmail,
      isValid: errors.length === 0,
      errors
    };
  };

  const validateSingle = () => {
    if (!singleEmail.trim()) return;
    const result = validateEmail(singleEmail);
    setResults([result]);
  };

  const validateBulk = () => {
    if (!bulkEmails.trim()) return;
    
    const emails = bulkEmails
      .split(/[\n,;]/)
      .map(email => email.trim())
      .filter(email => email.length > 0);
    
    const results = emails.map(validateEmail);
    setResults(results);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setBulkEmails(content);
    };
    reader.readAsText(file);
  };

  const validCount = results.filter(r => r.isValid).length;
  const invalidCount = results.length - validCount;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Validator</CardTitle>
          <CardDescription>
            Validate email addresses and check format correctness
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={mode === 'single' ? 'default' : 'outline'}
              onClick={() => setMode('single')}
            >
              Single Email
            </Button>
            <Button
              variant={mode === 'bulk' ? 'default' : 'outline'}
              onClick={() => setMode('bulk')}
            >
              Bulk Validation
            </Button>
          </div>

          {mode === 'single' ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="flex gap-2">
                  <Input
                    id="email"
                    type="email"
                    value={singleEmail}
                    onChange={(e) => setSingleEmail(e.target.value)}
                    placeholder="Enter email address..."
                    className="flex-1"
                  />
                  <Button onClick={validateSingle}>
                    <Mail className="w-4 h-4 mr-2" />
                    Validate
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bulk">Email Addresses</Label>
                <Textarea
                  id="bulk"
                  value={bulkEmails}
                  onChange={(e) => setBulkEmails(e.target.value)}
                  placeholder="Enter multiple email addresses (one per line, or separated by commas/semicolons)..."
                  className="min-h-[120px]"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={validateBulk} className="flex-1">
                  <Mail className="w-4 h-4 mr-2" />
                  Validate All
                </Button>
                <div className="relative">
                  <input
                    type="file"
                    accept=".txt,.csv"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload File
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Validation Results</CardTitle>
              <div className="flex gap-2">
                <Badge variant="default" className="bg-green-500">
                  {validCount} Valid
                </Badge>
                <Badge variant="destructive">
                  {invalidCount} Invalid
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.map((result, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    result.isValid 
                      ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950' 
                      : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {result.isValid ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="font-mono text-sm">{result.email}</div>
                      {result.errors.length > 0 && (
                        <div className="mt-1 space-y-1">
                          {result.errors.map((error, errorIndex) => (
                            <div key={errorIndex} className="text-sm text-red-600 dark:text-red-400">
                              • {error}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Validation Rules</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Must contain exactly one @ symbol</p>
          <p>• Local part (before @) cannot exceed 64 characters</p>
          <p>• Domain part (after @) cannot exceed 253 characters</p>
          <p>• Cannot start or end with dots</p>
          <p>• Cannot contain consecutive dots</p>
          <p>• Must have a valid top-level domain</p>
          <p>• Checks for common typos in popular domains</p>
        </CardContent>
      </Card>
    </div>
  );
}
