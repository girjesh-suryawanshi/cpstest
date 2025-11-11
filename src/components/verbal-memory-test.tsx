"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Play, RefreshCw } from 'lucide-react';

const WORD_LIST = [
  'apple', 'banana', 'orange', 'grape', 'lemon', 'lime', 'melon', 'peach', 'pear', 'plum',
  'cherry', 'berry', 'kiwi', 'mango', 'papaya', 'house', 'tree', 'river', 'mountain', 'ocean',
  'sun', 'moon', 'star', 'cloud', 'rain', 'snow', 'wind', 'fire', 'earth', 'water',
  'book', 'pen', 'desk', 'chair', 'lamp', 'door', 'window', 'floor', 'roof', 'wall',
  'car', 'bus', 'train', 'boat', 'plane', 'bike', 'road', 'street', 'bridge', 'sign'
];

type GameState = 'idle' | 'playing' | 'finished';

export function VerbalMemoryTest() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [currentWord, setCurrentWord] = useState('');
  const [seenWords, setSeenWords] = useState<Set<string>>(new Set());
  const [isNewWord, setIsNewWord] = useState(false);

  const nextWord = useCallback(() => {
    // 50% chance to show a new word
    const shouldBeNew = Math.random() < 0.5 || seenWords.size < 2;
    let word: string;

    if (shouldBeNew || seenWords.size === 0) {
      // Find a word that hasn't been seen yet
      do {
        word = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
      } while (seenWords.has(word));
      setIsNewWord(true);
    } else {
      // Pick a random word from the ones already seen
      const seenArray = Array.from(seenWords);
      word = seenArray[Math.floor(Math.random() * seenArray.length)];
      setIsNewWord(false);
    }

    setCurrentWord(word);
    setSeenWords(prev => new Set(prev).add(word));
  }, [seenWords]);
  
  const startGame = () => {
    setGameState('playing');
    setLevel(1);
    setLives(3);
    setScore(0);
    setSeenWords(new Set());
    nextWord();
  };

  useEffect(() => {
    if (gameState === 'playing' && lives > 0) {
        if(seenWords.size === 0) {
            nextWord();
        }
    } else if (lives === 0) {
      setGameState('finished');
    }
  }, [gameState, lives, seenWords, nextWord]);


  const handleChoice = (playerThinksIsNew: boolean) => {
    if (gameState !== 'playing') return;

    if (playerThinksIsNew === isNewWord) {
      setScore(prev => prev + 1);
      if((score + 1) % 10 === 0) {
          setLevel(prev => prev + 1);
      }
      nextWord();
    } else {
      setLives(prev => prev - 1);
      if (lives - 1 > 0) {
        nextWord();
      } else {
        setGameState('finished');
      }
    }
  };

  const renderContent = () => {
    switch (gameState) {
      case 'idle':
        return (
          <div className="text-center p-6 flex flex-col items-center justify-center min-h-[250px]">
            <h2 className="text-2xl font-semibold text-foreground/90">Verbal Memory Test</h2>
            <p className="text-muted-foreground mt-2">Have you seen this word before? Click the correct button.</p>
          </div>
        );
      case 'playing':
        return (
          <div className="text-center p-6 flex flex-col items-center justify-center min-h-[250px]">
            <p className="text-5xl font-bold font-mono tracking-widest text-primary">{currentWord}</p>
          </div>
        );
      case 'finished':
        return (
          <div className="text-center p-6 flex flex-col items-center justify-center min-h-[250px]">
            <h2 className="text-3xl font-bold text-destructive">Game Over!</h2>
            <p className="text-lg text-muted-foreground mt-2">You reached level <span className="font-bold text-primary">{level}</span> with a score of <span className="font-bold text-primary">{score}</span>.</p>
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
              <div className="text-lg">Lives: <span className="font-bold text-destructive">{'❤️'.repeat(lives)}</span></div>
            </div>
          )}
          {renderContent()}
        </CardContent>
        <CardFooter className="flex justify-center p-6 border-t bg-card">
          {gameState === 'playing' ? (
            <div className="flex gap-4">
              <Button size="lg" onClick={() => handleChoice(true)} className="w-32">New</Button>
              <Button size="lg" onClick={() => handleChoice(false)} className="w-32">Seen</Button>
            </div>
          ) : (
            <Button size="lg" onClick={startGame} className="w-full sm:w-auto">
              {gameState === 'idle' ? <Play className="mr-2" /> : <RefreshCw className="mr-2" />}
              {gameState === 'idle' ? 'Start Game' : 'Try Again'}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
