
"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Gamepad2, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { GameCard } from "@/components/game-card";

const AnimatedCpsGauge = () => {
  return (
    <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
        <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: "hsl(var(--primary))", stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: "hsl(var(--accent))", stopOpacity: 1}} />
            </linearGradient>
        </defs>
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="hsl(var(--secondary))"
          strokeWidth="8"
          strokeDasharray="251.2"
          strokeDashoffset="0"
        />
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray="251.2"
          strokeDashoffset="100"
          className="animate-gauge-fill"
        />
        {/* Needle */}
        <line
            x1="60"
            y1="60"
            x2="60"
            y2="15"
            stroke="hsl(var(--foreground))"
            strokeWidth="3"
            strokeLinecap="round"
            style={{
                transformOrigin: 'center center',
                transform: 'rotate(45deg)',
                transition: 'transform 1.5s ease-out'
            }}
        />
         <circle cx="60" cy="60" r="4" fill="hsl(var(--foreground))" />
      </svg>
      <div className="absolute top-[110%] flex flex-col items-center justify-center text-center">
        <div className="text-4xl sm:text-5xl font-extrabold text-foreground">
          <span>0-20</span>
        </div>
      </div>
       <style jsx>{`
        @keyframes gauge-fill {
          from {
            stroke-dashoffset: 251.2;
          }
          to {
            stroke-dashoffset: 100;
          }
        }
        .animate-gauge-fill {
          animation: gauge-fill 2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string; }) => (
  <div className="relative p-6 bg-card rounded-2xl border border-border/20 shadow-lg transition-all duration-300 hover:border-primary/50 hover:-translate-y-1">
    <div className="flex items-start gap-4">
      <div className="text-primary mt-1">{React.cloneElement(icon as React.ReactElement, { className: "w-8 h-8" })}</div>
      <div className="flex flex-col">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  </div>
);


const RankCard = ({ rank, cps, icon }: { rank: string; cps: string; icon: string; }) => (
  <div className="bg-card border border-border/20 rounded-2xl p-4 text-center transition-transform hover:scale-105 hover:border-primary/50 flex flex-col items-center">
      <div className="text-5xl mb-2">{icon}</div>
      <div className="font-bold text-lg text-foreground">{rank}</div>
      <div className="text-sm text-muted-foreground">{cps}</div>
  </div>
);

export default function Home() {
  const clickRanks = [
    { rank: 'Turtle', cps: '0-4 CPS', icon: '🐢' },
    { rank: 'Rabbit', cps: '4-7 CPS', icon: '🐇' },
    { rank: 'Cheetah', cps: '7-10 CPS', icon: '🐆' },
    { rank: 'Falcon', cps: '10+ CPS', icon: '🦅' }
  ];

  return (
    <div className="w-full flex flex-col items-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 text-foreground overflow-hidden">
      
      {/* Hero Section */}
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
                <Zap className="mr-2"/>
                Start CPS Test
              </Button>
            </Link>
             <Link href="/leaderboard" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full text-base">
                View Leaderboard
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center -mt-8 md:mt-0">
          <AnimatedCpsGauge />
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          <FeatureCard icon={<Zap />} title="Measure CPS" description="Test your CPS, court, and plack." />
          <FeatureCard icon={<Gamepad2 />} title="Improve Your Skills" description="Cumove your Sllib." />
          <FeatureCard icon={<ShieldCheck />} title="Absolutely No Ads" description="Enjoy a clean, uninterrupted, ad-free experience." />
      </section>
      
      {/* Games Section */}
      <section className="w-full max-w-6xl mx-auto mb-24">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold">Games</h2>
            <Link href="/games">
                <Button variant="link" className="text-primary">
                    View All <ArrowRight className="ml-2" />
                </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <GameCard 
                title="CPS Test"
                description="Measure your clicks-per-second."
                href="/cps-test"
                icon={<Zap />}
              />
              <GameCard 
                title="Aim Trainer"
                description="Sharpen your mouse accuracy."
                href="/aim-trainer"
                icon={<Gamepad2 />}
                badge="Trending"
              />
               <GameCard 
                title="Typing Test"
                description="Check your typing speed (WPM)."
                href="/typing-test"
                icon={<Zap />}
              />
               <GameCard 
                title="Number Memory"
                description="Test your short-term memory."
                href="/number-memory-test"
                icon={<Zap />}
                badge="New"
              />
          </div>
      </section>

      {/* Ranks Section */}
      <section className="w-full max-w-6xl mx-auto text-center mb-24">
          <h2 className="text-4xl font-bold mb-8">Click Speed Ranks</h2>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {clickRanks.map(rank => <RankCard key={rank.rank} {...rank} />)}
            </div>
      </section>

      {/* How it works Section */}
       <section className="w-full max-w-6xl mx-auto">
         <Card className="bg-card border-border/20">
            <CardContent className="p-6">
                 <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold">How it works</h2>
                    <Button variant="ghost" size="icon">
                        <ArrowRight />
                    </Button>
                </div>
            </CardContent>
         </Card>
       </section>

    </div>
  );
}
