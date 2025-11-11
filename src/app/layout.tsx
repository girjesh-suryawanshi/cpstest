import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Sidebar, SidebarProvider, SidebarInset, SidebarTrigger, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import Link from 'next/link';
import { Zap, HomeIcon, Wind, Target, Keyboard, Type, Timer, Disc, Crosshair, BrainCircuit } from 'lucide-react';

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
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/">
                    <HomeIcon />
                    Home
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
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
                  <Link href="/spacebar-clicker">
                    <Keyboard />
                    Spacebar Clicker
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
                  <Link href="/reaction-time-test">
                    <Timer />
                    Reaction Time Test
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
                  <Link href="/coreball-game">
                    <Disc />
                    Coreball Game
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
                  <Link href="/cupcake-2048">
                    <CupcakeIcon />
                    Cupcake 2048
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
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
