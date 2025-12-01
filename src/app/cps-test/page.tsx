import { CpsTest } from "@/components/cps-test";
import { Card, CardContent } from "@/components/ui/card";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Clicks Per Second (CPS) Test - 5 Second Challenge',
  description: 'Test your clicking speed with our 5-second CPS test. Find out how fast you can click and compare your score with others. Improve your gaming skills now!',
  keywords: ['cps test', 'click speed test', 'clicks per second', '5 second cps test', 'mouse speed test'],
  alternates: {
    canonical: '/cps-test',
  },
};

const JsonLd = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Game",
        "name": "Clicks Per Second Test (5 Seconds)",
        "description": "A browser-based game to test and measure a user's clicking speed within a 5-second timeframe.",
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
            "ratingCount": "15320"
        }
    };
    return (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
};


export default function CpsTestPage() {
  return (
    <>
      <JsonLd />
      <div className="w-full">
          <header className="w-full max-w-2xl mx-auto mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Clicks Per Second Test
            </h1>
            <p className="text-muted-foreground mt-1">
              Test your clicking speed and improve your CPS score. Click as fast as you can for 5 seconds.
            </p>
          </header>
          <CpsTest gameDuration={5} />
           <Card className="w-full max-w-2xl mt-8 mx-auto">
              <CardContent className="p-6 space-y-4">
                  <h2 className="text-2xl font-semibold">About the CPS Test</h2>
                  <p>The CpsSpeedTest (Clicks Per Second) is a simple yet effective tool to measure how fast you can click your mouse. It's a fun way to challenge yourself, compete with friends, and see how your clicking speed stacks up. This test is especially popular among gamers who need quick reflexes and high CPS for a competitive edge.</p>

                  <h2 className="text-2xl font-semibold">How to Play</h2>
                  <ol className="list-decimal list-inside space-y-2">
                      <li>Click the "Start Test" button to begin.</li>
                      <li>A countdown will appear. Get ready to click!</li>
                      <li>Once the test area appears, click as fast as you can within the box.</li>
                      <li>The test will automatically stop after the set time (5 seconds for this version).</li>
                      <li>Your final score, showing your CPS (Clicks Per Second), will be displayed.</li>
                      <li>You can analyze your performance with the click rate chart and try again to beat your score!</li>
                  </ol>
              </CardContent>
          </Card>
        </div>
    </>
  );
}
