import type { Metadata } from "next";
import { Fraunces, Geist, Space_Mono } from "next/font/google";
import "./globals.css";

// Display — high-contrast optical serif, an engraved star-atlas voice
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Body — clean, quiet grotesque that lets the serif and data carry character
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

// Data — catalogue designations, coordinates, magnitudes
const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const SITE = "https://samgabriel.vercel.app";
const BLURB =
  "The working log of Sam Gabriel — machine learning and software engineer. GPU simulations, a desktop planetarium, and other objects observed and built with data and code.";

export const metadata: Metadata = {
  title: "Sam Gabriel — Observation Log",
  description: BLURB,
  // pasted into Slack or an applicant tracker this should not render as a bare
  // link; this version's docs require absolute URLs for og images
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Observation Log",
    title: "Sam Gabriel — Observation Log",
    description: BLURB,
    images: [
      {
        url: `${SITE}/novasky.jpg`,
        width: 1400,
        height: 875,
        alt: "NovaSky — a desktop planetarium showing the real sky over New York",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sam Gabriel — Observation Log",
    description: BLURB,
    images: [`${SITE}/novasky.jpg`],
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
      className={`${fraunces.variable} ${geist.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
