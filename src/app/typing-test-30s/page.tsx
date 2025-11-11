import { TypingTest } from "@/components/typing-test";

export default function TypingTest30sPage() {
  return (
    <div className="flex flex-col items-center">
      <header className="w-full max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Typing Speed Test (30 seconds)
        </h1>
        <p className="text-muted-foreground mt-1">
          A quick typing sprint. The test will begin once you start typing.
        </p>
      </header>
      <TypingTest />
    </div>
  );
}
