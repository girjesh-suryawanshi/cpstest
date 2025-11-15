import { MemoryGame } from "@/components/memory-game";
import { Card, CardContent } from "@/components/ui/card";

export default function MemoryGamePage() {
  return (
    <div className="flex flex-col items-center">
      <header className="w-full max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Memory Game
        </h1>
        <p className="text-muted-foreground mt-1">
          Flip cards and find all the matching pairs.
        </p>
      </header>
      <MemoryGame />
      <Card className="w-full max-w-4xl mt-8">
        <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">About the Memory Game</h2>
            <p>The classic Memory Game, also known as Concentration or Pairs, is a fantastic exercise for your brain. This engaging game challenges your short-term memory, pattern recognition, and focus. By flipping cards to find matching pairs, you are actively training your cognitive skills in a fun and visually appealing way. It’s a perfect game for all ages to sharpen the mind, improve concentration, and enjoy a moment of rewarding puzzle-solving.</p>

            <h2 className="text-2xl font-semibold">How to Play</h2>
            <ol className="list-decimal list-inside space-y-2">
                <li>Click the "Start Game" button to begin. A grid of facedown cards will appear.</li>
                <li>Click on any card to flip it over and reveal the icon.</li>
                <li>Click on a second card to flip it over.</li>
                <li>If the two cards match, they will remain face-up. You've found a pair!</li>
                <li>If they do not match, they will flip back over after a brief moment. Try to remember what was on each card and where it was.</li>
                <li>Continue flipping cards until you have successfully matched all the pairs on the board.</li>
                <li>Your performance is measured by the number of moves (pairs of flips) and the total time taken. Challenge yourself to complete the game faster and with fewer moves!</li>
            </ol>
        </CardContent>
      </Card>
    </div>
  );
}
