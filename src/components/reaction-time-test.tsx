"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Play, RefreshCw, Hand } from 'lucide-react';

type GameState = 'idle' | 'waiting' | 'ready' | 'finished' | 'tooSoon';

export function ReactionTimeTest() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [result, setResult] = useState<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleStart = useCallback(() => {
    setGameState('waiting');
    setResult(null);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    const randomDelay = Math.random() * 4000 + 2000; // 2-6 seconds
    timeoutRef.current = setTimeout(() => {
      setGameState('ready');
      startTimeRef.current = Date.now();
    }, randomDelay);
  }, []);
  
  const handleClick = () => {
    if (gameState === 'ready') {
      const endTime = Date.now();
      setResult(endTime - startTimeRef.current);
      setGameState('finished');
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    } else if (gameState === 'waiting') {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setGameState('tooSoon');
    }
  };

  const renderContent = () => {
    switch (gameState) {
      case 'idle':
        return (
          <div className="text-center p-6 flex flex-col items-center justify-center">
            <Hand className="w-16 h-16 text-primary mb-4" />
            <h2 className="text-2xl font-semibold text-foreground/90">Reaction Test</h2>
            <p className="text-muted-foreground mt-2">When the screen turns green, click as fast as you can.</p>
          </div>
        );
      case 'waiting':
        return (
          <div className="text-center p-6 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold text-white">Wait for green...</h2>
          </div>
        );
      case 'ready':
         return (
          <div className="text-center p-6 flex flex-col items-center justify-center">
            <h2 className="text-4xl font-bold text-white">Click!</h2>
          </div>
        );
       case 'tooSoon':
        return (
          <div className="text-center p-6 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold text-white">Too Soon!</h2>
            <p className="text-white/80 mt-2">Click to try again.</p>
          </div>
        );
      case 'finished':
        return (
          <div className="text-center p-6">
            <p className="text-lg text-muted-foreground">Your Reaction Time</p>
            <p className="text-7xl font-bold font-headline text-primary">{result}ms</p>
          </div>
        );
    }
  };
  
  const getBackgroundColor = () => {
    switch(gameState) {
        case 'waiting': return 'bg-orange-500';
        case 'ready': return 'bg-green-500';
        case 'tooSoon': return 'bg-destructive';
        default: return 'bg-accent/10';
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8">
      <Card className="w-full shadow-lg overflow-hidden">
        <CardContent 
          className="p-0"
          onClick={gameState === 'tooSoon' ? handleStart : handleClick}
        >
          <div className={`flex items-center justify-center min-h-[350px] transition-colors duration-100 cursor-pointer ${getBackgroundColor()}`}>
            {renderContent()}
          </div>
        </CardContent>
        {(gameState === 'idle' || gameState === 'finished') && (
            <CardFooter className="flex justify-center p-6 border-t bg-card">
              <Button size="lg" onClick={handleStart} className="w-full sm:w-auto">
                {gameState === 'idle' ? <Play className="mr-2"/> : <RefreshCw className="mr-2"/>}
                {gameState === 'idle' ? 'Start Test' : 'Try Again'}
              </Button>
            </CardFooter>
        )}
      </Card>
    </div>
  );
}
