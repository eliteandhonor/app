
'use client';

import { useState, useEffect } from 'react';
import { DollarSign, ArrowLeftRight, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

interface ExchangeRates {
  [key: string]: number;
}

const currencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
];

export function CurrencyConverter() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState<number | null>(null);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Mock exchange rates (in a real app, you'd fetch from an API)
  const mockExchangeRates: ExchangeRates = {
    'USD': 1.0,
    'EUR': 0.85,
    'GBP': 0.73,
    'JPY': 110.0,
    'CAD': 1.25,
    'AUD': 1.35,
    'CHF': 0.92,
    'CNY': 6.45,
    'INR': 74.5,
    'BRL': 5.2,
  };

  const fetchExchangeRates = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, you would fetch from a free API like:
      // https://api.exchangerate-api.com/v4/latest/USD
      // For this demo, we'll use mock data
      
      setExchangeRates(mockExchangeRates);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to fetch exchange rates. Using cached rates.');
      setExchangeRates(mockExchangeRates);
    } finally {
      setLoading(false);
    }
  };

  const convertCurrency = () => {
    const value = parseFloat(amount);
    if (isNaN(value) || !exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) return;

    // Convert to USD first, then to target currency
    const usdAmount = value / exchangeRates[fromCurrency];
    const converted = usdAmount * exchangeRates[toCurrency];
    
    setResult(converted);
  };

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    if (result !== null) {
      setAmount(result.toString());
    }
  };

  const getPopularConversions = () => {
    if (!amount || isNaN(parseFloat(amount)) || !exchangeRates[fromCurrency]) return [];

    const value = parseFloat(amount);
    const usdAmount = value / exchangeRates[fromCurrency];
    
    return ['USD', 'EUR', 'GBP', 'JPY']
      .filter(code => code !== fromCurrency)
      .map(code => ({
        currency: currencies.find(c => c.code === code)!,
        value: usdAmount * exchangeRates[code]
      }));
  };

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  useEffect(() => {
    if (amount && exchangeRates[fromCurrency] && exchangeRates[toCurrency]) {
      convertCurrency();
    }
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <DollarSign className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Currency Converter</h2>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">Convert Currencies</CardTitle>
              <CardDescription>
                Live exchange rates updated every 30 minutes
                {lastUpdated && (
                  <span className="block text-xs mt-1">
                    Last updated: {lastUpdated.toLocaleTimeString()}
                  </span>
                )}
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchExchangeRates}
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>From</Label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>To</Label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center">
            <Button variant="outline" size="sm" onClick={swapCurrencies}>
              <ArrowLeftRight className="h-4 w-4" />
              <span className="sr-only">Swap currencies</span>
            </Button>
          </div>

          {result !== null && (
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-lg font-semibold text-center">
                {currencies.find(c => c.code === fromCurrency)?.symbol}{amount} {fromCurrency} = 
                <span className="text-primary ml-2">
                  {currencies.find(c => c.code === toCurrency)?.symbol}{result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {toCurrency}
                </span>
              </p>
              {exchangeRates[fromCurrency] && exchangeRates[toCurrency] && (
                <p className="text-sm text-muted-foreground text-center mt-2">
                  1 {fromCurrency} = {(exchangeRates[toCurrency] / exchangeRates[fromCurrency]).toFixed(4)} {toCurrency}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {getPopularConversions().length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Popular Conversions</CardTitle>
            <CardDescription>
              {amount} {fromCurrency} in other major currencies:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {getPopularConversions().map(({ currency, value }) => (
                <div key={currency.code} className="p-3 bg-muted rounded-lg">
                  <p className="font-medium">
                    {currency.symbol}{value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  <p className="text-sm text-muted-foreground">{currency.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Exchange Rate Information</CardTitle>
          <CardDescription>Current rates relative to USD</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 text-sm">
            {currencies.map((currency) => (
              <div key={currency.code} className="p-2 bg-muted rounded">
                <p className="font-medium">{currency.code}</p>
                <p className="text-muted-foreground">
                  {exchangeRates[currency.code]?.toFixed(4) || 'Loading...'}
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            * Rates are for demonstration purposes. In production, use a reliable financial data provider.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
