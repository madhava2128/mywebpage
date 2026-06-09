import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Madhava K — ServiceNow Developer · Product Manager · Digital Marketer",
  description:
    "Portfolio of Madhava K — Dual-certified ServiceNow developer (CSA + CAD), Product Manager, and Digital Marketer. Open to internships in Product Management, Business Technology, and ServiceNow Development.",
  keywords: [
    "Madhava K",
    "ServiceNow Developer",
    "Product Manager",
    "Digital Marketer",
    "CSA",
    "CAD",
    "Portfolio",
  ],
  authors: [{ name: "Madhava K" }],
  openGraph: {
    title: "Madhava K — Portfolio",
    description:
      "Dual-certified ServiceNow developer, Product Manager & Digital Marketer.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
