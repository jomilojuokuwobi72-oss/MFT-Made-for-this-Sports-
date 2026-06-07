import type { Metadata, Viewport } from "next";
import { Familjen_Grotesk } from "next/font/google";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mft-sports.com";

const description =
  "Made4This (MFT) is a football community built to spotlight talent — track player stats, highlight growth, and connect the right players with the right people.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Made4This | The Journey, The Culture, The Scouting",
    template: "%s | Made4This",
  },
  description,
  applicationName: "Made4This",
  keywords: [
    "Made4This",
    "MFT",
    "MFT Sports",
    "football scouting",
    "soccer scouting app",
    "player stats",
    "football community",
    "talent spotlight",
    "grassroots football",
  ],
  authors: [{ name: "Made4This" }],
  creator: "Made4This",
  publisher: "Made4This",
  category: "sports",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Made4This",
    title: "Made4This | The Journey, The Culture, The Scouting",
    description,
    url: siteUrl,
    locale: "en_US",
    // og:image is generated from app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: "Made4This | The Journey, The Culture, The Scouting",
    description,
    creator: "@made4thisports",
    // twitter:image is generated from app/twitter-image.tsx
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Made4This",
  alternateName: "MFT Sports",
  url: siteUrl,
  logo: `${siteUrl}/icon.png`,
  description,
  email: "info@mft-sports.com",
  sameAs: [
    "https://instagram.com/made4thisports",
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <WaitlistProvider>
          {children}
        </WaitlistProvider>
      </body>
    </html>
  );
}
