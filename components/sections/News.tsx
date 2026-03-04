"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bounded } from "@/components/ui/Bounded";
import { TextSplitter } from "@/components/ui/TextSplitter";
import { CheckCircle2, ChevronRight, Target, TrendingUp } from "lucide-react";

const features = [
  {
    title: "Player Profiles",
    description: "A clean, verified profile scouts can actually trust. Highlight your key stats, position, and physical metrics.",
    icon: CheckCircle2,
    color: "text-brand-cyan",
    bg: "bg-brand-cyan/10",
  },
  {
    title: "Stats Tracking",
    description: "Track matches, training sessions, and key performance indicators. Watch your progress grow week by week.",
    icon: TrendingUp,
    color: "text-[#00FF94]",
    bg: "bg-[#00FF94]/10",
  },
  {
    title: "Discovery & Network",
    description: "Make your talent impossible to ignore. Connect with scouts, coaches, and clubs looking for your exact profile.",
    icon: Target,
    color: "text-brand-violet",
    bg: "bg-brand-violet/10",
  },
];

export default function News() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Critical: Ensure the scroller exists
    const scroller = document.querySelector("#main-scroll");
    if (!scroller) return;

    const ctx = gsap.context(() => {
      // Header Animation
      const headerTitle = container.querySelector(".news-header");
      const splitChars = container.querySelectorAll(".news-header .split-char");
      if (headerTitle && splitChars.length > 0) {
        gsap.fromTo(Array.from(splitChars), {
          y: 50,
          opacity: 0,
          rotateX: -90,
        }, {
          scrollTrigger: {
            trigger: headerTitle,
            scroller: "#main-scroll",
            start: "top 80%",
          },
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.02,
          duration: 0.8,
          ease: "back.out(1.5)",
        });
      }

      const intro = container.querySelector(".news-intro");
      if (intro) {
        gsap.fromTo(intro, {
          y: 20,
          opacity: 0,
        }, {
          scrollTrigger: {
            trigger: intro,
            scroller: "#main-scroll",
            start: "top 85%",
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.2,
        });
      }

      // Layout Box Animation
      const layoutBox = container.querySelector(".news-layout-box");
      if (layoutBox) {
        gsap.fromTo(layoutBox, {
          y: 60,
          opacity: 0,
          scale: 0.95,
        }, {
          scrollTrigger: {
            trigger: layoutBox,
            scroller: "#main-scroll",
            start: "top 75%",
          },
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
        });
      }

      // Features list stagger
      const featuresGrid = container.querySelector(".features-grid");
      const features = container.querySelectorAll(".feature-item");
      if (featuresGrid && features.length > 0) {
        gsap.fromTo(Array.from(features), {
          x: -50,
          opacity: 0,
        }, {
          scrollTrigger: {
            trigger: featuresGrid,
            scroller: "#main-scroll",
            start: "top 80%",
          },
          x: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
        });
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <Bounded
      as="section"
      id="news"
      className="text-white py-24 md:py-32 relative overflow-hidden"
    >
      <div ref={containerRef} className="relative z-10 w-full mb-16">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="news-layout-box glass-container relative overflow-hidden p-8 sm:p-12 md:p-16 border-white/10 mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left Content: Intro & CTA */}
            <div>
              <div className="inline-block rounded-full bg-brand-violet/20 border border-brand-violet/50 px-4 py-1.5 text-sm font-bold text-brand-violet mb-6">
                App In Development
              </div>
              <h2 className="news-header text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-linear-to-br from-white to-white/70">
                <TextSplitter text="Next Level Platform." />
              </h2>

              <p className="news-intro mt-6 text-lg sm:text-xl text-white/70 leading-relaxed font-medium">
                We&apos;re building the platform that helps players get seen: track your stats,
                build a verified profile, and show consistent growth over time.
              </p>

              <div className="news-intro mt-10 flex flex-wrap gap-4">
                <a
                  href="#waitlist"
                  className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 text-lg font-bold text-brand-black transition-transform hover:scale-105 active:scale-95"
                >
                  Join Waitlist
                  <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            {/* Right Content: Feature List */}
            <div className="features-grid flex flex-col gap-6">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={idx}
                    className="feature-item relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-white/10 hover:bg-white/10"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${feature.bg}`}>
                        <Icon className={`h-6 w-6 ${feature.color}`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold tracking-tight text-white mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-white/60 leading-relaxed text-sm sm:text-base">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </Bounded>
  );
}
