"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Play, RefreshCw } from 'lucide-react';

const CORE_RADIUS = 50;
const BALL_RADIUS = 10;
const ORBIT_RADIUS = 120;
const BALL_SPEED = 20;

type GameState = 'idle' | 'playing' | 'gameover';

interface Ball {
  angle: number;
}

interface MovingBall {
  y: number;
}

export function CoreballGame() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [attachedBalls, setAttachedBalls] = useState<Ball[]>([]);
  const [movingBall, setMovingBall] = useState<MovingBall | null>(null);
  const [ballsLeft, setBallsLeft] = useState(15);
  const [level, setLevel] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef(0);

  const resetGame = useCallback((newLevel = 1) => {
    setLevel(newLevel);
    setGameState('playing');
    setAttachedBalls(newLevel > 1 ? [{angle: 0}, {angle: Math.PI}] : [{angle: 0}]);
    setBallsLeft(15 - (newLevel > 1 ? 2 : 1));
    setMovingBall(null);
    rotationRef.current = 0;
  }, []);

  const handleStart = () => {
    resetGame(1);
  };
  
  const handleNextLevel = () => {
    resetGame(level + 1);
  };

  const draw = useCallback((ctx: CanvasRenderingContext2D, center: { x: number, y: number }) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Draw background
    ctx.fillStyle = '#0a0a0a'; // Equivalent to hsl(var(--card)) in dark mode
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw core
    ctx.beginPath();
    ctx.arc(center.x, center.y, CORE_RADIUS, 0, 2 * Math.PI);
    ctx.fillStyle = '#fcfcfc'; // Equivalent to hsl(var(--foreground))
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = '#0a0a0a'; // Equivalent to hsl(var(--background))
    ctx.font = '30px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(level.toString(), center.x, center.y);


    // Draw attached balls and lines
    attachedBalls.forEach(ball => {
      const angle = ball.angle + rotationRef.current;
      const x = center.x + ORBIT_RADIUS * Math.cos(angle);
      const y = center.y + ORBIT_RADIUS * Math.sin(angle);

      // Draw line
      ctx.beginPath();
      ctx.moveTo(center.x, center.y);
      ctx.lineTo(x, y);
      ctx.strokeStyle = '#fcfcfc'; // Equivalent to hsl(var(--foreground))
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.closePath();

      // Draw ball
      ctx.beginPath();
      ctx.arc(x, y, BALL_RADIUS, 0, 2 * Math.PI);
      ctx.fillStyle = '#fcfcfc'; // Equivalent to hsl(var(--foreground))
      ctx.fill();
      ctx.closePath();
    });

    // Draw moving ball
    if (movingBall) {
      ctx.beginPath();
      ctx.arc(center.x, movingBall.y, BALL_RADIUS, 0, 2 * Math.PI);
      ctx.fillStyle = 'hsl(var(--primary))';
      ctx.fill();
      ctx.closePath();
    }
    
    // Draw balls left count
    ctx.fillStyle = '#fcfcfc'; // Equivalent to hsl(var(--foreground))
    ctx.font = '20px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`Balls left: ${ballsLeft}`, center.x, 30);

  }, [attachedBalls, movingBall, ballsLeft, level]);


  const shoot = useCallback(() => {
    if (gameState === 'playing' && ballsLeft > 0 && !movingBall) {
      setMovingBall({ y: 500 });
      setBallsLeft(prev => prev - 1);
    }
  }, [gameState, ballsLeft, movingBall]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        shoot();
      }
    };
    const handleCanvasClick = (e: MouseEvent) => {
      if(canvasRef.current?.contains(e.target as Node)) {
        shoot();
      }
    }

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('click', handleCanvasClick);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('click', handleCanvasClick);
    };
  }, [shoot]);


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    const center = { x: canvas.width / 2, y: 200 };
    let animationFrameId: number;

    const gameLoop = () => {
      rotationRef.current += 0.005 * level;

      if (movingBall) {
        const newY = movingBall.y - BALL_SPEED;
        if (newY <= center.y + ORBIT_RADIUS) {
          // Collision check
          const newAngle = -Math.PI / 2 - rotationRef.current;
          
          let collision = false;
          attachedBalls.forEach(ball => {
              const angleDiff = Math.abs(newAngle - ball.angle);
              if (Math.min(angleDiff, 2 * Math.PI - angleDiff) < (BALL_RADIUS * 2) / ORBIT_RADIUS) {
                  collision = true;
              }
          });

          if (collision) {
            setGameState('gameover');
            setMovingBall(null);
          } else {
            setAttachedBalls(prev => [...prev, { angle: newAngle }]);
            setMovingBall(null);
            if (ballsLeft === 0) {
              setGameState('idle'); // Level complete
            }
          }
        } else {
          setMovingBall({ y: newY });
        }
      }
      
      draw(context, center);
      animationFrameId = requestAnimationFrame(gameLoop);
    }

    if (gameState === 'playing') {
      animationFrameId = requestAnimationFrame(gameLoop);
    } else {
       draw(context, center);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };

  }, [draw, gameState, movingBall, attachedBalls, ballsLeft, level]);

  const renderOverlay = () => {
    if (gameState === 'gameover') {
      return (
        <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center text-center">
            <h2 className="text-4xl font-bold text-destructive">Game Over</h2>
            <p className="text-muted-foreground mt-2">Level {level}</p>
        </div>
      );
    }
     if (gameState === 'idle' && ballsLeft === 0) {
      return (
        <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center text-center">
            <h2 className="text-4xl font-bold text-primary">Level Complete!</h2>
        </div>
      );
    }
    return null;
  }

  return (
     <div className="w-full max-w-lg mx-auto flex flex-col items-center gap-8">
      <Card className="w-full shadow-lg overflow-hidden">
        <CardContent className="p-0 relative">
          <canvas ref={canvasRef} width="500" height="550" />
           {renderOverlay()}
        </CardContent>
         <CardFooter className="flex justify-center p-6 border-t bg-card">
            {gameState !== 'playing' && (
              <>
                {ballsLeft === 0 && gameState === 'idle' ? (
                   <Button size="lg" onClick={handleNextLevel} className="w-full sm:w-auto">
                      <Play className="mr-2"/> Next Level
                   </Button>
                ) : (
                   <Button size="lg" onClick={handleStart} className="w-full sm:w-auto">
                      {gameState === 'idle' ? <Play className="mr-2"/> : <RefreshCw className="mr-2"/>}
                      {gameState === 'idle' ? 'Start Game' : 'Try Again'}
                   </Button>
                )}
              </>
            )}
        </CardFooter>
      </Card>
    </div>
  );
}
