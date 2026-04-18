"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "py-4 bg-black/10 backdrop-blur-md"
        : "py-6 bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 group"
        >
          <div className="relative h-10 w-10 overflow-hidden rounded-none border border-white/10 group-hover:border-white/30 transition-colors">
            <img 
              src="/images/mft-logo.png" 
              alt="MFT Logo" 
              className="h-full w-full object-cover scale-110" 
            />
          </div>
          <span className="font-display text-2xl tracking-tighter hover:opacity-80 transition hidden sm:block">
            Made For This<span className="text-white/40">.</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="#home">Home</NavLink>
          <NavLink href="#events">Events</NavLink>
          <NavLink href="#culture">Culture</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </div>

        {/* Technical Call to Action */}
        <div className="flex items-center gap-4">
          <Link
            href="#contact"
            className="hidden sm:block text-xs font-bold uppercase tracking-widest border border-white/20 px-4 py-2 rounded-none hover:bg-white hover:text-black transition-all"
          >
            Join Waitlist
          </Link>
          <button className="md:hidden text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-xs font-bold text-white/60 hover:text-white transition"
    >
      {children}
    </Link>
  );
}
