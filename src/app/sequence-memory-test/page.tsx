import { SequenceMemoryTest } from "@/components/sequence-memory-test";
import { Card, CardContent } from "@/components/ui/card";

export default function SequenceMemoryTestPage() {
  return (
    <div className="flex flex-col items-center">
      <header className="w-full max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Sequence Memory Test
        </h1>
        <p className="text-muted-foreground mt-1">
          A sequence of squares will flash. Repeat the sequence by clicking the squares in the correct order.
        </p>
      </header>
      <SequenceMemoryTest />
       <Card className="w-full max-w-2xl mt-8">
        <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">About the Sequence Memory Test</h2>
            <p>The Sequence Memory Test is a challenging cognitive game designed to test and improve your short-term visual and spatial memory. It’s based on the classic "Simon" game, where you must remember and replicate a growing sequence of signals. In this version, a pattern of squares will flash on a grid. Your task is to memorize the sequence and then click the squares in the exact same order. With each successful round, the sequence gets longer, pushing your memory to its limits.</p>

            <h2 className="text-2xl font-semibold">How to Play</h2>
            <ol className="list-decimal list-inside space-y-2">
                <li>Click the "Start Game" button to begin.</li>
                <li>The game will briefly highlight a sequence of squares on the grid. Watch carefully and memorize the pattern.</li>
                <li>After the sequence is shown, it's your turn. Click the squares in the same order they were highlighted.</li>
                <li>If you correctly repeat the sequence, you'll advance to the next level, where a new, longer sequence will be presented.</li>
                <li>If you make a mistake, you'll lose a life. The game ends when you run out of lives.</li>
                <li>The goal is to see how long of a sequence you can successfully remember and replicate.</li>
            </ol>
        </CardContent>
      </Card>
    </div>
  );
}
