import { SlidingPuzzle } from "@/components/sliding-puzzle";

export default function SlidingPuzzlePage() {
  return (
    <div className="flex flex-col items-center">
      <header className="w-full max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Sliding Puzzle
        </h1>
        <p className="text-muted-foreground mt-1">
          Slide the tiles to arrange them in numerical order.
        </p>
      </header>
      <SlidingPuzzle />
    </div>
  );
}
