import { DrawingPad } from "@/components/drawing-pad";
import { Card, CardContent } from "@/components/ui/card";

export default function DrawingPadPage() {
  return (
    <div className="w-full">
      <header className="w-full max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Drawing Pad
        </h1>
        <p className="text-muted-foreground mt-1">
          Unleash your creativity! Use the controls to draw on the canvas.
        </p>
      </header>
      <DrawingPad />
      <Card className="w-full max-w-4xl mt-8">
        <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">About the Drawing Pad</h2>
            <p>The Drawing Pad is a digital canvas where your imagination can run wild. It's a simple yet powerful tool for doodling, sketching, or creating intricate masterpieces. Whether you're an artist looking for a quick sketch space or just want to have fun expressing your creative side, our Drawing Pad provides a clean, responsive, and intuitive interface. With a palette of vibrant colors, adjustable brush sizes, and an easy-to-use eraser, you have everything you need to bring your ideas to life.</p>

            <h2 className="text-2xl font-semibold">How to Use</h2>
            <ol className="list-decimal list-inside space-y-2">
                <li><strong>Select a Color:</strong> Click the palette icon to open the color picker. Choose from a wide range of pre-selected colors to find the perfect shade for your creation.</li>
                <li><strong>Adjust Brush Size:</strong> Use the slider next to the brush icon to change the thickness of your stroke. Slide it to the left for a finer line and to the right for a bolder one.</li>
                <li><strong>Draw on the Canvas:</strong> Click and hold your mouse button while moving it across the white canvas area to draw. Release the mouse button to stop drawing.</li>
                <li><strong>Erase Mistakes:</strong> Click the eraser icon to switch to erasing mode. The eraser's size is also linked to the brush size slider, allowing you to clear large areas or perform detailed corrections. Click the palette or brush icon to switch back to drawing.</li>
                <li><strong>Clear the Canvas:</strong> If you want a fresh start, click the trash can icon. This will completely wipe the canvas clean, giving you a blank slate to begin again.</li>
            </ol>
        </CardContent>
      </Card>
    </div>
  );
}
