import { WordMemoryTest } from "@/components/word-memory-test";
import { Card, CardContent } from "@/components/ui/card";

export default function WordMemoryTestPage() {
  return (
    <div className="flex flex-col items-center">
      <header className="w-full max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Word Memory Test
        </h1>
        <p className="text-muted-foreground mt-1">
          Memorize the words that appear. How many can you recall?
        </p>
      </header>
      <WordMemoryTest />
       <Card className="w-full max-w-2xl mt-8">
        <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">About the Word Memory Test</h2>
            <p>The Word Memory Test is a challenging cognitive exercise designed to measure and improve your short-term verbal recall. This game presents you with a list of words for a brief period, then tasks you with remembering and typing out as many of them as you can. It’s an excellent way to train your brain's ability to encode, store, and retrieve information, which are crucial skills for learning, studying, and everyday life. As you progress, the number of words increases, pushing your memory to new limits.</p>

            <h2 className="text-2xl font-semibold">How to Play</h2>
            <ol className="list-decimal list-inside space-y-2">
                <li>Click the "Start Game" button to begin.</li>
                <li>A list of words will appear on the screen. Focus and do your best to memorize them in the short time they are visible.</li>
                <li>Once the words disappear, an input box will appear. Type all the words you can remember.</li>
                <li>You can separate the words with spaces or commas. The order does not matter.</li>
                <li>Submit your answers to see your score. You'll be shown how many words you correctly recalled out of the total.</li>
                <li>If you're ready for a greater challenge, proceed to the next level, which will feature a longer list of words.</li>
            </ol>
        </CardContent>
      </Card>
    </div>
  );
}
