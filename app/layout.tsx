import type { Metadata } from "next";
import "@/app/globals.css";
import clsx from "clsx";
import { SVGFilters } from "@/components/SVGFilters";
import { Bricolage_Grotesque } from "next/font/google";
import ViewCanvas from "@/components/ViewCanvas";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
});

export const metadata: Metadata = {
  title: "MFT - Made For This Sports",
  description: "A football community built to spotlight talent.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={bricolage.variable}>
      <body
        className={clsx(
          "bg-background text-white antialiased selection:bg-violet-500/30",
          "font-sans"
        )}
      >
        <SVGFilters />
        {children}
        <ViewCanvas />
      </body>
    </html>
  );
}
