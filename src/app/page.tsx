import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Zap, Hand, Target, Wind, Keyboard, Type, Timer, Disc } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-8 md:p-12">
      <header className="w-full max-w-4xl mx-auto mb-8 text-center">
        <h1 className="text-4xl font-bold text-foreground">
          Welcome to ClickTrack
        </h1>
        <p className="text-lg text-muted-foreground mt-2">Your one-stop destination for click speed tests and other fun games.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        <GameCard
          href="/cps-test"
          icon={<Zap className="w-8 h-8 text-primary" />}
          title="CPS Test"
          description="Test your clicks per second."
        />
        <GameCard
          href="/jitter-click-test"
          icon={<Wind className="w-8 h-8 text-primary" />}
          title="Jitter Click Test"
          description="Test your jitter clicking speed."
        />
        <GameCard
          href="/kohi-click-test"
          icon={<Target className="w-8 h-8 text-primary" />}
          title="Kohi Click Test"
          description="A classic 10-second click test."
        />
        <GameCard
          href="/spacebar-clicker"
          icon={<Keyboard className="w-8 h-8 text-primary" />}
          title="Spacebar Clicker"
          description="Test your spacebar pressing speed."
        />
        <GameCard
          href="/typing-test"
          icon={<Type className="w-8 h-8 text-primary" />}
          title="Typing Speed Test"
          description="Check your typing words per minute."
        />
        <GameCard
          href="/reaction-time-test"
          icon={<Timer className="w-8 h-8 text-primary" />}
          title="Reaction Time Test"
          description="Test your reaction speed."
        />
        <GameCard
          href="/stimulation-clicker"
          icon={<Keyboard className="w-8 h-8 text-primary" />}
          title="Stimulation Clicker"
          description="A spacebar test for stimulation."
        />
        <GameCard
          href="/coreball-game"
          icon={<Disc className="w-8 h-8 text-primary" />}
          title="Coreball Game"
          description="A game of precision and timing."
        />
      </div>
    </div>
  );
}

function GameCard({ href, icon, title, description }: { href: string; icon: React.ReactNode; title: string; description: string; }) {
  return (
    <Link href={href} className="group">
      <Card className="h-full transition-all duration-200 group-hover:shadow-xl group-hover:-translate-y-1">
        <CardHeader className="flex flex-row items-center gap-4">
          {icon}
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
