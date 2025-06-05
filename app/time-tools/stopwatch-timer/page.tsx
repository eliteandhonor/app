
import { Metadata } from 'next';
import { StopwatchTimer } from '@/components/tools/stopwatch-timer';
import { ToolLayout } from '@/components/tool-layout';
import { getToolById, getToolsByCategory } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: "Stopwatch & Timer",
  description: "Precise stopwatch with lap times and countdown timer with alarm. Perfect for workouts, cooking, productivity, and time management.",
};

export default function StopwatchTimerPage() {
  const tool = getToolById('stopwatch-timer')!;
  const relatedTools = getToolsByCategory('time-tools').filter(t => t.id !== tool.id).slice(0, 4);

  const faq = [
    {
      question: "How accurate is the stopwatch?",
      answer: "The stopwatch is accurate to 10 milliseconds (0.01 seconds) and uses high-precision JavaScript timing functions for reliable measurements."
    },
    {
      question: "Can I use lap times for training?",
      answer: "Yes! The lap feature is perfect for tracking split times during workouts, races, or any activity where you need to measure intervals while keeping the main timer running."
    },
    {
      question: "Will the timer work if I close the browser tab?",
      answer: "The timer runs in the current browser tab. If you close the tab or navigate away, the timer will stop. Keep the tab open for continuous timing."
    },
    {
      question: "How does the timer alarm work?",
      answer: "When the countdown reaches zero, the timer displays a visual alert and plays an audio beep. Make sure your device volume is on to hear the alarm sound."
    }
  ];

  return (
    <ToolLayout tool={tool} faq={faq} relatedTools={relatedTools}>
      <StopwatchTimer />
    </ToolLayout>
  );
}
