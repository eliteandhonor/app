
import { Metadata } from 'next';
import { FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumb } from '@/components/breadcrumb';

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for Mini Apps. Learn about acceptable use, disclaimers, and our commitment to providing free utility tools.",
};

export default function TermsPage() {
  const breadcrumbItems = [
    { label: 'Terms of Service' }
  ];

  return (
    <div className="container-constrained py-8 space-y-8">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Terms of Service</h1>
            <p className="text-lg text-muted-foreground">
              Simple terms for using our tools
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Agreement to Terms</CardTitle>
            <CardDescription>Last updated: June 5, 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              By accessing and using Mini Apps, you agree to be bound by these Terms of Service. 
              If you disagree with any part of these terms, please do not use our service.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Description of Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Mini Apps provides free online utility tools including calculators, converters, 
              timers, and other productivity tools. Our service is provided "as is" without 
              any warranties or guarantees.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>All tools are free to use</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>No registration or account creation required</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Tools work entirely in your browser</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Simple and straightforward tools</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acceptable Use</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>You agree to use our service only for lawful purposes. You may not:</p>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <span className="text-red-500 mt-1">×</span>
                <span>Attempt to reverse engineer or copy our tools</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-500 mt-1">×</span>
                <span>Use automated systems to overload our servers</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-500 mt-1">×</span>
                <span>Attempt to gain unauthorized access to our systems</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-500 mt-1">×</span>
                <span>Use our service for any illegal activities</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Accuracy Disclaimer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              While we strive for accuracy in all our tools, we cannot guarantee that all 
              calculations and conversions are error-free. Users should:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <span className="text-yellow-500 mt-1">⚠</span>
                <span>Verify important calculations independently</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-yellow-500 mt-1">⚠</span>
                <span>Not rely solely on our tools for critical decisions</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-yellow-500 mt-1">⚠</span>
                <span>Understand that currency rates may be delayed</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-yellow-500 mt-1">⚠</span>
                <span>Consult professionals for financial or health decisions</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Mini Apps and its operators shall not be liable for any direct, indirect, 
              incidental, special, or consequential damages resulting from the use or 
              inability to use our service, even if we have been advised of the possibility 
              of such damages.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Service Availability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We aim to provide continuous service but cannot guarantee 100% uptime. 
              We reserve the right to:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Perform maintenance that may temporarily interrupt service</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Modify or discontinue features with reasonable notice</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Update our tools to improve functionality</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              The design, code, and content of Mini Apps are protected by copyright and 
              other intellectual property laws. While our tools are free to use, 
              the underlying code and design remain our property.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We may update these terms from time to time. Changes will be posted on this page 
              with an updated revision date. Continued use of our service after changes 
              constitutes acceptance of the new terms.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              If you have questions about these terms, please contact us through our website's 
              contact form. We'll respond to legitimate inquiries as soon as possible.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
