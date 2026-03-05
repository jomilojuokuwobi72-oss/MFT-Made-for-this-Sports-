"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const images = [
    { src: "/images/athlete_preparation_1772618686160.png", label: "PREPARE", number: "01" },
    { src: "/images/athlete_action_1772618445997.png", label: "TRAIN", number: "02" },
    { src: "/images/athlete_celebration_1772618704087.png", label: "COMPETE", number: "03" },
    { src: "/images/athlete_preparation_1772618686160.png", label: "PROVE", number: "04" },
    { src: "/images/athlete_action_1772618445997.png", label: "RISE", number: "05" },
    { src: "/images/athlete_celebration_1772618704087.png", label: "WIN", number: "06" },
    { src: "/images/athlete_preparation_1772618686160.png", label: "LEGACY", number: "07" },
];

const topOffsets = [20, 80, 140, 60, 100, 30, 110];

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

        // Entrance — opacity only, marginTop offsets must not be touched
        gsap.set(cards, { opacity: 0 });
        gsap.to(cards, {
            opacity: 1,
            stagger: 0.08,
            ease: "power2.out",
            duration: 0.6,
            scrollTrigger: {
                trigger: section,
                scroller,
                start: "top 75%",
                toggleActions: "play none none reverse",
            },
        });

        // The horizontal distance we need to travel:
        // We want x to go from 0 to -(trackWidth - viewportWidth)
        // so the last card's RIGHT edge reaches the LEFT edge of viewport.
        // Then we add one extra viewport width so it goes fully offscreen.
        const getTravelDist = () => {
            return track.scrollWidth; // full track width = all cards fully exit left
        };

        gsap.to(track, {
            x: () => -getTravelDist(),
            ease: "none",
            scrollTrigger: {
                trigger: section,
                scroller,
                start: "top top",
                end: () => `+=${getTravelDist()}`,
                scrub: 0.5,           // tight scrub = 1:1 with scroll, no drag
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            },
        });

    }, { scope: sectionRef });

    return (
        <section
            id="imagestack"
            ref={sectionRef}
            style={{
                position: "relative",
                zIndex: 30,
                backgroundColor: "#080810",
                width: "100%",
                minHeight: "100vh",
                overflow: "hidden",
            }}
        >
            <div style={{
                position: "absolute", top: 40, left: 0, right: 0,
                display: "flex", justifyContent: "space-between",
                padding: "0 32px", zIndex: 20, pointerEvents: "none",
            }}>
                <span style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.3em", textTransform: "uppercase" }}>The Journey</span>
                <span style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.3em", textTransform: "uppercase" }}>07 Frames</span>
            </div>

            <div
                ref={trackRef}
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 16,
                    paddingLeft: 64,
                    paddingRight: 96,
                    paddingTop: 96,
                    paddingBottom: 48,
                    width: "max-content",
                    willChange: "transform",
                }}
            >
                {images.map((img, i) => (
                    <div
                        key={i}
                        className="img-card group"
                        style={{
                            position: "relative",
                            flexShrink: 0,
                            width: "clamp(200px, 21vw, 300px)",
                            marginTop: topOffsets[i],
                            cursor: "pointer",
                        }}
                    >
                        <div
                            style={{
                                position: "relative",
                                overflow: "hidden",
                                borderRadius: 16,
                                border: "1px solid rgba(255,255,255,0.1)",
                                aspectRatio: "3/4",
                                boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
                                transition: "border-color 0.5s",
                            }}
                            className="group-hover:border-white/25"
                        >
                            <img
                                src={img.src}
                                alt={img.label}
                                className="grayscale group-hover:grayscale-0 transition-all duration-700"
                                style={{
                                    width: "100%", height: "100%",
                                    objectFit: "cover",
                                    transform: "scale(1.04)",
                                    transition: "transform 0.7s ease, filter 0.7s ease",
                                }}
                                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.10)")}
                                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1.04)")}
                            />
                            <div style={{
                                position: "absolute", inset: 0,
                                background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.05) 50%, transparent 100%)",
                            }} />
                            <div
                                className="scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                                style={{
                                    position: "absolute", bottom: 0, left: 0, right: 0,
                                    height: 3, backgroundColor: "#FF5500",
                                    borderRadius: "0 0 16px 16px",
                                }}
                            />
                            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 20 }}>
                                <p
                                    className="translate-y-1 group-hover:translate-y-0 transition-transform duration-300"
                                    style={{ fontWeight: 900, fontSize: 18, textTransform: "uppercase", letterSpacing: "-0.03em", lineHeight: 1, color: "#fff" }}
                                >
                                    {img.label}
                                </p>
                            </div>
                            <div style={{ position: "absolute", top: 16, left: 16 }}>
                                <span style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(255,255,255,0.3)" }}>{img.number}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}