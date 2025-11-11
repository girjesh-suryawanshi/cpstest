import { ReactionTimeTest } from "@/components/reaction-time-test";

export default function ReactionTimeTestPage() {
  return (
    <div className="flex flex-col items-center">
      <header className="w-full max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Reaction Time Test
        </h1>
        <p className="text-muted-foreground mt-1">
          When the box turns green, click as fast as you can.
        </p>
      </header>
      <ReactionTimeTest />
    </div>
  );
}
