"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { business, media, tickerWords } from "@/lib/data";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const heroStats = [
  { value: "Same-day", label: "Service" },
  { value: "Free", label: "Quotes" },
  { value: "Eco", label: "Disposal" },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set(".hero-reveal, .hero-line, .hero-eyebrow", { autoAlpha: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-eyebrow", { autoAlpha: 0, y: 16, duration: 0.5 })
        .from(
          ".hero-line",
          { autoAlpha: 0, y: 70, duration: 1, stagger: 0.12 },
          "-=0.15",
        )
        .from(
          ".hero-reveal",
          { autoAlpha: 0, y: 24, duration: 0.65, stagger: 0.09 },
          "-=0.5",
        );

      gsap.fromTo(
        ".hero-media",
        { scale: 1.12 },
        { scale: 1, duration: 2.4, ease: "power2.out" },
      );

      gsap.to(".hero-panel", {
        y: 70,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      id="top"
      ref={root}
      className="grain relative isolate overflow-hidden bg-ink pb-0 pt-[74px] text-on-ink md:pt-[82px]"
      aria-label="LOBO Junk Removal"
    >
      {/* Deep background plate */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-ink" />
        <div className="absolute -right-[18%] -top-[30%] h-[70vh] w-[70vw] gold-glow opacity-70" />
        <div className="slash-band absolute inset-y-0 right-0 w-[46vw] opacity-60" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="grid items-center gap-12 pt-12 pb-16 lg:grid-cols-12 lg:gap-10 lg:pt-20 lg:pb-24">
          {/* Copy */}
          <div className="lg:col-span-7">
            <span className="hero-eyebrow dim-label inline-flex w-fit items-center gap-2.5 border border-line-invert bg-ink/60 px-3.5 py-2 text-muted-invert backdrop-blur-sm">
              <span className="h-1.5 w-1.5 bg-gold" aria-hidden />
              Napa Valley · Sonoma · Solano
            </span>

            <h1 className="display mt-8 text-[clamp(2.9rem,9vw,6.4rem)] text-on-ink">
              <span className="hero-line block">Let us handle</span>
              <span className="hero-line gold-text block">the junk.</span>
            </h1>

            <p className="hero-reveal mt-7 max-w-xl text-lg leading-relaxed text-muted-invert md:text-xl">
              Junk removal, property cleanup, hauling, and light demolition for
              homes, rentals, and job sites. Send us a few photos and we will
              send back a firm price.
            </p>

            <div className="hero-reveal mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <motion.div
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 420, damping: 26 }}
              >
                <Link
                  href="/contact"
                  className="dim-label group inline-flex w-full items-center justify-center gap-2.5 bg-gold px-8 py-4 text-on-gold transition-colors hover:bg-gold-bright sm:w-auto"
                >
                  Get a Free Quote
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </motion.div>
              <a
                href={business.phoneHref}
                className="dim-label group inline-flex w-full items-center justify-center gap-2.5 border border-line-invert px-8 py-4 text-on-ink transition-colors hover:border-gold hover:text-gold sm:w-auto"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 text-gold"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .58 3.6 1 1 0 0 1-.25 1l-2.23 2.2Z" />
                </svg>
                Call {business.phone}
              </a>
            </div>

            <div className="hero-reveal mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-line-invert pt-7">
              {heroStats.map((s) => (
                <div key={s.label}>
                  <p className="display text-2xl text-gold md:text-[1.75rem]">
                    {s.value}
                  </p>
                  <p className="dim-label mt-1.5 text-muted-invert">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image panel */}
          <div className="hero-panel lg:col-span-5">
            <div className="relative">
              <div className="cut-top-right relative overflow-hidden border border-line-invert bg-ink-2">
                <Image
                  src={media.heroTruck}
                  alt="LOBO dump truck unloading a load on a job site"
                  width={1200}
                  height={1500}
                  priority
                  className="hero-media h-[340px] w-full object-cover md:h-[460px] lg:h-[560px]"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
                <div className="absolute inset-x-0 top-0 p-5 md:p-6">
                  <p className="dim-label text-gold">Owner-operated</p>
                  <p className="display mt-2 text-xl text-on-ink md:text-2xl">
                    Founded by {business.founder}
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-7 -left-5 hidden bg-gold px-6 py-5 text-on-gold md:-left-8 md:block">
                <p className="display text-3xl md:text-4xl">24 hr</p>
                <p className="dim-label mt-1 opacity-80">Same-day starts</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service ticker */}
      <div className="relative border-y border-line-invert bg-ink-2 py-4">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
              {tickerWords.map((word) => (
                <span
                  key={`${copy}-${word}`}
                  className="dim-label flex items-center gap-6 px-6 text-muted-invert"
                >
                  {word}
                  <span className="h-1.5 w-1.5 rotate-45 bg-gold" aria-hidden />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
