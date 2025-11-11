import { Cupcake2048 } from "@/components/cupcake-2048";

export default function Cupcake2048Page() {
  return (
    <div className="flex flex-col items-center">
      <header className="w-full max-w-lg mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Cupcake 2048
        </h1>
        <p className="text-muted-foreground mt-1">
          Use your arrow keys or swipe to combine cupcakes and create new ones!
        </p>
      </header>
      <Cupcake2048 />
    </div>
  );
}
