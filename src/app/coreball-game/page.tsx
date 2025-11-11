import { CoreballGame } from "@/components/coreball-game";

export default function CoreballGamePage() {
  return (
    <div className="flex flex-col items-center">
      <header className="w-full max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Coreball Game
        </h1>
        <p className="text-muted-foreground mt-1">
          Attach the balls to the core without collision. Click or press space to shoot.
        </p>
      </header>
      <CoreballGame />
    </div>
  );
}
