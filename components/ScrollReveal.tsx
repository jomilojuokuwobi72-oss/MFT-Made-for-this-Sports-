"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: "fade-in" | "slide-up" | "blur-in" | "scale-in";
  delay?: number;
  duration?: number;
  className?: string;
  distance?: number;
}

export default function ScrollReveal({
  children,
  animation = "slide-up",
  delay = 0,
  duration = 0.8,
  className = "",
  distance = 50,
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!elementRef.current) return;

    let fromVars: gsap.TweenVars = { opacity: 0 };
    let toVars: gsap.TweenVars = { 
      opacity: 1, 
      duration, 
      delay, 
      ease: "power3.out",
      scrollTrigger: {
        trigger: elementRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      }
    };

    switch (animation) {
      case "slide-up":
        fromVars.y = distance;
        toVars.y = 0;
        break;
      case "blur-in":
        fromVars.y = 20;
        fromVars.filter = "blur(10px)";
        toVars.y = 0;
        toVars.filter = "blur(0px)";
        break;
      case "scale-in":
        fromVars.scale = 0.9;
        toVars.scale = 1;
        break;
      case "fade-in":
        // default opacity 0 to 1
        break;
    }

    gsap.fromTo(elementRef.current, fromVars, toVars);
  }, { scope: elementRef });

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
