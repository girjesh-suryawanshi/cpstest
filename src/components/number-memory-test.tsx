"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Play, RefreshCw, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type GameState = 'idle' | 'showing' | 'input' | 'finished';

export function NumberMemoryTest() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [level, setLevel] = useState(1);
  const [currentNumber, setCurrentNumber] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');

  const generateNumber = (length: number) => {
    let result = '';
    const characters = '0123456789';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const startGame = useCallback(() => {
    setLevel(1);
    const newNumber = generateNumber(1);
    setCurrentNumber(newNumber);
    setGameState('showing');
    setInputValue('');
    setMessage('');
  }, []);
  
  const nextLevel = useCallback(() => {
    const newLevel = level + 1;
    setLevel(newLevel);
    const newNumber = generateNumber(newLevel);
    setCurrentNumber(newNumber);
    setGameState('showing');
    setInputValue('');
    setMessage('');
  }, [level]);

  useEffect(() => {
    if (gameState === 'showing') {
      const timer = setTimeout(() => {
        setGameState('input');
      }, 1500 + level * 200); // Show number for longer as it gets bigger
      return () => clearTimeout(timer);
    }
  }, [gameState, level]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue === currentNumber) {
      setMessage('Correct!');
      setTimeout(nextLevel, 1000);
    } else {
      setGameState('finished');
      setMessage(`Game Over! The number was ${currentNumber}.`);
    }
  };

  const renderContent = () => {
    switch (gameState) {
      case 'idle':
        return (
          <div className="text-center p-6 flex flex-col items-center justify-center min-h-[250px]">
            <h2 className="text-2xl font-semibold text-foreground/90">Number Memory</h2>
            <p className="text-muted-foreground mt-2">Memorize the number shown on the screen.</p>
          </div>
        );
      case 'showing':
        return (
          <div className="text-center p-6 flex flex-col items-center justify-center min-h-[250px]">
            <p className="text-6xl font-bold font-mono tracking-widest text-primary">{currentNumber}</p>
          </div>
        );
      case 'input':
        return (
          <div className="text-center p-6 flex flex-col items-center justify-center min-h-[250px]">
            <h2 className="text-2xl font-semibold text-foreground/90">What was the number?</h2>
            <form onSubmit={handleSubmit} className="flex gap-2 mt-4 w-full max-w-sm">
                <Input 
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    autoFocus
                    className="text-center text-2xl font-mono"
                    pattern="\d*"
                />
                <Button type="submit" size="icon"><ChevronRight /></Button>
            </form>
             {message && <p className="mt-4 text-green-500 font-semibold">{message}</p>}
          </div>
        );
      case 'finished':
        return (
          <div className="text-center p-6 flex flex-col items-center justify-center min-h-[250px]">
            <h2 className="text-3xl font-bold text-destructive">Game Over!</h2>
            <p className="text-lg text-muted-foreground mt-2">You reached level <span className="font-bold text-primary">{level}</span>.</p>
            <p className="mt-4">{message}</p>
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-8">
      <Card className="w-full shadow-lg">
        <CardContent className="p-6 relative">
          <div className="absolute top-4 left-4 text-lg">Level: <span className="font-bold text-primary">{level}</span></div>
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
