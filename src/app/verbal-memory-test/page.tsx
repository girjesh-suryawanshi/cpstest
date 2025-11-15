import { VerbalMemoryTest } from "@/components/verbal-memory-test";
import { Card, CardContent } from "@/components/ui/card";

export default function VerbalMemoryTestPage() {
  return (
    <div className="flex flex-col items-center">
      <header className="w-full max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Verbal Memory Test
        </h1>
        <p className="text-muted-foreground mt-1">
          You will be shown a series of words. After each word, decide if you have seen it before in the current test.
        </p>
      </header>
      <VerbalMemoryTest />
      <Card className="w-full max-w-2xl mt-8">
        <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">About the Verbal Memory Test</h2>
            <p>The Verbal Memory Test is a compelling cognitive challenge designed to assess your ability to recognize and recall information. This test specifically targets your short-term verbal memory by presenting you with a continuous stream of words. Your task is to determine if each word is new or if you've already seen it during the current session. It’s an excellent way to measure and improve your attention, focus, and memory recognition skills in a dynamic and engaging format.</p>

            <h2 className="text-2xl font-semibold">How to Play</h2>
            <ol className="list-decimal list-inside space-y-2">
                <li>Click the "Start Game" button to begin.</li>
                <li>A word will appear on the screen. Read it and try to remember it.</li>
                <li>Your task is to decide if this is the first time you are seeing this word in the current test session.</li>
                <li>Click the "Seen" button if you believe you have seen the word before.</li>
                <li>Click the "New" button if you believe it is a new word you haven't encountered yet in this session.</li>
                <li>If your answer is correct, your score will increase, and a new word will be presented.</li>
                <li>If you make a mistake, you will lose a life. The game ends when you run out of lives.</li>
                <li>The objective is to correctly identify as many words as possible and achieve the highest score.</li>
            </ol>
        </CardContent>
      </Card>
    </div>
  );
}
