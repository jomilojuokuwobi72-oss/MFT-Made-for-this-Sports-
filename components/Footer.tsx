import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import { Instagram, Mail, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-48 md:py-64 bg-black text-white border-t border-white/5 noise-bg overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
          <div className="lg:col-span-7">
            <ScrollReveal animation="fade-in">
              <Link
                href="/"
                className="font-secondary text-6xl md:text-8xl lg:text-9xl tracking-tighter hover:opacity-80 transition block mb-12"
              >
                Made For This<span className="text-white/40">.</span>
              </Link>
              <p className="text-2xl md:text-3xl font-sans tracking-tight text-white/40 max-w-xl leading-snug">
                The Journey is the Destination. <br />
                A global football movement born from the raw energy of urban talent.
              </p>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-16 lg:gap-24">
            <ScrollReveal animation="slide-up" delay={0.1}>
              <h4 className="text-sm uppercase tracking-[0.5em] text-white/30 mb-10 font-bold font-display">Navigation</h4>
              <ul className="flex flex-col gap-6 text-lg font-bold tracking-widest text-white/60 font-display">
                <li><Link href="#home" className="hover:text-white transition">Home</Link></li>
                <li><Link href="#events" className="hover:text-white transition">Events</Link></li>
                <li><Link href="#culture" className="hover:text-white transition">Culture</Link></li>
                <li><Link href="#about" className="hover:text-white transition">About</Link></li>
              </ul>
            </ScrollReveal>

            <ScrollReveal animation="slide-up" delay={0.2}>
              <h4 className="text-sm uppercase tracking-[0.5em] text-white/30 mb-10 font-bold font-display">Social</h4>
              <ul className="flex flex-col gap-6 text-lg font-bold tracking-widest text-white/60 font-display">
                <li>
                  <a href="https://instagram.com/made4thisports" target="_blank" className="flex items-center gap-3 hover:text-white transition">
                    <Instagram className="w-5 h-5" />
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-3 hover:text-white transition">
                    <Twitter className="w-5 h-5" />
                    Twitter // X
                  </a>
                </li>
                <li>
                  <a href="mailto:info@mft-sports.com" className="flex items-center gap-3 hover:text-white transition">
                    <Mail className="w-5 h-5" />
                    Mail
                  </a>
                </li>
              </ul>
            </ScrollReveal>
          </div>
        </div>

        <div className="mt-64 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 text-sm font-bold tracking-[0.4em] text-white/20 uppercase font-display">
          <ScrollReveal animation="fade-in">
            <span>&copy; 2025 Made For This Sports Architecture.</span>
          </ScrollReveal>
          <div className="flex flex-wrap justify-center gap-12">
            <ScrollReveal animation="fade-in" delay={0.1}>
              <a href="#" className="hover:text-white/30 transition border-b border-transparent hover:border-white/20 pb-1">Privacy</a>
            </ScrollReveal>
            <ScrollReveal animation="fade-in" delay={0.2}>
              <a href="#" className="hover:text-white/30 transition border-b border-transparent hover:border-white/20 pb-1">Terms</a>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </footer>
  );
}

