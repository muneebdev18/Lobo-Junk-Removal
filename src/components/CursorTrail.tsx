"use client";

import { useEffect, useRef } from "react";

type Dot = {
  x: number;
  y: number;
  el: HTMLDivElement | null;
};

type Sparkle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  el: HTMLDivElement;
};

const TRAIL_COUNT = 14;

export default function CursorTrail() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduce) return;

    const container = containerRef.current;
    if (!container) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let targetX = mouseX;
    let targetY = mouseY;
    let visible = false;
    let raf = 0;
    let isHovering = false;

    const dots: Dot[] = Array.from({ length: TRAIL_COUNT }, () => ({
      x: mouseX,
      y: mouseY,
      el: null,
    }));

    const sparkles: Sparkle[] = [];

    const dotEls = container.querySelectorAll<HTMLDivElement>("[data-trail-dot]");
    const ringEl = container.querySelector<HTMLDivElement>("[data-trail-ring]");
    const glowEl = container.querySelector<HTMLDivElement>("[data-trail-glow]");

    dotEls.forEach((el, i) => {
      if (dots[i]) dots[i].el = el;
    });

    const show = () => {
      if (visible) return;
      visible = true;
      container.style.opacity = "1";
    };

    const hide = () => {
      if (!visible) return;
      visible = false;
      container.style.opacity = "0";
    };

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      show();

      const target = e.target as HTMLElement | null;
      isHovering = Boolean(
        target?.closest(
          "a, button, input, select, textarea, [role='button'], [data-cursor='grow']",
        ),
      );
    };

    const onLeave = () => hide();
    const onEnter = () => show();

    const spawnSparkles = (x: number, y: number) => {
      const count = 10;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
        const speed = 1.5 + Math.random() * 3;
        const el = document.createElement("div");
        el.style.cssText = `
          position: absolute;
          left: 0;
          top: 0;
          width: ${3 + Math.random() * 4}px;
          height: ${3 + Math.random() * 4}px;
          border-radius: 50%;
          background: ${i % 2 === 0 ? "#f5b419" : "#ffffff"};
          box-shadow: 0 0 8px ${i % 2 === 0 ? "rgba(245,180,25,0.6)" : "rgba(255,255,255,0.8)"};
          pointer-events: none;
          will-change: transform, opacity;
        `;
        container.appendChild(el);
        sparkles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: 0.5 + Math.random() * 0.4,
          size: 3 + Math.random() * 4,
          el,
        });
      }
    };

    const onClick = (e: PointerEvent) => {
      spawnSparkles(e.clientX, e.clientY);
    };

    const loop = () => {
      mouseX += (targetX - mouseX) * 0.35;
      mouseY += (targetY - mouseY) * 0.35;

      dots[0].x += (mouseX - dots[0].x) * 0.55;
      dots[0].y += (mouseY - dots[0].y) * 0.55;

      for (let i = 1; i < dots.length; i++) {
        const prev = dots[i - 1];
        const curr = dots[i];
        const ease = 0.38 - i * 0.018;
        curr.x += (prev.x - curr.x) * Math.max(0.12, ease);
        curr.y += (prev.y - curr.y) * Math.max(0.12, ease);
      }

      const lead = dots[0];
      if (glowEl) {
        const glowSize = isHovering ? 44 : 32;
        glowEl.style.transform = `translate3d(${lead.x}px, ${lead.y}px, 0) translate(-50%, -50%) scale(${isHovering ? 1.3 : 1})`;
        glowEl.style.width = `${glowSize}px`;
        glowEl.style.height = `${glowSize}px`;
      }

      if (ringEl) {
        const ringX = dots[2]?.x ?? lead.x;
        const ringY = dots[2]?.y ?? lead.y;
        ringEl.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${isHovering ? 1.8 : 1})`;
        ringEl.style.borderColor = isHovering
          ? "rgba(245,180,25,0.6)"
          : "rgba(245,180,25,0.35)";
      }

      dots.forEach((dot, i) => {
        if (!dot.el) return;
        const t = i / (dots.length - 1);
        const size = (1 - t) * 12 + 2;
        const opacity = visible ? (1 - t) * 0.9 : 0;
        const hue = isHovering ? 1 : 0.85;
        dot.el.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%)`;
        dot.el.style.width = `${size}px`;
        dot.el.style.height = `${size}px`;
        dot.el.style.opacity = String(opacity * hue);
      });

      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.life -= 1 / 60 / s.maxLife;
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.96;
        s.vy *= 0.96;
        s.vy += 0.02;
        if (s.life <= 0) {
          s.el.remove();
          sparkles.splice(i, 1);
          continue;
        }
        const alpha = Math.max(0, s.life);
        s.el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) translate(-50%, -50%) scale(${alpha})`;
        s.el.style.opacity = String(alpha);
      }

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);
    window.addEventListener("pointerdown", onClick);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
      window.removeEventListener("pointerdown", onClick);
      cancelAnimationFrame(raf);
      sparkles.forEach((s) => s.el.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
      style={{ opacity: 0, transition: "opacity 0.25s ease" }}
    >
      <div
        data-trail-glow
        className="absolute left-0 top-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(245,180,25,0.22) 0%, rgba(245,180,25,0) 70%)",
          transition: "width 0.2s ease, height 0.2s ease",
          willChange: "transform",
        }}
      />
      <div
        data-trail-ring
        className="absolute left-0 top-0 h-8 w-8 rounded-full border border-[rgba(245,180,25,0.35)]"
        style={{
          transition: "border-color 0.2s ease",
          willChange: "transform",
        }}
      />
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          data-trail-dot
          className="absolute left-0 top-0 rounded-full"
          style={{
            background:
              i === 0
                ? "#f5b419"
                : i < 4
                  ? "rgba(245,180,25,0.85)"
                  : "rgba(245,180,25,0.6)",
            boxShadow:
              i === 0
                ? "0 0 14px rgba(245,180,25,0.7), 0 0 4px rgba(245,180,25,0.9)"
                : i < 4
                  ? "0 0 8px rgba(245,180,25,0.35)"
                  : "none",
            willChange: "transform, opacity, width, height",
          }}
        />
      ))}
    </div>
  );
}
