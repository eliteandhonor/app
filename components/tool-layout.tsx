
import { ReactNode } from 'react';
import { Breadcrumb } from '@/components/breadcrumb';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tool, getCategoryById } from '@/lib/tools-data';

interface ToolLayoutProps {
  tool: Tool;
  children: ReactNode;
  faq?: Array<{ question: string; answer: string }>;
  relatedTools?: Tool[];
}

export function ToolLayout({ tool, children, faq, relatedTools }: ToolLayoutProps) {
  const category = getCategoryById(tool.category);

  const breadcrumbItems = [
    { label: category?.name || 'Tools', href: category?.path },
    { label: tool.name }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq?.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    })) || []
  };

  return (
    <div className="container-constrained py-8 space-y-8">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Tool Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{tool.name}</h1>
        <p className="text-lg text-muted-foreground">{tool.description}</p>
      </div>

      {/* Tool Widget */}
      <Card>
        <CardContent className="p-6">
          {children}
        </CardContent>
      </Card>

      {/* FAQ Section */}
      {faq && faq.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Common questions about {tool.name}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {faq.map((item, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-semibold">{item.question}</h3>
                <p className="text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Related Tools */}
      {relatedTools && relatedTools.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Related Tools</CardTitle>
            <CardDescription>You might also find these useful</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedTools.map((relatedTool) => (
                <a
                  key={relatedTool.id}
                  href={relatedTool.path}
                  className="p-4 rounded-lg border hover:bg-muted transition-colors focus-visible:focus-visible"
                >
                  <h4 className="font-medium">{relatedTool.name}</h4>
                  <p className="text-sm text-muted-foreground">{relatedTool.description}</p>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* JSON-LD Schema */}
      {faq && faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </div>
  );
}
