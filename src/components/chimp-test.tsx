"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Play, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

type GameState = 'idle' | 'playing' | 'finished';
type Tile = {
    value: number;
    visible: boolean;
};

export function ChimpTest() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [level, setLevel] = useState(4);
  const [lives, setLives] = useState(3);
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [currentClick, setCurrentClick] = useState(1);

  const generateTiles = useCallback(() => {
    const newTiles: Tile[] = [];
    const positions = new Set<number>();
    
    while(newTiles.length < level) {
        const pos = Math.floor(Math.random() * 25);
        if(!positions.has(pos)) {
            positions.add(pos);
            newTiles.push({ value: newTiles.length + 1, visible: true });
        }
    }

    const finalTiles: Tile[] = Array(25).fill(null).map((_, i) => {
        if (positions.has(i)) {
            const tile = newTiles.shift();
            return tile!;
        }
        return null;
    }).filter(Boolean) as Tile[];

    const board: Tile[] = Array(25).fill({value: 0, visible: true});
    let tileIndex = 0;
    for(let i=0; i<25; i++) {
        if(positions.has(i)) {
            board[i] = { value: finalTiles[tileIndex].value, visible: true };
            tileIndex++;
        } else {
            board[i] = null!;
        }
    }

    setTiles(board);
    setCurrentClick(1);
  }, [level]);

  const startGame = useCallback(() => {
    setLevel(4);
    setLives(3);
    setGameState('playing');
    generateTiles();
  }, [generateTiles]);

  useEffect(() => {
    if (gameState === 'playing' && tiles.length === 0) {
      generateTiles();
    }
  }, [gameState, tiles, generateTiles]);

  useEffect(() => {
    if(lives <= 0) {
        setGameState('finished');
    }
  }, [lives]);

  const handleTileClick = (index: number, tileValue: number) => {
    if (gameState !== 'playing' || !tiles[index] || !tiles[index].visible) return;

    if (tileValue === 1) { // First click, hide all numbers
        setTiles(prev => prev.map(t => t ? {...t, visible: false} : null!));
    }

    if (tileValue === currentClick) {
        const newTiles = [...tiles];
        newTiles[index] = null!;
        setTiles(newTiles);

        if (currentClick === level) { // Level complete
            setLevel(prev => prev + 1);
            setTimeout(() => generateTiles(), 1000);
        } else {
            setCurrentClick(prev => prev + 1);
        }
    } else { // Wrong click
        setLives(prev => prev - 1);
        setTimeout(() => generateTiles(), 1000);
    }
  };


  const renderContent = () => {
    if (gameState === 'idle' || gameState === 'finished') {
       return (
          <div className="text-center p-6 flex flex-col items-center justify-center min-h-[400px]">
            {gameState === 'idle' ? (
                <>
                    <h2 className="text-2xl font-semibold text-foreground/90">Chimp Test</h2>
                    <p className="text-muted-foreground mt-2">Click the squares in ascending order.</p>
                </>
            ) : (
                <>
                    <h2 className="text-3xl font-bold text-destructive">Game Over!</h2>
                    <p className="text-lg text-muted-foreground mt-2">You reached level <span className="font-bold text-primary">{level -1}</span>.</p>
                </>
            )}
          </div>
       );
    }
    
    return (
        <div 
            className="grid grid-cols-5 gap-2 p-4 w-full max-w-lg mx-auto"
        >
            {tiles.map((tile, i) => (
                <div 
                    key={i}
                    onClick={() => tile && handleTileClick(i, tile.value)}
                    className={cn(
                        "aspect-square rounded-md transition-colors duration-150 flex items-center justify-center font-bold text-xl",
                        tile ? "bg-card border-2 cursor-pointer" : "bg-transparent",
                        tile && !tile.visible && lives > 0 ? "bg-card" : "",
                        tile && lives <= 0 && "bg-destructive",
                    )}
                >
                   {tile && (tile.visible || lives <= 0) ? tile.value : ""}
                </div>
            ))}
        </div>
    )
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8">
      <Card className="w-full shadow-lg">
        <CardContent className="p-6 relative flex flex-col items-center justify-center">
            <div className="absolute top-4 flex justify-between w-[calc(100%-2rem)] px-4">
               <div className="text-lg">Level: <span className="font-bold text-primary">{level - 3}</span></div>
               <div className="text-lg">Lives: <span className="font-bold text-destructive">{'❤️'.repeat(lives)}</span></div>
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
