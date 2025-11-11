import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Zap, Wind, Target, Keyboard, Type, Timer, Disc, Crosshair, BrainCircuit, MousePointerClick, Puzzle, Brain, Eye, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const CupcakeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18.5 9.5a2.5 2.5 0 0 0-4-3.26A2.5 2.5 0 0 0 9.5 9.5" />
    <path d="M12 15a6 6 0 0 0-6 6h12a6 6 0 0 0-6-6Z" />
    <path d="M12 9.5V15" />
    <path d="M12 21v-3" />
    <path d="m9 18 1.5-1.5" />
    <path d="m15 18-1.5-1.5" />
  </svg>
);

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-8 md:p-12">
      <header className="w-full max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl">
          Welcome to ClickTrack
        </h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">Your one-stop destination for click speed tests, reaction challenges, and other fun skill-based games.</p>
      </header>

      <div className="w-full max-w-5xl space-y-12">
        <GameCategory title="Clicking Skills" icon={<MousePointerClick className="w-8 h-8" />}>
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
            href="/aim-trainer"
            icon={<Crosshair className="w-8 h-8 text-primary" />}
            title="Aim Trainer"
            description="Test your aiming skill and precision."
          />
        </GameCategory>

        <GameCategory title="Keyboard Skills" icon={<Keyboard className="w-8 h-8" />}>
          <GameCard
            href="/spacebar-clicker"
            icon={<Keyboard className="w-8 h-8 text-primary" />}
            title="Spacebar Clicker"
            description="Test your spacebar pressing speed."
          />
           <GameCard
            href="/stimulation-clicker"
            icon={<Keyboard className="w-8 h-8 text-primary" />}
            title="Stimulation Clicker"
            description="A spacebar test for stimulation."
          />
          <GameCard
            href="/typing-test"
            icon={<Type className="w-8 h-8 text-primary" />}
            title="Typing Speed Test"
            description="Check your typing words per minute."
          />
        </GameCategory>

        <GameCategory title="Strategy & Puzzle" icon={<Puzzle className="w-8 h-8" />}>
          <GameCard
            href="/coreball-game"
            icon={<Disc className="w-8 h-8 text-primary" />}
            title="Coreball Game"
            description="A game of precision and timing."
          />
          <GameCard
            href="/cupcake-2048"
            icon={<CupcakeIcon className="w-8 h-8 text-primary" />}
            title="Cupcake 2048"
            description="A delicious puzzle game."
          />
        </GameCategory>

        <GameCategory title="Memory & Reflex" icon={<Brain className="w-8 h-8" />}>
          <GameCard
            href="/reaction-time-test"
            icon={<Timer className="w-8 h-8 text-primary" />}
            title="Reaction Time Test"
            description="Test your reaction speed."
          />
          <GameCard
            href="/memory-game"
            icon={<BrainCircuit className="w-8 h-8 text-primary" />}
            title="Memory Game"
            description="Test your memory and concentration."
          />
          <GameCard
            href="/number-memory-test"
            icon={<BrainCircuit className="w-8 h-8 text-primary" />}
            title="Number Memory"
            description="Remember the longest number you can."
          />
           <GameCard
            href="/sequence-memory-test"
            icon={<BrainCircuit className="w-8 h-8 text-primary" />}
            title="Sequence Memory"
            description="Memorize and repeat the sequence."
          />
          <GameCard
            href="/verbal-memory-test"
            icon={<MessageSquare className="w-8 h-8 text-primary" />}
            title="Verbal Memory"
            description="See how many words you can remember."
          />
          <GameCard
            href="/visual-memory-test"
            icon={<Eye className="w-8 h-8 text-primary" />}
            title="Visual Memory"
            description="Memorize the pattern of tiles."
          />
        </GameCategory>
      </div>
    </div>
  );
}

function GameCategory({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode; }) {
  return (
    <section>
      <div className="flex items-center gap-4 mb-6">
        <div className="text-primary">{icon}</div>
        <h2 className="text-3xl font-bold text-foreground">{title}</h2>
        <Separator className="flex-1" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {children}
      </div>
    </section>
  )
}

function GameCard({ href, icon, title, description }: { href: string; icon: React.ReactNode; title: string; description: string; }) {
  return (
    <Link href={href} className="group">
      <Card className="h-full transition-all duration-200 group-hover:shadow-xl group-hover:-translate-y-1">
        <CardHeader className="flex flex-row items-center gap-4 p-4">
          <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
            {icon}
          </div>
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
