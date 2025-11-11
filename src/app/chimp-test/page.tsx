import { ChimpTest } from "@/components/chimp-test";

export default function ChimpTestPage() {
  return (
    <div className="flex flex-col items-center">
      <header className="w-full max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Chimp Test
        </h1>
        <p className="text-muted-foreground mt-1">
          Are you smarter than a chimpanzee? Click the squares in order.
        </p>
      </header>
      <ChimpTest />
    </div>
  );
}
