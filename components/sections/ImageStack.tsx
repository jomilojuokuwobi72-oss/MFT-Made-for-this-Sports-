"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Bounded } from "@/components/ui/Bounded";

const images = [
    { src: "/images/athlete_preparation_1772618686160.png", label: "PREPARE", number: "01" },
    { src: "/images/athlete_action_1772618445997.png", label: "TRAIN", number: "02" },
    { src: "/images/athlete_celebration_1772618704087.png", label: "COMPETE", number: "03" },
    { src: "/images/athlete_preparation_1772618686160.png", label: "PROVE", number: "04" },
    { src: "/images/athlete_action_1772618445997.png", label: "RISE", number: "05" },
    { src: "/images/athlete_celebration_1772618704087.png", label: "WIN", number: "06" },
    { src: "/images/athlete_preparation_1772618686160.png", label: "LEGACY", number: "07" },
    { src: "/images/athlete_action_1772618445997.png", label: "MFT", number: "08" },
];

// Diagonal stagger offsets — creates the cascade waterfall look
const topOffsets = [20, 80, 140, 60, 100, 30, 110, 50];

export default function ImageStack() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        const scroller = document.getElementById("main-scroll");
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!scroller || !section || !track) return;

        const cards = gsap.utils.toArray<HTMLElement>(".img-card", track);

        // ── Step 1: Cards start invisible and staggered-reveal on scroll-in ──────
        // Each card flies up from below with a tight stagger — fluid, no lag
        gsap.set(cards, { y: 80, opacity: 0 });

        gsap.to(cards, {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            ease: "power3.out",
            duration: 0.6,
            scrollTrigger: {
                trigger: section,
                scroller,
                start: "top 75%",
                toggleActions: "play none none reverse",
                // No scrub here — this is a one-shot entrance, not scrubbed
            },
        });

        // ── Step 2: Horizontal scroll — pin section, drag track left ─────────────
        // Wait for layout to be ready before measuring
        ScrollTrigger.refresh();

        const totalScroll = track.scrollWidth - window.innerWidth + 96;

        gsap.to(track, {
            x: -totalScroll,
            ease: "none",  // CRITICAL: ease:none = perfectly 1:1 with scroll, no drag
            scrollTrigger: {
                trigger: section,
                scroller,
                pinnedContainer: scroller,
                start: "top top",
                end: () => `+=${totalScroll}`,
                scrub: 0.5,  // Low value = very responsive, almost no lag
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            },
        });

        // ── Step 3: Subtle per-card vertical parallax (very gentle) ──────────────
        cards.forEach((card, i) => {
            const depth = ((i % 3) - 1) * 15; // -15, 0, or +15px — very subtle
            if (depth === 0) return;
            gsap.to(card, {
                y: depth,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    scroller,
                    start: "top top",
                    end: () => `+=${totalScroll}`,
                    scrub: true,
                },
            });
        });

    }, { scope: sectionRef });

    return (
        <Bounded
            as="section"
            id="imagestack"
            ref={sectionRef}
            className="relative bg-transparent text-white"
            style={{ minHeight: "100vh" }}
        >
            {/* Labels */}
            <div className="absolute top-10 left-0 right-0 flex items-center justify-between px-8 z-20 pointer-events-none">
                <span className="font-mono text-xs text-white/30 tracking-[0.3em] uppercase">The Journey</span>
                <span className="font-mono text-xs text-white/30 tracking-[0.3em] uppercase">08 Frames</span>
            </div>

            {/* Track */}
            <div
                ref={trackRef}
                className="flex items-start gap-4 pl-16 pr-24 pt-24 pb-12"
                style={{ width: "max-content", willChange: "transform" }}
            >
                {images.map((img, i) => (
                    <div
                        key={i}
                        className="img-card relative flex-shrink-0 group cursor-pointer"
                        style={{
                            width: "clamp(200px, 21vw, 300px)",
                            marginTop: `${topOffsets[i]}px`,
                        }}
                    >
                        <div
                            className="relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group-hover:border-white/25 transition-all duration-500"
                            style={{ aspectRatio: "3/4" }}
                        >
                            <img
                                src={img.src}
                                alt={img.label}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-[1.04] group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />

                            {/* Violet sweep on hover */}
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-violet scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                            {/* Label */}
                            <div className="absolute bottom-0 left-0 right-0 p-5">
                                <p className="font-black text-lg uppercase tracking-tighter leading-none translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                                    {img.label}
                                </p>
                            </div>

                            {/* Number */}
                            <div className="absolute top-4 left-4">
                                <span className="font-mono text-[10px] text-white/30">{img.number}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
        </Bounded>
    );
}