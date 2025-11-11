"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Play, RefreshCw, Shuffle } from 'lucide-react';
import { cn } from '@/lib/utils';

const GRID_SIZE = 4;
const TILE_COUNT = GRID_SIZE * GRID_SIZE;

type GameState = 'idle' | 'playing' | 'solved';
type Tile = number | null;

// Function to check if a puzzle is solvable
// Based on the inversion count and position of the empty space
const isSolvable = (tiles: Tile[]): boolean => {
    let inversions = 0;
    const flatTiles = tiles.filter(t => t !== null);

    for (let i = 0; i < flatTiles.length - 1; i++) {
        for (let j = i + 1; j < flatTiles.length; j++) {
            if (flatTiles[i] > flatTiles[j]) {
                inversions++;
            }
        }
    }

    if (GRID_SIZE % 2 === 1) { // Odd grid
        return inversions % 2 === 0;
    } else { // Even grid
        const emptyRow = Math.floor(tiles.indexOf(null) / GRID_SIZE);
        return (inversions + emptyRow) % 2 === 1;
    }
};

const createShuffledTiles = (): Tile[] => {
    let tiles: Tile[];
    do {
        tiles = Array.from({ length: TILE_COUNT - 1 }, (_, i) => i + 1)
            .sort(() => Math.random() - 0.5);
        tiles.push(null);
    } while (!isSolvable(tiles));
    return tiles;
};

export function SlidingPuzzle() {
    const [gameState, setGameState] = useState<GameState>('idle');
    const [tiles, setTiles] = useState<Tile[]>(Array.from({ length: TILE_COUNT }, (_, i) => (i < TILE_COUNT - 1 ? i + 1 : null)));
    const [moves, setMoves] = useState(0);

    const startGame = useCallback(() => {
        setGameState('playing');
        setTiles(createShuffledTiles());
        setMoves(0);
    }, []);

    const checkWin = useCallback((currentTiles: Tile[]) => {
        for (let i = 0; i < TILE_COUNT - 1; i++) {
            if (currentTiles[i] !== i + 1) return false;
        }
        return currentTiles[TILE_COUNT - 1] === null;
    }, []);

    const handleTileClick = (index: number) => {
        if (gameState !== 'playing' || tiles[index] === null) return;

        const emptyIndex = tiles.indexOf(null);
        const { row, col } = { row: Math.floor(index / GRID_SIZE), col: index % GRID_SIZE };
        const { emptyRow, emptyCol } = { row: Math.floor(emptyIndex / GRID_SIZE), col: emptyIndex % GRID_SIZE };

        const isAdjacent = (Math.abs(row - emptyRow) === 1 && col === emptyCol) || (Math.abs(col - emptyCol) === 1 && row === emptyRow);

        if (isAdjacent) {
            const newTiles = [...tiles];
            [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
            setTiles(newTiles);
            setMoves(prev => prev + 1);

            if (checkWin(newTiles)) {
                setGameState('solved');
            }
        }
    };
    
    const renderGrid = () => {
        return (
            <div
                className="grid gap-1 bg-muted rounded-lg p-2"
                style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
            >
                {tiles.map((tile, index) => (
                    <div
                        key={index}
                        onClick={() => handleTileClick(index)}
                        className={cn(
                            "aspect-square flex items-center justify-center text-2xl font-bold rounded-md transition-all duration-200",
                            tile ? "bg-card text-card-foreground shadow" : "bg-muted",
                            tile && gameState === 'playing' && "cursor-pointer hover:bg-card/80 hover:scale-105"
                        )}
                    >
                        {tile}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="w-full max-w-md mx-auto flex flex-col items-center gap-8">
            <Card className="w-full shadow-lg">
                <CardContent className="p-6 relative flex flex-col items-center justify-center">
                    {gameState === 'playing' && (
                        <div className="absolute top-4 left-4 text-lg">Moves: <span className="font-bold text-primary">{moves}</span></div>
                    )}
                    <div className="w-full aspect-square relative">
                        {renderGrid()}
                        {gameState === 'solved' && (
                            <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center text-center rounded-lg">
                                <h2 className="text-4xl font-bold text-primary">You solved it!</h2>
                                <p className="text-muted-foreground mt-2">in {moves} moves</p>
                            </div>
                        )}
                        {gameState === 'idle' && (
                            <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center text-center rounded-lg">
                                <h2 className="text-2xl font-semibold">Sliding Puzzle</h2>
                                <p className="text-muted-foreground">Get the numbers in order.</p>
                            </div>
                        )}
                    </div>
                </CardContent>
                {(gameState === 'idle' || gameState === 'solved') && (
                    <CardFooter className="flex justify-center p-6 border-t bg-card">
                       <Button size="lg" onClick={startGame} className="w-full sm:w-auto">
                            {gameState === 'idle' ? <Play className="mr-2"/> : <RefreshCw className="mr-2"/>}
                            {gameState === 'idle' ? 'Start Game' : 'Play Again'}
                        </Button>
                    </CardFooter>
                )}
                 {gameState === 'playing' && (
                    <CardFooter className="flex justify-center p-6 border-t bg-card">
                        <Button size="lg" onClick={startGame} className="w-full sm:w-auto">
                            <RefreshCw className="mr-2"/> Restart
                        </Button>
                    </CardFooter>
                )}
            </Card>
        </div>
    );
}