import { AimTrainer } from "@/components/aim-trainer";
import { Card, CardContent } from "@/components/ui/card";

export default function AimTrainerPage() {
  return (
    <div className="flex flex-col items-center">
      <header className="w-full max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Aim Trainer
        </h1>
        <p className="text-muted-foreground mt-1">
          Click as many targets as you can in 30 seconds.
        </p>
      </header>
      <AimTrainer />
       <Card className="w-full max-w-2xl mt-8">
        <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">About the Aim Trainer</h2>
            <p>The Aim Trainer is designed to help you improve your mouse accuracy, speed, and precision. This tool is perfect for gamers looking to sharpen their skills for FPS (First-Person Shooter) games or anyone wanting to enhance their mouse control. The challenge is simple: hit as many targets as you can before the time runs out. As your score increases, the difficulty ramps up, pushing your abilities to the limit.</p>

            <h2 className="text-2xl font-semibold">How to Play</h2>
            <ol className="list-decimal list-inside space-y-2">
                <li>Click the "Start Training" button to begin the game.</li>
                <li>Targets will appear on the screen. Move your mouse and click on them as quickly and accurately as possible.</li>
                <li>Each successful hit increases your score. Missing a target will count as a miss and lower your accuracy.</li>
                <li>The game lasts for 30 seconds. As you hit more targets, more will appear on the screen to increase the challenge.</li>
                <li>Once the timer ends, your final score, accuracy, and number of misses will be displayed. Analyze your performance and try again to beat your high score!</li>
            </ol>
        </CardContent>
      </Card>
    </div>
  );
}
