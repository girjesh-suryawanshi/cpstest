"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Play, RefreshCw, Shuffle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type GameState = 'idle' | 'playing' | 'solved';
type Tile = {
    id: number;
    originalIndex: number;
};

const GRID_SIZE = 4;
const IMAGE_URL = PlaceHolderImages.find(p => p.id === 'puzzle-1')?.imageUrl || "https://picsum.photos/seed/puzzle1/600/600";

export function JigsawPuzzle() {
    const [gameState, setGameState] = useState<GameState>('idle');
    const [tiles, setTiles] = useState<Tile[]>([]);
    const [draggingTile, setDraggingTile] = useState<number | null>(null);

    const initializeTiles = useCallback(() => {
        const initialTiles = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => ({
            id: i,
            originalIndex: i,
        }));
        setTiles(initialTiles);
    }, []);

    const shuffleTiles = useCallback(() => {
        const shuffled = [...tiles].sort(() => Math.random() - 0.5);
        setTiles(shuffled);
    }, [tiles]);

    const startGame = useCallback(() => {
        setGameState('playing');
        initializeTiles();
        setTimeout(shuffleTiles, 100);
    }, [initializeTiles, shuffleTiles]);
    
    useEffect(() => {
        if(gameState === 'idle') {
            initializeTiles();
        }
    }, [gameState, initializeTiles]);


    const handleDragStart = (index: number) => {
        if (gameState !== 'playing') return;
        setDraggingTile(index);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (targetIndex: number) => {
        if (draggingTile === null || draggingTile === targetIndex || gameState !== 'playing') return;

        const newTiles = [...tiles];
        const draggedItem = newTiles[draggingTile];
        newTiles.splice(draggingTile, 1);
        newTiles.splice(targetIndex, 0, draggedItem);
        
        setTiles(newTiles);
        setDraggingTile(null);
        
        checkSolution(newTiles);
    };

    const checkSolution = (currentTiles: Tile[]) => {
        const isSolved = currentTiles.every((tile, index) => tile.originalIndex === index);
        if (isSolved) {
            setGameState('solved');
        }
    };
    
    const getTileStyle = (index: number) => {
        const { row, col } = { row: Math.floor(index / GRID_SIZE), col: index % GRID_SIZE };
        const tileSize = 100 / GRID_SIZE;
        return {
            width: `${tileSize}%`,
            height: `${tileSize}%`,
            backgroundImage: `url(${IMAGE_URL})`,
            backgroundSize: `${GRID_SIZE * 100}% ${GRID_SIZE * 100}%`,
            backgroundPosition: `${(col * 100)}% ${(row * 100)}%`,
        };
    };


    const renderGrid = () => {
        if (gameState === 'idle') {
            return (
                <div className="p-1 grid grid-cols-4 gap-1 bg-muted rounded-lg">
                    {tiles.map((_, index) => (
                        <div key={index} className="aspect-square bg-cover bg-center rounded-sm" style={getTileStyle(tiles[index].originalIndex)}></div>
                    ))}
                </div>
            )
        }

        return (
            <div
                className="p-1 grid grid-cols-4 gap-1 bg-muted rounded-lg"
                onDragOver={handleDragOver}
            >
                {tiles.map((tile, index) => (
                    <div
                        key={tile.id}
                        draggable={gameState === 'playing'}
                        onDragStart={() => handleDragStart(index)}
                        onDrop={() => handleDrop(index)}
                        className={cn(
                            "aspect-square bg-cover bg-center rounded-sm transition-all duration-300",
                             gameState === 'playing' && "cursor-move",
                             draggingTile === index && "opacity-50 scale-95"
                        )}
                        style={getTileStyle(tile.originalIndex)}
                    />
                ))}
            </div>
        );
    }


    return (
        <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-8">
            <Card className="w-full shadow-lg">
                <CardContent className="p-6 relative flex flex-col items-center justify-center">
                    <div className="w-full max-w-md aspect-square relative">
                       {renderGrid()}
                        {gameState === 'solved' && (
                            <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center text-center rounded-lg">
                                <h2 className="text-4xl font-bold text-primary">You solved it!</h2>
                            </div>
                        )}
                         {gameState === 'idle' && (
                            <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center text-center rounded-lg">
                                <h2 className="text-2xl font-semibold">Jigsaw Puzzle</h2>
                                <p className="text-muted-foreground">Drag and drop the pieces to solve.</p>
                            </div>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center p-6 border-t bg-card">
                   <Button size="lg" onClick={startGame} className="w-full sm:w-auto">
                        {gameState === 'playing' ? <><RefreshCw className="mr-2"/> Restart</> : <><Play className="mr-2"/> Start Game</>}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}