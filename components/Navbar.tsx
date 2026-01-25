"use client";

import Link from "next/link";
import { Instagram } from "lucide-react";

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21 8.2c-1.9 0-3.7-.6-5.2-1.7v8.1c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6c.4 0 .8 0 1.2.1v3.2c-.4-.2-.8-.3-1.2-.3-1.5 0-2.8 1.2-2.8 2.8s1.2 2.8 2.8 2.8 2.8-1.2 2.8-2.8V2h3.2c.2 1.7 1.2 3.2 2.7 4 .9.5 1.9.8 3 .8v2.4z" />
    </svg>
  );
}

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full bg-black/70 backdrop-blur border-b border-white/10">
      <nav className="mx-auto max-w-7xl px-6 py-4 flex items-center">
        
        {/* LEFT: Logo */}
        <div className="flex-1">
          <Link
            href="#home"
            className="text-white font-extrabold tracking-tight text-xl"
          >
            MFT {/*<span className="text-white/60">Sports</span>*/}
          </Link>
        </div>

        {/* CENTER: Navigation */}
        <div className="hidden md:flex flex-1 justify-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 hover:text-white transition"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* RIGHT: Social Icons */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="text-white/80 hover:text-white transition"
          >
            <Instagram className="h-5 w-5" />
          </a>

          <a
            href="https://tiktok.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="TikTok"
            className="text-white/80 hover:text-white transition"
          >
            <TikTokIcon className="h-5 w-5" />
          </a>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div className="md:hidden border-t border-white/10">
        <div className="flex justify-center gap-6 py-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 hover:text-white transition"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
