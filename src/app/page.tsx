
"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Zap, ShieldCheck, Target, Search, ArrowRight, Gamepad2, Type, BrainCircuit, Grip, Puzzle, Brain, Eye, MessageSquare, Paintbrush, FileText, Blocks, Share2, GraduationCap, Languages, Wind, Keyboard, Disc, Timer, MousePointerClick } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";


const JitterClickIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M9.5 13.5C5.5 13.5 5.5 19.5 9.5 19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13.5 10.5C11.5 10.5 11.5 13.5 13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12.5 4.5C9.5 4.5 9.5 8.5 12.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15.5 5.5C13.5 5.5 13.5 8.5 15.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18.5 4.5C16.5 4.5 16.5 7.5 18.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 21L10 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12.25 15.5L14.75 13.5L12.25 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17.5 9.5L20.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4.5 12.5C3.5 12.5 2 13 2 15C2 17 3.5 17.5 4.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 14C20.5 14 22 14.5 22 16.5C22 18.5 20.5 19 19 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 20V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 21H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
const MonkeyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M15 17C15 18.6569 13.6569 20 12 20C10.3431 20 9 18.6569 9 17C9 15.3431 10.3431 14 12 14C13.6569 14 15 15.3431 15 17Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 4C9.23858 4 7 6.23858 7 9V10C7 11.6569 8.34315 13 10 13H14C15.6569 13 17 11.6569 17 10V9C17 6.23858 14.7614 4 12 4Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 9H7C6.44772 9 6 9.44772 6 10V11C6 11.5523 6.44772 12 7 12H7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 9H17C17.5523 9 18 9.44772 18 10V11C18 11.5523 17.5523 12 17 12H16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <ellipse cx="10" cy="8.5" rx="1" ry="1.5" fill="currentColor"/>
        <ellipse cx="14" cy="8.5" rx="1" ry="1.5" fill="currentColor"/>
    </svg>
);

const TenSecondsIcon = () => (
    <div className="flex items-center justify-center font-bold text-lg">
        <span className="text-primary">10</span>
        <span className="text-foreground">S</span>
    </div>
);


const AnimatedCpsGauge = () => {
  return (
    <div className="relative w-64 h-32 sm:w-80 sm:h-40 flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 120 65" fill="none">
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
        </defs>
        <path d="M10 60 A50 50 0 0 1 110 60" stroke="hsl(var(--secondary))" strokeWidth="8" strokeLinecap="round" />
        <path
          d="M10 60 A50 50 0 0 1 110 60"
          stroke="url(#gaugeGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray="157"
          strokeDashoffset="70"
          className="animate-gauge-fill"
        />
        <line x1="60" y1="60" x2="30" y2="25" stroke="hsl(var(--foreground))" strokeWidth="2.5" strokeLinecap="round" style={{ transformOrigin: '60px 60px', animation: 'gauge-needle 2s ease-out forwards' }} />
        <circle cx="60" cy="60" r="4" fill="hsl(var(--foreground))" />
      </svg>
      <div className="absolute top-[50%] left-1/2 -translate-x-1/2 flex flex-col items-center justify-center text-center">
        <div className="text-3xl sm:text-4xl font-extrabold text-foreground">
          <span>0-20</span>
        </div>
      </div>
      <style jsx>{`
        @keyframes gauge-fill {
          from { stroke-dashoffset: 157; }
          to { stroke-dashoffset: 70; }
        }
        @keyframes gauge-needle {
          from { transform: rotate(-90deg); }
          to { transform: rotate(-45deg); }
        }
        .animate-gauge-fill { animation: gauge-fill 2s ease-out forwards; }
        .animate-gauge-needle { animation: gauge-needle 2s ease-out forwards; }
      `}</style>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string; }) => (
  <div className="relative p-6 bg-card rounded-xl border border-border/20 shadow-lg transition-all duration-300 hover:border-primary/50 hover:-translate-y-1">
    <div className="flex items-start gap-4">
      <div className="text-primary mt-1">{React.cloneElement(icon as React.ReactElement, { className: "w-8 h-8" })}</div>
      <div className="flex flex-col">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  </div>
);

const GameCard = ({ title, description, href, icon, badge }: { title: string; description: string; href: string; icon: React.ReactNode; badge?: string; }) => (
  <Link href={href} className="group block">
    <Card className="h-full bg-card/50 backdrop-blur-sm border border-border/10 rounded-2xl shadow-lg transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:bg-card">
      <CardContent className="p-6 flex items-start gap-4">
        <div className="mt-1 text-primary">{React.cloneElement(icon as React.ReactElement, { className: "w-8 h-8" })}</div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <CardTitle className="text-base font-bold group-hover:text-primary transition-colors mb-1">{title}</CardTitle>
            {badge && <Badge variant={badge === 'NEW' ? 'default' : 'secondary'} className={cn(badge === 'NEW' ? 'bg-blue-500' : 'bg-orange-500', "text-xs")}>{badge}</Badge>}
          </div>
          <CardDescription className="text-xs">{description}</CardDescription>
        </div>
      </CardContent>
    </Card>
  </Link>
);


const RankCard = ({ rank, cps, icon, description }: { rank: string; cps: string; icon: string; description: string; }) => (
  <div className="bg-card border border-border/20 rounded-2xl p-4 text-center transition-transform hover:scale-105 hover:border-primary/50 flex flex-col items-center">
      <div className="text-5xl mb-2">{icon}</div>
      <div className="font-bold text-lg text-foreground">{rank}</div>
      <div className="text-sm text-primary font-semibold">{cps}</div>
      <div className="text-xs text-muted-foreground mt-1">{description}</div>
  </div>
);

const GameMenuItem = ({ href, children, badge }: { href: string; children: React.ReactNode; badge?: string }) => (
  <Link href={href} className="flex justify-between items-center p-2 rounded-md hover:bg-primary/10 group">
    <span className="text-sm text-muted-foreground group-hover:text-foreground">{children}</span>
    {badge && <Badge variant={badge === 'NEW' ? 'default' : 'secondary'} className={cn(badge === 'NEW' ? "bg-blue-500" : "bg-orange-500", "text-xs")}>{badge}</Badge>}
  </Link>
);

const GameMenuCategory = ({ title, children }: { title: string; children: React.ReactNode; }) => (
    <div>
        <h4 className="font-bold text-foreground px-2 py-3">{title}</h4>
        <div className="flex flex-col gap-1">{children}</div>
    </div>
);


export default function Home() {
  const clickRanks = [
    { rank: 'Turtle', cps: '0-4 CPS', icon: '🐢', description: 'Casual clicker' },
    { rank: 'Rabbit', cps: '4-7 CPS', icon: '🐇', description: 'Above average' },
    { rank: 'Cheetah', cps: '7-10 CPS', icon: '🐆', description: 'Pro level' },
    { rank: 'Falcon', cps: '10+ CPS', icon: '🦅', description: 'Elite gamer' }
  ];

  const featuredGames = [
      { title: 'CPS Test', description: 'Measure CPS sol-in a nimdrers', href: '/cps-test', icon: <MousePointerClick />, badge: '' },
      { title: 'Jitter Click Test', description: 'Export your export ori tagger tips', href: '/jitter-click-test', icon: <JitterClickIcon />, badge: '' },
      { title: 'Typing Test', description: 'Typing Test', href: '/typing-test', icon: <Type />, badge: '' },
      { title: '10 Seconds Mode', description: '1 ma ore', href: '/kohi-click-test', icon: <TenSecondsIcon />, badge: '' },
      { title: 'Number Memory', description: 'Randombing', href: '/number-memory-test', icon: <Brain />, badge: '' },
      { title: 'Monkey Type', description: 'Math-clue', href: '/chimp-test', icon: <MonkeyIcon />, badge: 'TRENDING' },
      { title: 'Block Builder', description: 'TRENDING', href: '/block-builder', icon: <Blocks />, badge: 'TRENDING' },
  ];

  return (
    <div className="w-full flex flex-col items-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 text-foreground overflow-hidden">
      
      <section className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-8 mb-24">
        <div className="flex flex-col gap-6 text-center md:text-left items-center md:items-start">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter">
            Test Your Click Speed in <span className="text-primary">5 Seconds</span>
          </h1>
          <p className="max-w-md text-base sm:text-lg text-muted-foreground">
            Challenge your friends, climb the global leaderboard, and sharpen your gaming reflexes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
            <Link href="/cps-test" className="w-full sm:w-auto">
              <Button size="lg" className="w-full text-base font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
                Start CPS Test
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full text-base">
              View Leaderboard
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center -mt-8 md:mt-0">
          <AnimatedCpsGauge />
        </div>
      </section>

      <section className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          <FeatureCard icon={<Zap />} title="Measure CPS" description="Test your CPS, court, and plack." />
          <FeatureCard icon={<Gamepad2 />} title="Improve Your Skills" description="Cumove your Sllib." />
          <FeatureCard icon={<ShieldCheck />} title="Absolutely No Ads" description="Enjoy a clean, uninterrupted, ad-free experience." />
      </section>
      
      <section className="w-full max-w-6xl mx-auto mb-24">
          <h2 className="text-4xl font-bold mb-8">Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
            {/* Left Column: Game Navigation */}
            <aside>
                <div className="flex flex-col gap-4">
                    <GameMenuCategory title="Clicking Skills">
                      <GameMenuItem href="/cps-test">CPS Test</GameMenuItem>
                      <GameMenuItem href="/jitter-click-test">Jitter Click Test</GameMenuItem>
                    </GameMenuCategory>
                    <GameMenuCategory title="Keyboard Skills">
                      <GameMenuItem href="/typing-test">Typing Test</GameMenuItem>
                      <GameMenuItem href="/spacebar-clicker">Spacebar Clicker</GameMenuItem>
                    </GameMenuCategory>
                     <GameMenuCategory title="Strategy & Puzzle">
                       <GameMenuItem href="/aim-trainer" badge="NEW">Aim Trainer</GameMenuItem>
                       <GameMenuItem href="/number-memory-test" badge="NEW">Number Memory</GameMenuItem>
                       <GameMenuItem href="/chimp-test" badge="TRENDING">Monkey Type</GameMenuItem>
                       <GameMenuItem href="/math-quiz" badge="NEW">Math Quiz</GameMenuItem>
                       <GameMenuItem href="/block-builder" badge="TRENDING">Block Builder</GameMenuItem>
                    </GameMenuCategory>
                     <GameMenuCategory title="Educational">
                        <GameMenuItem href="/math-quiz">Math Quiz</GameMenuItem>
                    </GameMenuCategory>
                    <GameMenuCategory title="Creative">
                        <GameMenuItem href="/drawing-pad">Drawing Pad</GameMenuItem>
                    </GameMenuCategory>
                </div>
            </aside>
            {/* Right Column: Game Grid */}
            <div>
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search games..." className="pl-10 bg-card/50" />
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">Clicking</Button>
                    <Button variant="outline">Typing</Button>
                    <Button variant="outline">Memory</Button>
                    <Button variant="ghost">Fun</Button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                {featuredGames.map((game, index) => (
                    <GameCard 
                        key={index}
                        title={game.title}
                        description={game.description}
                        href={game.href}
                        icon={game.icon}
                        badge={game.badge}
                    />
                ))}
              </div>
            </div>
          </div>
      </section>

      <section className="w-full max-w-6xl mx-auto text-center mb-24">
          <h2 className="text-4xl font-bold mb-8">Click Speed Ranks</h2>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {clickRanks.map(rank => <RankCard key={rank.rank} {...rank} />)}
            </div>
      </section>

       <section className="w-full max-w-6xl mx-auto">
         <Card className="bg-card/50 border-border/20 backdrop-blur-sm">
            <CardContent className="p-6">
                 <Link href="#" className="flex justify-between items-center group">
                    <h2 className="text-2xl font-bold group-hover:text-primary">How it works</h2>
                    <ArrowRight className="text-muted-foreground group-hover:text-primary" />
                </Link>
            </CardContent>
         </Card>
       </section>

    </div>
  );
}
