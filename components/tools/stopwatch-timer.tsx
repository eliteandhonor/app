
'use client';

import { useState, useEffect, useRef } from 'react';
import { Timer, Play, Pause, Square, RotateCcw, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface LapTime {
  id: number;
  time: number;
  lapTime: number;
}

export function StopwatchTimer() {
  // Stopwatch state
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [stopwatchRunning, setStopwatchRunning] = useState(false);
  const [laps, setLaps] = useState<LapTime[]>([]);
  const stopwatchIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Timer state
  const [timerMinutes, setTimerMinutes] = useState('');
  const [timerSeconds, setTimerSeconds] = useState('');
  const [timerTime, setTimerTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const formatTimerTime = (time: number): string => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Stopwatch functions
  const startStopwatch = () => {
    setStopwatchRunning(true);
    stopwatchIntervalRef.current = setInterval(() => {
      setStopwatchTime(prev => prev + 10);
    }, 10);
  };

  const pauseStopwatch = () => {
    setStopwatchRunning(false);
    if (stopwatchIntervalRef.current) {
      clearInterval(stopwatchIntervalRef.current);
    }
  };

  const resetStopwatch = () => {
    setStopwatchRunning(false);
    setStopwatchTime(0);
    setLaps([]);
    if (stopwatchIntervalRef.current) {
      clearInterval(stopwatchIntervalRef.current);
    }
  };

  const addLap = () => {
    const lapTime = laps.length > 0 ? stopwatchTime - laps[laps.length - 1].time : stopwatchTime;
    setLaps(prev => [...prev, {
      id: prev.length + 1,
      time: stopwatchTime,
      lapTime
    }]);
  };

  // Timer functions
  const startTimer = () => {
    const minutes = parseInt(timerMinutes) || 0;
    const seconds = parseInt(timerSeconds) || 0;
    const totalTime = (minutes * 60 + seconds) * 1000;
    
    if (totalTime > 0) {
      setTimerTime(totalTime);
      setTimerRunning(true);
      setTimerFinished(false);
      
      timerIntervalRef.current = setInterval(() => {
        setTimerTime(prev => {
          if (prev <= 1000) {
            setTimerRunning(false);
            setTimerFinished(true);
            playAlarm();
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
    }
  };

  const pauseTimer = () => {
    setTimerRunning(false);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setTimerTime(0);
    setTimerFinished(false);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
  };

  const playAlarm = () => {
    // Create a simple beep sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1);
  };

  // Cleanup intervals on unmount
  useEffect(() => {
    return () => {
      if (stopwatchIntervalRef.current) {
        clearInterval(stopwatchIntervalRef.current);
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Timer className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Stopwatch & Timer</h2>
      </div>

      <Tabs defaultValue="stopwatch" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="stopwatch">Stopwatch</TabsTrigger>
          <TabsTrigger value="timer">Timer</TabsTrigger>
        </TabsList>

        <TabsContent value="stopwatch" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Stopwatch</CardTitle>
              <CardDescription>Precise time measurement with lap tracking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-6xl font-mono font-bold text-primary mb-4">
                  {formatTime(stopwatchTime)}
                </div>
                <div className="flex justify-center space-x-4">
                  {!stopwatchRunning ? (
                    <Button onClick={startStopwatch} size="lg">
                      <Play className="h-5 w-5 mr-2" />
                      Start
                    </Button>
                  ) : (
                    <Button onClick={pauseStopwatch} variant="secondary" size="lg">
                      <Pause className="h-5 w-5 mr-2" />
                      Pause
                    </Button>
                  )}
                  <Button onClick={resetStopwatch} variant="outline" size="lg">
                    <RotateCcw className="h-5 w-5 mr-2" />
                    Reset
                  </Button>
                  {stopwatchRunning && (
                    <Button onClick={addLap} variant="outline" size="lg">
                      <Plus className="h-5 w-5 mr-2" />
                      Lap
                    </Button>
                  )}
                </div>
              </div>

              {laps.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold">Lap Times</h3>
                  <div className="max-h-40 overflow-y-auto space-y-1">
                    {laps.slice().reverse().map((lap) => (
                      <div key={lap.id} className="flex justify-between items-center p-2 bg-muted rounded">
                        <span className="font-medium">Lap {lap.id}</span>
                        <div className="text-right">
                          <div className="font-mono">{formatTime(lap.lapTime)}</div>
                          <div className="text-sm text-muted-foreground font-mono">
                            Total: {formatTime(lap.time)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timer" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Countdown Timer</CardTitle>
              <CardDescription>Set a countdown timer with alarm notification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!timerRunning && timerTime === 0 && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="timer-minutes">Minutes</Label>
                    <Input
                      id="timer-minutes"
                      type="number"
                      min="0"
                      max="59"
                      placeholder="0"
                      value={timerMinutes}
                      onChange={(e) => setTimerMinutes(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timer-seconds">Seconds</Label>
                    <Input
                      id="timer-seconds"
                      type="number"
                      min="0"
                      max="59"
                      placeholder="0"
                      value={timerSeconds}
                      onChange={(e) => setTimerSeconds(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="text-center">
                <div className={`text-6xl font-mono font-bold mb-4 ${timerFinished ? 'text-red-500 animate-pulse' : 'text-primary'}`}>
                  {formatTimerTime(timerTime)}
                </div>
                
                {timerFinished && (
                  <div className="text-xl font-semibold text-red-500 mb-4 animate-pulse">
                    Time's Up! 🔔
                  </div>
                )}

                <div className="flex justify-center space-x-4">
                  {!timerRunning && timerTime === 0 ? (
                    <Button onClick={startTimer} size="lg">
                      <Play className="h-5 w-5 mr-2" />
                      Start Timer
                    </Button>
                  ) : !timerRunning ? (
                    <Button onClick={() => {
                      setTimerRunning(true);
                      timerIntervalRef.current = setInterval(() => {
                        setTimerTime(prev => {
                          if (prev <= 1000) {
                            setTimerRunning(false);
                            setTimerFinished(true);
                            playAlarm();
                            return 0;
                          }
                          return prev - 1000;
                        });
                      }, 1000);
                    }} size="lg">
                      <Play className="h-5 w-5 mr-2" />
                      Resume
                    </Button>
                  ) : (
                    <Button onClick={pauseTimer} variant="secondary" size="lg">
                      <Pause className="h-5 w-5 mr-2" />
                      Pause
                    </Button>
                  )}
                  <Button onClick={resetTimer} variant="outline" size="lg">
                    <Square className="h-5 w-5 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    setTimerMinutes('5');
                    setTimerSeconds('0');
                  }}
                  disabled={timerRunning}
                >
                  5 min
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setTimerMinutes('10');
                    setTimerSeconds('0');
                  }}
                  disabled={timerRunning}
                >
                  10 min
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setTimerMinutes('25');
                    setTimerSeconds('0');
                  }}
                  disabled={timerRunning}
                >
                  25 min
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
