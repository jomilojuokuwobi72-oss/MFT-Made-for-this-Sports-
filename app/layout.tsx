import type { Metadata } from "next";
import { Inter, Familjen_Grotesk } from "next/font/google";
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

const familjen = Familjen_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-familjen",
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
        className={`${avaleigh.variable} ${familjen.variable} font-sans antialiased bg-black text-white`}
      >
        <WaitlistProvider>
          {children}
        </WaitlistProvider>
      </body>
    </html>
  );
}
