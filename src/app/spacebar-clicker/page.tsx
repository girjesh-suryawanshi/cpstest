import { SpacebarTest } from "@/components/spacebar-test";

export default function SpacebarClickerPage() {
  return (
    <div className="flex flex-col items-center">
      <header className="w-full max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Spacebar Clicker
        </h1>
        <p className="text-muted-foreground mt-1">
          Hit the spacebar as many times as you can in 15 seconds.
        </p>
      </header>
      <SpacebarTest gameDuration={15} />
    </div>
  );
}
