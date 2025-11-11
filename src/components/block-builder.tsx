"use client";

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Eraser, Palette, Trash2, PaintBucket } from 'lucide-react';
import { cn } from '@/lib/utils';

const GRID_SIZE = 32;
const COLORS = [
  '#FF5252', '#FF4081', '#E040FB', '#7C4DFF', '#536DFE', '#448AFF', '#40C4FF', '#18FFFF',
  '#64FFDA', '#69F0AE', '#B2FF59', '#EEFF41', '#FFFF00', '#FFD740', '#FFAB40', '#FF6E40',
  '#000000', '#FFFFFF', '#9E9E9E', '#795548',
];

type Grid = (string | null)[][];

const createEmptyGrid = (): Grid => {
  return Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));
};

export function BlockBuilder() {
  const [grid, setGrid] = useState<Grid>(createEmptyGrid);
  const [selectedColor, setSelectedColor] = useState<string>(COLORS[0]);
  const [isErasing, setIsErasing] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleCellClick = (row: number, col: number) => {
    const newGrid = grid.map(r => [...r]);
    newGrid[row][col] = isErasing ? null : selectedColor;
    setGrid(newGrid);
  };
  
  const handleCellHover = (row: number, col: number) => {
    if (isMouseDown) {
       handleCellClick(row, col);
    }
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setIsErasing(false);
  };

  const toggleEraser = () => {
    setIsErasing(!isErasing);
  };

  const clearGrid = () => {
    setGrid(createEmptyGrid());
  };

  const fillGrid = () => {
     setGrid(Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(selectedColor)));
  }

  return (
    <div className="w-full max-w-4xl flex flex-col gap-4">
      <Card>
        <CardContent className="p-2">
          <div className="flex flex-wrap items-center gap-4 p-2 bg-muted rounded-lg">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="w-auto px-3">
                  <Palette className="mr-2"/>
                  <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: selectedColor }} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2">
                <div className="grid grid-cols-5 gap-1">
                  {COLORS.map(c => (
                    <button
                      key={c}
                      style={{ backgroundColor: c }}
                      className={cn(
                        "w-8 h-8 rounded-full border-2",
                        c === selectedColor ? 'border-primary' : 'border-transparent'
                      )}
                      onClick={() => handleColorSelect(c)}
                    />
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <Button variant={isErasing ? 'secondary' : 'outline'} size="icon" onClick={toggleEraser}>
              <Eraser />
            </Button>
            
            <Button variant="outline" size="icon" onClick={fillGrid}>
              <PaintBucket />
            </Button>

            <Button variant="destructive" size="icon" onClick={clearGrid} className="ml-auto">
              <Trash2 />
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="shadow-lg p-2" onMouseDown={() => setIsMouseDown(true)} onMouseUp={() => setIsMouseDown(false)} onMouseLeave={() => setIsMouseDown(false)}>
        <CardContent className="p-0">
          <div className="grid w-full aspect-square" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}>
            {grid.map((row, rowIndex) =>
              row.map((cellColor, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="w-full aspect-square border-r border-b border-muted/20"
                  style={{ backgroundColor: cellColor || 'hsl(var(--background))' }}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  onMouseEnter={() => handleCellHover(rowIndex, colIndex)}
                />
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
