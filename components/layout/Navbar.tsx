"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { InstagramIcon, TiktokIcon, Menu01Icon, CancelIcon } from "@hugeicons/core-free-icons";
import clsx from "clsx";

type NavLink = {
  label: string;
  href?: string;
  isCta?: boolean;
};

const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Events", href: "#news" },
  { label: "Waitlist", isCta: true },
];

import { useStore } from "@/store/useStore";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { setWaitlistModalOpen } = useStore();

  return (
    <nav className="absolute top-0 z-50 w-full px-4 py-4 md:px-6 md:py-6" aria-label="Main">
      <div className="mx-auto flex max-w-7xl flex-col justify-between rounded-3xl border border-white/10 bg-white/5 px-6 py-4 font-medium text-white backdrop-blur-2xl md:flex-row md:items-center">
        <div className="flex items-center justify-between">
          <Link
            href="#home"
            className="z-50 flex items-center gap-3 text-xl font-extrabold tracking-tight text-white transition-opacity hover:opacity-80"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/MFT BRAND OVERVIEW-01.PNG"
              alt="MFT Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            MFT
          </Link>
          <button
            type="button"
            className="block p-2 text-3xl text-white md:hidden transition-transform hover:scale-110 active:scale-95"
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            <HugeiconsIcon icon={open ? CancelIcon : Menu01Icon} className="w-6 h-6" />
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>

        {/* Mobile Nav */}
        <div
          className={clsx(
            "fixed bottom-0 left-0 right-0 top-0 z-40 flex flex-col items-center justify-center bg-brand-black/95 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] md:hidden",
            open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none scale-105",
          )}
        >
          <div className="grid justify-items-center gap-8 text-center">
            {navLinks.map((item) => {
              if (item.isCta) {
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      setOpen(false);
                      setWaitlistModalOpen(true);
                    }}
                    className="relative flex h-fit w-fit items-center justify-center overflow-hidden rounded-full border border-sky-100/20 bg-brand-violet/20 px-8 py-4 text-2xl font-semibold outline-none ring-brand-cyan transition-colors after:absolute after:inset-0 after:-z-10 after:animate-pulse after:rounded-full after:bg-brand-cyan/20 after:bg-opacity-0 after:blur-md after:transition-all after:duration-500 hover:border-sky-200/40 hover:text-brand-cyan focus:ring-2"
                  >
                    {item.label}
                  </button>
                );
              }
              return (
                <Link
                  key={item.label}
                  href={item.href || "#"}
                  className="block px-3 text-3xl font-bold tracking-tight text-white/80 transition-colors hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="mt-8 flex gap-6">
              <a
                href="https://www.instagram.com/made4thisports"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="text-white/60 hover:text-white transition-colors"
              >
                <HugeiconsIcon icon={InstagramIcon} className="h-8 w-8" />
              </a>
              <a
                href="https://www.tiktok.com/@made4thisports"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="text-white/60 hover:text-white transition-colors"
              >
                <HugeiconsIcon icon={TiktokIcon} className="h-8 w-8" />
              </a>
            </div>
          </div>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => {
            if (item.isCta) {
              return (
                <li key={item.label}>
                  <button
                    onClick={() => setWaitlistModalOpen(true)}
                    className="relative flex h-fit w-fit items-center justify-center overflow-hidden rounded-full border border-sky-100/20 bg-brand-violet/20 px-6 py-2 outline-none ring-brand-cyan transition-colors after:absolute after:inset-0 after:-z-10 after:animate-pulse after:rounded-full after:bg-brand-cyan/20 after:bg-opacity-0 after:blur-md after:transition-all after:duration-500 hover:border-sky-200/40 hover:text-brand-cyan focus:ring-2"
                  >
                    {item.label}
                  </button>
                </li>
              );
            }

            return (
              <li key={item.label}>
                <Link
                  href={item.href || "#"}
                  className="inline-flex min-h-11 items-center font-medium text-white/80 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            );
          })}

          <li className="ml-4 flex items-center gap-4 border-l border-white/20 pl-6">
            <a
              href="https://www.instagram.com/made4thisports"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="text-white/80 hover:text-brand-cyan transition-colors"
            >
              <HugeiconsIcon icon={InstagramIcon} className="h-5 w-5" />
            </a>
            <a
              href="https://www.tiktok.com/@made4thisports"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="text-white/80 hover:text-brand-cyan transition-colors"
            >
              <HugeiconsIcon icon={TiktokIcon} className="h-5 w-5" />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
