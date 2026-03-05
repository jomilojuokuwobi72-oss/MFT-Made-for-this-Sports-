"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Bounded } from "@/components/ui/Bounded";

const cards = [
  {
    title: "COMMUNITY",
    image: "/about-1.jpg",
    description: "We're building a football community that connects players, teams, and fans—online and in real life.",
    number: "01",
  },
  {
    title: "DISCOVERY",
    image: "/about-2.jpg",
    description: "MFT exists to spotlight hidden talent by giving players a platform to be seen and recognized.",
    number: "02",
  },
  {
    title: "STATS & GROWTH",
    image: "/about-3.jpg",
    description: "Our upcoming app helps athletes track stats, measure progress, and build credibility through performance.",
    number: "03",
  },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const scroller = document.getElementById("main-scroll");
    if (!scroller || !containerRef.current) return;

    // ── Heading: each WORD slides up staggered (not chars — too many) ─────────
    // We manually split the heading words for the animation
    const headingWords = containerRef.current.querySelectorAll(".heading-word");
    if (headingWords.length > 0) {
      gsap.set(headingWords, { y: "105%", opacity: 0 });
      gsap.to(headingWords, {
        y: 0,
        opacity: 1,
        stagger: 0.07,        // tight stagger between words
        ease: "power4.out",
        duration: 0.9,
        scrollTrigger: {
          trigger: ".about-heading-wrap",
          scroller,
          start: "top 80%",
          toggleActions: "play none none reverse",
          // toggleActions not scrub — so it plays fully and crisply
        },
      });
    }

    // ── Tagline slides up ─────────────────────────────────────────────────────
    gsap.set(".about-tagline", { y: 30, opacity: 0 });
    gsap.to(".about-tagline", {
      y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-tagline",
        scroller,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    // ── Stats count up ────────────────────────────────────────────────────────
    containerRef.current.querySelectorAll(".stat-number").forEach((el) => {
      const target = parseInt(el.getAttribute("data-target") || "0");
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top 85%",
          toggleActions: "play none none reset",
        },
        onUpdate: () => { el.textContent = Math.round(obj.val).toLocaleString(); },
      });
    });

    // ── Divider lines expand ──────────────────────────────────────────────────
    gsap.set(".hr-line", { scaleX: 0, transformOrigin: "left" });
    gsap.to(".hr-line", {
      scaleX: 1, duration: 1.2, ease: "power3.out",
      scrollTrigger: {
        trigger: ".stats-row",
        scroller,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    // ── Cards: each enters from below with a staggered delay ─────────────────
    const cardEls = containerRef.current.querySelectorAll(".about-card");
    gsap.set(cardEls, { y: 60, opacity: 0 });
    gsap.to(cardEls, {
      y: 0, opacity: 1,
      stagger: 0.15,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".cards-grid",
        scroller,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // ── Image parallax inside each card (scrubbed) ────────────────────────────
    cardEls.forEach((card) => {
      const img = card.querySelector(".card-img-inner");
      if (!img) return;
      gsap.fromTo(img,
        { y: -30 },
        {
          y: 30,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            scroller,
            start: "top bottom",
            end: "bottom top",
            scrub: true,   // scrub:true = perfectly 1:1, zero lag
          },
        }
      );
    });

    // ── Mission/Vision blocks slide from sides ────────────────────────────────
    const blocks = containerRef.current.querySelectorAll(".about-block");
    blocks.forEach((block, i) => {
      gsap.set(block, { x: i % 2 === 0 ? -50 : 50, opacity: 0 });
      gsap.to(block, {
        x: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: {
          trigger: block,
          scroller,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // ── Background orbs gentle parallax ──────────────────────────────────────
    gsap.to(".orb-1", {
      y: -160, ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        scroller,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
    gsap.to(".orb-2", {
      y: -80, ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        scroller,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

  }, { scope: containerRef });

  return (
    <Bounded
      as="section"
      id="about"
      className="relative bg-brand-black text-white overflow-hidden py-32 md:py-48" style={{ position: "relative", zIndex: 40 }}
    >
      {/* Background orbs */}
      <div className="orb-1 absolute -top-40 -right-40 w-[70vw] h-[70vw] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(112,0,255,0.07) 0%, transparent 70%)" }} />
      <div className="orb-2 absolute top-1/2 -left-20 w-[40vw] h-[40vw] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(230,97,50,0.05) 0%, transparent 70%)" }} />

      {/* Noise overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025] mix-blend-overlay z-50">
        <svg width="100%" height="100%">
          <filter id="abt-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <rect width="100%" height="100%" filter="url(#abt-noise)" />
          </filter>
        </svg>
      </div>

      <div ref={containerRef} className="relative z-10">

        {/* ── Giant Heading ── */}
        <div className="about-heading-wrap mb-4 overflow-hidden">
          {/* Each word is wrapped in overflow:hidden so it clips cleanly */}
          <h2 className="about-heading text-[12vw] md:text-[11vw] leading-[0.88] font-black uppercase tracking-tighter text-white">
            {["READY", "FOR"].map((word) => (
              <span key={word} className="inline-block overflow-hidden mr-[0.2em]">
                <span className="heading-word inline-block">{word}</span>
              </span>
            ))}
            <br />
            {["THE", "NEXT"].map((word) => (
              <span key={word} className="inline-block overflow-hidden mr-[0.2em]">
                <span
                  className="heading-word inline-block text-transparent"
                  style={{ WebkitTextStroke: "1px rgba(255,255,255,0.22)" }}
                >
                  {word}
                </span>
              </span>
            ))}
            <br />
            <span className="inline-block overflow-hidden">
              <span className="heading-word inline-block">LEVEL</span>
            </span>
          </h2>
        </div>

        {/* ── Tagline ── */}
        <div className="about-tagline grid grid-cols-1 md:grid-cols-12 mb-24 md:mb-36 gap-8">
          <div className="md:col-start-7 md:col-span-5 border-l border-white/15 pl-8">
            <p className="text-xl md:text-2xl text-white/55 font-medium leading-snug">
              Made For This is a brutalist approach to talent discovery.
              We build the architecture for your athletic legacy.
            </p>
          </div>
        </div>

        {/* ── Stats Bar ── */}
        <div className="stats-row">
          <div className="hr-line w-full h-px bg-white/10 mb-14" />
          <div className="grid grid-cols-3 gap-6 mb-14">
            {[
              { label: "Athletes Tracked", value: 2400, suffix: "+" },
              { label: "Goals Recorded", value: 18000, suffix: "+" },
              { label: "Cities Active", value: 34, suffix: "" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col">
                <div className="flex items-end gap-1">
                  <span
                    className="stat-number font-black text-5xl md:text-7xl leading-none tabular-nums"
                    data-target={s.value}
                  >0</span>
                  <span className="font-black text-4xl md:text-6xl leading-none text-brand-violet mb-1">{s.suffix}</span>
                </div>
                <span className="font-mono text-xs text-white/35 tracking-widest uppercase mt-3">{s.label}</span>
              </div>
            ))}
          </div>
          <div className="hr-line w-full h-px bg-white/10" />
        </div>

        {/* ── Cards ── */}
        <div className="cards-grid grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mt-24 md:mt-32">
          {cards.map((card, i) => (
            <div
              key={card.title}
              className="about-card group relative flex flex-col"
              style={{ marginTop: i === 1 ? "3rem" : i === 2 ? "6rem" : 0 }}
            >
              {/* Image with parallax inner */}
              <div className="relative overflow-hidden rounded-2xl mb-6" style={{ aspectRatio: "4/5" }}>
                <div className="card-img-inner absolute inset-0 scale-[1.15]">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-black/25 mix-blend-multiply" />
                </div>
                <span className="absolute top-4 left-4 font-mono text-[10px] text-white/40 z-10">{card.number}</span>
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-violet scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10" />
              </div>

              <div className="border-t border-white/10 pt-6 group-hover:border-brand-violet/40 transition-colors duration-400">
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-3 leading-none">{card.title}</h3>
                <p className="text-white/45 text-base leading-relaxed">{card.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Mission / Vision ── */}
        <div className="mt-40 md:mt-64 grid grid-cols-1 md:grid-cols-2 gap-24 md:gap-32">
          <div className="about-block flex flex-col">
            <span className="font-mono text-xs text-brand-violet mb-8 tracking-[0.3em] uppercase">/ Mission</span>
            <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tight mb-8 leading-none">
              Democratizing<br />
              <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}>
                Opportunity.
              </span>
            </h3>
            <p className="text-lg text-white/45 leading-relaxed max-w-sm">
              A platform that makes talent impossible to ignore, regardless of where you start.
            </p>
          </div>

          <div className="about-block flex flex-col md:mt-24">
            <span className="font-mono text-xs text-brand-cyan mb-8 tracking-[0.3em] uppercase">/ Vision</span>
            <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tight mb-8 leading-none">
              Verified<br />
              <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}>
                Performance.
              </span>
            </h3>
            <p className="text-lg text-white/45 leading-relaxed max-w-sm">
              A world where every player is measured fairly and connected to opportunities through hard data.
            </p>
          </div>
        </div>

      </div>
    </Bounded>
  );
}