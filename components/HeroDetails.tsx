"use client";

import AnimatedText from "./AnimatedText";
import { useWaitlist } from "./WaitlistProvider";

export default function HeroDetails() {
  const { openWaitlist } = useWaitlist();

  return (
    <section className="py-48 bg-black text-white relative border-t border-white/5 noise-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-12">
          <div className="max-w-6xl">
            <AnimatedText
              text="A football community built to spotlight talent. We’re building an app that tracks player stats, highlights growth, and helps the right people discover the right players."
              animationClass="animate-slide-up"
              staggerDelay={0.015}
              className="text-white text-3xl md:text-5xl lg:text-6xl leading-[1.1] font-sans font-medium tracking-tight"
            />
          </div>

          <div className="animate-slide-up opacity-0" style={{ animationDelay: '2.5s', animationFillMode: 'forwards' }}>
            <button
              onClick={openWaitlist}
              className="inline-flex items-center justify-center border border-white/20 px-12 py-6 font-display font-bold tracking-[0.2em] text-sm text-white transition-all hover:bg-white hover:text-black active:scale-95 rounded-none uppercase"
            >
              Get Scouted
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

