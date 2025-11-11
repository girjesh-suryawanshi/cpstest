import { MathQuiz } from "@/components/math-quiz";

export default function MathQuizPage() {
  return (
    <div className="flex flex-col items-center">
      <header className="w-full max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Math Quiz
        </h1>
        <p className="text-muted-foreground mt-1">
          Solve as many problems as you can in 60 seconds!
        </p>
      </header>
      <MathQuiz />
    </div>
  );
}
