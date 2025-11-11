"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const TEXT_SAMPLES = {
    "1": "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet. Learning to type quickly and accurately is a valuable skill in today's digital world. Practice makes perfect, so keep at it! Many online resources can help you improve your typing speed and technique.",
    "2": "Technology has revolutionized the way we live and work. From smartphones to artificial intelligence, innovation continues to shape our future. The internet connects billions of people worldwide, providing access to information and enabling global communication. Understanding these changes is crucial for everyone.",
    "3": "History is a fascinating subject that helps us understand the present. By studying past events, we can learn from the successes and failures of those who came before us. Major turning points in history have shaped societies and cultures across the globe. Every story from the past has a lesson for the future.",
    "4": "The natural world is full of wonders, from the highest mountains to the deepest oceans. Biodiversity is essential for a healthy planet, and conservation efforts are crucial to protect endangered species. Climate change poses a significant threat to ecosystems worldwide. We all have a role to play in preserving our environment.",
};

type TextKey = keyof typeof TEXT_SAMPLES;
type GameState = 'idle' | 'running' | 'finished';

export function TypingTest() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [gameDuration, setGameDuration] = useState(60);
  const [textKey, setTextKey] = useState<TextKey>("1");
  const [timeLeft, setTimeLeft] = useState(gameDuration);
  const [inputValue, setInputValue] = useState('');
  const [errorCount, setErrorCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const sampleText = useMemo(() => TEXT_SAMPLES[textKey], [textKey]);

  const handleStart = useCallback(() => {
    setGameState('idle');
    setInputValue('');
    setTimeLeft(gameDuration);
    setErrorCount(0);
    const newKey = (Math.floor(Math.random() * Object.keys(TEXT_SAMPLES).length) + 1).toString() as TextKey;
    setTextKey(newKey);
    inputRef.current?.focus();
  }, [gameDuration]);

  useEffect(() => {
    handleStart();
  }, [gameDuration, handleStart]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'running' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameState('finished');
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (gameState === 'idle') {
      setGameState('running');
    }

    if (gameState === 'finished') return;

    let currentErrors = 0;
    for (let i = 0; i < value.length; i++) {
        if (value[i] !== sampleText[i]) {
            currentErrors++;
        }
    }
    setErrorCount(currentErrors);
    setInputValue(value);

    if (value.length === sampleText.length) {
      setGameState('finished');
    }
  };

  const handleDurationChange = (value: string) => {
    setGameDuration(parseInt(value, 10));
  };
  
  const wpm = useMemo(() => {
    const wordsTyped = inputValue.trim().split(/\s+/).length;
    const timeElapsed = gameDuration - timeLeft;
    if (wordsTyped === 0 || timeElapsed === 0) return 0;
    const minutes = timeElapsed / 60;
    return Math.round(wordsTyped / minutes);
  }, [inputValue, timeLeft, gameDuration]);

  const accuracy = useMemo(() => {
    if (inputValue.length === 0) return 100;
    const correctChars = inputValue.length - errorCount;
    return Math.round((correctChars / inputValue.length) * 100);
  }, [inputValue, errorCount]);

  const renderedText = useMemo(() => {
    return sampleText.split('').map((char, index) => {
      let className = "text-muted-foreground";
      if (index < inputValue.length) {
        if (char === inputValue[index]) {
          className = "text-foreground";
        } else {
          className = "text-destructive bg-destructive/20";
        }
      }
      return <span key={index} className={cn(className, { 'border-b-2 border-primary': index === inputValue.length })}>{char}</span>;
    });
  }, [sampleText, inputValue]);

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-8">
      <Card className="w-full shadow-lg">
        <CardHeader>
           <div className="flex justify-between items-center">
             <CardTitle>Typing Test</CardTitle>
             <Select value={gameDuration.toString()} onValueChange={handleDurationChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="60">1 Minute</SelectItem>
                  <SelectItem value="120">2 Minutes</SelectItem>
                  <SelectItem value="300">5 Minutes</SelectItem>
                </SelectContent>
              </Select>
           </div>
        </CardHeader>
        <CardContent>
          {gameState !== 'finished' ? (
            <div className="relative">
              <div
                className="text-2xl font-mono tracking-wide leading-relaxed break-words"
                onClick={() => inputRef.current?.focus()}
              >
                {renderedText}
              </div>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className="absolute inset-0 opacity-0 w-full h-full cursor-default"
                disabled={gameState === 'finished'}
              />
              <div className="absolute top-[-3rem] right-0 text-2xl font-semibold text-primary">
                {Math.floor(timeLeft / 60)}:{('0' + timeLeft % 60).slice(-2)}
              </div>
            </div>
          ) : (
            <div className="text-center p-6">
              <h2 className="text-2xl font-bold">Results</h2>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-muted-foreground text-sm">WPM</p>
                  <p className="text-4xl font-bold text-primary">{wpm}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-muted-foreground text-sm">Accuracy</p>
                  <p className="text-4xl font-bold text-primary">{accuracy}%</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center p-6 border-t">
          <Button size="lg" onClick={handleStart}>
            <RefreshCw className="mr-2" />
            Restart Test
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
