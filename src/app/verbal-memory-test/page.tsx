import { VerbalMemoryTest } from "@/components/verbal-memory-test";

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
    </div>
  );
}
