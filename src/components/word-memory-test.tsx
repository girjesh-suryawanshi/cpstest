"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Play, RefreshCw, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const WORD_LIST = [
  'apple', 'banana', 'orange', 'grape', 'lemon', 'lime', 'melon', 'peach', 'pear', 'plum',
  'cherry', 'berry', 'kiwi', 'mango', 'papaya', 'house', 'tree', 'river', 'mountain', 'ocean',
  'sun', 'moon', 'star', 'cloud', 'rain', 'snow', 'wind', 'fire', 'earth', 'water',
  'book', 'pen', 'desk', 'chair', 'lamp', 'door', 'window', 'floor', 'roof', 'wall',
  'car', 'bus', 'train', 'boat', 'plane', 'bike', 'road', 'street', 'bridge', 'sign',
  'cat', 'dog', 'bird', 'fish', 'horse', 'cow', 'pig', 'sheep', 'goat', 'chicken'
];

type GameState = 'idle' | 'showing' | 'input' | 'finished';

export function WordMemoryTest() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [level, setLevel] = useState(1);
  const [words, setWords] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [score, setScore] = useState(0);

  const generateWords = useCallback((count: number) => {
    const shuffled = WORD_LIST.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }, []);

  const startGame = useCallback(() => {
    const newWords = generateWords(3);
    setWords(newWords);
    setLevel(1);
    setScore(0);
    setGameState('showing');
    setInputValue('');
  }, [generateWords]);

  useEffect(() => {
    if (gameState === 'showing') {
      const timer = setTimeout(() => {
        setGameState('input');
      }, 2000 + level * 500);
      return () => clearTimeout(timer);
    }
  }, [gameState, level]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const playerWords = inputValue.toLowerCase().split(/[\s,]+/).filter(Boolean);
    let correctCount = 0;
    const remainingWords = new Set(words);
    
    playerWords.forEach(word => {
        if(remainingWords.has(word)) {
            correctCount++;
            remainingWords.delete(word);
        }
    });

    setScore(correctCount);
    setGameState('finished');
  };
  
  const handleNextLevel = () => {
      const nextLevel = level + 1;
      setLevel(nextLevel);
      const newWords = generateWords(2 + nextLevel);
      setWords(newWords);
      setScore(0);
      setGameState('showing');
      setInputValue('');
  }

  const renderContent = () => {
    switch (gameState) {
      case 'idle':
        return (
          <div className="text-center p-6 flex flex-col items-center justify-center min-h-[300px]">
            <h2 className="text-2xl font-semibold text-foreground/90">Word Memory</h2>
            <p className="text-muted-foreground mt-2">Memorize the words and type them back.</p>
          </div>
        );
      case 'showing':
        return (
          <div className="text-center p-6 flex flex-col items-center justify-center min-h-[300px]">
            <h3 className="text-xl text-muted-foreground mb-4">Memorize these words:</h3>
            <div className="flex flex-wrap gap-4 justify-center">
                {words.map((word, i) => <Badge key={i} variant="outline" className="text-2xl font-bold p-3">{word}</Badge>)}
            </div>
          </div>
        );
      case 'input':
        return (
          <div className="text-center p-6 flex flex-col items-center justify-center min-h-[300px]">
            <h2 className="text-2xl font-semibold text-foreground/90">What words do you remember?</h2>
            <p className="text-muted-foreground mt-1 text-sm">Separate words with a space or comma.</p>
            <form onSubmit={handleSubmit} className="flex gap-2 mt-4 w-full max-w-sm">
                <Input 
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    autoFocus
                    className="text-center text-lg"
                />
                <Button type="submit" size="icon"><ChevronRight /></Button>
            </form>
          </div>
        );
      case 'finished':
        return (
          <div className="text-center p-6 flex flex-col items-center justify-center min-h-[300px]">
            <h2 className="text-3xl font-bold text-primary">Level Complete!</h2>
            <p className="text-lg text-muted-foreground mt-2">You remembered <span className="font-bold text-primary">{score}</span> out of <span className="font-bold text-primary">{words.length}</span> words.</p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
                <span className="text-sm text-muted-foreground">Correct words:</span>
                {words.map((word, i) => <Badge key={i} variant="secondary">{word}</Badge>)}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8">
      <Card className="w-full shadow-lg">
        <CardContent className="p-6 relative">
          <div className="absolute top-4 left-4 text-lg">Level: <span className="font-bold text-primary">{level}</span></div>
           <div className="absolute top-4 right-4 text-lg">Words: <span className="font-bold text-primary">{words.length}</span></div>
          {renderContent()}
        </CardContent>
        <CardFooter className="flex justify-center p-6 border-t bg-card">
           {gameState === 'finished' ? (
                <Button size="lg" onClick={handleNextLevel} className="w-full sm:w-auto">
                    <Play className="mr-2" /> Next Level
                </Button>
           ) : (
             <Button size="lg" onClick={startGame} className="w-full sm:w-auto" disabled={gameState === 'showing' || gameState === 'input'}>
              {gameState === 'idle' ? <Play className="mr-2" /> : <RefreshCw className="mr-2" />}
              {gameState === 'idle' ? 'Start Game' : 'Restart'}
            </Button>
           )}
        </CardFooter>
      </Card>
    </div>
  );
}
