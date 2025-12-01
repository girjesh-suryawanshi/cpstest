import { TypingTest } from "@/components/typing-test";
import { Card, CardContent } from "@/components/ui/card";

export default function TypingTestPage() {
  return (
    <div className="w-full">
      <header className="w-full max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Typing Speed Test
        </h1>
        <p className="text-muted-foreground mt-1">
          How fast can you type? The test will begin once you start typing.
        </p>
      </header>
      <TypingTest gameDuration={60} />
      <Card className="w-full max-w-3xl mt-8">
        <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">About the Typing Speed Test</h2>
            <p>The Typing Speed Test is a fundamental tool for anyone looking to measure and improve their keyboard proficiency. In a world driven by digital communication, typing quickly and accurately is a crucial skill. This test measures your typing speed in Words Per Minute (WPM), tracks your accuracy, and helps you identify areas for improvement. Whether you're a student, a professional, or just looking to get faster, this test provides a standardized way to benchmark your skills.</p>

            <h2 className="text-2xl font-semibold">How to Play</h2>
            <ol className="list-decimal list-inside space-y-2">
                <li>Choose your desired test duration from the dropdown menu (e.g., 1 minute, 2 minutes).</li>
                <li>The test will automatically begin as soon as you type the first character in the input area.</li>
                <li>Type the sample text provided. Correctly typed characters will be highlighted, while errors will be marked in red.</li>
                <li>The timer will count down. Continue typing as quickly and accurately as possible until the time runs out.</li>
                <li>Once the test is complete, your results will be displayed, showing your WPM, accuracy percentage, and total errors. Use this feedback to track your progress over time!</li>
            </ol>
        </CardContent>
      </Card>
    </div>
  );
}
