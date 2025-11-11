import { CpsTest } from "@/components/cps-test";

export default function ButterflyClickTestPage() {
  return (
    <div className="flex flex-col items-center">
      <header className="w-full max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Butterfly Click Test
        </h1>
        <p className="text-muted-foreground mt-1">
          Test your butterfly clicking speed for 20 seconds.
        </p>
      </header>
      <CpsTest gameDuration={20} />
    </div>
  );
}
