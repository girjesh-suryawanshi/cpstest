import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  return (
    <div className="flex flex-col items-center">
      <header className="w-full max-w-4xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-foreground">
          Contact Us
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          We'd love to hear from you! Send us a message.
        </p>
      </header>
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6">
            <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Your Name" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="your@email.com" />
                    </div>
                </div>
                <div className="space-y-2">
                     <Label htmlFor="subject">Subject</Label>
                     <Input id="subject" placeholder="What is your message about?" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Your message..." className="min-h-[150px]" />
                </div>
                <Button type="submit" className="w-full sm:w-auto">Send Message</Button>
            </form>
        </CardContent>
      </Card>
    </div>
  );
}
