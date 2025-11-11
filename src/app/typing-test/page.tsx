import { TypingTest } from "@/components/typing-test";

export default function TypingTestPage() {
  return (
    <div className="flex flex-col items-center">
      <header className="w-full max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Typing Speed Test
        </h1>
        <p className="text-muted-foreground mt-1">
          How fast can you type? The test will begin once you start typing.
        </p>
      </header>
      <TypingTest />
    </div>
  );
}
