import { WordScramble } from "@/components/word-scramble";

export default function WordScramblePage() {
  return (
    <div className="flex flex-col items-center">
      <header className="w-full max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Word Scramble
        </h1>
        <p className="text-muted-foreground mt-1">
          Unscramble as many words as you can in 60 seconds!
        </p>
      </header>
      <WordScramble />
    </div>
  );
}
