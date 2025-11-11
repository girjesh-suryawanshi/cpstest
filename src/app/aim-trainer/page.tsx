import { AimTrainer } from "@/components/aim-trainer";

export default function AimTrainerPage() {
  return (
    <div className="flex flex-col items-center">
      <header className="w-full max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Aim Trainer
        </h1>
        <p className="text-muted-foreground mt-1">
          Click as many targets as you can in 30 seconds.
        </p>
      </header>
      <AimTrainer />
    </div>
  );
}
