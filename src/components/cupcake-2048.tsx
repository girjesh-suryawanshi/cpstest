"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RefreshCw } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';
import { cn } from '@/lib/utils';

// Cupcake emoji for different levels
const CUPCAKES = ['🧁', '🍰', '🎂', '🍩', '🍪', '🍮', '🥮', '🥧', '🍦', '🍧', '🍨'];
const GRID_SIZE = 4;

type Tile = {
  value: number;
  id: number;
  merged?: boolean;
};

type Grid = (Tile | null)[][];

let tileIdCounter = 1;

const createNewTile = (value: number): Tile => ({
  value,
  id: tileIdCounter++,
});

const getInitialGrid = (): Grid => {
  const grid: Grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));
  addRandomTile(grid);
  addRandomTile(grid);
  return grid;
};

const addRandomTile = (grid: Grid): Grid => {
  let emptyTiles: { r: number; c: number }[] = [];
  grid.forEach((row, r) => {
    row.forEach((_, c) => {
      if (!grid[r][c]) {
        emptyTiles.push({ r, c });
      }
    });
  });

  if (emptyTiles.length > 0) {
    const { r, c } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    const value = Math.random() < 0.9 ? 1 : 2;
    grid[r][c] = createNewTile(value);
  }
  return grid;
};

const rotateGrid = (grid: Grid): Grid => {
  const newGrid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      newGrid[c][GRID_SIZE - 1 - r] = grid[r][c];
    }
  }
  return newGrid;
};

const moveRowLeft = (row: (Tile | null)[]): { newRow: (Tile | null)[], score: number } => {
  const filteredRow = row.filter(tile => tile !== null);
  const newRow: (Tile | null)[] = Array(GRID_SIZE).fill(null);
  let score = 0;
  let newIndex = 0;

  for (let i = 0; i < filteredRow.length; i++) {
    if (i + 1 < filteredRow.length && filteredRow[i]!.value === filteredRow[i + 1]!.value) {
      const newValue = filteredRow[i]!.value + 1;
      score += (1 << newValue); // 2^newValue
      newRow[newIndex++] = { ...createNewTile(newValue), merged: true };
      i++;
    } else {
      newRow[newIndex++] = filteredRow[i];
    }
  }
  return { newRow, score };
};

const moveGrid = (grid: Grid, direction: 'up' | 'down' | 'left' | 'right'): { newGrid: Grid, moved: boolean, score: number } => {
  let newGrid: Grid = JSON.parse(JSON.stringify(grid));
  let totalScore = 0;
  let moved = false;

  // Reset merge flags
  newGrid.forEach(row => row.forEach(tile => { if (tile) tile.merged = false; }));

  let rotations = 0;
  if (direction === 'up') rotations = 1;
  if (direction === 'right') rotations = 2;
  if (direction === 'down') rotations = 3;

  for (let i = 0; i < rotations; i++) {
    newGrid = rotateGrid(newGrid);
  }

  for (let r = 0; r < GRID_SIZE; r++) {
    const { newRow, score } = moveRowLeft(newGrid[r]);
    if (JSON.stringify(newRow) !== JSON.stringify(newGrid[r])) {
        moved = true;
    }
    newGrid[r] = newRow;
    totalScore += score;
  }

  for (let i = 0; i < (4 - rotations) % 4; i++) {
    newGrid = rotateGrid(newGrid);
  }

  return { newGrid, moved, score: totalScore };
};

const isGameOver = (grid: Grid): boolean => {
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            if (!grid[r][c]) return false; // empty cell
            if (c < GRID_SIZE - 1 && grid[r][c]?.value === grid[r][c+1]?.value) return false;
            if (r < GRID_SIZE - 1 && grid[r][c]?.value === grid[r+1][c]?.value) return false;
        }
    }
    return true;
}


export function Cupcake2048() {
  const [grid, setGrid] = useState<Grid>(getInitialGrid);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleReset = useCallback(() => {
    tileIdCounter = 1;
    setGrid(getInitialGrid());
    setScore(0);
    setGameOver(false);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    e.preventDefault();
    let direction: 'up' | 'down' | 'left' | 'right' | null = null;
    switch (e.key) {
      case 'ArrowUp': direction = 'up'; break;
      case 'ArrowDown': direction = 'down'; break;
      case 'ArrowLeft': direction = 'left'; break;
      case 'ArrowRight': direction = 'right'; break;
    }

    if (direction && !gameOver) {
      const { newGrid, moved, score: moveScore } = moveGrid(grid, direction);
      if (moved) {
        addRandomTile(newGrid);
        setGrid(newGrid);
        setScore(prev => prev + moveScore);
        if (isGameOver(newGrid)) {
            setGameOver(true);
        }
      }
    }
  }, [grid, gameOver]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleKeyDown(new KeyboardEvent('keydown', {key: 'ArrowLeft'})),
    onSwipedRight: () => handleKeyDown(new KeyboardEvent('keydown', {key: 'ArrowRight'})),
    onSwipedUp: () => handleKeyDown(new KeyboardEvent('keydown', {key: 'ArrowUp'})),
    onSwipedDown: () => handleKeyDown(new KeyboardEvent('keydown', {key: 'ArrowDown'})),
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const getTileStyle = (value: number) => {
    const hue = (value * 30) % 360;
    const saturation = 60 + (value * 5) % 40;
    const lightness = 85 - (value * 3) % 30;
    return {
      backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
      color: lightness < 50 ? 'white' : 'black',
      fontSize: `${Math.max(2.5 - value * 0.2, 1)}rem`,
    };
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center gap-6">
      <div className="flex justify-between w-full items-center">
        <div className="bg-muted p-3 rounded-lg text-center">
          <div className="text-sm text-muted-foreground">SCORE</div>
          <div className="text-2xl font-bold text-primary">{score}</div>
        </div>
        <Button onClick={handleReset}><RefreshCw className="mr-2"/> New Game</Button>
      </div>
      <Card className="w-full shadow-lg p-3 sm:p-4 bg-muted/50 aspect-square relative select-none" {...swipeHandlers}>
        <CardContent className="p-0 grid grid-cols-4 gap-3 sm:gap-4 h-full w-full">
          {Array(GRID_SIZE * GRID_SIZE).fill(null).map((_, i) => (
            <div key={i} className="bg-muted/60 rounded-lg" />
          ))}
          {grid.map((row, r) =>
            row.map((tile, c) =>
              tile ? (
                <div
                  key={tile.id}
                  className={cn(
                    "absolute flex items-center justify-center font-bold rounded-lg transition-all duration-200 ease-in-out",
                    tile.merged ? "animate-pop" : "animate-appear"
                  )}
                  style={{
                    width: 'calc(25% - 0.75rem)',
                    height: 'calc(25% - 0.75rem)',
                    top: `calc(${r * 25}% + ${r * 0.75 + 0.75}rem)`,
                    left: `calc(${c * 25}% + ${c * 0.75 + 0.75}rem)`,
                    ...getTileStyle(tile.value),
                  }}
                >
                  {CUPCAKES[tile.value - 1] || '🌟'}
                </div>
              ) : null
            )
          )}
        </CardContent>
        {gameOver && (
            <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center text-center rounded-lg">
                <h2 className="text-4xl font-bold text-destructive">Game Over!</h2>
                <Button onClick={handleReset} className="mt-4"><RefreshCw className="mr-2" /> Play Again</Button>
            </div>
        )}
      </Card>
      <style jsx>{`
        @keyframes appear {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-appear {
          animation: appear 0.2s ease-in-out;
        }
        @keyframes pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .animate-pop {
            animation: pop 0.2s ease-in-out;
        }
      `}</style>
    </div>
  );
}
