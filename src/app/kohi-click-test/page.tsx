import { CpsTest } from "@/components/cps-test";

export default function KohiClickTestPage() {
  return (
    <div className="flex flex-col items-center">
      <header className="w-full max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Kohi Click Test
        </h1>
        <p className="text-muted-foreground mt-1">
          The classic 10 second clicking challenge.
        </p>
      </header>
      <CpsTest gameDuration={10} />
    </div>
  );
}
