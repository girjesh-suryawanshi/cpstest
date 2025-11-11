import { SequenceMemoryTest } from "@/components/sequence-memory-test";

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
    </div>
  );
}
