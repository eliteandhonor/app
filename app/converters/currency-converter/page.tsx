
import { Metadata } from 'next';
import { CurrencyConverter } from '@/components/tools/currency-converter';
import { ToolLayout } from '@/components/tool-layout';
import { getToolById, getToolsByCategory } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: "Currency Converter",
  description: "Convert between currencies with live exchange rates. Support for major world currencies including USD, EUR, GBP, JPY, and more.",
};

export default function CurrencyConverterPage() {
  const tool = getToolById('currency-converter')!;
  const relatedTools = getToolsByCategory('converters').filter(t => t.id !== tool.id).slice(0, 4);

  const faq = [
    {
      question: "How often are exchange rates updated?",
      answer: "Exchange rates are updated every 30 minutes during market hours. Rates may be delayed during weekends and holidays when forex markets are closed."
    },
    {
      question: "Are the exchange rates real-time?",
      answer: "The rates shown are near real-time but may have a slight delay. For actual trading or large transactions, always check with your bank or financial institution for current rates."
    },
    {
      question: "Why do exchange rates fluctuate?",
      answer: "Exchange rates change constantly due to various factors including economic indicators, political events, market sentiment, interest rates, and supply and demand in the forex market."
    },
    {
      question: "What affects currency exchange rates?",
      answer: "Key factors include economic growth, inflation rates, interest rates, political stability, trade balances, and market speculation. Central bank policies also significantly impact exchange rates."
    }
  ];

  return (
    <ToolLayout tool={tool} faq={faq} relatedTools={relatedTools}>
      <CurrencyConverter />
    </ToolLayout>
  );
}
