import { CoreballGame } from "@/components/coreball-game";
import { Card, CardContent } from "@/components/ui/card";

export default function CoreballGamePage() {
  return (
    <div className="w-full">
      <header className="w-full max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Coreball Game
        </h1>
        <p className="text-muted-foreground mt-1">
          Attach the balls to the core without collision. Click or press space to shoot.
        </p>
      </header>
      <CoreballGame />
      <Card className="w-full max-w-2xl mt-8 mx-auto">
        <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">About the Coreball Game</h2>
            <p>Coreball is a captivating game of precision, timing, and strategy. The objective is simple: attach a series of numbered balls to a central, rotating core. The challenge lies in doing so without any of the balls colliding with each other. As you advance through the levels, the core's rotation speed increases, and the number of pre-attached balls grows, demanding quicker reflexes and more careful planning. It’s an addictive test of focus and rhythm that’s easy to learn but difficult to master.</p>

            <h2 className="text-2xl font-semibold">How to Play</h2>
            <ol className="list-decimal list-inside space-y-2">
                <li>Start the game. A rotating core with at least one ball already attached will appear.</li>
                <li>You will have a queue of balls at the bottom of the screen, ready to be launched.</li>
                <li>Click your mouse or press the spacebar to shoot the next ball towards the core.</li>
                <li>Time your shots carefully to find an open spot on the rotating core.</li>
                <li>If your ball successfully attaches without hitting another ball, you can continue.</li>
                <li>If your ball collides with another, the game is over.</li>
                <li>Successfully attach all the balls in the queue to complete the level and advance to the next, more difficult stage.</li>
            </ol>
        </CardContent>
      </Card>
    </div>
  );
}
