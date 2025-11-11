import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col items-center">
      <header className="w-full max-w-4xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-foreground">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Your privacy is important to us.
        </p>
      </header>
      <Card className="w-full max-w-4xl">
        <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
            <p>We do not collect any personally identifiable information from our users. All game data, such as scores and progress, is stored locally on your device or in your browser's local storage. It is not transmitted to our servers.</p>
            
            <h2 className="text-2xl font-semibold">2. How We Use Information</h2>
            <p>Since we do not collect personal information, we do not use it for any purpose. The locally stored game data is used solely to provide you with the functionality of the games, such as displaying your high scores and tracking your progress.</p>
            
            <h2 className="text-2xl font-semibold">3. Third-Party Services</h2>
            <p>Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties, and we encourage you to read their privacy policies.</p>
            
            <h2 className="text-2xl font-semibold">4. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>
            
            <p className="text-muted-foreground text-sm">Last updated: {new Date().toLocaleDateString()}</p>
        </CardContent>
      </Card>
    </div>
  );
}
