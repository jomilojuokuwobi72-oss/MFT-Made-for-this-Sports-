"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Bounded } from "@/components/ui/Bounded";
import { TextSplitter } from "@/components/ui/TextSplitter";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    const player = playerRef.current;
    if (!container || !player) return;

    const ctx = gsap.context(() => {

      // ── 1. ENTRANCE ANIMATION ──────────────────────────────────────────────
      const splitChars = container.querySelectorAll(".hero-title .split-char");
      const entranceTl = gsap.timeline();

      entranceTl.fromTo(
        player,
        { y: "100vh" },
        { y: 0, duration: 1.5, ease: "power4.out" }
      );

      if (splitChars.length > 0) {
        entranceTl.fromTo(
          Array.from(splitChars),
          { y: 100, opacity: 0, rotate: 15 },
          { y: 0, opacity: 1, rotate: 0, stagger: 0.05, ease: "back.out(1.5)", duration: 0.8, delay: 0.2 },
          "-=1.0"
        );
        const heroBody = container.querySelector(".hero-body");
        if (heroBody) {
          entranceTl.fromTo(heroBody, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.4");
        }
        const buttons = container.querySelectorAll(".hero-buttons a");
        if (buttons.length > 0) {
          entranceTl.fromTo(Array.from(buttons), { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power2.out" }, "-=0.4");
        }
      }

      // ── 2. SCROLL ANIMATION ────────────────────────────────────────────────
      // Wait for entrance to finish so getBoundingClientRect is accurate
      entranceTl.eventCallback("onComplete", () => {
        gsap.delayedCall(0.1, setupScrollAnimation);
      });

      function setupScrollAnimation() {
        const scroller = document.getElementById("main-scroll");
        const visionEl = document.getElementById("vision");
        if (!scroller || !visionEl) return;

        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // ── Measure player's natural resting position ──
        const playerRect = player.getBoundingClientRect();
        const naturalCenterX = playerRect.left + playerRect.width / 2;
        const naturalCenterY = playerRect.top + playerRect.height / 2;
        const naturalWidth = playerRect.width;
        const naturalHeight = playerRect.height;

        // ── Calculate I-slot target ──
        // Vision text is centered. At text size 25vw, full word "VISION" ≈ 100vw wide.
        // V ≈ 20vw, I-slot ≈ 13vw → I-slot center from left edge of text ≈ 26.5vw
        // Since text is centered in vw, left edge of text ≈ 0 (it overflows)
        // So I-slot center X ≈ 26.5vw from left of viewport
        const iSlotCenterX = vw * 0.265;

        // Vision section will be vertically centered when its top = viewport top
        // At that moment, the center of Vision = 50vh
        const iSlotCenterY = vh * 0.5;

        // Target scale: make player HEIGHT = text height (25vw on sm+, 20vw on mobile)
        const textH = vw < 640 ? vw * 0.20 : vw * 0.25;
        const targetScale = textH / naturalHeight;

        // Final transform values (offset from natural position)
        const endX = iSlotCenterX - naturalCenterX;
        const endY = iSlotCenterY - naturalCenterY;
        const endScale = targetScale;

        // ── Single master scroll handler ───────────────────────────────────
        // We drive everything from ONE rAF-based scroll listener on the scroller.
        // This gives us total control with zero GSAP timing conflicts.

        // Key scroll positions (in scroller.scrollTop units):
        // - shrinkStart: when Vision top enters viewport bottom = Vision.offsetTop - vh
        // - shrinkEnd:   when Vision top hits viewport top     = Vision.offsetTop
        // - visionEnd:   when Vision bottom hits viewport top  = Vision.offsetTop + Vision.offsetHeight

        const getPositions = () => {
          const visionTop = visionEl.offsetTop;
          const visionHeight = visionEl.offsetHeight;
          return {
            shrinkStart: visionTop - vh,
            shrinkEnd: visionTop,
            visionEnd: visionTop + visionHeight,
          };
        };

        let rafId: number;
        let lastScrollTop = -1;

        const onScroll = () => {
          const st = scroller.scrollTop;
          if (st === lastScrollTop) return;
          lastScrollTop = st;

          const { shrinkStart, shrinkEnd, visionEnd } = getPositions();

          if (st <= shrinkStart) {
            // ── Before Vision: player at natural hero position ──
            gsap.set(player, { x: 0, y: 0, scale: 1, opacity: 1, transformOrigin: "center center" });

          } else if (st <= shrinkEnd) {
            // ── Shrinking phase: Vision scrolling in ──
            // progress 0 → 1 as st goes shrinkStart → shrinkEnd
            const progress = (st - shrinkStart) / (shrinkEnd - shrinkStart);
            const eased = gsap.parseEase("power2.inOut")(progress);

            gsap.set(player, {
              x: endX * eased,
              y: endY * eased,
              scale: 1 + (endScale - 1) * eased,
              opacity: 1,
              transformOrigin: "center center",
            });

          } else if (st <= visionEnd) {
            // ── Vision in viewport: player locked to text, scrolls with it ──
            // How far past shrinkEnd have we scrolled?
            const scrolledPastVisionTop = st - shrinkEnd;

            // Player stays at I-slot position but moves UP with the text
            // Vision text center moves up by scrolledPastVisionTop
            gsap.set(player, {
              x: endX,
              y: endY - scrolledPastVisionTop,
              scale: endScale,
              opacity: 1,
              transformOrigin: "center center",
            });

          } else {
            // ── Past Vision: player hidden (it scrolled off with the text) ──
            gsap.set(player, { opacity: 0 });
          }
        };

        // Use rAF loop for silky smooth updates
        const tick = () => {
          onScroll();
          rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);

        // Cleanup
        return () => cancelAnimationFrame(rafId);
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Player image: fixed to viewport */}
      <div className="fixed inset-0 z-40 pointer-events-none" style={{ overflow: "visible" }}>
        <div
          ref={playerRef}
          className="absolute -bottom-10 -left-[20%] md:-left-[5%] w-[150vw] sm:w-[800px] md:w-[1000px] lg:w-[1200px] xl:w-[1300px] h-[80vh] md:h-[90vh] lg:h-[100vh] pointer-events-none"
          style={{ transform: "translateY(100vh)", willChange: "transform" }}
        >
          <div className="relative w-full h-full" style={{ backfaceVisibility: "hidden" }}>
            <Image
              src="/hero.png"
              alt="Soccer Player Action"
              fill
              draggable={false}
              className="object-contain object-bottom"
              style={{
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                filter: "drop-shadow(0 30px 50px rgba(0,0,0,0.7)) contrast(1.05) saturate(1.05)",
              }}
              priority
            />
          </div>
        </div>
      </div>

      <Bounded
        as="section"
        id="home"
        className="hero-section relative min-h-screen overflow-hidden text-white flex items-center"
      >
        <div className="absolute inset-0 flex items-center justify-center z-0 select-none overflow-hidden pointer-events-none">
          <h1 className="hero-title font-black uppercase tracking-tighter leading-none text-[25vw] sm:text-[28vw] md:text-[32vw] text-[#111] whitespace-nowrap">
            <TextSplitter text="MFT" wordDisplayStyle="inline-block" />
          </h1>
        </div>

        <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
          <div className="absolute top-[20%] left-[10%] signal-line" />
          <div className="absolute top-[60%] right-[10%] signal-line" style={{ "--rotation": "270deg" } as React.CSSProperties} />
        </div>

        <div
          ref={containerRef}
          className="absolute bottom-10 left-6 right-6 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:right-20 md:left-auto md:w-1/2 z-20 flex flex-col gap-6 lg:gap-8 max-w-2xl pointer-events-auto text-left md:text-right items-start md:items-end"
        >
          <h2 className="hero-title font-black uppercase tracking-tighter text-6xl md:text-8xl lg:text-[110px] xl:text-[130px] text-white leading-[0.85] pb-2 md:pb-4 drop-shadow-2xl">
            <TextSplitter text="DEFY THE" /> <br />
            <span className="text-brand-violet drop-shadow-[0_0_15px_rgba(230,97,50,0.5)]">
              <TextSplitter text="ORDINARY" />
            </span>
          </h2>

          <p className="hero-body mt-1 max-w-lg text-xl md:text-2xl text-white/80 leading-relaxed">
            A new era of football scouting and player progression. Join the movement and prove you&apos;re{" "}
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
    </>
  );
}