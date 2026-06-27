"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: "coral" | "lime" | "periwinkle";
};

const COLORS: Record<Particle["hue"], string> = {
  coral: "#ff6b5e",
  lime: "#c2f542",
  periwinkle: "#7c8cff",
};

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;

    function resize() {
      width = canvas!.clientWidth;
      height = canvas!.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.scale(dpr, dpr);

      const count = Math.max(28, Math.min(70, Math.floor((width * height) / 22000)));
      const hues: Particle["hue"][] = ["coral", "lime", "periwinkle"];
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 1,
        hue: hues[Math.floor(Math.random() * hues.length)],
      }));
    }

    function onMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    }

    function onLeave() {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    }

    function tick() {
      ctx!.clearRect(0, 0, width, height);

      for (const p of particles) {
        if (!reduceMotion.current) {
          p.x += p.vx;
          p.y += p.vy;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
      }

      // connect particles near the cursor — the "live graph" effect
      const radius = 160;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < radius) {
          const opacity = 1 - dist / radius;
          ctx!.beginPath();
          ctx!.moveTo(mouse.current.x, mouse.current.y);
          ctx!.lineTo(p.x, p.y);
          ctx!.strokeStyle = `rgba(124, 140, 255, ${opacity * 0.35})`;
          ctx!.lineWidth = 1;
          ctx!.stroke();
        }
      }

      for (const p of particles) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = COLORS[p.hue];
        ctx!.globalAlpha = 0.55;
        ctx!.fill();
        ctx!.globalAlpha = 1;
      }

      raf = requestAnimationFrame(tick);
    }

    resize();
    tick();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
