import { MathQuiz } from "@/components/math-quiz";
import { Card, CardContent } from "@/components/ui/card";

export default function MathQuizPage() {
  return (
    <div className="w-full">
      <header className="w-full max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Math Quiz
        </h1>
        <p className="text-muted-foreground mt-1">
          Solve as many problems as you can in 60 seconds!
        </p>
      </header>
      <MathQuiz />
      <Card className="w-full max-w-2xl mt-8 mx-auto">
        <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">About the Math Quiz</h2>
            <p>The Math Quiz is a fast-paced challenge designed to test and sharpen your mental arithmetic skills. In this game, you'll be presented with a series of quick-fire math problems involving addition, subtraction, and multiplication. It's an excellent way to improve your calculation speed, enhance your focus under pressure, and give your brain a stimulating workout. Whether you're a student looking to practice, a professional wanting to keep your mind sharp, or just someone who enjoys a good mental challenge, this quiz is for you.</p>

            <h2 className="text-2xl font-semibold">How to Play</h2>
            <ol className="list-decimal list-inside space-y-2">
                <li>Click the "Start Quiz" button to begin the 60-second countdown.</li>
                <li>A math problem will appear on the screen (e.g., "7 x 8").</li>
                <li>Type your answer into the input box and press Enter or click the submit button.</li>
                <li>If your answer is correct, your score will increase, and a new problem will immediately appear.</li>
                <li>If your answer is incorrect, the game will simply move to the next problem without awarding a point.</li>
                <li>Continue solving problems as quickly as you can until the timer runs out.</li>
                <li>Your final score, representing the number of correctly solved problems, will be displayed. Challenge yourself to beat your high score with each attempt!</li>
            </ol>
        </CardContent>
      </Card>
    </div>
  );
}
