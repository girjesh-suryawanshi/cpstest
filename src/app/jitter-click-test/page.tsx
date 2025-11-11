import { CpsTest } from "@/components/cps-test";

export default function JitterClickTestPage() {
  return (
    <div className="flex flex-col items-center">
      <header className="w-full max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Jitter Click Test
        </h1>
        <p className="text-muted-foreground mt-1">
          Test your jitter clicking speed for 10 seconds.
        </p>
      </header>
      <CpsTest gameDuration={10} />
    </div>
  );
}
