
import { Metadata } from 'next';
import { ToolLayout } from '@/components/tool-layout';
import { EmailValidator } from '@/components/tools/email-validator';
import { getToolById } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: 'Email Validator - Validate Email Addresses Online',
  description: 'Validate email addresses and check format correctness. Bulk email validation with detailed error reporting.',
  keywords: ['email validator', 'email validation', 'email checker', 'bulk validation', 'email format'],
};

export default function EmailValidatorPage() {
  const tool = getToolById('email-validator')!;

  return (
    <ToolLayout tool={tool}>
      <EmailValidator />
    </ToolLayout>
  );
}
