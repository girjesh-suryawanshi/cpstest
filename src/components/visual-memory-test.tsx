"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Play, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

type GameState = 'idle' | 'showing' | 'playing' | 'finished';

const getGridSize = (level: number) => {
    if (level < 3) return 3;
    if (level < 6) return 4;
    if (level < 10) return 5;
    return 6;
};

const getTileCount = (level: number) => {
    return Math.min(Math.floor(level / 2) + 3, 15);
}

export function VisualMemoryTest() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [pattern, setPattern] = useState<Set<number>>(new Set());
  const [playerGuesses, setPlayerGuesses] = useState<Set<number>>(new Set());
  const [gridSize, setGridSize] = useState(3);

  const generatePattern = useCallback(() => {
    const size = getGridSize(level);
    setGridSize(size);
    const newPattern = new Set<number>();
    const tileCount = getTileCount(level);
    while (newPattern.size < tileCount) {
      newPattern.add(Math.floor(Math.random() * (size * size)));
    }
    setPattern(newPattern);
    setPlayerGuesses(new Set());
    setGameState('showing');
  }, [level]);

  const startGame = useCallback(() => {
    setLevel(1);
    setLives(3);
    setGameState('showing');
     setTimeout(() => {
      generatePattern();
    }, 500);
  }, [generatePattern]);

  useEffect(() => {
    if(gameState === 'showing') {
        const timer = setTimeout(() => {
            setGameState('playing');
        }, 1500);
        return () => clearTimeout(timer);
    }
  }, [gameState, pattern]);


  const handleSquareClick = (index: number) => {
    if (gameState !== 'playing' || playerGuesses.has(index)) return;

    const newPlayerGuesses = new Set(playerGuesses).add(index);
    setPlayerGuesses(newPlayerGuesses);
    
    if(!pattern.has(index)) {
      setLives(prev => prev - 1);
       if (lives - 1 <= 0) {
         setGameState('finished');
       }
       return;
    }

    if (newPlayerGuesses.size === pattern.size) {
      let correct = true;
      for (const guess of newPlayerGuesses) {
        if (!pattern.has(guess)) {
          correct = false;
          break;
        }
      }
      
      if (correct) {
        setLevel(prev => prev + 1);
        setTimeout(() => generatePattern(), 1000);
      } else {
        setLives(prev => prev - 1);
        if (lives - 1 <= 0) {
            setGameState('finished');
        } else {
            setTimeout(() => generatePattern(), 1000);
        }
      }
    }
  };

  const renderContent = () => {
    if (gameState === 'idle' || gameState === 'finished') {
       return (
          <div className="text-center p-6 flex flex-col items-center justify-center min-h-[400px]">
            {gameState === 'idle' ? (
                <>
                    <h2 className="text-2xl font-semibold text-foreground/90">Visual Memory</h2>
                    <p className="text-muted-foreground mt-2">Memorize the highlighted squares.</p>
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
            className="grid gap-2 p-4 w-full max-w-sm mx-auto"
            style={{gridTemplateColumns: `repeat(${gridSize}, 1fr)`}}
        >
            {Array.from({ length: gridSize * gridSize }).map((_, i) => (
                <div 
                    key={i}
                    onClick={() => handleSquareClick(i)}
                    className={cn(
                        "aspect-square rounded-md transition-colors duration-150",
                         "bg-muted/60",
                        gameState === 'playing' && "cursor-pointer hover:bg-muted",
                        (gameState === 'showing' && pattern.has(i)) && "bg-blue-400",
                        (gameState === 'playing' && playerGuesses.has(i) && pattern.has(i)) && "!bg-blue-400",
                        (gameState === 'playing' && playerGuesses.has(i) && !pattern.has(i)) && "!bg-destructive"
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
            <div className="absolute top-4 flex justify-between w-[calc(100%-2rem)] px-4">
               <div className="text-lg">Level: <span className="font-bold text-primary">{level}</span></div>
               <div className="text-lg">Lives: <span className="font-bold text-destructive">{'❤️'.repeat(lives)}</span></div>
            </div>
            <div className="absolute top-12 text-lg text-muted-foreground">
                {gameState === 'showing' && 'Memorize...'}
                {gameState === 'playing' && 'Recall...'}
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
