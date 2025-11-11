import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Sidebar, SidebarProvider, SidebarInset, SidebarTrigger, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel, SidebarContent } from '@/components/ui/sidebar';
import Link from 'next/link';
import { Zap, HomeIcon, Wind, Target, Keyboard, Type, Timer, Disc, Crosshair, BrainCircuit, MousePointerClick, Puzzle, Brain, Eye, MessageSquare, Paintbrush, FileText, Grip, GraduationCap, Blocks } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ClickTrack',
  description: 'Test your clicks per second with ClickTrack.',
};

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


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader>
              <div className="flex items-center gap-3 p-2">
                <Zap className="h-8 w-8 text-primary"/>
                <h1 className="text-2xl font-bold text-foreground">
                  ClickTrack
                </h1>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/">
                      <HomeIcon />
                      Home
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
              
              <SidebarGroup>
                <SidebarGroupLabel className="flex items-center gap-2"><MousePointerClick /> Clicking Skills</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/cps-test">
                        <Zap />
                        CPS Test
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                   <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/cps-test-1s">
                        <Zap />
                        CPS Test (1s)
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/jitter-click-test">
                        <Wind />
                        Jitter Click Test
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/kohi-click-test">
                        <Target />
                        Kohi Click Test
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                   <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/butterfly-click-test">
                        <ButterflyIcon />
                        Butterfly Click Test
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/aim-trainer">
                        <Crosshair />
                        Aim Trainer
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel className="flex items-center gap-2"><Keyboard /> Keyboard Skills</SidebarGroupLabel>
                <SidebarMenu>
                   <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/spacebar-clicker">
                        <Keyboard />
                        Spacebar Clicker
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/stimulation-clicker">
                        <Keyboard />
                        Stimulation Clicker
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/typing-test">
                        <Type />
                        Typing Test
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                   <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/typing-test-30s">
                        <Type />
                        Typing Test (30s)
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel className="flex items-center gap-2"><Puzzle /> Strategy & Puzzle</SidebarGroupLabel>
                <SidebarMenu>
                   <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/coreball-game">
                        <Disc />
                        Coreball Game
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/cupcake-2048">
                        <CupcakeIcon />
                        Cupcake 2048
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/jigsaw-puzzle">
                        <Grip />
                        Jigsaw Puzzle
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel className="flex items-center gap-2"><Brain /> Memory & Reflex</SidebarGroupLabel>
                <SidebarMenu>
                   <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/reaction-time-test">
                        <Timer />
                        Reaction Time Test
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/memory-game">
                        <BrainCircuit />
                        Memory Game
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/number-memory-test">
                        <BrainCircuit />
                        Number Memory
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/sequence-memory-test">
                        <BrainCircuit />
                        Sequence Memory
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                   <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/chimp-test">
                        <Brain />
                        Chimp Test
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/verbal-memory-test">
                        <MessageSquare />
                        Verbal Memory
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                   <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/visual-memory-test">
                        <Eye />
                        Visual Memory
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                   <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/word-memory-test">
                        <FileText />
                        Word Memory
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
              
               <SidebarGroup>
                <SidebarGroupLabel className="flex items-center gap-2"><GraduationCap /> Educational</SidebarGroupLabel>
                 <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/math-quiz">
                          <GraduationCap />
                          Math Quiz
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                 </SidebarMenu>
               </SidebarGroup>

               <SidebarGroup>
                <SidebarGroupLabel className="flex items-center gap-2"><Paintbrush /> Creative</SidebarGroupLabel>
                 <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/drawing-pad">
                          <Paintbrush />
                          Drawing Pad
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/block-builder">
                          <Blocks />
                          Block Builder
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                 </SidebarMenu>
               </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
            <header className="flex h-12 items-center justify-between border-b bg-background/50 px-4 md:hidden">
               <Link href="/" className="flex items-center gap-2">
                  <Zap className="h-6 w-6 text-primary" />
                  <span className="font-bold">ClickTrack</span>
               </Link>
               <SidebarTrigger />
            </header>
            <main className="flex-1 p-4 sm:p-6">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
