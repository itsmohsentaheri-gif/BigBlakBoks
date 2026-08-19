"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Reveal({
  children,
  delay = 0,
  y = 40,
  className,
  scale = 1,
  stagger = false,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  scale?: number;
  stagger?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const childElements = el.querySelectorAll("*");
      
      if (stagger && childElements.length > 0) {
        gsap.fromTo(
          childElements,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: delay,
            stagger: 0.08,
            ease: "power3.out",
          }
        );
      } else {
        gsap.fromTo(
          el,
          { opacity: 0, y, scale: scale < 1 ? scale : 1 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            delay,
            ease: "power3.out",
          }
        );
      }

      // Add parallax effect on scroll
      ScrollTrigger.create({
        trigger: el,
        start: "top bottom-=100",
        end: "bottom top+=100",
        scrub: 0.5,
        animation: gsap.fromTo(
          el,
          { y: 30 },
          { y: -20, ease: "none" }
        ),
      });
    });

    return () => ctx.revert();
  }, [delay, y, scale, stagger]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
