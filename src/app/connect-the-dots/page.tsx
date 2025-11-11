import { ConnectTheDots } from "@/components/connect-the-dots";

export default function ConnectTheDotsPage() {
  return (
    <div className="flex flex-col items-center">
      <header className="w-full max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Connect the Dots
        </h1>
        <p className="text-muted-foreground mt-1">
          Click the dots in order to reveal the hidden picture!
        </p>
      </header>
      <ConnectTheDots />
    </div>
  );
}
