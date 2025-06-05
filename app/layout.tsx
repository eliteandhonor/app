
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: "Mini Apps - Tiny Tools, Mighty Utility",
    template: "%s | Mini Apps"
  },
  description: "Fast, mobile-first collection of essential calculators, converters, timers, and utilities. Pure functionality for everyday tasks.",
  keywords: ["calculator", "converter", "timer", "utility", "tools", "mobile", "web app"],
  authors: [{ name: "Mini Apps" }],
  creator: "Mini Apps",
  metadataBase: new URL("https://miniapps.example.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://miniapps.example.com",
    title: "Mini Apps - Tiny Tools, Mighty Utility",
    description: "Fast, mobile-first collection of essential calculators, converters, timers, and utilities.",
    siteName: "Mini Apps",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mini Apps - Tiny Tools, Mighty Utility",
    description: "Fast, mobile-first collection of essential calculators, converters, timers, and utilities.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563EB" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
