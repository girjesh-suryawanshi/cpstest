"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Play, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Apple, Cat, Dog, Car, Plane, Gift, Ghost, Bomb, Star, Sun } from 'lucide-react';

const ICONS = [
  { icon: Apple, name: 'apple' }, { icon: Cat, name: 'cat' }, { icon: Dog, name: 'dog' },
  { icon: Car, name: 'car' }, { icon: Plane, name: 'plane' }, { icon: Gift, name: 'gift' },
  { icon: Ghost, name: 'ghost' }, { icon: Bomb, name: 'bomb' }, { icon: Star, name: 'star'}, { icon: Sun, name: 'sun'}
];

type CardData = {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  isFlipped: boolean;
  isMatched: boolean;
};

type GameState = 'idle' | 'playing' | 'finished';

const createGameBoard = (): CardData[] => {
  const selectedIcons = ICONS.sort(() => 0.5 - Math.random()).slice(0, 8);
  const gameCards = [...selectedIcons, ...selectedIcons]
    .map((iconData, index) => ({
      id: index,
      icon: iconData.icon,
      name: iconData.name,
      isFlipped: false,
      isMatched: false,
    }))
    .sort(() => Math.random() - 0.5);
  return gameCards;
};

export function MemoryGame() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [cards, setCards] = useState<CardData[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (gameState === 'playing') {
      const interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameState]);

  const startGame = () => {
    setGameState('playing');
    setCards(createGameBoard());
    setFlippedCards([]);
    setMoves(0);
    setTimer(0);
  };

  const handleCardClick = (id: number) => {
    if (gameState !== 'playing' || flippedCards.length === 2) return;

    const clickedCard = cards.find(card => card.id === id);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);
    setCards(prevCards => prevCards.map(card => card.id === id ? { ...card, isFlipped: true } : card));

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = cards.find(c => c.id === firstCardId);
      const secondCard = cards.find(c => c.id === secondCardId);

      if (firstCard?.name === secondCard?.name) {
        setCards(prevCards =>
          prevCards.map(card =>
            card.name === firstCard.name ? { ...card, isMatched: true } : card
          )
        );
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              newFlippedCards.includes(card.id) ? { ...card, isFlipped: false } : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };
  
  useEffect(() => {
    if(cards.length > 0 && cards.every(c => c.isMatched)) {
        setGameState('finished');
    }
  }, [cards])

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8">
      <Card className="w-full shadow-lg">
        <CardContent className="p-6">
          {gameState === 'playing' || gameState === 'finished' ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <div className="text-lg">Moves: <span className="font-bold text-primary">{moves}</span></div>
                <div className="text-lg">Time: <span className="font-bold text-primary">{timer}s</span></div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {cards.map(card => (
                  <div key={card.id} onClick={() => handleCardClick(card.id)} className="perspective-1000">
                    <div className={cn(
                      "w-full h-24 rounded-lg transform-style-3d transition-transform duration-500 cursor-pointer",
                      card.isFlipped || card.isMatched ? 'rotate-y-180' : ''
                    )}>
                      <div className="absolute w-full h-full backface-hidden flex items-center justify-center bg-primary rounded-lg">
                        
                      </div>
                      <div className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center bg-accent rounded-lg">
                         <card.icon className={cn("w-12 h-12", card.isMatched ? "text-green-400" : "text-accent-foreground")} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
             <div className="text-center p-6 flex flex-col items-center justify-center min-h-[350px]">
                <h2 className="text-2xl font-semibold text-foreground/90">Memory Game</h2>
                <p className="text-muted-foreground mt-2">Find all the matching pairs!</p>
            </div>
          )}

          {gameState === 'finished' && (
             <div className="absolute inset-0 bg-background/90 flex flex-col items-center justify-center text-center">
                <h2 className="text-4xl font-bold text-primary">Congratulations!</h2>
                <p className="text-muted-foreground mt-2">You completed the game in {moves} moves and {timer} seconds.</p>
            </div>
          )}
        </CardContent>
        {(gameState === 'idle' || gameState === 'finished') && (
          <CardFooter className="flex justify-center p-6 border-t bg-card">
            <Button size="lg" onClick={startGame} className="w-full sm:w-auto">
              {gameState === 'idle' ? <Play className="mr-2" /> : <RefreshCw className="mr-2" />}
              {gameState === 'idle' ? 'Start Game' : 'Play Again'}
            </Button>
          </CardFooter>
        )}
      </Card>
       <style jsx>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
      `}</style>
    </div>
  );
}
