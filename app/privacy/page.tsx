
import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumb } from '@/components/breadcrumb';

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how Mini Apps protects your privacy. We don't collect personal data, use tracking, or store information about your usage.",
};

export default function PrivacyPage() {
  const breadcrumbItems = [
    { label: 'Privacy Policy' }
  ];

  return (
    <div className="container-constrained py-8 space-y-8">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
            <p className="text-lg text-muted-foreground">
              Your privacy is our priority
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Our Commitment to Privacy</CardTitle>
            <CardDescription>Last updated: June 5, 2025</CardDescription>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p>
              At Mini Apps, we believe in complete transparency about how we handle your data. 
              The simple answer is: we don't collect, store, or track any personal information about you.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>What We Don't Collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>No personal information (name, email, phone number)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>No tracking cookies or analytics</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>No usage statistics or behavioral data</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>No IP addresses or location data</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>No device fingerprinting</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How Our Tools Work</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              All calculations and conversions happen entirely in your browser. This means:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Your data never leaves your device</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>No information is sent to our servers</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>You can use our tools completely offline</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>No accounts or logins required</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Third-Party Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We use minimal third-party services:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span><strong>Currency Exchange Rates:</strong> We fetch live exchange rates from public APIs. No personal data is shared in these requests.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span><strong>Hosting:</strong> Our website is hosted on secure servers, but no user data is stored or logged.</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Browser Storage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Some tools may temporarily store data in your browser's local storage for convenience:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Recent calculations or settings</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Custom lists in the random picker</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Theme preferences (dark/light mode)</span>
              </li>
            </ul>
            <p className="text-sm text-muted-foreground">
              This data stays on your device and can be cleared by clearing your browser data.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              If you have any questions about this privacy policy or our practices, 
              you can contact us through the contact form on our website. We only use 
              contact form submissions to respond to your inquiry and don't add you to any mailing lists.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Changes to This Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We may update this privacy policy from time to time. Any changes will be posted on this page 
              with an updated revision date. Since we don't collect your contact information, 
              we can't notify you directly of changes.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
