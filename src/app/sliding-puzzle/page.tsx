import { SlidingPuzzle } from "@/components/sliding-puzzle";
import { Card, CardContent } from "@/components/ui/card";

export default function SlidingPuzzlePage() {
  return (
    <div className="w-full">
      <header className="w-full max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Sliding Puzzle
        </h1>
        <p className="text-muted-foreground mt-1">
          Slide the tiles to arrange them in numerical order.
        </p>
      </header>
      <SlidingPuzzle />
      <Card className="w-full max-w-2xl mt-8 mx-auto">
        <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">About the Sliding Puzzle</h2>
            <p>The Sliding Puzzle is a classic brain-teaser that challenges your logic, strategy, and foresight. This digital version brings the traditional tile game to your screen, asking you to arrange a set of numbered tiles in sequential order by sliding them into the single empty space. It’s an excellent exercise for improving problem-solving skills, spatial reasoning, and patience. Each move must be carefully considered to avoid getting stuck and to solve the puzzle efficiently.</p>

            <h2 className="text-2xl font-semibold">How to Play</h2>
            <ol className="list-decimal list-inside space-y-2">
                <li>Click the "Start Game" button to shuffle the tiles on the board. One space will be left empty.</li>
                <li>The goal is to arrange the tiles from 1 to 15, leaving the last space empty.</li>
                <li>To move a tile, click on one that is adjacent (horizontally or vertically) to the empty space. It will automatically slide into the empty spot.</li>
                <li>Continue sliding the tiles one by one, thinking ahead to plan your moves.</li>
                <li>The game is won when all the numbered tiles are in their correct sequential order from top-left to bottom-right.</li>
                <li>Challenge yourself to solve the puzzle in the fewest moves possible!</li>
            </ol>
        </CardContent>
      </Card>
    </div>
  );
}
