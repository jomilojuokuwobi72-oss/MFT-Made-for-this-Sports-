"use client";

import React from "react";
import { useInView } from "@/hooks/useInView";

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: "fade-in" | "slide-up" | "blur-in" | "scale-in";
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  animation = "slide-up",
  delay = 0,
  duration = 0.6,
  className = "",
  once = true,
}: ScrollRevealProps) {
  const [ref, isInView] = useInView({ threshold: 0.1, once });

  const animations = {
    "fade-in": "opacity-0 translate-y-0",
    "slide-up": "opacity-0 translate-y-8",
    "blur-in": "opacity-0 translate-y-4 blur-md",
    "scale-in": "opacity-0 scale-95",
  };

  const activeAnimations = {
    "fade-in": "opacity-100 translate-y-0",
    "slide-up": "opacity-100 translate-y-0",
    "blur-in": "opacity-100 translate-y-0 blur-0",
    "scale-in": "opacity-100 scale-100",
  };

  return (
    <div
      ref={ref}
      className={`transition-all ${className} ${
        isInView ? activeAnimations[animation] : animations[animation]
      }`}
      style={{
        transitionDelay: `${delay}s`,
        transitionDuration: `${duration}s`,
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {children}
    </div>
  );
}
