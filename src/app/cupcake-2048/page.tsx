import { Cupcake2048 } from "@/components/cupcake-2048";
import { Card, CardContent } from "@/components/ui/card";

export default function Cupcake2048Page() {
  return (
    <div className="w-full">
      <header className="w-full max-w-lg mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Cupcake 2048
        </h1>
        <p className="text-muted-foreground mt-1">
          Use your arrow keys or swipe to combine cupcakes and create new ones!
        </p>
      </header>
      <Cupcake2048 />
      <Card className="w-full max-w-lg mt-8 mx-auto">
        <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">About Cupcake 2048</h2>
            <p>Cupcake 2048 is a charming and delicious twist on the classic 2048 puzzle game. Instead of numbers, you'll be merging delightful cupcakes to discover new, more elaborate treats. The goal is to slide matching cupcakes together to combine them, doubling their value and creating a new cupcake. Plan your moves strategically to keep the board from filling up and see how many new cupcake recipes you can unlock. It’s a test of foresight, strategy, and your love for sweet treats!</p>

            <h2 className="text-2xl font-semibold">How to Play</h2>
            <ol className="list-decimal list-inside space-y-2">
                <li>Use your arrow keys (on desktop) or swipe (on mobile) to move all the cupcakes on the board in one of the four directions: up, down, left, or right.</li>
                <li>When two identical cupcakes collide, they merge into a new, higher-value cupcake.</li>
                <li>After every move, a new cupcake (usually the most basic one) will appear in a random empty spot on the board.</li>
                <li>The game ends when the board is completely full and there are no more possible moves to merge cupcakes.</li>
                <li>Your score increases with every merge. Try to create the ultimate cupcake and achieve the highest score possible!</li>
            </ol>
        </CardContent>
      </Card>
    </div>
  );
}
