"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";


import { useStore } from "@/store/useStore";

export default function Footer() {
  const { setWaitlistModalOpen } = useStore();



  return (
    <footer id="waitlist" className="relative overflow-hidden bg-brand-black text-white pt-24 pb-12">
      {/* Background glow */}
      <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-violet/20 opacity-50 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Top row */}
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="max-w-xl">
            <h3 className="text-4xl font-black uppercase tracking-tighter text-white sm:text-5xl md:text-6xl">
              Be the first to know<span className="text-brand-cyan">.</span>
            </h3>
            <p className="mt-6 text-lg text-white/70">
              Join the waitlist to get early access to the MFT app. Exclusive features, community events, and early drop access coming soon.
            </p>
          </div>

          <div className="relative w-full max-w-md md:ml-auto">
            {/* Fake input trigger */}
            <button
              onClick={() => setWaitlistModalOpen(true)}
              className="group relative flex w-full items-center overflow-hidden rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-colors hover:border-brand-cyan/50 hover:bg-white/10 cursor-pointer text-left"
            >
              <div className="w-full bg-transparent px-6 py-4 text-white/40 pointer-events-none">
                Enter your email
              </div>
              <div className="relative mr-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-cyan text-brand-black transition-transform group-hover:scale-105 group-active:scale-95">
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="my-16 h-px w-full bg-linear-to-r from-transparent via-white/20 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 h-[10vh] sm:h-[15vh] bg-linear-to-t from-brand-violet/20 via-brand-violet/5 to-transparent blur-2xl" />

        {/* Bottom row */}
        <div className="flex flex-col-reverse items-center justify-between gap-8 md:flex-row">
          <p className="text-sm font-medium tracking-tight text-white/40">
            © {new Date().getFullYear()} Made For This Sports. All rights reserved.
          </p>

          <div className="flex items-center gap-8 text-sm font-medium text-white/60">
            <Link href="#about" className="transition-colors hover:text-brand-cyan">
              About
            </Link>
            <Link href="/terms" className="transition-colors hover:text-brand-cyan">
              Terms
            </Link>
            <Link href="/privacy" className="transition-colors hover:text-brand-cyan">
              Privacy
            </Link>
            <Link href="#contact" className="transition-colors hover:text-brand-cyan">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
