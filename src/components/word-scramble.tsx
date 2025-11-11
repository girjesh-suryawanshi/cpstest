"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Play, RefreshCw, ChevronRight } from 'lucide-react';

const WORD_LIST = [
  'apple', 'banana', 'orange', 'grape', 'lemon', 'melon', 'peach', 'house', 'tree', 'river', 
  'mountain', 'ocean', 'sun', 'moon', 'star', 'cloud', 'rain', 'fire', 'earth', 'water',
  'book', 'pen', 'desk', 'chair', 'lamp', 'door', 'window', 'floor', 'roof', 'wall',
  'car', 'bus', 'train', 'boat', 'plane', 'bike', 'road', 'street', 'bridge', 'sign',
  'cat', 'dog', 'bird', 'fish', 'horse', 'cow', 'pig', 'sheep', 'goat', 'chicken'
];

type GameState = 'idle' | 'playing' | 'finished';

const scrambleWord = (word: string): string => {
  const a = word.split('');
  const n = a.length;

  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  
  const scrambled = a.join('');
  if (scrambled === word) {
    return scrambleWord(word); // Rescramble if it's the same as original
  }
  return scrambled;
};

export function WordScramble() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [timer, setTimer] = useState(60);
  const [score, setScore] = useState(0);
  const [currentWord, setCurrentWord] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const [inputValue, setInputValue] = useState('');

  const generateNewWord = useCallback(() => {
    const newWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    setCurrentWord(newWord);
    setScrambledWord(scrambleWord(newWord));
    setInputValue('');
  }, []);

  const startGame = useCallback(() => {
    setGameState('playing');
    setTimer(60);
    setScore(0);
    generateNewWord();
  }, [generateNewWord]);

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
    if (gameState !== 'playing') return;

    if (inputValue.toLowerCase() === currentWord) {
      setScore(prev => prev + 1);
      generateNewWord();
    }
  };

  const renderContent = () => {
    switch (gameState) {
      case 'idle':
        return (
          <div className="text-center p-6 flex flex-col items-center justify-center min-h-[250px]">
            <h2 className="text-2xl font-semibold text-foreground/90">Word Scramble</h2>
            <p className="text-muted-foreground mt-2">Unscramble the letters to form a word.</p>
          </div>
        );
      case 'playing':
        return (
          <div className="text-center p-6 flex flex-col items-center justify-center min-h-[250px]">
            <p className="text-5xl font-bold font-mono tracking-widest text-primary mb-6">
              {scrambledWord}
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2 mt-4 w-full max-w-xs">
                <Input 
                    type="text"
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
            <p className="text-lg text-muted-foreground mt-2">You unscrambled</p>
            <p className="text-7xl font-bold text-primary">{score}</p>
            <p className="text-lg text-muted-foreground">words correctly.</p>
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
              {gameState === 'idle' ? 'Start Game' : 'Try Again'}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
