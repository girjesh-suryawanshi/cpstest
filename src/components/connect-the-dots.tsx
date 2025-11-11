"use client";

import { useState, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Play, RefreshCw, Star, Home, Cat } from 'lucide-react';
import { cn } from '@/lib/utils';

type GameState = 'idle' | 'playing' | 'finished';
type Point = { x: number; y: number };

const levels = [
  {
    name: 'Star',
    icon: (props: any) => <Star {...props} />,
    points: [
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
    ]
  },
  {
    name: 'House',
    icon: (props: any) => <Home {...props} />,
    points: [
        { x: 50, y: 10 }, // 1
        { x: 90, y: 40 }, // 2
        { x: 90, y: 90 }, // 3
        { x: 10, y: 90 }, // 4
        { x: 10, y: 40 }, // 5
        { x: 50, y: 10 }, // 6 (close loop)
        { x: 10, y: 40 }, // 7 (back to corner)
        { x: 90, y: 40 }, // 8 (roof line)
    ]
  },
  {
      name: 'Cat',
      icon: (props: any) => <Cat {...props} />,
      points: [
        { x: 50, y: 20 }, // 1 (top head)
        { x: 80, y: 40 }, // 2
        { x: 85, y: 70 }, // 3
        { x: 75, y: 90 }, // 4
        { x: 25, y: 90 }, // 5
        { x: 15, y: 70 }, // 6
        { x: 20, y: 40 }, // 7
        { x: 50, y: 20 }, // 8 (close head)
        { x: 40, y: 10 }, // 9 (left ear)
        { x: 30, y: 30 }, // 10 
        { x: 60, y: 10 }, // 11 (right ear)
        { x: 70, y: 30 }, // 12
      ]
  }
];

export function ConnectTheDots() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [connectedCount, setConnectedCount] = useState(0);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);

  const currentLevel = levels[currentLevelIndex];
  const currentPoints = currentLevel.points;

  const startGame = useCallback((levelIndex = 0) => {
    setCurrentLevelIndex(levelIndex);
    setGameState('playing');
    setConnectedCount(0);
  }, []);
  
  const handleNextLevel = () => {
    const nextLevelIndex = (currentLevelIndex + 1) % levels.length;
    startGame(nextLevelIndex);
  };

  const handleDotClick = (index: number) => {
    if (gameState !== 'playing' || index !== connectedCount) return;

    const newCount = connectedCount + 1;
    setConnectedCount(newCount);

    if (newCount === currentPoints.length) {
      setGameState('finished');
    }
  };

  const lines = useMemo(() => {
    const renderedLines = [];
    // Always draw all lines when finished
    const count = gameState === 'finished' ? currentPoints.length : connectedCount;

    for (let i = 0; i < count - 1; i++) {
      const p1 = currentPoints[i];
      const p2 = currentPoints[i + 1];
      renderedLines.push(
        <line key={`line-${i}`} x1={`${p1.x}%`} y1={`${p1.y}%`} x2={`${p2.x}%`} y2={`${p2.y}%`} stroke="hsl(var(--primary))" strokeWidth="2" />
      );
    }
    
     // Close the shape if it's meant to be closed (last point connects to first)
    if (gameState === 'finished' && currentPoints[currentPoints.length - 1] === currentPoints[0]) {
        const p1 = currentPoints[currentPoints.length - 2];
        const p2 = currentPoints[0];
        renderedLines.push(
            <line key="closing-line" x1={`${p1.x}%`} y1={`${p1.y}%`} x2={`${p2.x}%`} y2={`${p2.y}%`} stroke="hsl(var(--primary))" strokeWidth="2" />
        );
    }
    
    return renderedLines;
  }, [connectedCount, gameState, currentPoints]);

  const renderContent = () => {
    if (gameState === 'idle') {
      return (
        <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center text-center rounded-lg">
          <h2 className="text-2xl font-semibold text-foreground/90">Connect the Dots</h2>
          <p className="text-muted-foreground mt-2">Click the numbers in order to reveal the picture.</p>
        </div>
      );
    }

    if (gameState === 'finished') {
        const Icon = currentLevel.icon;
        return (
             <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center text-center rounded-lg">
                <h2 className="text-4xl font-bold text-primary">You made a {currentLevel.name}!</h2>
                <Icon className="w-24 h-24 text-yellow-400 fill-yellow-300 my-4" />
            </div>
        )
    }

    return null;
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center gap-8">
      <Card className="w-full shadow-lg">
        <CardHeader className="flex flex-row justify-between items-center p-4">
            <h3 className="font-semibold">Level {currentLevelIndex + 1}</h3>
             <div className="text-muted-foreground font-medium">Shape: {currentLevel.name}</div>
        </CardHeader>
        <CardContent className="p-6 pt-0 relative flex flex-col items-center justify-center">
          <div className="w-full aspect-square relative">
            <svg width="100%" height="100%" viewBox="0 0 100 100">
                {lines}
                {currentPoints.map((point, index) => (
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
                                index === connectedCount && gameState === 'playing' && "fill-primary animate-pulse"
                            )}
                        />
                        {gameState !== 'finished' && (
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
                        )}
                    </g>
                ))}
            </svg>
            {renderContent()}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center p-6 border-t bg-card">
           {gameState === 'idle' && (
                <Button size="lg" onClick={() => startGame(0)} className="w-full sm:w-auto">
                    <Play className="mr-2" /> Start Game
                </Button>
            )}
            {gameState === 'playing' && (
                 <Button size="lg" onClick={() => startGame(0)} className="w-full sm:w-auto">
                    <RefreshCw className="mr-2" /> Restart
                </Button>
            )}
            {gameState === 'finished' && (
                <div className="flex gap-4">
                    <Button size="lg" onClick={() => startGame(currentLevelIndex)}>
                        <RefreshCw className="mr-2" /> Play Again
                    </Button>
                    {currentLevelIndex < levels.length - 1 && (
                        <Button size="lg" onClick={handleNextLevel}>
                            Next Level <Play className="ml-2" />
                        </Button>
                    )}
                </div>
            )}
        </CardFooter>
      </Card>
    </div>
  );
}