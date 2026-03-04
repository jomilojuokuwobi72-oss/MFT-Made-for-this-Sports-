"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Bounded } from "@/components/ui/Bounded";
import { TextSplitter } from "@/components/ui/TextSplitter";

type Card = {
  title: string;
  image: string;
  description: string;
};

const cards: Card[] = [
  {
    title: "COMMUNITY",
    image: "/about-1.jpg",
    description:
      "We're building a football community that connects players, teams, and fans—online and in real life.",
  },
  {
    title: "DISCOVERY",
    image: "/about-2.jpg",
    description:
      "MFT exists to spotlight hidden talent by giving players a platform to be seen and recognized.",
  },
  {
    title: "STATS & GROWTH",
    image: "/about-3.jpg",
    description:
      "Our upcoming app helps athletes track stats, measure progress, and build credibility through performance.",
  },
];

function AboutCard({ card, index }: { card: Card; index: number }) {
  return (
    <div className="about-card group relative flex flex-col h-full border-t border-white/10 pt-8 transition-colors hover:border-brand-cyan/50">
      <span className="text-xs font-mono text-brand-cyan mb-4">
        0{index + 1}
      </span>
      <div className="relative aspect-[4/5] w-full overflow-hidden mb-8">
        <Image
          src={card.image}
          alt={card.title}
          fill
          className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-brand-black/20 mix-blend-multiply" />
      </div>
      <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 leading-none">
        {card.title}
      </h3>
      <p className="text-white/60 text-lg leading-tight tracking-tight">
        {card.description}
      </p>
    </div>
  );
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const scroller = document.querySelector("#main-scroll");
      if (!scroller) return;

      // 1. Typography as Architecture: Large Heading Animation
      const splitChars = containerRef.current?.querySelectorAll(
        ".about-heading .split-char",
      );
      if (splitChars) {
        gsap.fromTo(
          splitChars,
          {
            y: "100%",
            rotateX: -90,
            opacity: 0,
          },
          {
            scrollTrigger: {
              trigger: ".about-heading",
              scroller: "#main-scroll",
              start: "top 90%",
              end: "bottom 60%",
              scrub: 1,
            },
            y: 0,
            rotateX: 0,
            opacity: 1,
            stagger: 0.02,
            ease: "expo.out",
          },
        );
      }

      // 2. Layered Depth: Cards Parallax
      const cards = containerRef.current?.querySelectorAll(".about-card");
      cards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 100 * (i + 1), opacity: 0 },
          {
            scrollTrigger: {
              trigger: card,
              scroller: "#main-scroll",
              start: "top bottom",
              end: "top 70%",
              scrub: 1.5,
            },
            y: 0,
            opacity: 1,
            ease: "expo.out",
          },
        );
      });

      // 3. Subtle background parallax elements
      gsap.to(".bg-parallax", {
        scrollTrigger: {
          trigger: containerRef.current,
          scroller: "#main-scroll",
          scrub: true,
        },
        y: (i, target) => -100 * parseFloat(target.dataset.speed || "0"),
        ease: "none",
      });
    },
    { scope: containerRef },
  );

  return (
    <Bounded
      as="section"
      id="about"
      className="text-white py-32 md:py-64 relative overflow-hidden bg-brand-black"
    >
      {/* Subtle Noise Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay z-50">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      <div ref={containerRef} className="relative z-10">
        {/* Large Architectural Header */}
        <div className="mb-32">
          <h2 className="about-heading text-[15vw] leading-[0.8] font-black uppercase tracking-tighter text-white">
            <TextSplitter text="READY FOR THE NEXT LEVEL" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-12 mt-12 gap-8">
            <div className="md:col-start-7 md:col-span-5">
              <p className="text-xl md:text-2xl text-white/70 font-medium leading-tight">
                Made For This is a brutalist approach to talent discovery. We
                build the architecture for your athletic legacy.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
          {cards.map((card, i) => (
            <AboutCard key={card.title} card={card} index={i} />
          ))}
        </div>

        {/* Mission/Vision Section: Intentional White Space */}
        <div className="mt-64 grid grid-cols-1 md:grid-cols-2 gap-32">
          <div className="about-block flex flex-col">
            <span className="font-mono text-xs text-brand-violet mb-8 tracking-widest uppercase">
              / Mission
            </span>
            <h3 className="text-5xl font-black uppercase tracking-tight mb-8">
              Democratizing <br /> Opportunity.
            </h3>
            <p className="text-xl text-white/50 leading-relaxed max-w-md">
              A platform that makes talent impossible to ignore, regardless of
              where you start.
            </p>
          </div>

          <div className="about-block flex flex-col">
            <span className="font-mono text-xs text-brand-cyan mb-8 tracking-widest uppercase">
              / Vision
            </span>
            <h3 className="text-5xl font-black uppercase tracking-tight mb-8">
              Verified <br /> Performance.
            </h3>
            <p className="text-xl text-white/50 leading-relaxed max-w-md">
              A world where every player is measured fairly and connected to
              opportunities through hard data.
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div
        data-speed="1.2"
        className="bg-parallax absolute top-1/4 -right-20 w-[60vw] h-[60vw] border border-white/5 rounded-full pointer-events-none"
      />
      <div
        data-speed="0.5"
        className="bg-parallax absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-brand-violet/5 blur-[120px] rounded-full pointer-events-none"
      />
    </Bounded>
  );
}
