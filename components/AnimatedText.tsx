"use client";

import React, { Fragment, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedTextProps {
  text: string;
  className?: string;
  animationClass?: string; // Kept for prop compatibility but will use GSAP instead
  staggerDelay?: number;
  duration?: number;
}

export default function AnimatedText({
  text,
  className = "",
  staggerDelay = 0.02,
  duration = 0.8,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = text.split(" ");

  useGSAP(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll(".char");
    
    gsap.fromTo(
      chars,
      { 
        y: 100, 
        opacity: 0,
        rotateX: -90,
        filter: "blur(10px)"
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        filter: "blur(0px)",
        duration: duration,
        stagger: staggerDelay,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={`${className} perspective-[1000px]`}>
      {words.map((word, wordIndex) => (
        <Fragment key={wordIndex}>
          {/* Each word is an atomic inline-block so it never breaks mid-word;
              spaces between words remain normal break opportunities. */}
          <span className="inline-block whitespace-nowrap">
            {word.split("").map((char, charIndex) => (
              <span
                key={charIndex}
                className="char inline-block will-change-transform"
              >
                {char}
              </span>
            ))}
          </span>
          {wordIndex < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </div>
  );
}
