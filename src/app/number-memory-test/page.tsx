import { NumberMemoryTest } from "@/components/number-memory-test";
import { Card, CardContent } from "@/components/ui/card";

export default function NumberMemoryTestPage() {
  return (
    <div className="w-full">
      <header className="w-full max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Number Memory Test
        </h1>
        <p className="text-muted-foreground mt-1">
          Remember the number, then type it back. The number will get longer each round.
        </p>
      </header>
      <NumberMemoryTest />
      <Card className="w-full max-w-2xl mt-8 mx-auto">
        <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">About the Number Memory Test</h2>
            <p>The Number Memory Test is a powerful cognitive challenge designed to measure and improve your short-term and working memory. This test is similar to the digit span task used in cognitive psychology to assess memory capacity. The premise is simple: you are shown a sequence of digits for a short period, and your goal is to recall and enter it correctly. As you succeed, the sequence of numbers grows longer, progressively pushing the limits of your memory.</p>

            <h2 className="text-2xl font-semibold">How to Play</h2>
            <ol className="list-decimal list-inside space-y-2">
                <li>Click the "Start Game" button to begin. The first level will present a short number.</li>
                <li>Focus and memorize the number shown on the screen. It will disappear after a few seconds.</li>
                <li>Once the number is gone, an input box will appear. Type the number exactly as you remember it.</li>
                <li>Submit your answer. If you are correct, you will advance to the next level, where a longer number will be presented.</li>
                <li>If you make a mistake, the game ends, and your final level is recorded.</li>
                <li>The goal is to see how long of a number sequence you can successfully memorize and recall.</li>
            </ol>
        </CardContent>
      </Card>
    </div>
  );
}
