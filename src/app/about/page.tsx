import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center">
      <header className="w-full max-w-4xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-foreground">
          About ClickTrack
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Sharpening skills, one click at a time.
        </p>
      </header>
      <Card className="w-full max-w-4xl">
        <CardContent className="p-6 text-lg space-y-4">
            <p>Welcome to ClickTrack! Our mission is to provide a fun and engaging platform for users of all ages to test, improve, and track their skills across a variety of challenges.</p>
            <p>From testing your click speed and reaction time to challenging your memory and problem-solving abilities, ClickTrack offers a diverse collection of games designed to be both entertaining and educational.</p>
            <p>We believe that learning and skill development should be an enjoyable experience. That's why we've created a vibrant, user-friendly environment where you can compete with yourself, see your progress, and have a great time doing it.</p>
            <p>Thank you for joining our community. Let the games begin!</p>
        </CardContent>
      </Card>
    </div>
  );
}
