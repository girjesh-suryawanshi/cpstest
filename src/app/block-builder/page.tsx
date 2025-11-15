import { BlockBuilder } from "@/components/block-builder";
import { Card, CardContent } from "@/components/ui/card";

export default function BlockBuilderPage() {
  return (
    <div className="flex flex-col items-center">
      <header className="w-full max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Block Builder
        </h1>
        <p className="text-muted-foreground mt-1">
          Let your imagination run wild! Create pixel art, designs, or anything you can think of.
        </p>
      </header>
      <BlockBuilder />
      <Card className="w-full max-w-4xl mt-8">
        <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">About Block Builder</h2>
            <p>Block Builder is a digital canvas for pixel art enthusiasts and creative minds. It provides a simple grid-based environment where you can bring your ideas to life, one block at a time. Whether you're designing retro game sprites, creating intricate patterns, or just doodling for fun, this tool offers a straightforward and satisfying creative outlet. With an array of colors and easy-to-use tools, you can focus on what matters most: your creation.</p>

            <h2 className="text-2xl font-semibold">How to Use</h2>
            <ol className="list-decimal list-inside space-y-2">
                <li><strong>Select a Color:</strong> Click the palette icon to open the color picker. Choose your desired color from the swatch. The currently selected color will be displayed.</li>
                <li><strong>Place a Block:</strong> Click on any empty cell in the grid to place a block of your selected color. To draw multiple blocks, click and drag your mouse across the grid.</li>
                <li><strong>Erase Blocks:</strong> Click the eraser icon to switch to erase mode. Click on any block to remove it. You can also click and drag to erase multiple blocks at once.</li>
                <li><strong>Fill the Canvas:</strong> Click the paint bucket icon to fill the entire grid with the currently selected color. This is useful for setting a background color quickly.</li>
                <li><strong>Clear the Canvas:</strong> If you want to start over, click the trash can icon. This will remove all blocks and give you a fresh, empty grid.</li>
            </ol>
        </CardContent>
      </Card>
    </div>
  );
}
