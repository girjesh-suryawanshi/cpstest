import { CpsTest } from "@/components/cps-test";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '1 Second CPS Test - Quick Click Challenge',
  description: 'Take our 1-second burst CPS test to measure your maximum click speed. Perfect for a quick warm-up or to test your peak clicking ability.',
  keywords: ['1 second cps test', 'cps test 1s', 'quick cps test', 'burst click speed'],
   alternates: {
    canonical: '/cps-test-1s',
  },
};

const JsonLd = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Game",
        "name": "Clicks Per Second Test (1 Second)",
        "description": "A browser-based game to test and measure a user's clicking speed within a 1-second timeframe.",
        "gameplayMode": "SinglePlayer",
        "applicationCategory": "Game",
        "operatingSystem": "Any (Web Browser)",
        "author": {
            "@type": "Organization",
            "name": "CpsSpeedTest"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.7",
            "ratingCount": "8950"
        }
    };
    return (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
};

export default function CpsTest1sPage() {
  return (
    <>
      <JsonLd />
      <div className="w-full">
          <header className="w-full max-w-2xl mx-auto mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Clicks Per Second Test (1 Second)
            </h1>
            <p className="text-muted-foreground mt-1">
              Click as fast as you can for 1 second.
            </p>
          </header>
          <CpsTest gameDuration={1} />
        </div>
    </>
  );
}
