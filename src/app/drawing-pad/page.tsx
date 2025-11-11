import { DrawingPad } from "@/components/drawing-pad";

export default function DrawingPadPage() {
  return (
    <div className="flex flex-col items-center">
      <header className="w-full max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Drawing Pad
        </h1>
        <p className="text-muted-foreground mt-1">
          Unleash your creativity! Use the controls to draw on the canvas.
        </p>
      </header>
      <DrawingPad />
    </div>
  );
}
