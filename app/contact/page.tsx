
import { Metadata } from 'next';
import { Mail } from 'lucide-react';
import { ContactForm } from '@/components/contact-form';
import { Breadcrumb } from '@/components/breadcrumb';

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Mini Apps team. Send feedback, report issues, or suggest new features for our utility tools.",
};

export default function ContactPage() {
  const breadcrumbItems = [
    { label: 'Contact' }
  ];

  return (
    <div className="container-constrained py-8 space-y-8">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
            <Mail className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Contact Us</h1>
            <p className="text-lg text-muted-foreground">
              We'd love to hear from you
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl">
        <ContactForm />
      </div>
    </div>
  );
}
