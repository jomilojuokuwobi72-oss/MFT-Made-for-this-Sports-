"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { useStore } from "@/store/useStore";
import { joinWaitlist } from "@/app/actions/waitlist";
import { TextSplitter } from "./TextSplitter";
import { X, ArrowRight } from "lucide-react";

export default function WaitlistModal() {
    const { isWaitlistModalOpen, setWaitlistModalOpen } = useStore();
    const [mounted, setMounted] = useState(false);
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const successRef = useRef<HTMLDivElement>(null);

    // Mount portal
    useEffect(() => {
        setMounted(true);
    }, []);

    // Entrance & Exit animations
    useEffect(() => {
        if (!mounted || !overlayRef.current || !contentRef.current) return;

        if (isWaitlistModalOpen) {
            // RESET STATE ON OPEN
            setStatus("idle");
            setEmail("");
            setErrorMessage("");
            gsap.set(successRef.current, { autoAlpha: 0, scale: 0.8 });
            gsap.set(formRef.current, { autoAlpha: 1, y: 0 });
            gsap.set(contentRef.current.querySelector(".waitlist-title"), { opacity: 1, y: 0 });

            // ENTRANCE
            const tl = gsap.timeline();

            // Backdrop fade in
            tl.to(overlayRef.current, {
                opacity: 1,
                duration: 0.4,
                ease: "power2.out"
            });

            // Staggered text reveal (like Hero)
            const splitChars = contentRef.current.querySelectorAll(".waitlist-title .split-char");
            if (splitChars.length > 0) {
                gsap.set(splitChars, { y: 100, opacity: 0, rotate: 15 });
                tl.to(splitChars, {
                    y: 0, opacity: 1, rotate: 0,
                    stagger: 0.04,
                    ease: "back.out(1.5)",
                    duration: 0.7
                }, "-=0.2");
            }

            // Fade in form and close button
            const formElements = contentRef.current.querySelectorAll(".waitlist-form-el");
            gsap.set(formElements, { y: 30, opacity: 0 });
            tl.to(formElements, {
                y: 0, opacity: 1,
                stagger: 0.1,
                duration: 0.6,
                ease: "power3.out"
            }, "-=0.5");

        } else {
            // EXIT
            gsap.to(overlayRef.current, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.in"
            });
        }
    }, [isWaitlistModalOpen, mounted]);

    // Handle Form Submission
    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        setErrorMessage("");

        const result = await joinWaitlist(email);

        if (result.error) {
            setStatus("error");
            setErrorMessage(result.error);

            // Shake error
            gsap.fromTo(formRef.current,
                { x: -10 },
                { x: 10, duration: 0.1, yoyo: true, repeat: 5, ease: "none", onComplete: () => { gsap.set(formRef.current, { x: 0 }); } }
            );

            return;
        }

        // SUCCESS ANIMATION (CRAZY EDITION)
        setStatus("success");

        const tl = gsap.timeline();

        // 1. Shatter/sink the form and the title
        const titleEl = contentRef.current ? contentRef.current.querySelector(".waitlist-title") : null;
        tl.to([formRef.current, titleEl], {
            y: 100,
            opacity: 0,
            duration: 0.5,
            ease: "power4.in"
        });

        // 2. Explode success message in
        if (successRef.current) {
            const successWords = successRef.current.querySelectorAll(".success-word");
            gsap.set(successWords, { z: -500, opacity: 0, scale: 0 });
            tl.to(successRef.current, { autoAlpha: 1, duration: 0.1 });
            tl.to(successWords, {
                z: 0, opacity: 1, scale: 1,
                stagger: 0.1,
                duration: 0.8,
                ease: "back.out(2)"
            });

            // 3. Continuous slow scale/glow until it zooms out of the screen
            tl.to(successRef.current, {
                scale: 50,
                opacity: 0,
                duration: 5,
                ease: "power2.in"
            }, "-=0.2");
        }

        // Auto-close after the zoom finishes
        setTimeout(() => {
            setWaitlistModalOpen(false);
        }, 4000);
    }

    if (!mounted) return null;

    return createPortal(
        <div
            ref={overlayRef}
            className="fixed inset-0 z-100 flex items-center justify-center opacity-0 pointer-events-none"
            style={{ pointerEvents: isWaitlistModalOpen ? "auto" : "none" }}
        >
            {/* Intense Backdrop */}
            <div
                className="absolute inset-0 bg-brand-black/80 backdrop-blur-3xl"
                onClick={() => setWaitlistModalOpen(false)}
            />

            {/* Noise Filter */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay">
                <svg width="100%" height="100%">
                    <filter id="wm-noise">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                        <rect width="100%" height="100%" filter="url(#wm-noise)" />
                    </filter>
                </svg>
            </div>

            {/* Close Button */}
            <button
                onClick={() => setWaitlistModalOpen(false)}
                className="waitlist-form-el absolute top-8 right-8 w-14 h-14 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white hover:bg-white hover:text-brand-black transition-all duration-300 z-50 hover:scale-110 active:scale-95"
            >
                <X className="w-6 h-6" />
            </button>

            {/* Main Content */}
            <div ref={contentRef} className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center justify-center text-center">

                {/* Giant Title */}
                <h2 className="waitlist-title font-black uppercase tracking-tighter text-[15vw] md:text-[8vw] lg:text-[7vw] leading-[0.85] text-white mb-12 drop-shadow-2xl overflow-hidden flex flex-wrap justify-center pointer-events-none">
                    <TextSplitter text="YOUR LEGACY" wordDisplayStyle="inline-block" /> <br />
                    <span className="text-brand-violet drop-shadow-[0_0_25px_rgba(230,97,50,0.6)]">
                        <TextSplitter text="STARTS HERE" wordDisplayStyle="inline-block" />
                    </span>
                </h2>

                {/* Input Form */}
                <form ref={formRef} onSubmit={onSubmit} className="w-full max-w-2xl relative">
                    <div className="waitlist-form-el relative flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative w-full">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter Your Email"
                                disabled={status === "loading" || status === "success"}
                                className="w-full bg-transparent border-b-2 border-white/30 px-4 py-6 text-3xl md:text-5xl font-black tracking-tighter text-white placeholder-white/20 outline-none focus:border-brand-violet transition-colors text-center md:text-left disabled:opacity-50"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === "loading" || status === "success"}
                            className="group relative shrink-0 flex items-center justify-center h-20 w-full md:w-32 px-10 md:px-0 rounded-full bg-brand-violet text-white text-xl font-black uppercase tracking-widest hover:bg-[#ff7733] transition-all duration-300 hover:scale-110 active:scale-95 shadow-[0_0_30px_rgba(230,97,50,0.4)] hover:shadow-[0_0_50px_rgba(230,97,50,0.8)] disabled:opacity-50 disabled:hover:scale-100 mt-6 md:mt-0"
                        >
                            {status === "loading" ? (
                                <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-r-transparent" />
                            ) : (
                                <ArrowRight className="h-8 w-8 transition-transform group-hover:translate-x-2" />
                            )}
                        </button>
                    </div>

                    {/* Error Message */}
                    {status === "error" && (
                        <div className="absolute -bottom-12 left-0 right-0 text-center text-red-400 font-bold uppercase tracking-widest text-sm animate-pulse">
                            {errorMessage}
                        </div>
                    )}
                </form>

                {/* Crazy Success State */}
                <div ref={successRef} className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none invisible">
                    <h3 className="font-black uppercase tracking-tighter text-[18vw] md:text-[12vw] leading-none text-brand-cyan drop-shadow-[0_0_40px_rgba(255,127,80,0.8)] text-center flex flex-wrap justify-center gap-x-[3vw]">
                        {["YOU'RE", "ON", "THE", "LIST"].map((word, i) => (
                            <span key={i} className="success-word inline-block">{word}</span>
                        ))}
                    </h3>
                    <p className="mt-8 text-xl md:text-3xl font-bold uppercase tracking-widest text-white/50">
                        Welcome to the vanguard.
                    </p>
                </div>

            </div>
        </div>,
        document.body
    );
}
