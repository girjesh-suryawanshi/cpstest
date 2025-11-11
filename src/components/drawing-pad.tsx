"use client";

import { useRef, useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Eraser, Palette, Brush, Trash2 } from 'lucide-react';

const COLORS = [
  '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
  '#800000', '#008000', '#000080', '#808000', '#800080', '#008080', '#C0C0C0',
  '#FFFFFF', '#FFA500', '#A52A2A', '#8A2BE2', '#5F9EA0', '#7FFF00', '#D2691E'
];

export function DrawingPad() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [isErasing, setIsErasing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Adjust for device pixel ratio for sharper drawing
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;

    const context = canvas.getContext('2d');
    if (!context) return;
    context.scale(dpr, dpr);
    context.lineCap = 'round';
    context.strokeStyle = color;
    context.lineWidth = brushSize;
    contextRef.current = context;

    // Set initial white background
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

  }, []);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = isErasing ? '#FFFFFF' : color;
      contextRef.current.lineWidth = isErasing ? brushSize * 3 : brushSize;
    }
  }, [color, brushSize, isErasing]);

  const startDrawing = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    if (contextRef.current) {
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
      setIsDrawing(true);
    }
  };
  
  const finishDrawing = () => {
    if (contextRef.current) {
      contextRef.current.closePath();
      setIsDrawing(false);
    }
  };

  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    if (contextRef.current) {
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (canvas && context) {
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  const toggleEraser = () => {
    setIsErasing(!isErasing);
  }

  return (
    <div className="w-full max-w-4xl flex flex-col gap-4">
      <Card className="w-full">
        <CardContent className="p-2">
            <div className="flex flex-wrap items-center gap-4 p-2 bg-muted rounded-lg">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" size="icon"><Palette /></Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-2">
                        <div className="grid grid-cols-7 gap-1">
                            {COLORS.map(c => (
                                <button key={c} style={{ backgroundColor: c }} className="w-6 h-6 rounded-full border border-border" onClick={() => {setColor(c); setIsErasing(false);}}/>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>

                <div className="flex items-center gap-2">
                   <Brush/>
                   <Slider
                       min={1}
                       max={20}
                       step={1}
                       value={[brushSize]}
                       onValueChange={(value) => setBrushSize(value[0])}
                       className="w-32"
                   />
                </div>
                
                <Button variant={isErasing ? 'secondary' : 'outline'} size="icon" onClick={toggleEraser}>
                    <Eraser />
                </Button>

                <Button variant="destructive" size="icon" onClick={clearCanvas} className="ml-auto">
                    <Trash2 />
                </Button>
            </div>
        </CardContent>
      </Card>
      <Card className="w-full shadow-lg overflow-hidden">
        <CardContent className="p-0">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            onMouseLeave={finishDrawing}
            className="w-full h-[600px] bg-white cursor-crosshair"
          />
        </CardContent>
      </Card>
    </div>
  );
}
