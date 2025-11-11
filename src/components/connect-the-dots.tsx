"use client";

import { useState, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Play, RefreshCw, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

type GameState = 'idle' | 'playing' | 'finished';
type Point = { x: number; y: number };

// Star shape points
const starPoints: Point[] = [
  { x: 50, y: 5 },   // 1
  { x: 61, y: 35 },  // 2
  { x: 95, y: 35 },  // 3
  { x: 68, y: 57 },  // 4
  { x: 79, y: 90 },  // 5
  { x: 50, y: 70 },  // 6
  { x: 21, y: 90 },  // 7
  { x: 32, y: 57 },  // 8
  { x: 5, y: 35 },   // 9
  { x: 39, y: 35 },  // 10
];

export function ConnectTheDots() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [connectedCount, setConnectedCount] = useState(0);

  const startGame = useCallback(() => {
    setGameState('playing');
    setConnectedCount(0);
  }, []);

  const handleDotClick = (index: number) => {
    if (gameState !== 'playing' || index !== connectedCount) return;

    const newCount = connectedCount + 1;
    setConnectedCount(newCount);

    if (newCount === starPoints.length) {
      setGameState('finished');
    }
  };

  const lines = useMemo(() => {
    const renderedLines = [];
    for (let i = 0; i < connectedCount - 1; i++) {
      const p1 = starPoints[i];
      const p2 = starPoints[i + 1];
      renderedLines.push(
        <line key={`line-${i}`} x1={`${p1.x}%`} y1={`${p1.y}%`} x2={`${p2.x}%`} y2={`${p2.y}%`} stroke="hsl(var(--primary))" strokeWidth="2" />
      );
    }
    // Close the star shape when finished
    if (gameState === 'finished') {
        const p1 = starPoints[starPoints.length - 1];
        const p2 = starPoints[0];
        renderedLines.push(
            <line key="line-final" x1={`${p1.x}%`} y1={`${p1.y}%`} x2={`${p2.x}%`} y2={`${p2.y}%`} stroke="hsl(var(--primary))" strokeWidth="2" />
        );
    }
    return renderedLines;
  }, [connectedCount, gameState]);

  const renderContent = () => {
    if (gameState === 'idle') {
      return (
        <div className="text-center p-6 flex flex-col items-center justify-center min-h-[400px]">
          <h2 className="text-2xl font-semibold text-foreground/90">Connect the Dots</h2>
          <p className="text-muted-foreground mt-2">Click the numbers in order to reveal the picture.</p>
        </div>
      );
    }

    if (gameState === 'finished') {
        return (
             <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center text-center rounded-lg">
                <h2 className="text-4xl font-bold text-primary">You made a star!</h2>
                <Star className="w-24 h-24 text-yellow-400 fill-yellow-300 my-4" />
            </div>
        )
    }

    return null;
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center gap-8">
      <Card className="w-full shadow-lg">
        <CardContent className="p-6 relative flex flex-col items-center justify-center">
          <div className="w-full aspect-square relative">
            <svg width="100%" height="100%" viewBox="0 0 100 100">
                {lines}
                {starPoints.map((point, index) => (
                    <g key={index} onClick={() => handleDotClick(index)} className={cn(gameState === 'playing' && 'cursor-pointer group')}>
                        <circle
                            cx={`${point.x}%`}
                            cy={`${point.y}%`}
                            r="6"
                            className={cn(
                                "fill-transparent group-hover:fill-primary/20",
                            )}
                        />
                        <circle
                            cx={`${point.x}%`}
                            cy={`${point.y}%`}
                            r="2"
                            className={cn(
                                "transition-colors",
                                index < connectedCount ? "fill-primary" : "fill-muted-foreground",
                                index === connectedCount && "fill-primary animate-pulse"
                            )}
                        />
                        <text
                            x={point.x > 50 ? `${point.x - 4}%` : `${point.x + 4}%`}
                            y={`${point.y}%`}
                            dy="0.3em"
                            textAnchor={point.x > 50 ? "end" : "start"}
                            className={cn(
                                "text-sm font-bold fill-muted-foreground select-none",
                                 index < connectedCount && "fill-primary/50"
                            )}
                        >
                            {index + 1}
                        </text>
                    </g>
                ))}
            </svg>
            {renderContent()}
          </div>
        </CardContent>
        {(gameState === 'idle' || gameState === 'finished') && (
          <CardFooter className="flex justify-center p-6 border-t bg-card">
            <Button size="lg" onClick={startGame} className="w-full sm:w-auto">
              {gameState === 'idle' ? <Play className="mr-2" /> : <RefreshCw className="mr-2" />}
              {gameState === 'idle' ? 'Start Game' : 'Play Again'}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
