"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bounded } from "@/components/ui/Bounded";
import { TextSplitter } from "@/components/ui/TextSplitter";
import { Mail, Phone } from "lucide-react";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Header Animation
      const header = container.querySelector(".contact-header");
      const splitChars = container.querySelectorAll(".contact-header .split-char");
      if (header && splitChars.length > 0) {
        gsap.fromTo(Array.from(splitChars), {
          y: 40,
          opacity: 0,
          rotateX: -90,
        }, {
          scrollTrigger: {
            trigger: header,
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

      const intro = container.querySelector(".contact-intro");
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

      // Cards Stagger
      const cardsContainer = container.querySelector(".contact-cards-container");
      const cards = container.querySelectorAll(".contact-card");
      if (cardsContainer && cards.length > 0) {
        gsap.fromTo(Array.from(cards), {
          y: 40,
          opacity: 0,
        }, {
          scrollTrigger: {
            trigger: cardsContainer,
            scroller: "#main-scroll",
            start: "top 80%",
          },
          y: 0,
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
      id="contact"
      className="text-white py-24 md:py-32 relative overflow-hidden"
    >
      <div ref={containerRef} className="relative z-10 w-full max-w-5xl mx-auto">
        <div className="glass-container relative overflow-hidden p-8 sm:p-12 md:p-16 border-white/10 text-center">

          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-cyan/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-violet/10 rounded-full blur-[80px] pointer-events-none translate-y-1/2 -translate-x-1/3" />

          <div className="relative z-10">
            <h2 className="contact-header text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 inline-block">
              <TextSplitter text="Get In Touch" />
            </h2>

            <p className="contact-intro mt-6 text-lg sm:text-xl text-white/70 leading-relaxed font-medium max-w-2xl mx-auto">
              Want to partner, sponsor, or help build the MFT community? Send us a message and we&apos;ll get back to you.
            </p>

            <div className="contact-cards-container mt-12 grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto text-left">
              {/* Email Card */}
              <div className="contact-card glass-container relative overflow-hidden p-8 md:p-10 hover:border-brand-cyan/40 transition-colors group">
                <div className="absolute inset-0 bg-linear-to-b from-brand-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-16 h-16 rounded-2xl bg-brand-cyan/10 flex items-center justify-center mb-6">
                  <Mail className="w-8 h-8 text-brand-cyan" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2">
                  Email Us
                </h3>
                <p className="text-white/60 mb-6 font-medium">
                  We&apos;re here to help and answer any question you might have.
                </p>
                <a
                  href="mailto:madeforthissports@gmail.com"
                  className="inline-flex items-center text-xl font-bold text-brand-cyan hover:text-white transition-colors wrap-break-word"
                >
                  madeforthissports@gmail.com
                </a>
              </div>

              {/* Phone Card */}
              <div className="contact-card glass-container relative overflow-hidden p-8 md:p-10 hover:border-brand-violet/40 transition-colors group">
                <div className="absolute inset-0 bg-linear-to-b from-brand-violet/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-16 h-16 rounded-2xl bg-brand-violet/10 flex items-center justify-center mb-6">
                  <Phone className="w-8 h-8 text-brand-violet" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2">
                  Call Us
                </h3>
                <p className="text-white/60 mb-6 font-medium">
                  Prefer speaking directly?
                </p>
                <a
                  href="tel:+16827252801"
                  className="inline-flex items-center text-xl font-bold text-brand-violet hover:text-white transition-colors wrap-break-word"
                >
                  +1 (682) 725-2801
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
}
