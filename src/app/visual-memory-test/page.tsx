
import { VisualMemoryTest } from "@/components/visual-memory-test";
import { Card, CardContent } from "@/components/ui/card";

export default function VisualMemoryTestPage() {
  return (
    <div className="w-full">
      <header className="w-full max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Visual Memory Test
        </h1>
        <p className="text-muted-foreground mt-1">
          A pattern will flash on the grid. Memorize the pattern and repeat it.
        </p>
      </header>
      <VisualMemoryTest />
      <Card className="w-full max-w-2xl mt-8">
        <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">About the Visual Memory Test</h2>
            <p>The Visual Memory Test is a challenging cognitive game designed to test and improve your ability to recall visual patterns. This exercise targets your short-term spatial memory by briefly showing you a pattern of highlighted squares on a grid. Your task is to remember which squares were highlighted and then replicate the pattern. As you advance through the levels, the grid size increases and the patterns become more complex, pushing your visual recall abilities to their limits.</p>

            <h2 className="text-2xl font-semibold">How to Play</h2>
            <ol className="list-decimal list-inside space-y-2">
                <li>Click the "Start Game" button to begin the first level.</li>
                <li>The game will flash a pattern of blue squares on the grid for a short moment. Watch carefully and memorize their positions.</li>
                <li>After the pattern disappears, it's your turn. Click on the squares that you remember being part of the pattern.</li>
                <li>If you click a square that was not part of the pattern, you will lose a life.</li>
                <li>You must correctly identify all the highlighted squares to pass the level.</li>
                <li>If you succeed, you advance to the next level with a new, more difficult pattern. If you run out of lives, the game is over.</li>
                <li>The goal is to complete as many levels as possible, sharpening your visual memory with each round.</li>
            </ol>
        </CardContent>
      </Card>
    </div>
  );
}
