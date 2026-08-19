"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AnimatedText({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      container.textContent = text;
      return;
    }

    const ctx = gsap.context(() => {
      // Split text into characters
      const chars = text.split("");
      container.innerHTML = "";
      
      chars.forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.display = "inline-block";
        span.style.opacity = "0";
        span.style.transform = "translateY(100%)";
        container.appendChild(span);
      });

      const charElements = container.querySelectorAll("span");

      gsap.to(charElements, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.03,
        delay,
        ease: "back.out(1.7)",
      });
    });

    return () => ctx.revert();
  }, [text, delay]);

  return (
    <div ref={containerRef} className={`inline ${className}`} />
  );
}
