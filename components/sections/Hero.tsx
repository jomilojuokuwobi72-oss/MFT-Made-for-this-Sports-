"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bounded } from "@/components/ui/Bounded";
import { TextSplitter } from "@/components/ui/TextSplitter";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const splitChars = container.querySelectorAll(".hero-title .split-char");

      if (splitChars.length > 0) {
        const tl = gsap.timeline();

        tl.fromTo(
          Array.from(splitChars),
          {
            y: 100,
            opacity: 0,
            rotate: 15,
          },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            stagger: 0.05,
            ease: "back.out(1.5)",
            duration: 0.8,
            delay: 0.2,
          },
        );

        const heroBody = container.querySelector(".hero-body");
        if (heroBody) {
          tl.fromTo(
            heroBody,
            {
              y: 20,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.4",
          );
        }

        const buttons = container.querySelectorAll(".hero-buttons a");
        if (buttons.length > 0) {
          tl.fromTo(
            Array.from(buttons),
            {
              y: 20,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              stagger: 0.1,
              duration: 0.6,
              ease: "power2.out",
            },
            "-=0.4",
          );
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Bounded
      as="section"
      id="home"
      className="hero-section relative min-h-screen overflow-hidden text-white flex items-center"
    >
      {/* Huge Background Text with subtle glow */}
      <div className="absolute inset-0 flex items-center justify-center z-0 select-none overflow-hidden pointer-events-none">
        <h1 className="hero-title font-black uppercase tracking-tighter leading-none text-[25vw] sm:text-[28vw] md:text-[32vw] text-[#111] whitespace-nowrap">
          <TextSplitter text="MFT" wordDisplayStyle="inline-block" />
        </h1>
      </div>

      {/* Decorative Grid/Signals */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute top-[20%] left-[10%] signal-line" />
        <div
          className="absolute top-[60%] right-[10%] signal-line"
          style={{ "--rotation": "270deg" } as React.CSSProperties}
          Ω
        />
      </div>

      {/* Foreground Text & CTA */}
      <div
        ref={containerRef}
        className="absolute bottom-10 left-6 right-6 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:right-20 md:left-auto md:w-1/2 z-20 flex flex-col gap-6 max-w-xl pointer-events-auto text-left md:text-right items-start md:items-end"
      >
        <h2 className="hero-title font-black uppercase tracking-tighter text-5xl md:text-7xl text-white leading-none">
          <TextSplitter text="DEFY THE" /> <br />
          <span className="text-brand-violet">
            <TextSplitter text="ORDINARY." />
          </span>
        </h2>

        <p className="hero-body mt-8 max-w-lg text-xl md:text-2xl text-white/80 leading-relaxed font-medium">
          A new era of football scouting and player progression. Join the
          movement and prove you&apos;re{" "}
          <span className="font-bold text-brand-violet">MADE FOR THIS</span>.
        </p>

        <div className="hero-buttons flex flex-wrap gap-4 mt-4 justify-start md:justify-end">
          <a
            href="#waitlist"
            className="flex items-center justify-center rounded-full bg-brand-violet px-8 py-4 text-lg font-bold text-white transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(112,0,255,0.4)]"
          >
            Join Waitlist
          </a>
        </div>
      </div>
    </Bounded>
  );
}
