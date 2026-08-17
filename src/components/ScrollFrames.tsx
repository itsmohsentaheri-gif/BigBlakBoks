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
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1) draw(0);
      };
      images.push(img);
    }

    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      draw(currentFrame);
    }

    function draw(frameFloat: number) {
      if (!canvas || !ctx) return;
      const index = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.round(frameFloat))
      );
      const img = images[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    }

    let currentFrame = 0;
    let targetFrame = 0;
    let rafId = 0;

    function getScrollProgress() {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      return Math.min(Math.max(progress, 0), 1);
    }

    function onScroll() {
      targetFrame = getScrollProgress() * (FRAME_COUNT - 1);
    }

    function tick() {
      currentFrame += (targetFrame - currentFrame) * 0.18;
      if (Math.abs(targetFrame - currentFrame) < 0.02) {
        currentFrame = targetFrame;
      }
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
