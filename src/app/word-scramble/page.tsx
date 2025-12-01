import { WordScramble } from "@/components/word-scramble";
import { Card, CardContent } from "@/components/ui/card";

export default function WordScramblePage() {
  return (
    <div className="w-full">
      <header className="w-full max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Word Scramble
        </h1>
        <p className="text-muted-foreground mt-1">
          Unscramble as many words as you can in 60 seconds!
        </p>
      </header>
      <WordScramble />
      <Card className="w-full max-w-2xl mt-8 mx-auto">
        <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">About Word Scramble</h2>
            <p>Word Scramble is a classic brain-teaser that challenges your vocabulary and mental agility. In this fast-paced game, you are presented with a jumble of letters and your task is to rearrange them to form a valid word. It’s a fantastic way to improve your spelling, expand your vocabulary, and enhance your problem-solving skills under pressure. With a 60-second timer, every correct answer brings a sense of accomplishment and pushes you to think faster.</p>

            <h2 className="text-2xl font-semibold">How to Play</h2>
            <ol className="list-decimal list-inside space-y-2">
                <li>Click the "Start Game" button to begin the 60-second countdown.</li>
                <li>A scrambled word will appear on the screen.</li>
                <li>Analyze the letters and try to figure out the original word.</li>
                <li>Type your answer into the input box and press Enter or click the submit button.</li>
                <li>If your answer is correct, your score will increase, and a new scrambled word will immediately appear.</li>
                <li>If your answer is incorrect, you can keep trying until you get it right or a new word appears.</li>
                <li>Continue unscrambling words as quickly as you can until the timer runs out.</li>
                <li>Your final score, representing the number of correctly unscrambled words, will be displayed.</li>
            </ol>
        </CardContent>
      </Card>
    </div>
  );
}
