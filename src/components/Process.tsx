"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/lib/data";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Process() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".process-head", {
        autoAlpha: 0,
        y: 30,
        duration: 0.7,
        scrollTrigger: {
          trigger: root.current,
          start: "top 76%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".process-step", {
        autoAlpha: 0,
        y: 34,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".process-track",
          start: "top 84%",
          toggleActions: "play none none none",
        },
      });

      gsap.fromTo(
        ".process-rail",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".process-track",
            start: "top 78%",
            toggleActions: "play none none none",
          },
        },
      );
    },
    { scope: root },
  );

  return (
    <section
      id="process"
      ref={root}
      className="relative overflow-hidden bg-ink py-24 text-on-ink md:py-32"
      aria-labelledby="process-heading"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-[36rem] w-[36rem] -translate-x-1/2 gold-glow opacity-40" aria-hidden />

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="process-head mb-16 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="dim-label mb-4 text-gold">How It Works</p>
            <h2
              id="process-heading"
              className="display text-[clamp(2rem,5vw,3.8rem)] text-on-ink text-balance"
            >
              Four steps between
              <br />
              your pile and gone
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="text-base leading-relaxed text-muted-invert md:text-lg">
              No contracts, no minimums, no scheduling window that takes three
              weeks. A photo and a phone call is usually all it takes.
            </p>
            <Link
              href="/contact"
              className="group dim-label mt-5 inline-flex items-center gap-2 text-gold"
            >
              Start with a photo
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>

        <div className="process-track relative">
          <span
            className="process-rail absolute left-0 right-0 top-[3.35rem] hidden h-px origin-left bg-gold/30 lg:block"
            aria-hidden
          />

          <ol className="grid gap-10 lg:grid-cols-4 lg:gap-6">
            {processSteps.map((s) => (
              <li key={s.step} className="process-step relative">
                <div className="flex items-center gap-4">
                  <span className="display flex h-[4.2rem] w-[4.2rem] shrink-0 items-center justify-center border border-gold/45 text-2xl text-gold">
                    {s.step}
                  </span>
                  <span
                    className="h-px flex-1 bg-gold/30 lg:hidden"
                    aria-hidden
                  />
                </div>
                <h3 className="display mt-6 text-[1.5rem] text-on-ink">{s.title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-invert md:text-[0.95rem]">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
