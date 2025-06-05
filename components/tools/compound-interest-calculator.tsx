
'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { TrendingUp, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Chart = dynamic(() => import('react-chartjs-2').then(mod => mod.Line), {
  ssr: false,
  loading: () => <div className="h-64 bg-muted rounded-lg flex items-center justify-center">Loading chart...</div>
});

// Register Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CompoundData {
  year: number;
  principal: number;
  interest: number;
  total: number;
}

export function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [compound, setCompound] = useState('12'); // Monthly by default
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [chartData, setChartData] = useState<CompoundData[]>([]);

  const calculateCompoundInterest = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseFloat(compound);
    const pmt = parseFloat(monthlyContribution) || 0;

    if (!p || !r || !t || !n) return;

    const data: CompoundData[] = [];
    let currentPrincipal = p;
    let totalContributions = p;

    for (let year = 0; year <= t; year++) {
      if (year === 0) {
        data.push({
          year,
          principal: p,
          interest: 0,
          total: p
        });
      } else {
        // Calculate compound interest for the year
        const yearlyContributions = pmt * 12;
        const compoundAmount = currentPrincipal * Math.pow(1 + r / n, n);
        
        // Add monthly contributions with compound interest
        let contributionGrowth = 0;
        for (let month = 1; month <= 12; month++) {
          const monthsRemaining = 12 - month;
          contributionGrowth += pmt * Math.pow(1 + r / n, (n * monthsRemaining) / 12);
        }
        
        currentPrincipal = compoundAmount + contributionGrowth;
        totalContributions += yearlyContributions;
        
        data.push({
          year,
          principal: totalContributions,
          interest: currentPrincipal - totalContributions,
          total: currentPrincipal
        });
      }
    }

    setChartData(data);
    setResult(currentPrincipal);
    setTotalInterest(currentPrincipal - totalContributions);
  };

  const chartConfig = {
    data: {
      labels: chartData.map(d => `Year ${d.year}`),
      datasets: [
        {
          label: 'Principal',
          data: chartData.map(d => d.principal),
          borderColor: '#2563EB',
          backgroundColor: '#2563EB20',
          fill: true,
        },
        {
          label: 'Interest Earned',
          data: chartData.map(d => d.interest),
          borderColor: '#059669',
          backgroundColor: '#05966920',
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: 'Investment Growth Over Time',
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value: any) {
              return '$' + value.toLocaleString();
            }
          }
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Compound Interest Calculator</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Investment Details</CardTitle>
          <CardDescription>Enter your investment parameters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="principal">Initial Investment ($)</Label>
              <Input
                id="principal"
                type="number"
                placeholder="10,000"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate">Annual Interest Rate (%)</Label>
              <Input
                id="rate"
                type="number"
                step="0.01"
                placeholder="7"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time Period (years)</Label>
              <Input
                id="time"
                type="number"
                placeholder="10"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="compound">Compound Frequency</Label>
              <Select value={compound} onValueChange={setCompound}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Annually</SelectItem>
                  <SelectItem value="2">Semi-annually</SelectItem>
                  <SelectItem value="4">Quarterly</SelectItem>
                  <SelectItem value="12">Monthly</SelectItem>
                  <SelectItem value="365">Daily</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="monthly-contribution">Monthly Contribution ($)</Label>
              <Input
                id="monthly-contribution"
                type="number"
                placeholder="500 (optional)"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={calculateCompoundInterest} className="w-full">
            Calculate Growth
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>Investment Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Final Amount</p>
                <p className="text-2xl font-bold text-primary">${result.toFixed(2)}</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Total Interest</p>
                <p className="text-2xl font-bold text-accent">${totalInterest?.toFixed(2)}</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Total Contributions</p>
                <p className="text-2xl font-bold">
                  ${(parseFloat(principal) + (parseFloat(monthlyContribution) || 0) * 12 * parseFloat(time)).toFixed(2)}
                </p>
              </div>
            </div>

            {chartData.length > 0 && (
              <div className="h-64">
                <Chart {...chartConfig} />
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
