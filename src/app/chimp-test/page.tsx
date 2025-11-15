import { ChimpTest } from "@/components/chimp-test";
import { Card, CardContent } from "@/components/ui/card";

export default function ChimpTestPage() {
  return (
    <div className="flex flex-col items-center">
      <header className="w-full max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Chimp Test
        </h1>
        <p className="text-muted-foreground mt-1">
          Are you smarter than a chimpanzee? Click the squares in order.
        </p>
      </header>
      <ChimpTest />
      <Card className="w-full max-w-2xl mt-8">
        <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">About the Chimp Test</h2>
            <p>The Chimp Test is a fascinating challenge of working memory, inspired by studies that showcased the incredible short-term memory abilities of chimpanzees. The test measures your ability to remember the sequential position of numbers on a screen. After you click the first number, all other numbers are hidden, and you must click the squares where they were located in ascending order. It’s a true test of photographic memory and cognitive speed.</p>

            <h2 className="text-2xl font-semibold">How to Play</h2>
            <ol className="list-decimal list-inside space-y-2">
                <li>Click "Start Game" to begin. A grid with a set of numbered squares will appear.</li>
                <li>Your task is to memorize the location of each number.</li>
                <li>Click on the square with the number 1.</li>
                <li>As soon as you click the first square, all other numbers will be hidden.</li>
                <li>Continue clicking the squares in their correct numerical order (2, 3, 4, and so on) based on your memory.</li>
                <li>If you make a mistake, you lose a life, and the level restarts. If you succeed, you advance to the next level with more numbers.</li>
                <li>The game ends when you run out of lives. See how high a level you can reach!</li>
            </ol>
        </CardContent>
      </Card>
    </div>
  );
}
