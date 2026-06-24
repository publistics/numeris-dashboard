import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://getnumeris.com";

export const metadata: Metadata = {
  title: {
    default: "Numeris — The Unified Financial OS for E-commerce",
    template: "%s | Numeris",
  },
  description:
    "Stop juggling spreadsheets. Numeris unifies Shopify, Amazon, Meta, and Google into one real-time financial dashboard. Automate profit tracking, ad spend analysis, and reconciliation.",
  keywords: [
    "e-commerce profit tracker",
    "Shopify profit calculator",
    "Amazon FBA fee tracker",
    "automated bank reconciliation e-commerce",
    "Shopify Amazon dashboard",
    "net profit tracker for e-commerce",
    "e-commerce ad spend ROI tracker",
    "blended ROAS calculator",
    "inventory health forecasting e-commerce",
    "cash flow simulation for startups",
    "e-commerce bookkeeping automation",
    "Shopify payout reconciliation tool",
    "Amazon settlement report analyzer",
    "multi-channel e-commerce financial OS",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Numeris",
    title: "Numeris — The Unified Financial OS for E-commerce",
    description:
      "Stop juggling spreadsheets. Automate your e-commerce profit tracking, reconciliation, and ad spend analysis.",
    images: [
      {
        url: `${siteUrl}/brand/og-image.png`,
        width: 1536,
        height: 1024,
        alt: "Numeris Dashboard Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Numeris — The Unified Financial OS for E-commerce",
    description:
      "Stop juggling spreadsheets. Automate your e-commerce profit tracking, reconciliation, and ad spend analysis.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="canonical" href={siteUrl} />
      </head>
      <body className="min-h-full">
        {children}
      </body>
    </html>
  );
}