"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/lib/data";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".services-head", {
        autoAlpha: 0,
        y: 32,
        duration: 0.7,
        scrollTrigger: {
          trigger: root.current,
          start: "top 74%",
          toggleActions: "play none none none",
        },
      });

      ScrollTrigger.batch(".service-card", {
        start: "top 90%",
        once: true,
        onEnter: (batch) => {
          gsap.from(batch, {
            autoAlpha: 0,
            y: 44,
            duration: 0.7,
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
      id="services"
      ref={root}
      className="relative overflow-hidden bg-ink py-24 md:py-32"
      aria-labelledby="services-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px gold-rule opacity-60" aria-hidden />

      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="services-head mb-14 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="dim-label mb-4 text-gold">Our Services</p>
            <h2
              id="services-heading"
              className="display text-[clamp(2.1rem,5.4vw,4.2rem)] text-on-ink text-balance"
            >
              Everything we clear
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="text-base leading-relaxed text-muted-invert md:text-lg">
              One crew, one truck, one price. Pick the job you need — or call
              and we will tell you exactly what it takes to empty the space.
            </p>
            <Link
              href="/services"
              className="group dim-label mt-5 inline-flex items-center gap-2 text-gold"
            >
              See full service details
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <li
              key={s.slug}
              className="service-card group flex flex-col border border-line-invert bg-ink-2"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-ink/25 to-transparent" />
                <span className="dim-label absolute left-4 top-4 bg-gold px-2.5 py-1 text-on-gold">
                  {s.code}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="display text-[1.45rem] text-on-ink">{s.title}</h3>
                <p className="dim-label mt-2 text-gold">{s.tagline}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-invert">
                  {s.body}
                </p>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <li
                      key={t}
                      className="dim-label border border-line-invert px-2.5 py-1 text-muted-invert"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/services#${s.slug}`}
                  className="group/link dim-label mt-6 inline-flex items-center gap-2 border-t border-line-invert pt-5 text-on-ink transition-colors hover:text-gold"
                >
                  Get a quote
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover/link:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
