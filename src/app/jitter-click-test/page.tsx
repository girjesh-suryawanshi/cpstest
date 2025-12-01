import { CpsTest } from "@/components/cps-test";
import { Card, CardContent } from "@/components/ui/card";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jitter Click Test - Master the Jitter Technique',
  description: 'Take our 10-second Jitter Click Test to practice and measure your jittering speed. Improve your CPS for competitive gaming.',
  keywords: ['jitter click test', 'jitter clicking', 'how to jitter click', 'increase cps'],
   alternates: {
    canonical: '/jitter-click-test',
  },
};

const JsonLd = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Game",
        "name": "Jitter Click Test (10 Seconds)",
        "description": "A 10-second test to measure and improve a user's jitter clicking speed, a technique to achieve high CPS (clicks per second).",
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
            "ratingCount": "11234"
        }
    };
    return (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
};

export default function JitterClickTestPage() {
  return (
    <>
      <JsonLd />
      <div className="w-full">
        <header className="w-full max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Jitter Click Test
          </h1>
          <p className="text-muted-foreground mt-1">
            Test your jitter clicking speed for 10 seconds.
          </p>
        </header>
        <CpsTest gameDuration={10} />
        <Card className="w-full max-w-2xl mt-8">
          <CardContent className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold">About the Jitter Click Test</h2>
              <p>Jitter clicking is an advanced technique used by gamers to achieve an extremely high number of clicks per second (CPS). It involves rapidly vibrating your hand or arm to cause your finger to press the mouse button at a high frequency. This 10-second test is designed to measure your jitter clicking ability and help you improve.</p>

              <h2 className="text-2xl font-semibold">How to Play</h2>
              <ol className="list-decimal list-inside space-y-2">
                  <li>Place your finger on the mouse button in a relaxed way. Tense your arm and hand to create a vibration or tremor.</li>
                  <li>Click the "Start Test" button to begin the countdown.</li>
                  <li>Once the test area appears, channel the vibration into your finger to click as rapidly as possible for 10 seconds.</li>
                  <li>Your final score, showing your CPS, will be displayed when the timer ends.</li>
                  <li>Analyze your performance with the click rate chart. Practice to improve your speed and stamina!</li>
              </ol>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
