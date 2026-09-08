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

export const metadata: Metadata = {
  title: "Sam Gabriel — Observation Log",
  description:
    "The working log of Sam Gabriel — machine learning and software engineer. GPU simulations, a desktop planetarium, and other objects observed and built with data and code.",
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
