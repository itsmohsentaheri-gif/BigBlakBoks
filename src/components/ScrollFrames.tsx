"use client";

import { useEffect, useRef } from "react";

const FRAME_COUNT = 96;
const FRAME_PATH = (i: number) =>
  `/media/frames/frame_${String(i).padStart(4, "0")}.webp`;

export default function ScrollFrames() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const images: HTMLImageElement[] = [];
    let loadedCount = 0;
    const imageDimensions: { w: number; h: number }[] = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        imageDimensions[i - 1] = { w: img.naturalWidth, h: img.naturalHeight };
        loadedCount++;
        if (loadedCount === 1) draw(0);
      };
      images.push(img);
    }

    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let cw = 0;
    let ch = 0;
    let scaleCache = { dw: 0, dh: 0, dx: 0, dy: 0 };

    function resize() {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      cw = window.innerWidth * dpr;
      ch = window.innerHeight * dpr;
      canvas.width = cw;
      canvas.height = ch;
      
      const firstImg = images[0];
      if (firstImg && firstImg.complete && imageDimensions[0]) {
        const { w: iw, h: ih } = imageDimensions[0];
        const scale = Math.max(cw / iw, ch / ih);
        scaleCache = {
          dw: iw * scale,
          dh: ih * scale,
          dx: (cw - iw * scale) / 2,
          dy: (ch - ih * scale) / 2,
        };
      }
      draw(currentFrame);
    }

    function draw(frameFloat: number) {
      if (!ctx || cw === 0 || ch === 0) return;
      const index = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.round(frameFloat))
      );
      const img = images[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      ctx.drawImage(img, scaleCache.dx, scaleCache.dy, scaleCache.dw, scaleCache.dh);
    }

    let currentFrame = 0;
    let targetFrame = 0;
    let rafId = 0;
    let lastScrollY = 0;

    function getScrollProgress() {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      return Math.min(Math.max(progress, 0), 1);
    }

    function onScroll() {
      const scrollY = window.scrollY;
      if (Math.abs(scrollY - lastScrollY) < 5) return;
      lastScrollY = scrollY;
      targetFrame = getScrollProgress() * (FRAME_COUNT - 1);
    }

    function tick() {
      currentFrame += (targetFrame - currentFrame) * 0.15;
      if (Math.abs(targetFrame - currentFrame) < 0.02) {
        currentFrame = targetFrame;
      }
      ctx.clearRect(0, 0, cw, ch);
      draw(currentFrame);
      rafId = requestAnimationFrame(tick);
    }

    resize();
    window.addEventListener("resize", resize);

    if (prefersReduced) {
      draw(0);
    } else {
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      rafId = requestAnimationFrame(tick);
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full object-cover opacity-[0.55]"
    />
  );
}
