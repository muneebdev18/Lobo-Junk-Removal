"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials } from "@/lib/data";

gsap.registerPlugin(useGSAP, ScrollTrigger);

if (typeof window !== "undefined") {
  (window as unknown as Record<string, unknown>).__testiST = ScrollTrigger;
  (window as unknown as Record<string, unknown>).__testiGsap = gsap;
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${i < count ? "fill-gold" : "fill-white/15"}`}
          aria-hidden
        >
          <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.1l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const root = useRef<HTMLElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false });

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (!emblaApi) return () => {};
      emblaApi.on("select", onStoreChange);
      emblaApi.on("reInit", onStoreChange);
      return () => {
        emblaApi.off("select", onStoreChange);
        emblaApi.off("reInit", onStoreChange);
      };
    },
    [emblaApi],
  );

  const getSnapshot = useCallback(
    () =>
      emblaApi
        ? `${emblaApi.selectedScrollSnap()}:${emblaApi.canScrollPrev()}:${emblaApi.canScrollNext()}`
        : "0:false:false",
    [emblaApi],
  );

  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => "0:false:false",
  );
  const [snapIndex, prevAllowed, nextAllowed] = snapshot.split(":");
  const selectedIndex = Number(snapIndex);
  const canScrollPrev = prevAllowed === "true";
  const canScrollNext = nextAllowed === "true";

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  useGSAP(
    () => {
      gsap.from(".testi-reveal", {
        autoAlpha: 0,
        y: 28,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });

      ScrollTrigger.batch(".testi-card", {
        start: "top 88%",
        once: true,
        onEnter: (batch) => {
          gsap.from(batch, {
            autoAlpha: 0,
            y: 36,
            duration: 0.7,
            stagger: 0.1,
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
      id="testimonials"
      ref={root}
      className="relative overflow-hidden bg-ink-2 py-24 text-on-ink md:py-32"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="testi-reveal dim-label mb-3 text-gold">Client set</p>
            <h2
              id="testimonials-heading"
              className="testi-reveal display text-[clamp(2.1rem,5.4vw,4.2rem)] text-on-ink text-balance"
            >
              What people say
              <br />
              after the truck leaves
            </h2>
          </div>
          <p className="testi-reveal max-w-sm text-base leading-relaxed text-muted-invert md:text-right">
            Repeat calls and referrals — the only numbers that matter to an
            owner-operated company.
          </p>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <ul className="flex gap-5">
            {testimonials.map((t, i) => (
              <li
                key={t.name}
                className="testi-card group relative flex min-w-0 flex-[0_0_100%] flex-col border border-line-invert bg-ink p-6 transition-all duration-500 hover:border-gold/50 hover:-translate-y-1 md:flex-[0_0_calc(50%-0.625rem)] md:p-8"
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <Stars count={t.stars} />
                  <span className="display text-2xl text-white/15">
                    0{i + 1}
                  </span>
                </div>

                <blockquote className="flex-1">
                  <p className="text-[1.02rem] leading-relaxed text-on-ink/90 md:text-lg">
                    “{t.body}”
                  </p>
                </blockquote>

                <div className="mt-7 flex items-center gap-4 border-t border-line-invert pt-6">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-ink-3">
                    <Image
                      src={t.image}
                      alt={t.imageAlt}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="display text-base text-on-ink">{t.name}</p>
                    <p className="text-sm text-muted-invert">{t.role}</p>
                  </div>
                </div>

                <p className="dim-label mt-4 text-gold">{t.project}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div
            className="flex items-center gap-2"
            role="group"
            aria-label="Testimonial slides"
          >
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => scrollTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === selectedIndex ? "true" : undefined}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === selectedIndex
                    ? "w-7 bg-gold"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line-invert text-on-ink transition-all duration-300 hover:border-gold hover:text-gold disabled:pointer-events-none disabled:opacity-35"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={scrollNext}
              disabled={!canScrollNext}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line-invert text-on-ink transition-all duration-300 hover:border-gold hover:text-gold disabled:pointer-events-none disabled:opacity-35"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
