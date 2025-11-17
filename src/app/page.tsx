
import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wind, Target, Keyboard, Type, Timer, Disc, Crosshair, BrainCircuit, MousePointerClick, Puzzle, Brain, Eye, MessageSquare, Paintbrush, FileText, Grip, GraduationCap, Blocks, Languages, Share2, ShieldCheck, Gauge, Star, Rss } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { allPosts } from "@/lib/blog";
import { format } from "date-fns";
import { Leaderboard } from "@/components/leaderboard";

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

const ButterflyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14 10h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4"/><path d="M10 10H6a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4"/><path d="m5 11 1-1-1-1"/><path d="m19 11-1-1 1-1"/><path d="m12 10 2-3h-4l2 3z"/><path d="m12 14-2 3h4l-2-3z"/></svg>
)

const games = [
    { href: "/cps-test", icon: Zap, title: "CPS Test", description: "Test your clicks per second." },
    { href: "/cps-test-1s", icon: Zap, title: "CPS Test (1s)", description: "A quick burst click challenge." },
    { href: "/jitter-click-test", icon: Wind, title: "Jitter Click Test", description: "Test your jitter clicking speed." },
    { href: "/kohi-click-test", icon: Target, title: "Kohi Click Test", description: "A classic 10-second click test." },
    { href: "/butterfly-click-test", icon: ButterflyIcon, title: "Butterfly Click Test", description: "A 20-second clicking challenge." },
    { href: "/aim-trainer", icon: Crosshair, title: "Aim Trainer", description: "Test your aiming skill and precision."},
    { href: "/spacebar-clicker", icon: Keyboard, title: "Spacebar Clicker", description: "Test your spacebar pressing speed." },
    { href: "/stimulation-clicker", icon: Keyboard, title: "Stimulation Clicker", description: "A spacebar test for stimulation." },
    { href: "/typing-test", icon: Type, title: "Typing Speed Test", description: "Check your typing words per minute." },
    { href: "/typing-test-30s", icon: Type, title: "Typing Speed Test (30s)", description: "A quick typing sprint." },
    { href: "/coreball-game", icon: Disc, title: "Coreball Game", description: "A game of precision and timing." },
    { href: "/cupcake-2048", icon: CupcakeIcon, title: "Cupcake 2048", description: "A delicious puzzle game." },
    { href: "/jigsaw-puzzle", icon: Grip, title: "Jigsaw Puzzle", description: "Unscramble the image." },
    { href: "/sliding-puzzle", icon: Puzzle, title: "Sliding Puzzle", description: "Slide tiles to solve the puzzle." },
    { href: "/reaction-time-test", icon: Timer, title: "Reaction Time Test", description: "Test your reaction speed." },
    { href: "/memory-game", icon: BrainCircuit, title: "Memory Game", description: "Test your memory and concentration." },
    { href: "/number-memory-test", icon: BrainCircuit, title: "Number Memory", description: "Remember the longest number you can." },
    { href: "/sequence-memory-test", icon: BrainCircuit, title: "Sequence Memory", description: "Memorize and repeat the sequence." },
    { href: "/chimp-test", icon: Brain, title: "Chimp Test", description: "Are you smarter than a chimpanzee?" },
    { href: "/verbal-memory-test", icon: MessageSquare, title: "Verbal Memory", description: "See how many words you can remember." },
    { href: "/visual-memory-test", icon: Eye, title: "Visual Memory", description: "Memorize the pattern of tiles." },
    { href: "/word-memory-test", icon: FileText, title: "Word Memory Test", description: "Memorize a list of words." },
    { href: "/math-quiz", icon: GraduationCap, title: "Math Quiz", description: "Test your arithmetic skills." },
    { href: "/word-scramble", icon: Languages, title: "Word Scramble", description: "Unscramble letters to find the word." },
    { href: "/drawing-pad", icon: Paintbrush, title: "Drawing Pad", description: "Unleash your creativity on a digital canvas." },
    { href: "/block-builder", icon: Blocks, title: "Block Builder", description: "Create anything with colorful blocks." },
    { href: "/connect-the-dots", icon: Share2, title: "Connect the Dots", description: "Reveal the hidden picture." },
]

const clickRanks = [
    { rank: 'Turtle', cps: '0-4 CPS', icon: '🐢' },
    { rank: 'Rabbit', cps: '4-7 CPS', icon: '🐇' },
    { rank: 'Cheetah', cps: '7-10 CPS', icon: '🐆' },
    { rank: 'Falcon', cps: '10+ CPS', icon: '🦅' }
]

export default function Home() {
  const recentPosts = allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);
  
  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 bg-background text-foreground">
      <div className="absolute top-0 left-0 w-full h-full bg-grid-red-500/[0.2] opacity-20 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      
      <header className="relative w-full max-w-4xl mx-auto mb-16 text-center z-10">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">CpsSpeedTest</span>
        </h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
          Measure your clicks per second (CPS) with our powerful and free click speed test.
        </p>
        <Link href="/cps-test">
          <Button size="lg" className="mt-8 text-lg font-bold bg-primary text-primary-foreground shadow-[0_0_20px_theme(colors.primary)] hover:shadow-[0_0_30px_theme(colors.primary)] transition-shadow duration-300">
            START TEST
          </Button>
        </Link>
      </header>

      <div className="relative w-full max-w-6xl space-y-12 z-10">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <FeatureCard icon={<Gauge />} title="Measure CPS" description="Get precise measurements of your clicking speed." />
            <FeatureCard icon={<MousePointerClick />} title="Improve Your Skills" description="Use our tools to enhance your gaming abilities." />
            <FeatureCard icon={<ShieldCheck />} title="Absolutely No Ads" description="Enjoy an uninterrupted, ad-free experience." />
        </section>
        
        <Separator className="bg-border/20"/>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <Leaderboard game="cps-test" title="Global CPS Test Leaderboard" />
            </div>
            <div>
                <h2 className="text-3xl font-bold mb-6">What's Your Rank?</h2>
                <Card className="h-full flex flex-col bg-secondary/30 border-primary/20 p-6 shadow-[0_0_20px_hsl(var(--primary)/0.1)]">
                    <CardHeader className="p-0 mb-4">
                        <CardTitle>Click Speed Ranks</CardTitle>
                        <CardDescription>Find out where you stand against the competition.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 grid grid-cols-2 gap-4">
                       {clickRanks.map(rank => (
                           <div key={rank.rank} className="bg-muted/50 p-3 rounded-lg text-center">
                               <div className="text-4xl">{rank.icon}</div>
                               <div className="font-bold mt-2">{rank.rank}</div>
                               <div className="text-xs text-muted-foreground">{rank.cps}</div>
                           </div>
                       ))}
                    </CardContent>
                    <Link href="/cps-test" className="mt-6">
                        <Button className="w-full">Test Your Rank</Button>
                    </Link>
                </Card>
            </div>
        </div>

        <Separator className="bg-border/20"/>
        
        <div>
          <h2 className="text-3xl font-bold text-center">Recent Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
            {recentPosts.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <Card className="h-full overflow-hidden transition-shadow duration-300 group-hover:shadow-xl bg-secondary/30 border-border/50 hover:border-primary/50">
                   <CardHeader>
                    <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription>
                      {format(new Date(post.date), 'MMMM d, yyyy')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{post.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <Separator className="bg-border/20"/>

        <div className="text-center">
             <h2 className="text-3xl font-bold">All Games</h2>
             <p className="text-muted-foreground mt-2">Explore our full suite of skill-based tests and games.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map(game => (
                <GameCard key={game.href} href={game.href} icon={<game.icon className="w-8 h-8 text-primary" />} title={game.title} description={game.description} />
            ))}
        </div>
        
        <Separator className="bg-border/20"/>

        <section className="text-center">
            <h2 className="text-3xl font-bold">What Gamers Say</h2>
            <Card className="mt-6 max-w-2xl mx-auto bg-secondary/30 border-primary/20 shadow-[0_0_20px_hsl(var(--primary)/0.2)]">
                <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                        {[...Array(5)].map((_,i) => <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />)}
                    </div>
                    <blockquote className="text-lg italic text-foreground/80">
                        "A fantastic tool to test clicking speed. Perfect for gamers and anyone wanting to improve their CPS."
                    </blockquote>
                    <p className="mt-4 font-semibold text-primary">- A Happy Gamer</p>
                </CardContent>
            </Card>
        </section>

      </div>
    </div>
  );
}


function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string; }) {
  return (
    <Card className="bg-secondary/30 border-primary/20 p-6 shadow-[0_0_20px_hsl(var(--primary)/0.1)] hover:shadow-[0_0_30px_hsl(var(--primary)/0.2)] hover:-translate-y-1 transition-all duration-300">
        <div className="flex flex-col items-center gap-4">
            <div className="text-primary">{React.cloneElement(icon as React.ReactElement, { className: "w-10 h-10" })}</div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </div>
    </Card>
  )
}

function GameCard({ href, icon, title, description }: { href: string; icon: React.ReactNode; title: string; description: string; }) {
  return (
    <Link href={href} className="group">
      <Card className="h-full bg-secondary/30 border-border/50 hover:border-primary/50 hover:bg-secondary/50 transition-all duration-200 group-hover:-translate-y-1">
        <CardHeader className="flex flex-row items-center gap-4 p-4">
          <div className="p-3 rounded-lg bg-primary/10 text-primary">
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
    
