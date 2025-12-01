import { ConnectTheDots } from "@/components/connect-the-dots";
import { Card, CardContent } from "@/components/ui/card";

export default function ConnectTheDotsPage() {
  return (
    <div className="w-full">
      <header className="w-full max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Connect the Dots
        </h1>
        <p className="text-muted-foreground mt-1">
          Click the dots in order to reveal the hidden picture!
        </p>
      </header>
      <ConnectTheDots />
      <Card className="w-full max-w-4xl mt-8">
        <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">About Connect the Dots</h2>
            <p>Connect the Dots is a timeless puzzle that brings a hidden image to life, one line at a time. This digital version revives the classic activity, challenging your ability to follow a sequence and revealing a delightful picture as your reward. It’s a wonderfully relaxing and satisfying game that improves concentration, number recognition, and fine motor skills. Watch as a simple collection of numbered points transforms into a recognizable shape right before your eyes.</p>

            <h2 className="text-2xl font-semibold">How to Play</h2>
            <ol className="list-decimal list-inside space-y-2">
                <li>Click the "Start Game" button to begin a new puzzle.</li>
                <li>A series of numbered dots will appear on the canvas.</li>
                <li>Your task is to click on the dots in ascending numerical order, starting with number 1.</li>
                <li>Each time you correctly click a dot, a line will be drawn from the previous dot to the current one.</li>
                <li>If you click a dot out of sequence, nothing will happen. You must find and click the correct next number.</li>
                <li>Continue connecting the dots until you have clicked the final number in the sequence.</li>
                <li>Once all dots are connected, the final image will be revealed. Complete all the levels to see every picture!</li>
            </ol>
        </CardContent>
      </Card>
    </div>
  );
}
