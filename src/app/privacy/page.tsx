import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full">
      <header className="w-full max-w-4xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-foreground">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Your privacy is important to us.
        </p>
      </header>
      <Card className="w-full max-w-4xl">
        <CardContent className="p-6 space-y-4 prose prose-lg dark:prose-invert">
            <p>This Privacy Policy describes how CpsSpeedTest ("we," "us," or "our") collects, uses, and discloses your information.</p>
            
            <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
            <p>We do not collect any personally identifiable information (PII) from our users. All game data, such as scores, high scores, and progress, is stored locally on your device within your browser's local storage. This data is not transmitted to, or stored on, our servers.</p>
            
            <h2 className="text-2xl font-semibold">2. Cookies and Tracking Technologies</h2>
            <p>We use cookies to enhance your experience. Cookies are small files stored on your computer that help us improve our site and your experience.</p>
            <ul>
                <li><strong>Essential Cookies:</strong> These are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you, such as setting your privacy preferences.</li>
                <li><strong>Performance Cookies:</strong> These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.</li>
            </ul>

            <h2 className="text-2xl font-semibold">3. Third-Party Services and Advertising</h2>
            <p>We may use third-party advertising companies, such as Google AdSense, to serve ads when you visit our website. These companies may use information about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.</p>
            <ul>
                <li>Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to our website or other websites.</li>
                <li>Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.</li>
                <li>You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Ads Settings</a>. Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">www.aboutads.info/choices</a>.</li>
            </ul>

            <h2 className="text-2xl font-semibold">4. Children's Privacy</h2>
            <p>Our website is not intended for children under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If we become aware that a child under 13 has provided us with personal information, we will take steps to delete such information.</p>
            
            <h2 className="text-2xl font-semibold">5. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>
            
            <p className="text-muted-foreground text-sm">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </CardContent>
      </Card>
    </div>
  );
}
