import { SpacebarTest } from "@/components/spacebar-test";
import { Card, CardContent } from "@/components/ui/card";

export default function StimulationClickerPage() {
  return (
    <div className="w-full">
      <header className="w-full max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Stimulation Clicker
        </h1>
        <p className="text-muted-foreground mt-1">
          A 30 second spacebar challenge to keep you stimulated.
        </p>
      </header>
      <SpacebarTest gameDuration={30} />
      <Card className="w-full max-w-2xl mt-8 mx-auto">
        <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">About the Stimulation Clicker</h2>
            <p>The Stimulation Clicker is a fast-paced, 30-second challenge designed to test and improve your tapping speed and stamina. Unlike shorter tests, this extended duration measures your ability to maintain a high rate of spacebar presses over time, making it an excellent tool for building endurance. Whether you're a gamer looking to enhance your in-game actions or simply seeking a fun way to measure your keyboard reflexes, the Stimulation Clicker offers a robust and engaging experience.</p>

            <h2 className="text-2xl font-semibold">How to Play</h2>
            <ol className="list-decimal list-inside space-y-2">
                <li>Click the "Start Test" button to initiate the countdown.</li>
                <li>Prepare yourself to press the spacebar key on your keyboard.</li>
                <li>As soon as the test begins, start tapping the spacebar as rapidly as you can.</li>
                <li>Maintain your pace for the full 30-second duration of the challenge.</li>
                <li>Once the timer expires, your final score, including total hits and hits-per-second, will be displayed. Challenge yourself to beat your score with each attempt!</li>
            </ol>
        </CardContent>
      </Card>
    </div>
  );
}
