import { JigsawPuzzle } from "@/components/jigsaw-puzzle";
import { Card, CardContent } from "@/components/ui/card";

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
       <Card className="w-full max-w-2xl mt-8">
        <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">About the Jigsaw Puzzle</h2>
            <p>The Jigsaw Puzzle is a timeless classic that challenges your spatial reasoning and attention to detail. This digital version brings the beloved pastime to your screen, allowing you to piece together a beautiful image tile by tile. The goal is to recreate the original picture by correctly arranging the scrambled pieces. It's a relaxing yet mentally stimulating activity that helps improve cognitive function, short-term memory, and problem-solving skills.</p>

            <h2 className="text-2xl font-semibold">How to Play</h2>
            <ol className="list-decimal list-inside space-y-2">
                <li>Click the "Start Game" button to shuffle the puzzle pieces.</li>
                <li>The image will be divided into a grid of scrambled tiles.</li>
                <li>To move a piece, simply click and drag it to the desired location.</li>
                <li>When you drop a tile onto another, they will swap positions.</li>
                <li>Continue swapping the tiles until you have successfully reconstructed the original image.</li>
                <li>Once all pieces are in their correct places, the puzzle will be solved. Challenge yourself to complete it in the fastest time!</li>
            </ol>
        </CardContent>
      </Card>
    </div>
  );
}
