import { SpacebarTest } from "@/components/spacebar-test";

export default function StimulationClickerPage() {
  return (
    <div className="flex flex-col items-center">
      <header className="w-full max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Stimulation Clicker
        </h1>
        <p className="text-muted-foreground mt-1">
          A 30 second spacebar challenge to keep you stimulated.
        </p>
      </header>
      <SpacebarTest gameDuration={30} />
    </div>
  );
}
