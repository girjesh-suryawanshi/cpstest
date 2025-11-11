"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, RefreshCw, Crosshair } from 'lucide-react';
import { cn } from '@/lib/utils';

type GameState = 'idle' | 'running' | 'finished';

interface Target {
  id: number;
  x: number;
  y: number;
  size: number;
}

const GAME_DURATION = 30; // seconds

export function AimTrainer() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [timer, setTimer] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [targets, setTargets] = useState<Target[]>([]);

  const handleStart = useCallback(() => {
    setGameState('running');
    setTimer(GAME_DURATION);
    setScore(0);
    setMisses(0);
    setTargets([createTarget()]);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === 'running' && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (gameState === 'running' && timer === 0) {
      setGameState('finished');
      setTargets([]);
    }
    return () => clearInterval(interval);
  }, [gameState, timer]);

  const createTarget = (): Target => {
    return {
      id: Date.now(),
      x: Math.random() * 90 + 5, // % from 5% to 95%
      y: Math.random() * 90 + 5, // % from 5% to 95%
      size: Math.random() * 30 + 30, // px from 30px to 60px
    };
  };

  const handleTargetClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, targetId: number) => {
    e.stopPropagation();
    if (gameState !== 'running') return;
    setScore(prev => prev + 1);
    setTargets(prev => prev.filter(t => t.id !== targetId));
    setTimeout(() => {
        setTargets(prev => [...prev, createTarget()]);
        // Add another target to increase difficulty
        if(score > 10 && prev.length < 3){
            setTargets(prev => [...prev, createTarget()]);
        }
    }, 100); // Small delay before new target appears
  };

  const handleMiss = () => {
    if (gameState === 'running') {
      setMisses(prev => prev + 1);
    }
  };

  const accuracy = useMemo(() => {
    const totalClicks = score + misses;
    if (totalClicks === 0) return 0;
    return Math.round((score / totalClicks) * 100);
  }, [score, misses]);

  const renderGameContent = () => {
    switch (gameState) {
      case 'idle':
        return (
          <div className="text-center flex flex-col items-center justify-center h-full">
            <Crosshair className="w-16 h-16 text-primary mb-4" />
            <h2 className="text-2xl font-semibold text-foreground/90">Aim Trainer</h2>
            <p className="text-muted-foreground mt-2">Click the targets as fast as you can.</p>
          </div>
        );
      case 'running':
        return (
          <div className="relative w-full h-full cursor-crosshair" onClick={handleMiss}>
            {targets.map(target => (
              <div
                key={target.id}
                className="absolute rounded-full bg-primary flex items-center justify-center transition-all duration-100"
                style={{
                  left: `${target.x}%`,
                  top: `${target.y}%`,
                  width: `${target.size}px`,
                  height: `${target.size}px`,
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={(e) => handleTargetClick(e, target.id)}
              >
                 <div className="w-1/3 h-1/3 rounded-full bg-red-500"></div>
              </div>
            ))}
          </div>
        );
      case 'finished':
        return (
          <div className="text-center flex flex-col items-center justify-center h-full p-6">
            <h2 className="text-3xl font-bold">Game Over!</h2>
            <div className="grid grid-cols-2 gap-4 mt-6 text-center w-full max-w-sm">
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-muted-foreground text-sm">Score</p>
                  <p className="text-4xl font-bold text-primary">{score}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-muted-foreground text-sm">Accuracy</p>
                  <p className="text-4xl font-bold text-primary">{accuracy}%</p>
                </div>
                 <div className="p-4 rounded-lg bg-muted col-span-2">
                  <p className="text-muted-foreground text-sm">Misses</p>
                  <p className="text-4xl font-bold text-destructive">{misses}</p>
                </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8">
      <Card className="w-full shadow-lg overflow-hidden">
        {gameState === 'running' && (
          <CardHeader className="p-4 border-b flex-row justify-between items-center">
            <div className="text-lg">Score: <span className="font-bold text-primary">{score}</span></div>
            <div className="text-lg">Time: <span className="font-bold text-primary">{timer}s</span></div>
            <div className="text-lg">Misses: <span className="font-bold text-destructive">{misses}</span></div>
          </CardHeader>
        )}
        <CardContent className="p-0">
          <div className="w-full h-[500px] bg-accent/10 relative">
            {renderGameContent()}
          </div>
        </CardContent>
        {(gameState === 'idle' || gameState === 'finished') && (
          <CardFooter className="flex justify-center p-6 border-t bg-card">
            <Button size="lg" onClick={handleStart} className="w-full sm:w-auto">
              {gameState === 'idle' ? <Play className="mr-2"/> : <RefreshCw className="mr-2"/>}
              {gameState === 'idle' ? 'Start Training' : 'Try Again'}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
