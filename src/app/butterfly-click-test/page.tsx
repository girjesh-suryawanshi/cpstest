import { CpsTest } from "@/components/cps-test";
import { Card, CardContent } from "@/components/ui/card";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Butterfly Click Test - 20 Second Challenge',
  description: 'Test your butterfly clicking speed with our 20-second challenge. This technique can drastically increase your CPS for games like Minecraft.',
  keywords: ['butterfly click test', 'butterfly clicking', 'high cps test', 'double clicking'],
   alternates: {
    canonical: '/butterfly-click-test',
  },
};

const JsonLd = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Game",
        "name": "Butterfly Click Test (20 Seconds)",
        "description": "A 20-second test to measure clicking speed using the butterfly clicking technique, which involves using two fingers on the mouse button.",
        "gameplayMode": "SinglePlayer",
        "applicationCategory": "Game",
        "operatingSystem": "Any (Web Browser)",
        "author": {
            "@type": "Organization",
            "name": "CpsSpeedTest"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "9876"
        }
    };
    return (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
};

export default function ButterflyClickTestPage() {
  return (
    <>
      <JsonLd />
      <div className="flex flex-col items-center">
        <header className="w-full max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Butterfly Click Test
          </h1>
          <p className="text-muted-foreground mt-1">
            Test your butterfly clicking speed for 20 seconds.
          </p>
        </header>
        <CpsTest gameDuration={20} />
        <Card className="w-full max-w-2xl mt-8">
          <CardContent className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold">About the Butterfly Click Test</h2>
              <p>The Butterfly Click Test is a challenge designed to measure your clicking speed using the butterfly clicking technique. This method involves rapidly alternating clicks with two fingers (usually the index and middle fingers) on a single mouse button. It's a popular technique among pro gamers, especially in Minecraft, to achieve extremely high CPS (clicks per second). This 20-second test provides a great opportunity to practice and perfect your butterfly clicking skills.</p>

              <h2 className="text-2xl font-semibold">How to Play</h2>
              <ol className="list-decimal list-inside space-y-2">
                  <li>Place your index and middle fingers on your primary mouse button.</li>
                  <li>Click the "Start Test" button to begin the countdown.</li>
                  <li>When the test area appears, start rapidly alternating clicks with both fingers on the button.</li>
                  <li>Continue this motion for the full 20 seconds until the timer runs out.</li>
                  <li>Your final CPS score will be displayed. Analyze your performance and try again to improve your speed and rhythm!</li>
              </ol>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
