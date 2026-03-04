"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bounded } from "@/components/ui/Bounded";
import { Mail, Phone, ArrowUpRight } from "lucide-react";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const scroller = document.getElementById("main-scroll");
    if (!scroller || !containerRef.current) return;

    const ctx = gsap.context(() => {

      // ── Giant heading words slide up ─────────────────────────────────────
      const words = containerRef.current!.querySelectorAll(".contact-word");
      gsap.set(words, { y: "110%", opacity: 0 });
      gsap.to(words, {
        y: 0, opacity: 1,
        stagger: 0.07,
        duration: 0.9,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".contact-heading",
          scroller,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // ── Tagline ──────────────────────────────────────────────────────────
      gsap.set(".contact-tagline", { y: 30, opacity: 0 });
      gsap.to(".contact-tagline", {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-tagline",
          scroller,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // ── Cards: staggered reveal ──────────────────────────────────────────
      const cards = containerRef.current!.querySelectorAll(".contact-card");
      gsap.set(cards, { y: 60, opacity: 0, scale: 0.97 });
      gsap.to(cards, {
        y: 0, opacity: 1, scale: 1,
        stagger: 0.15,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-cards",
          scroller,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // ── Bottom CTA line draws in ─────────────────────────────────────────
      gsap.set(".contact-line", { scaleX: 0, transformOrigin: "left" });
      gsap.to(".contact-line", {
        scaleX: 1, duration: 1.4, ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-bottom",
          scroller,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.set(".contact-bottom-text", { y: 30, opacity: 0 });
      gsap.to(".contact-bottom-text", {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.3,
        scrollTrigger: {
          trigger: ".contact-bottom",
          scroller,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // ── Background orb parallax ──────────────────────────────────────────
      gsap.to(".contact-orb", {
        y: -100, ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          scroller,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Bounded
      as="section"
      id="contact"
      className="relative bg-brand-black text-white overflow-hidden py-32 md:py-48"
    >
      {/* Background atmosphere */}
      <div className="contact-orb absolute top-0 right-0 w-[60vw] h-[60vw] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(112,0,255,0.06) 0%, transparent 70%)", transform: "translate(20%, -30%)" }} />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,85,0,0.05) 0%, transparent 70%)", transform: "translate(-20%, 30%)" }} />

      {/* Noise */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025] mix-blend-overlay z-50">
        <svg width="100%" height="100%">
          <filter id="ct-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <rect width="100%" height="100%" filter="url(#ct-noise)" />
          </filter>
        </svg>
      </div>

      <div ref={containerRef} className="relative z-10">

        {/* ── Giant heading ── */}
        <div className="contact-heading overflow-hidden mb-4">
          <h2 className="text-[13vw] md:text-[12vw] font-black uppercase tracking-tighter leading-[0.85]">
            {["GET", "IN", "TOUCH"].map((word) => (
              <span key={word} className="inline-block overflow-hidden mr-[0.2em] last:mr-0">
                <span className="contact-word inline-block">{word}</span>
              </span>
            ))}
          </h2>
        </div>

        {/* ── Grid: tagline left, descriptor right ── */}
        <div className="contact-tagline grid grid-cols-1 md:grid-cols-12 gap-8 mb-24 md:mb-32">
          <div className="md:col-span-5">
            <p className="text-xl md:text-2xl text-white/55 font-medium leading-snug">
              Want to partner, sponsor, or help build the MFT community?
            </p>
          </div>
          <div className="md:col-start-8 md:col-span-5 flex items-end">
            <p className="font-mono text-xs text-white/30 tracking-widest uppercase leading-relaxed">
              We respond within 24 hours.<br />All inquiries welcome.
            </p>
          </div>
        </div>

        {/* ── Contact Cards — editorial layout ── */}
        <div className="contact-cards grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Email */}
          <a
            href="mailto:madeforthissports@gmail.com"
            className="contact-card group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/8 bg-white/[0.03] p-10 md:p-12 min-h-[280px] hover:border-brand-violet/40 transition-all duration-500 hover:bg-white/[0.05]"
          >
            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
              style={{ background: "radial-gradient(circle at 30% 30%, rgba(112,0,255,0.06) 0%, transparent 60%)" }} />

            <div className="relative z-10">
              {/* Icon + arrow */}
              <div className="flex items-start justify-between mb-10">
                <div className="w-14 h-14 rounded-2xl bg-brand-violet/15 flex items-center justify-center border border-brand-violet/20">
                  <Mail className="w-6 h-6 text-brand-violet" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-white/60 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" />
              </div>

              <div>
                <span className="font-mono text-xs text-white/30 tracking-[0.2em] uppercase mb-3 block">Email</span>
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none mb-4">Email Us</h3>
                <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                  We're here to help and answer any question you might have.
                </p>
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-6 border-t border-white/8">
              <span className="text-lg font-bold text-brand-violet group-hover:text-white transition-colors duration-300 break-all">
                madeforthissports@gmail.com
              </span>
            </div>
          </a>

          {/* Phone */}
          <a
            href="tel:+16827252801"
            className="contact-card group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/8 bg-white/[0.03] p-10 md:p-12 min-h-[280px] hover:border-brand-violet/40 transition-all duration-500 hover:bg-white/[0.05] md:mt-12"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
              style={{ background: "radial-gradient(circle at 70% 30%, rgba(255,85,0,0.06) 0%, transparent 60%)" }} />

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-10">
                <div className="w-14 h-14 rounded-2xl bg-[#FF5500]/15 flex items-center justify-center border border-[#FF5500]/20">
                  <Phone className="w-6 h-6 text-[#FF5500]" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-white/60 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" />
              </div>

              <div>
                <span className="font-mono text-xs text-white/30 tracking-[0.2em] uppercase mb-3 block">Phone</span>
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none mb-4">Call Us</h3>
                <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                  Prefer speaking directly? We're always available.
                </p>
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-6 border-t border-white/8">
              <span className="text-lg font-bold text-[#FF5500] group-hover:text-white transition-colors duration-300">
                +1 (682) 725-2801
              </span>
            </div>
          </a>
        </div>

        {/* ── Bottom CTA bar ── */}
        <div className="contact-bottom mt-24 md:mt-32">
          <div className="contact-line w-full h-px bg-white/10 mb-10" />
          <div className="contact-bottom-text flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="font-black text-3xl md:text-4xl uppercase tracking-tighter leading-none">
                Ready to be{" "}
                <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.35)" }}>
                  Made For This?
                </span>
              </p>
            </div>
            <a
              href="#waitlist"
              className="group flex-shrink-0 inline-flex items-center gap-3 rounded-full border border-white/20 px-8 py-4 text-sm font-black uppercase tracking-widest text-white hover:bg-white hover:text-brand-black transition-all duration-300"
            >
              Join Waitlist
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

      </div>
    </Bounded>
  );
}