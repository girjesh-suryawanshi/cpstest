import { MemoryGame } from "@/components/memory-game";

export default function MemoryGamePage() {
  return (
    <div className="flex flex-col items-center">
      <header className="w-full max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Memory Game
        </h1>
        <p className="text-muted-foreground mt-1">
          Flip cards and find all the matching pairs.
        </p>
      </header>
      <MemoryGame />
    </div>
  );
}
