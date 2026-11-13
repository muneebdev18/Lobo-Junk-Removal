"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { business, media } from "@/lib/data";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const pillars = [
  {
    k: "Owner-operated",
    v: "You talk to the person who does the work. No call center, no account manager, no runaround.",
  },
  {
    k: "Napa Valley based",
    v: "We are on the road every day, so same-day service is a real schedule and not a promise.",
  },
  {
    k: "Straight answers",
    v: "If we cannot take it, we will tell you exactly who can. If it is free, we will tell you that too.",
  },
];

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".about-copy > *", {
        autoAlpha: 0,
        y: 28,
        duration: 0.7,
        stagger: 0.09,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 74%",
          toggleActions: "play none none none",
        },
      });

      gsap.fromTo(
        ".about-figure img",
        { yPercent: -6, scale: 1.12 },
        {
          yPercent: 6,
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: ".about-figure",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: root },
  );

  return (
    <section
      id="about"
      ref={root}
      className="relative overflow-hidden bg-ink-2 py-24 text-on-ink md:py-32"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="about-copy lg:col-span-6">
            <p className="dim-label mb-4 text-gold">About LOBO</p>
            <h2
              id="about-heading"
              className="display text-[clamp(2rem,5vw,3.8rem)] text-on-ink text-balance"
            >
              We show up.
              <br />
              You point.
              <br />
              <span className="gold-text">It&apos;s gone.</span>
            </h2>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-invert md:text-lg">
              LOBO started the way most junk companies do — one truck, one pair
              of hands, and a phone that kept ringing. {business.founder} built
              the business on a simple rule: price it honestly, show up when we
              say we will, and sweep the floor before we leave.
            </p>

            <ul className="mt-10 border-t border-line-invert">
              {pillars.map((p) => (
                <li
                  key={p.k}
                  className="border-b border-line-invert py-5 transition-colors duration-300 hover:border-gold/50"
                >
                  <p className="dim-label text-gold">{p.k}</p>
                  <p className="mt-2 max-w-lg text-[0.95rem] leading-relaxed text-muted-invert">
                    {p.v}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex items-center gap-4">
              <span className="h-px w-10 bg-gold" aria-hidden />
              <p className="text-sm text-muted-invert">
                <span className="display text-lg text-on-ink">
                  {business.founder}
                </span>
                <span className="dim-label ml-3 text-gold">Founder</span>
              </p>
            </div>
          </div>

          <div className="about-figure lg:col-span-6">
            <div className="cut-corner relative overflow-hidden border border-line-invert">
              <Image
                src={media.aboutCrew}
                alt="LOBO crew in protective gear loading a truck"
                width={1400}
                height={1000}
                className="h-[380px] w-full object-cover md:h-[560px]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <p className="dim-label text-gold">Same-day starts</p>
                <p className="display mt-2 text-2xl text-on-ink md:text-3xl">
                  Most jobs cleared in one visit
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-px bg-line-invert">
              {[
                { k: "Residential", v: "Homes, rentals, estates" },
                { k: "Commercial", v: "Job sites, shops, offices" },
              ].map((s) => (
                <div key={s.k} className="bg-ink-2 p-6">
                  <p className="dim-label text-gold">{s.k}</p>
                  <p className="mt-2 text-sm text-muted-invert">{s.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
