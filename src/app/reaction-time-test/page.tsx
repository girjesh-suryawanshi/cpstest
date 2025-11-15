import { ReactionTimeTest } from "@/components/reaction-time-test";
import { Card, CardContent } from "@/components/ui/card";

export default function ReactionTimeTestPage() {
  return (
    <div className="flex flex-col items-center">
      <header className="w-full max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Reaction Time Test
        </h1>
        <p className="text-muted-foreground mt-1">
          When the box turns green, click as fast as you can.
        </p>
      </header>
      <ReactionTimeTest />
      <Card className="w-full max-w-2xl mt-8">
        <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">About the Reaction Time Test</h2>
            <p>The Reaction Time Test is a simple but powerful tool to measure your reflex speed. It assesses how quickly you can respond to a visual stimulus. This test is widely used to benchmark cognitive performance and is a great way to train and improve your reaction speed, a critical skill for gaming, sports, and even everyday activities like driving. The challenge is straightforward: click the moment you see the color change.</p>

            <h2 className="text-2xl font-semibold">How to Play</h2>
            <ol className="list-decimal list-inside space-y-2">
                <li>Click the "Start Test" button to begin.</li>
                <li>The screen will turn red, indicating you should wait. Do not click yet!</li>
                <li>After a random delay, the screen will turn green.</li>
                <li>As soon as you see the green color, click your mouse as fast as possible.</li>
                <li>If you click before the screen turns green, it will be marked as "Too Soon," and you will have to restart.</li>
                <li>Your reaction time, measured in milliseconds (ms), will be displayed. Try again to see if you can beat your previous score!</li>
            </ol>
        </CardContent>
      </Card>
    </div>
  );
}
