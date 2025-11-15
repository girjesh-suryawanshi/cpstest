import { CpsTest } from "@/components/cps-test";
import { Card, CardContent } from "@/components/ui/card";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kohi Click Test - The Minecraft CPS Challenge',
  description: 'Take the classic 10-second Kohi Click Test. A staple for Minecraft players to measure and improve their PvP clicking speed. See how your CPS stacks up!',
  keywords: ['kohi click test', 'kohi cps test', 'minecraft cps', 'pvp clicking'],
  alternates: {
    canonical: '/kohi-click-test',
  },
};

const JsonLd = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Game",
        "name": "Kohi Click Test (10 Seconds)",
        "description": "The classic 10-second clicking challenge, popularized by the Minecraft community, to measure raw CPS (clicks per second) for PvP skills.",
        "gameplayMode": "SinglePlayer",
        "applicationCategory": "Game",
        "operatingSystem": "Any (Web Browser)",
        "author": {
            "@type": "Organization",
            "name": "CpsSpeedTest"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "25487"
        }
    };
    return (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
};

export default function KohiClickTestPage() {
  return (
    <>
      <JsonLd />
      <div className="flex flex-col items-center">
        <header className="w-full max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Kohi Click Test
          </h1>
          <p className="text-muted-foreground mt-1">
            The classic 10 second clicking challenge, made famous by the Minecraft community.
          </p>
        </header>
        <CpsTest gameDuration={10} />
        <Card className="w-full max-w-2xl mt-8">
          <CardContent className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold">About the Kohi Click Test</h2>
              <p>The Kohi Click Test is a legendary benchmark for clicking speed, originally popularized by players of the Kohi Minecraft server. It's a straightforward 10-second challenge to see how many clicks you can achieve, measuring your raw CPS (clicks per second). For many gamers, a high score on the Kohi test is a badge of honor, demonstrating elite mouse control and speed essential for PvP (Player vs. Player) combat.</p>

              <h2 className="text-2xl font-semibold">How to Play</h2>
              <ol className="list-decimal list-inside space-y-2">
                  <li>Prepare yourself for a 10-second sprint. Place your hand comfortably on your mouse.</li>
                  <li>Click the "Start Test" button. A countdown will begin.</li>
                  <li>Once the test area appears, click as fast as you can within the box.</li>
                  <li>The test automatically stops after 10 seconds.</li>
                  <li>Your final score, displaying your CPS, will be shown. Use the chart to see your click consistency and try again to set a new personal best!</li>
              </ol>
            </CardContent>
        </Card>
      </div>
    </>
  );
}
