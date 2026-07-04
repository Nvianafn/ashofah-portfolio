import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import type { CSSProperties } from "react";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-code",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ashofah.me"),
  title: {
    default: "Novian Affan Ashofah - Backend Developer & DevOps Engineer",
    template: "%s - Novian Affan Ashofah",
  },
  description:
    "Backend Developer & DevOps Engineer from Purwokerto. I build and ship reliable web systems with Laravel, Node.js, Next.js, and self-hosted infrastructure. Explore my work through an interactive terminal.",
  keywords: [
    "Novian Affan Ashofah",
    "Backend Developer",
    "DevOps Engineer",
    "Laravel",
    "Node.js",
    "Next.js",
    "Purwokerto",
  ],
  authors: [{ name: "Novian Affan Ashofah" }],
  creator: "Novian Affan Ashofah",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ashofah.me",
    siteName: "Novian Affan Ashofah",
    title: "Novian Affan Ashofah - Backend Developer & DevOps Engineer",
    description:
      "Backend Developer & DevOps Engineer. Explore my work through an interactive terminal.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Novian Affan Ashofah - Backend Developer & DevOps Engineer",
    description:
      "Backend Developer & DevOps Engineer. Explore my work through an interactive terminal.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0d0c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const htmlStyle = {
    "--font-sans": display.style.fontFamily,
    "--font-mono": mono.style.fontFamily,
  } as CSSProperties;

  return (
    <html
      lang="en"
      className={display.variable + " " + mono.variable}
      style={htmlStyle}
    >
      <body>{children}</body>
    </html>
  );
}
