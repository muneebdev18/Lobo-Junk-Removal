"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { promises, media } from "@/lib/data";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const cardPillars = [
  { label: "Homes", image: media.clutterStreet },
  { label: "Businesses", image: media.dumpsterSite },
  { label: "Construction", image: media.crewHauling },
  { label: "Eco-Friendly", image: media.leafBlower },
];

export default function WhyChooseUs() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".why-head", {
        autoAlpha: 0,
        y: 30,
        duration: 0.7,
        scrollTrigger: {
          trigger: root.current,
          start: "top 76%",
          toggleActions: "play none none none",
        },
      });

      ScrollTrigger.batch(".why-item", {
        start: "top 90%",
        once: true,
        onEnter: (batch) => {
          gsap.from(batch, {
            autoAlpha: 0,
            y: 34,
            duration: 0.65,
            stagger: 0.08,
            ease: "power2.out",
            overwrite: true,
          });
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      id="why"
      ref={root}
      className="relative overflow-hidden bg-paper py-24 text-ink md:py-32"
      aria-labelledby="why-heading"
    >
      <div className="slash-band-light pointer-events-none absolute inset-x-0 top-0 h-24" aria-hidden />

      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="why-head mb-14 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="dim-label mb-4 text-gold-deep">Why Choose LOBO</p>
            <h2
              id="why-heading"
              className="display text-[clamp(2.1rem,5.4vw,4.2rem)] text-ink text-balance"
            >
              Six reasons clients
              <br />
              call us again
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="text-base leading-relaxed text-muted md:text-lg">
              The same crew answers the phone, shows up when we say we will, and
              leaves the space cleaner than they found it. That is the whole
              promise.
            </p>
          </div>
        </div>

        <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {promises.map((p, i) => (
            <li
              key={p.title}
              className="why-item group relative bg-paper p-7 transition-colors duration-300 hover:bg-bone md:p-9"
            >
              <span className="display absolute right-6 top-6 text-4xl text-ink/8 transition-colors duration-300 group-hover:text-gold/35">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="display max-w-[15rem] text-[1.35rem] text-ink">
                {p.title}
              </h3>
              <p className="mt-3.5 text-sm leading-relaxed text-muted md:text-[0.95rem]">
                {p.body}
              </p>
            </li>
          ))}
        </ul>

        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cardPillars.map((c) => (
            <li key={c.label} className="why-item group relative">
              <div className="relative overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.label}
                  width={800}
                  height={600}
                  className="h-44 w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-ink/45 transition-colors duration-500 group-hover:bg-ink/25" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="display text-xl text-on-ink">{c.label}</p>
                </div>
                <span className="absolute right-4 top-4 h-2 w-2 rotate-45 bg-gold" aria-hidden />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
