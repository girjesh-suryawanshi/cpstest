import { SpacebarTest } from "@/components/spacebar-test";
import { Card, CardContent } from "@/components/ui/card";

export default function SpacebarClickerPage() {
  return (
    <div className="flex flex-col items-center">
      <header className="w-full max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Spacebar Clicker
        </h1>
        <p className="text-muted-foreground mt-1">
          Hit the spacebar as many times as you can in 15 seconds.
        </p>
      </header>
      <SpacebarTest gameDuration={15} />
       <Card className="w-full max-w-2xl mt-8">
        <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">About the Spacebar Clicker Test</h2>
            <p>The Spacebar Clicker is a fun and simple challenge designed to measure your tapping speed. Whether you're a gamer looking to improve your in-game actions or just curious about how fast you can press the spacebar, this tool provides a quick and accurate way to test your abilities. The goal is to hit the spacebar as many times as possible within the given time limit. It's a great way to improve your finger dexterity and reaction time.</p>

            <h2 className="text-2xl font-semibold">How to Play</h2>
            <ol className="list-decimal list-inside space-y-2">
                <li>Click the "Start Test" button to begin the countdown.</li>
                <li>Once the test starts, press the spacebar on your keyboard as quickly as you can.</li>
                <li>Continue hitting the spacebar for the full duration of the test.</li>
                <li>When the timer runs out, your score will be displayed, showing your total hits and hits-per-second rate.</li>
                <li>Analyze your performance, practice your technique, and try again to set a new high score!</li>
            </ol>
        </CardContent>
      </Card>
    </div>
  );
}
