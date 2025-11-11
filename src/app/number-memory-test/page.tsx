import { NumberMemoryTest } from "@/components/number-memory-test";

export default function NumberMemoryTestPage() {
  return (
    <div className="flex flex-col items-center">
      <header className="w-full max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Number Memory Test
        </h1>
        <p className="text-muted-foreground mt-1">
          Remember the number, then type it back. The number will get longer each round.
        </p>
      </header>
      <NumberMemoryTest />
    </div>
  );
}
