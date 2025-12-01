import { TypingTest } from "@/components/typing-test";
import { Card, CardContent } from "@/components/ui/card";

export default function TypingTest30sPage() {
  return (
    <div className="w-full">
      <header className="w-full max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Typing Speed Test (30 seconds)
        </h1>
        <p className="text-muted-foreground mt-1">
          A quick typing sprint. The test will begin once you start typing.
        </p>
      </header>
      <TypingTest gameDuration={30} />
      <Card className="w-full max-w-3xl mt-8 mx-auto">
        <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">About the 30-Second Typing Test</h2>
            <p>The 30-second Typing Test is a high-intensity sprint designed to measure your burst typing speed and accuracy under pressure. This quick format is perfect for a warm-up, a quick skill check, or for those who want to practice their initial typing acceleration. It pushes you to find your rhythm immediately and maintain it for a short burst, which is a great way to train for real-world scenarios where you need to type quickly for brief periods.</p>

            <h2 className="text-2xl font-semibold">How to Play</h2>
            <ol className="list-decimal list-inside space-y-2">
                <li>The test will automatically begin as soon as you type the first character.</li>
                <li>Type the provided text as quickly and accurately as possible.</li>
                <li>The test concludes after 30 seconds.</li>
                <li>Your results, including Words Per Minute (WPM) and accuracy, will be displayed instantly.</li>
                <li>Challenge yourself to improve your sprint speed with each attempt!</li>
            </ol>
        </CardContent>
      </Card>
    </div>
  );
}
