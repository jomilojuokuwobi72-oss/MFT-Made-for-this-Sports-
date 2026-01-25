"use client";

import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // later: connect to your waitlist (Mailchimp, ConvertKit, Supabase, etc.)
    setEmail("");
    alert("Thanks! You're on the list.");
  }

  return (
    <footer id="waitlist" className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Top row */}
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              STAY UPDATED
            </h3>
            <p className="mt-4 text-white/75 max-w-xl">
              Sign up to be the first to find out on app updates and other exciting news!
            </p>
          </div>

          <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-4 sm:justify-end">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder="Email Address"
              className="h-12 w-full sm:w-[360px] rounded-none bg-white text-black px-4 outline-none"
            />

            <button
              type="submit"
              className="h-12 px-8 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-black transition"
            >
              Sign Up
            </button>
          </form>
        </div>

        {/* Divider */}
        <div className="mt-10 h-px w-full bg-white/20" />

        {/* Bottom row */}
        <div className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div className="space-y-2 text-sm text-white/80">
            <a href="#" className="block hover:underline">
              Terms and Conditions
            </a>
            <a href="#" className="block hover:underline">
              Privacy Policy
            </a>
            <a href="#contact" className="block hover:underline">
              Contact
            </a>
          </div>

          <div className="text-5xl md:text-6xl font-extrabold tracking-tight">
            MFT<span className="text-white/60">.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
