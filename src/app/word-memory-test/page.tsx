import { WordMemoryTest } from "@/components/word-memory-test";

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
    </div>
  );
}
