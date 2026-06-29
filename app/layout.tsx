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

export const metadata: Metadata = {
  title: "FASHION BERG | B2B Luxury Apparel & Garment Manufacturing",
  description: "Bespoke private label garment production, organic cotton milling, high-density branding, and contemporary silhouettes crafted since 1981.",
};

import { InquiryProvider } from "./components/InquiryContext";
import { TranslationProvider } from "./components/TranslationContext";
import ProductSidePanel from "./components/ProductSidePanel";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <TranslationProvider>
          <InquiryProvider>
            {children}
            <ProductSidePanel />
          </InquiryProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}
