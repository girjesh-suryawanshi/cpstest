import { VisualMemoryTest } from "@/components/visual-memory-test";

export default function VisualMemoryTestPage() {
  return (
    <div className="flex flex-col items-center">
      <header className="w-full max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Visual Memory Test
        </h1>
        <p className="text-muted-foreground mt-1">
          A pattern will flash on the grid. Memorize the pattern and repeat it.
        </p>
      </header>
      <VisualMemoryTest />
    </div>
  );
}
