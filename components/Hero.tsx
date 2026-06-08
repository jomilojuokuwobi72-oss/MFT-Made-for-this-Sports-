"use client";

import AnimatedText from "@/components/AnimatedText";
import { useWaitlist } from "./WaitlistProvider";
import Button from "./ui/Button";

export default function Hero() {
  const { openWaitlist } = useWaitlist();

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden text-white noise-bg"
    >
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 grayscale opacity-40"
      >
        <source src="/clipage.mp4" type="video/mp4" />
      </video>

      {/* Grid Overlay for Technical Look */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,black_90%)]" />
      <div className="absolute inset-0 z-10 opacity-20 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-size-[40px_40px]" />

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 pt-40 pb-32 md:pt-52 md:pb-52 flex flex-col justify-end min-h-screen">

        <div className="flex flex-col w-full sm:w-fit group">
          <div className="font-display leading-[0.85] text-[clamp(3.25rem,14vw,17rem)] tracking-tighter">
            <AnimatedText
              text="Made For"
              animationClass="animate-slide-up"
              className="block italic"
            />
            <div className="flex flex-wrap items-baseline gap-x-3 sm:gap-x-8">
              <AnimatedText
                text="This"
                animationClass="animate-slide-up"
                className="[-webkit-text-stroke:1px_rgba(255,255,255,0.3)] text-transparent"
                staggerDelay={0.06}
              />
              <AnimatedText
                text="Sports."
                animationClass="animate-slide-up"
                staggerDelay={0.07}
              />
            </div>
          </div>

          <div className="mt-8 sm:ml-4 self-stretch sm:self-start w-full sm:w-auto animate-slide-up" style={{ animationDelay: '1s', opacity: 0, animationFillMode: 'forwards' }}>
            <Button
              onClick={openWaitlist}
              variant="solid"
              size="lg"
              className="w-full sm:w-auto"
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              }
            >
              Join the Journey
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

