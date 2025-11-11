import { JigsawPuzzle } from "@/components/jigsaw-puzzle";

export default function JigsawPuzzlePage() {
  return (
    <div className="flex flex-col items-center">
      <header className="w-full max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Jigsaw Puzzle
        </h1>
        <p className="text-muted-foreground mt-1">
          Unscramble the tiles to reveal the image.
        </p>
      </header>
      <JigsawPuzzle />
    </div>
  );
}
