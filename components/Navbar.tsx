"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useWaitlist } from "./WaitlistProvider";
import Button from "./ui/Button";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#events", label: "Events" },
  { href: "#culture", label: "Culture" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openWaitlist } = useWaitlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "py-4 bg-black/10 backdrop-blur-md"
        : "py-6 bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
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
          <span className="font-display text-2xl hover:opacity-80 transition hidden sm:block">
            Made4This<span className="text-white/70">.</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Technical Call to Action */}
        <div className="flex items-center gap-4">
          <Button
            onClick={openWaitlist}
            variant="solid"
            size="sm"
            className="hidden md:inline-flex"
          >
            Join Waitlist
          </Button>
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="md:hidden text-white relative z-60 p-1"
          >
            {mobileOpen ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`md:hidden fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-center px-8 transition-all duration-300 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-2">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-5xl font-bold uppercase font-display text-white/90 hover:text-white transition-colors py-2"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="mt-12">
          <Button
            onClick={() => {
              setMobileOpen(false);
              openWaitlist();
            }}
            variant="solid"
            fullWidth
          >
            Join Waitlist
          </Button>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-xl font-bold text-white/80 hover:text-white transition font-display"
    >
      {children}
    </Link>
  );
}
