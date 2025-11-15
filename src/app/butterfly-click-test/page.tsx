import { CpsTest } from "@/components/cps-test";
import { Card, CardContent } from "@/components/ui/card";

export default function ButterflyClickTestPage() {
  return (
    <div className="flex flex-col items-center">
      <header className="w-full max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Butterfly Click Test
        </h1>
        <p className="text-muted-foreground mt-1">
          Test your butterfly clicking speed for 20 seconds.
        </p>
      </header>
      <CpsTest gameDuration={20} />
      <Card className="w-full max-w-2xl mt-8">
        <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">About the Butterfly Click Test</h2>
            <p>The Butterfly Click Test is a challenge designed to measure your clicking speed using the butterfly clicking technique. This method involves rapidly alternating clicks with two fingers (usually the index and middle fingers) on a single mouse button. It's a popular technique among pro gamers, especially in Minecraft, to achieve extremely high CPS (clicks per second). This 20-second test provides a great opportunity to practice and perfect your butterfly clicking skills.</p>

            <h2 className="text-2xl font-semibold">How to Play</h2>
            <ol className="list-decimal list-inside space-y-2">
                <li>Place your index and middle fingers on your primary mouse button.</li>
                <li>Click the "Start Test" button to begin the countdown.</li>
                <li>When the test area appears, start rapidly alternating clicks with both fingers on the button.</li>
                <li>Continue this motion for the full 20 seconds until the timer runs out.</li>
                <li>Your final CPS score will be displayed. Analyze your performance and try again to improve your speed and rhythm!</li>
            </ol>
        </CardContent>
      </Card>
    </div>
  );
}
