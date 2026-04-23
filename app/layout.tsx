import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const avaleigh = localFont({
  src: [
    {
      path: "../public/fonts/avaleigh/Avaleigh Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/avaleigh/Avaleigh Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-avaleigh",
});

const moho = localFont({
  src: [
    {
      path: "../public/fonts/moho-condensed/moho-std-condensed.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/moho-condensed/moho-std-condensed-bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-moho",
});

export const metadata: Metadata = {
  title: "MFT Sports | The Journey, The Culture, The Scouting",
  description: "A football community built to spotlight talent and track player stats.",
};

import { WaitlistProvider } from "@/components/WaitlistProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${avaleigh.variable} ${moho.variable} font-sans antialiased bg-black text-white`}
      >
        <WaitlistProvider>
          {children}
        </WaitlistProvider>
      </body>
    </html>
  );
}
