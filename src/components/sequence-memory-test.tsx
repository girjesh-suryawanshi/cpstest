"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Play, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

type GameState = 'idle' | 'watching' | 'playing' | 'finished';

const GRID_SIZE = 3;

export function SequenceMemoryTest() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [activeSquare, setActiveSquare] = useState<number | null>(null);

  const generateSequence = useCallback(() => {
    const newSequence = [...sequence];
    newSequence.push(Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE)));
    setSequence(newSequence);
    setPlayerSequence([]);
    setGameState('watching');
  }, [sequence]);
  
  const startGame = useCallback(() => {
    setLevel(1);
    setSequence([]);
    setPlayerSequence([]);
    setGameState('watching');
    setTimeout(() => {
      generateSequence();
    }, 500);
  }, [generateSequence]);

  useEffect(() => {
    if (gameState === 'watching' && sequence.length > 0) {
      let i = 0;
      const interval = setInterval(() => {
        setActiveSquare(sequence[i]);
        i++;
        if (i >= sequence.length) {
          clearInterval(interval);
          setTimeout(() => {
            setActiveSquare(null);
            setGameState('playing');
          }, 500);
        } else {
            setTimeout(() => setActiveSquare(null), 400);
        }
      }, 800);
      return () => clearInterval(interval);
    }
  }, [gameState, sequence]);
  
  const handleSquareClick = (index: number) => {
    if (gameState !== 'playing') return;

    const newPlayerSequence = [...playerSequence, index];
    setPlayerSequence(newPlayerSequence);

    // Check if the clicked square is correct so far
    if (sequence[newPlayerSequence.length - 1] !== index) {
      setGameState('finished');
      return;
    }
    
    // Check if the full sequence is entered correctly
    if (newPlayerSequence.length === sequence.length) {
      setLevel(prev => prev + 1);
      setGameState('watching');
      setTimeout(() => {
        generateSequence();
      }, 1000);
    }
  };

  const renderContent = () => {
    if (gameState === 'idle' || gameState === 'finished') {
       return (
          <div className="text-center p-6 flex flex-col items-center justify-center min-h-[400px]">
            {gameState === 'idle' ? (
                <>
                    <h2 className="text-2xl font-semibold text-foreground/90">Sequence Memory</h2>
                    <p className="text-muted-foreground mt-2">Memorize the sequence of flashing squares.</p>
                </>
            ) : (
                <>
                    <h2 className="text-3xl font-bold text-destructive">Game Over!</h2>
                    <p className="text-lg text-muted-foreground mt-2">You reached level <span className="font-bold text-primary">{level}</span>.</p>
                </>
            )}
          </div>
       );
    }
    
    return (
        <div 
            className="grid gap-4 p-4 w-full max-w-sm mx-auto"
            style={{gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`}}
        >
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
                <div 
                    key={i}
                    onClick={() => handleSquareClick(i)}
                    className={cn(
                        "aspect-square rounded-lg transition-colors duration-200",
                        "bg-muted hover:bg-muted/80",
                        gameState === 'playing' && "cursor-pointer",
                        gameState === 'watching' && activeSquare === i && "bg-primary",
                        gameState === 'finished' && sequence[playerSequence.length] === i && "!bg-destructive"
                    )}
                />
            ))}
        </div>
    )
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-8">
      <Card className="w-full shadow-lg">
        <CardContent className="p-6 relative flex flex-col items-center justify-center">
            <div className="absolute top-4 left-4 text-lg">Level: <span className="font-bold text-primary">{level}</span></div>
            <div className="absolute top-4 right-4 text-lg text-muted-foreground">
                {gameState === 'watching' && 'Watch...'}
                {gameState === 'playing' && 'Your turn...'}
            </div>
          {renderContent()}
        </CardContent>
        {(gameState === 'idle' || gameState === 'finished') && (
          <CardFooter className="flex justify-center p-6 border-t bg-card">
            <Button size="lg" onClick={startGame} className="w-full sm:w-auto">
              {gameState === 'idle' ? <Play className="mr-2" /> : <RefreshCw className="mr-2" />}
              {gameState === 'idle' ? 'Start Game' : 'Try Again'}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
