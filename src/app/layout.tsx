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
  title: "VoteWise AI | Master the Election Process",
  description: "A modern, AI-powered platform to help citizens understand voting, registration, and election procedures. Simple, engaging, and educational.",
  keywords: ["Election", "Voting", "Democracy", "AI Assistant", "Voter Registration", "EVM", "India Elections"],
  authors: [{ name: "VoteWise Team" }],
  openGraph: {
    title: "VoteWise AI | Master the Election Process",
    description: "Empowering citizens with knowledge about the democratic process.",
    type: "website",
    locale: "en_US",
    siteName: "VoteWise AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "VoteWise AI | Master the Election Process",
    description: "Empowering citizens with knowledge about the democratic process.",
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
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
