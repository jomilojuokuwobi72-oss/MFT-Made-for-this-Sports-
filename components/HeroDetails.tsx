"use client";

import AnimatedText from "./AnimatedText";
import { useWaitlist } from "./WaitlistProvider";
import Button from "./ui/Button";

export default function HeroDetails() {
  const { openWaitlist } = useWaitlist();

  return (
    <section className="py-28 sm:py-40 md:py-48 bg-black text-white relative border-t border-white/5 noise-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-12">
          <div className="max-w-6xl">
            <AnimatedText
              text="A football community built to spotlight talent. We’re building an app that tracks player stats, highlights growth, and helps the right people discover the right players."
              animationClass="animate-slide-up"
              staggerDelay={0.015}
              className="text-white text-3xl md:text-5xl lg:text-6xl leading-[1.1] font-sans font-medium tracking-tight"
            />
          </div>

          <div className="animate-slide-up opacity-0 self-start" style={{ animationDelay: '2.5s', animationFillMode: 'forwards' }}>
            <Button
              onClick={openWaitlist}
              variant="solid"
              size="sm"
              className="tracking-[0.2em] sm:[&_.btn-face]:px-16 sm:[&_.btn-face]:py-8 sm:[&_.btn-face]:text-4xl sm:[&_.btn-face]:gap-4"
            >
              Get Scouted
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

