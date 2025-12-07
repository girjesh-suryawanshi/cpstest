
import { GameCard } from '@/components/game-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Zap, Wind, Target, Keyboard, Type, Timer, Disc, BrainCircuit, MousePointerClick, Puzzle, Brain, Eye, MessageSquare, Paintbrush, FileText, Grip, GraduationCap, Blocks, Languages, Share2, Rss } from "lucide-react";

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

const allGames = [
    { title: 'CPS Test', description: 'Test your clicking speed.', href: '/cps-test', icon: <Zap />, category: 'Clicking' },
    { title: 'CPS Test (1s)', description: 'A quick 1-second burst test.', href: '/cps-test-1s', icon: <Zap />, category: 'Clicking' },
    { title: 'Jitter Click Test', description: 'Master the jitter technique.', href: '/jitter-click-test', icon: <Wind />, category: 'Clicking' },
    { title: 'Kohi Click Test', description: 'The classic Minecraft challenge.', href: '/kohi-click-test', icon: <Target />, category: 'Clicking' },
    { title: 'Butterfly Click Test', description: 'Alternate fingers for max speed.', href: '/butterfly-click-test', icon: <ButterflyIcon />, category: 'Clicking' },
    { title: 'Aim Trainer', description: 'Improve your mouse accuracy.', href: '/aim-trainer', icon: <MousePointerClick />, category: 'Clicking', badge: 'Trending' },
    { title: 'Spacebar Clicker', description: 'How fast can you hit space?', href: '/spacebar-clicker', icon: <Keyboard />, category: 'Typing' },
    { title: 'Stimulation Clicker', description: 'A 30-second spacebar challenge.', href: '/stimulation-clicker', icon: <Keyboard />, category: 'Typing' },
    { title: 'Typing Test', description: 'Measure your Words Per Minute.', href: '/typing-test', icon: <Type />, category: 'Typing' },
    { title: 'Typing Test (30s)', description: 'A quick typing sprint.', href: '/typing-test-30s', icon: <Type />, category: 'Typing' },
    { title: 'Coreball Game', description: 'A game of precision and timing.', href: '/coreball-game', icon: <Disc />, category: 'Strategy' },
    { title: 'Cupcake 2048', description: 'Merge cupcakes to win.', href: '/cupcake-2048', icon: <CupcakeIcon />, category: 'Strategy' },
    { title: 'Jigsaw Puzzle', description: 'Piece together the image.', href: '/jigsaw-puzzle', icon: <Grip />, category: 'Strategy' },
    { title: 'Sliding Puzzle', description: 'Arrange tiles in order.', href: '/sliding-puzzle', icon: <Puzzle />, category: 'Strategy' },
    { title: 'Reaction Time Test', description: 'Test your reflexes.', href: '/reaction-time-test', icon: <Timer />, category: 'Memory' },
    { title: 'Memory Game', description: 'Find all the matching pairs.', href: '/memory-game', icon: <BrainCircuit />, category: 'Memory' },
    { title: 'Number Memory', description: 'Memorize the growing number.', href: '/number-memory-test', icon: <Brain />, category: 'Memory', badge: 'New' },
    { title: 'Sequence Memory', description: 'Repeat the flashing sequence.', href: '/sequence-memory-test', icon: <BrainCircuit />, category: 'Memory' },
    { title: 'Chimp Test', description: 'Are you smarter than a chimp?', href: '/chimp-test', icon: <Brain />, category: 'Memory', badge: 'Trending' },
    { title: 'Verbal Memory', description: 'Have you seen this word before?', href: '/verbal-memory-test', icon: <MessageSquare />, category: 'Memory' },
    { title: 'Visual Memory', description: 'Memorize the highlighted squares.', href: '/visual-memory-test', icon: <Eye />, category: 'Memory' },
    { title: 'Word Memory', description: 'Recall as many words as you can.', href: '/word-memory-test', icon: <FileText />, category: 'Memory' },
    { title: 'Math Quiz', description: 'Solve problems against the clock.', href: '/math-quiz', icon: <GraduationCap />, category: 'Fun' },
    { title: 'Word Scramble', description: 'Unscramble as many words as you can.', href: '/word-scramble', icon: <Languages />, category: 'Fun' },
    { title: 'Drawing Pad', description: 'Unleash your creativity.', href: '/drawing-pad', icon: <Paintbrush />, category: 'Creative' },
    { title: 'Block Builder', description: 'Create pixel art.', href: '/block-builder', icon: <Blocks />, category: 'Creative' },
    { title: 'Connect the Dots', description: 'Reveal the hidden picture.', href: '/connect-the-dots', icon: <Share2 />, category: 'Creative' },
];

export default function GamesPage() {
    // State for search and filter will be added later
  return (
    <div className="w-full max-w-6xl mx-auto">
      <header className="py-8 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight">Games</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Browse our collection of skill-based games.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search games..." className="pl-10" />
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline">Clicking</Button>
            <Button variant="outline">Typing</Button>
            <Button variant="outline">Memory</Button>
            <Button variant="ghost">Fun</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allGames.map((game, index) => (
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
  );
}
