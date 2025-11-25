"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Play, RefreshCw, Award } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useFirebase } from '@/components/firebase-provider';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';


const WAIT_DURATION = 3; // seconds

type GameState = 'idle' | 'waiting' | 'running' | 'finished';

interface ClickData {
  second: string;
  clicks: number;
}

interface CpsTestProps {
  gameDuration: number;
}

export function CpsTest({ gameDuration }: CpsTestProps) {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [countdown, setCountdown] = useState(WAIT_DURATION);
  const [gameTimer, setGameTimer] = useState(gameDuration);
  const [clickCount, setClickCount] = useState(0);
  const [clickTimestamps, setClickTimestamps] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const { toast } = useToast();
  const { firestore } = useFirebase();

  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStart = useCallback(() => {
    setGameState('waiting');
    setCountdown(WAIT_DURATION);
    setClickCount(0);
    setClickTimestamps([]);
    setStartTime(0);
    setGameTimer(gameDuration);
    setShowSubmitDialog(false);
  }, [gameDuration]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (gameState === 'waiting' && countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (gameState === 'waiting' && countdown === 0) {
      setGameState('running');
      setStartTime(Date.now());
    }
    return () => clearInterval(intervalId);
  }, [gameState, countdown]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (gameState === 'running' && gameTimer > 0) {
      intervalId = setInterval(() => {
        setGameTimer((prev) => prev - 1);
      }, 1000);
    } else if (gameState === 'running' && gameTimer === 0) {
      setGameState('finished');
    }
    return () => clearInterval(intervalId);
  }, [gameState, gameTimer]);

  const handleClick = () => {
    if (gameState === 'running') {
      setClickCount((prev) => prev + 1);
      setClickTimestamps((prev) => [...prev, Date.now()]);
    }
  };

  const cps = useMemo(() => {
    if (clickCount === 0 || gameDuration === 0) return 0;
    return parseFloat((clickCount / gameDuration).toFixed(2));
  }, [clickCount, gameDuration]);

  const chartData = useMemo((): ClickData[] => {
    if (startTime === 0) {
      return Array.from({ length: gameDuration }, (_, i) => ({ second: `${i + 1}s`, clicks: 0 }));
    }

    const buckets: number[] = Array(gameDuration).fill(0);
    clickTimestamps.forEach(ts => {
      const secondIndex = Math.floor((ts - startTime) / 1000);
      if (secondIndex >= 0 && secondIndex < gameDuration) {
        buckets[secondIndex]++;
      }
    });

    return buckets.map((clicks, i) => ({
      second: `${i + 1}s`,
      clicks,
    }));
  }, [clickTimestamps, startTime, gameDuration]);

  const chartConfig = {
    clicks: {
      label: "Clicks",
      color: "hsl(var(--primary))",
    },
  };

  const handleScoreSubmit = async () => {
    if (!firestore) {
        toast({ title: 'Error', description: 'Firestore is not initialized. Cannot submit score.', variant: 'destructive'});
        return;
    }
    if (!playerName || playerName.trim().length === 0) {
      toast({ title: 'Enter a name', description: 'Please add a display name before submitting.', variant: 'destructive' });
      return;
    }
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
        const scoresCollection = collection(firestore, 'leaderboard');
        await addDoc(scoresCollection, {
            name: playerName.trim(),
            score: Number(cps),
            game: 'cps-test',
            createdAt: serverTimestamp(),
        });

      toast({ title: 'Score submitted!', description: 'Your score has been added to the leaderboard.' });
      setShowSubmitDialog(false);
    } catch (err: any) {
      console.error('Submit failed:', err);
      toast({ title: 'Submission failed', description: err.message || 'An unexpected error occurred. Check the console for details.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderContent = () => {
    switch (gameState) {
      case 'idle':
        return (
          <div className="text-center p-6">
            <h2 className="text-2xl font-semibold text-foreground/90">Click Speed Test</h2>
            <p className="text-muted-foreground mt-2">Click the button to start the test. Then click the area below as fast as you can.</p>
          </div>
        );
      case 'waiting':
        return (
          <div className="text-center">
            <p className="text-xl text-muted-foreground font-medium">Get ready...</p>
            <p className="text-8xl font-bold font-headline text-primary">{countdown}</p>
          </div>
        );
      case 'running':
        return (
          <div className="text-center relative w-full h-full flex flex-col justify-center items-center">
            <div className="absolute top-4 right-4 text-2xl font-semibold text-primary">{gameTimer}s</div>
            <p className="text-8xl font-bold font-headline text-primary">{clickCount}</p>
            <div className="text-lg text-muted-foreground mt-2">Click!</div>
          </div>
        );
      case 'finished':
        return (
          <div className="text-center p-6">
            <p className="text-lg text-muted-foreground">Your Score</p>
            <p className="text-7xl font-bold font-headline text-primary">{cps}</p>
            <p className="text-muted-foreground">Clicks Per Second</p>
            <p className="mt-4 text-lg">You made <span className="font-bold text-foreground">{clickCount}</span> clicks in {gameDuration} seconds.</p>
          </div>
        );
    }
  };

  return (
    <>
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8">
        <Card className="w-full shadow-lg overflow-hidden">
          <CardContent
            className={cn("p-0 cursor-pointer", gameState === 'running' && 'bg-primary/5')}
            onClick={handleClick}
          >
            <div className={`flex items-center justify-center min-h-[350px] transition-colors`}>
              {renderContent()}
            </div>
          </CardContent>
          {(gameState === 'idle' || gameState === 'finished') && (
            <CardFooter className="flex-col sm:flex-row justify-center p-6 border-t bg-card gap-4">
              <Button size="lg" onClick={handleStart} className="w-full sm:w-auto">
                {gameState === 'idle' ? <Play className="mr-2" /> : <RefreshCw className="mr-2" />}
                {gameState === 'idle' ? 'Start Test' : 'Try Again'}
              </Button>
              {gameState === 'finished' && (
                <Button size="lg" variant="outline" onClick={() => setShowSubmitDialog(true)} disabled={!firestore}>
                  <Award className="mr-2" />
                  Submit to Leaderboard
                </Button>
              )}
            </CardFooter>
          )}
        </Card>

        {gameState === 'finished' && (
          <Card className="w-full shadow-lg">
            <CardHeader>
              <CardTitle>Performance Analysis</CardTitle>
              <CardDescription>Your clicking performance over each second.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[250px] w-full">
                <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="second" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} allowDecimals={false} label={{ value: 'Clicks', angle: -90, position: 'insideLeft', offset: 10 }} />
                  <ChartTooltip cursor={true} content={<ChartTooltipContent indicator="line" />} />
                  <Line dataKey="clicks" type="monotone" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ fill: "hsl(var(--primary))", r: 5 }} activeDot={{ r: 8, style: { stroke: 'hsl(var(--accent))' } }} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Your Score</DialogTitle>
            <DialogDescription>
              Your CPS score is <strong className="text-primary">{cps}</strong>. Enter your name to appear on the leaderboard.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              id="name"
              placeholder="Your Name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSubmitDialog(false)}>Cancel</Button>
            <Button onClick={handleScoreSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
