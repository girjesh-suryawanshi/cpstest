import { CpsTest } from "@/components/cps-test";
import { Zap } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12">
      <div className="flex flex-col items-center w-full">
        <header className="w-full max-w-2xl mx-auto mb-8">
          <div className="flex items-center gap-3">
            <Zap className="h-8 w-8 text-primary"/>
            <h1 className="text-3xl font-bold text-foreground font-headline">
              ClickTrack
            </h1>
          </div>
        </header>
        <CpsTest />
        <footer className="w-full max-w-2xl mx-auto mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            A click speed test application.
          </p>
        </footer>
      </div>
    </main>
  );
}
