import { CpsTest } from "@/components/cps-test";

export default function CpsTest1sPage() {
  return (
    <div className="flex flex-col items-center">
        <header className="w-full max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Clicks Per Second Test (1 Second)
          </h1>
          <p className="text-muted-foreground mt-1">
            Click as fast as you can for 1 second.
          </p>
        </header>
        <CpsTest gameDuration={1} />
      </div>
  );
}
