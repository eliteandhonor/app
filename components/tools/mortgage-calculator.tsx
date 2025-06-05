
'use client';

import { useState } from 'react';
import { Home, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AmortizationEntry {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [amortization, setAmortization] = useState<AmortizationEntry[]>([]);
  const [showAmortization, setShowAmortization] = useState(false);

  const calculateMortgage = () => {
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate) / 100;
    const years = parseFloat(loanTerm);

    if (!principal || !annualRate || !years) return;

    const monthlyRate = annualRate / 12;
    const numberOfPayments = years * 12;

    // Calculate monthly payment using mortgage formula
    const monthlyPaymentAmount = 
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    setMonthlyPayment(monthlyPaymentAmount);
    setTotalInterest(monthlyPaymentAmount * numberOfPayments - principal);

    // Generate amortization schedule
    const schedule: AmortizationEntry[] = [];
    let remainingBalance = principal;

    for (let month = 1; month <= numberOfPayments; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPaymentAmount - interestPayment;
      remainingBalance -= principalPayment;

      schedule.push({
        month,
        payment: monthlyPaymentAmount,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, remainingBalance)
      });
    }

    setAmortization(schedule);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Home className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Mortgage Calculator</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Loan Details</CardTitle>
          <CardDescription>Enter your mortgage information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="loan-amount">Loan Amount ($)</Label>
              <Input
                id="loan-amount"
                type="number"
                placeholder="300,000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interest-rate">Interest Rate (%)</Label>
              <Input
                id="interest-rate"
                type="number"
                step="0.01"
                placeholder="3.5"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loan-term">Loan Term (years)</Label>
              <Input
                id="loan-term"
                type="number"
                placeholder="30"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={calculateMortgage} className="w-full">
            Calculate Mortgage
          </Button>
        </CardContent>
      </Card>

      {monthlyPayment && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Payment Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Monthly Payment</p>
                <p className="text-2xl font-bold text-primary">${monthlyPayment.toFixed(2)}</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Total Interest</p>
                <p className="text-2xl font-bold text-accent">${totalInterest?.toFixed(2)}</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="text-2xl font-bold">${((monthlyPayment * parseFloat(loanTerm) * 12) || 0).toFixed(2)}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowAmortization(!showAmortization)}
                className="w-full"
              >
                {showAmortization ? 'Hide' : 'Show'} Amortization Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {showAmortization && amortization.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Amortization Schedule</CardTitle>
            <CardDescription>Monthly payment breakdown (first 12 months)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Month</th>
                    <th className="text-right p-2">Payment</th>
                    <th className="text-right p-2">Principal</th>
                    <th className="text-right p-2">Interest</th>
                    <th className="text-right p-2">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {amortization.slice(0, 12).map((entry) => (
                    <tr key={entry.month} className="border-b">
                      <td className="p-2">{entry.month}</td>
                      <td className="text-right p-2">${entry.payment.toFixed(2)}</td>
                      <td className="text-right p-2">${entry.principal.toFixed(2)}</td>
                      <td className="text-right p-2">${entry.interest.toFixed(2)}</td>
                      <td className="text-right p-2">${entry.balance.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {amortization.length > 12 && (
              <p className="text-sm text-muted-foreground mt-2">
                Showing first 12 months of {amortization.length} total payments
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
