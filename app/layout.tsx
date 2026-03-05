import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import ScrollContext from "@/components/layout/ScrollContext";
import WaitlistModal from "@/components/ui/WaitlistModal";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "MFT - Made For This Sports",
  description: "A football community built to spotlight talent. We build the architecture for your athletic legacy.",
  keywords: ["Football", "Sports", "Talent Discovery", "Athletics", "MFT", "Made For This"],
  openGraph: {
    title: "MFT - Made For This Sports",
    description: "A football community built to spotlight talent. We build the architecture for your athletic legacy.",
    url: "https://madeforthis.sports",
    siteName: "MFT Sports",
    images: [
      {
        url: "/MFT BRAND OVERVIEW-01.PNG",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MFT - Made For This Sports",
    description: "A football community built to spotlight talent. We build the architecture for your athletic legacy.",
    images: ["/MFT BRAND OVERVIEW-01.PNG"],
  },
  icons: {
    icon: "/MFT BRAND OVERVIEW-01.PNG",
    shortcut: "/MFT BRAND OVERVIEW-01.PNG",
    apple: "/MFT BRAND OVERVIEW-01.PNG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body
        className={`bg-brand-violet text-white antialiased h-screen w-screen overflow-hidden p-3 md:p-6 lg:p-8`}
      >
        <div className="relative w-full h-full max-w-[1920px] mx-auto bg-transparent rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5">
          <ScrollContext>
            {children}
            <WaitlistModal />
          </ScrollContext>
        </div>
      </body>
    </html>
  );
}
