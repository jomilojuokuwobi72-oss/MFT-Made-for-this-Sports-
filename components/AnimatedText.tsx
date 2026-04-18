"use client";

import React from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  animationClass: "animate-blur-in-right" | "animate-bounce-in" | "animate-blur-drop" | "animate-slide-up";
  staggerDelay?: number;
  duration?: number;
}

export default function AnimatedText({
  text,
  className = "",
  animationClass,
  staggerDelay = 0.05,
}: AnimatedTextProps) {
  const chars = text.split("");

  return (
    <div className={className}>
      {chars.map((char, index) => (
        <span
          key={index}
          className={`inline-block whitespace-pre opacity-0 ${animationClass}`}
          style={{
            animationDelay: `${index * staggerDelay}s`,
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}
