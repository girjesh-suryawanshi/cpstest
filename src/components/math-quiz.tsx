"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Play, RefreshCw, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type GameState = 'idle' | 'playing' | 'finished';
type Operator = '+' | '-' | '*';

interface Problem {
  text: string;
  answer: number;
}

const GAME_DURATION = 60; // 60 seconds

export function MathQuiz() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [timer, setTimer] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [inputValue, setInputValue] = useState('');

  const generateProblem = useCallback(() => {
    const operator: Operator = ['+', '-', '*'][Math.floor(Math.random() * 3)] as Operator;
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;
    let answer: number;

    switch (operator) {
      case '+':
        answer = num1 + num2;
        break;
      case '-':
        if (num1 < num2) { // Ensure positive result
          [num1, num2] = [num2, num1];
        }
        answer = num1 - num2;
        break;
      case '*':
        num1 = Math.floor(Math.random() * 8) + 2; // Keep numbers smaller for multiplication
        num2 = Math.floor(Math.random() * 8) + 2;
        answer = num1 * num2;
        break;
    }
    
    setCurrentProblem({ text: `${num1} ${operator} ${num2}`, answer });
    setInputValue('');
  }, []);

  const startGame = useCallback(() => {
    setGameState('playing');
    setTimer(GAME_DURATION);
    setScore(0);
    generateProblem();
  }, [generateProblem]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === 'playing' && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (gameState === 'playing' && timer === 0) {
      setGameState('finished');
    }
    return () => clearInterval(interval);
  }, [gameState, timer]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (gameState !== 'playing' || !currentProblem) return;

    if (parseInt(inputValue, 10) === currentProblem.answer) {
      setScore(prev => prev + 1);
    }
    generateProblem();
  };

  const renderContent = () => {
    switch (gameState) {
      case 'idle':
        return (
          <div className="text-center p-6 flex flex-col items-center justify-center min-h-[250px]">
            <h2 className="text-2xl font-semibold text-foreground/90">Math Quiz</h2>
            <p className="text-muted-foreground mt-2">Solve as many problems as you can.</p>
          </div>
        );
      case 'playing':
        return (
          <div className="text-center p-6 flex flex-col items-center justify-center min-h-[250px]">
            <p className="text-6xl font-bold font-mono tracking-widest text-primary mb-6">
              {currentProblem?.text} = ?
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2 mt-4 w-full max-w-xs">
                <Input 
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    autoFocus
                    className="text-center text-3xl font-mono h-14"
                />
                <Button type="submit" size="lg"><ChevronRight /></Button>
            </form>
          </div>
        );
      case 'finished':
        return (
          <div className="text-center p-6 flex flex-col items-center justify-center min-h-[250px]">
            <h2 className="text-3xl font-bold text-primary">Time's up!</h2>
            <p className="text-lg text-muted-foreground mt-2">You solved</p>
            <p className="text-7xl font-bold text-primary">{score}</p>
            <p className="text-lg text-muted-foreground">problems correctly.</p>
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-8">
      <Card className="w-full shadow-lg">
        <CardContent className="p-6 relative">
          {gameState === 'playing' && (
            <div className="absolute top-4 flex justify-between w-[calc(100%-2rem)] px-4">
              <div className="text-lg">Score: <span className="font-bold text-primary">{score}</span></div>
              <div className="text-lg">Time: <span className="font-bold text-primary">{timer}s</span></div>
            </div>
          )}
          {renderContent()}
        </CardContent>
        {gameState !== 'playing' && (
          <CardFooter className="flex justify-center p-6 border-t bg-card">
            <Button size="lg" onClick={startGame} className="w-full sm:w-auto">
              {gameState === 'idle' ? <Play className="mr-2" /> : <RefreshCw className="mr-2" />}
              {gameState === 'idle' ? 'Start Quiz' : 'Try Again'}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
