
"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Gauge, ShieldCheck, Star, Gamepad2, Trophy } from "lucide-react";
import Link from "next/link";
import { Leaderboard } from "@/components/leaderboard";

const AnimatedCpsGauge = () => {
  return (
    <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
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
          stroke="hsl(var(--primary))"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray="251.2"
          strokeDashoffset="251.2"
          className="animate-gauge-fill"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <div className="text-5xl sm:text-6xl font-extrabold text-primary animate-cps-text">
          <span className="cps-value">8.24</span>
        </div>
        <div className="text-sm font-medium text-muted-foreground tracking-widest">CPS</div>
      </div>
      <style jsx>{`
        @keyframes gauge-fill {
          from {
            stroke-dashoffset: 251.2;
          }
          to {
            stroke-dashoffset: 125.6; /* approx 10 CPS */
          }
        }
        .animate-gauge-fill {
          animation: gauge-fill 2s ease-out forwards;
          animation-delay: 0.5s;
        }

        @keyframes cps-text-anim {
          0% { content: '0.00'; opacity: 0; }
          25% { content: '4.12'; opacity: 1; }
          50% { content: '9.81'; }
          75% { content: '7.55'; }
          100% { content: '8.24'; }
        }
        
        .animate-cps-text .cps-value::after {
          content: '0.00';
          animation: cps-text-anim 2s ease-out forwards;
          animation-delay: 0.5s;
        }
        .animate-cps-text .cps-value {
          font-size: 0; /* hide original text */
        }
      `}</style>
    </div>
  );
};


const GlassmorphismCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string; }) => (
  <div className="relative p-6 bg-secondary/30 rounded-2xl border border-white/10 backdrop-blur-sm overflow-hidden shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-1">
    <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary/20 opacity-30 animate-pulse-slow rounded-full blur-3xl"></div>
    <div className="flex flex-col items-center text-center gap-4 relative">
      <div className="text-primary">{React.cloneElement(icon as React.ReactElement, { className: "w-10 h-10" })}</div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

const RankCard = ({ rank, cps, icon }: { rank: string; cps: string; icon: string; }) => (
  <div className="bg-secondary/30 border border-white/10 rounded-2xl p-4 text-center transition-transform hover:scale-105">
      <div className="text-5xl">{icon}</div>
      <div className="font-bold mt-2 text-lg text-foreground">{rank}</div>
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
            Take on the ultimate clicking challenge, see how you rank against players worldwide, and climb the leaderboard.
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
                <Trophy className="mr-2"/>
                View Leaderboard
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <AnimatedCpsGauge />
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          <GlassmorphismCard icon={<Gauge />} title="Measure CPS" description="Get precise measurements of your clicking speed in clicks-per-second." />
          <GlassmorphismCard icon={<Gamepad2 />} title="Improve Your Skills" description="Use our collection of aim and reaction trainers to enhance your gaming abilities." />
          <GlassmorphismCard icon={<ShieldCheck />} title="Ad-Free Experience" description="Enjoy a clean, uninterrupted, and completely ad-free gaming experience." />
      </section>
      
      {/* Leaderboard and Ranks Section */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          <div className="lg:col-span-2">
              <Leaderboard game="cps-test" title="Global CPS Test Leaderboard" />
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-center lg:text-left">What's Your Rank?</h2>
            <div className="grid grid-cols-2 gap-4">
              {clickRanks.map(rank => <RankCard key={rank.rank} {...rank} />)}
            </div>
            <Link href="/cps-test" className="mt-2">
              <Button className="w-full" variant="secondary">Test Your Rank Now</Button>
            </Link>
          </div>
      </div>

      {/* Testimonial Section */}
      <section className="w-full max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">What Gamers Say</h2>
          <Card className="bg-secondary/30 border border-white/10 rounded-2xl p-6">
              <CardContent className="p-0">
                  <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_,i) => <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />)}
                  </div>
                  <blockquote className="text-lg italic text-foreground/80">
                      "This is the cleanest and fastest CPS test I've ever used. The leaderboard is a great touch. No ads is a huge plus!"
                  </blockquote>
                  <p className="mt-4 font-semibold text-primary">- A Happy Gamer</p>
              </CardContent>
          </Card>
      </section>
    </div>
  );
}
