"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { business, media, trailerFeatures, trailerUses } from "@/lib/data";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function DumpsterRental() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".trailer-copy > *", {
        autoAlpha: 0,
        y: 26,
        duration: 0.65,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 76%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".trailer-figure", {
        autoAlpha: 0,
        scale: 0.96,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".trailer-figure",
          start: "top 84%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      id="trailer"
      ref={root}
      className="relative overflow-hidden bg-gold text-on-gold"
      aria-labelledby="trailer-heading"
    >
      <div className="slash-band absolute inset-0 opacity-40" aria-hidden />

      <div className="relative mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="trailer-copy lg:col-span-6">
            <p className="dim-label mb-4 opacity-70">
              {business.trailerLabel}
            </p>
            <h2
              id="trailer-heading"
              className="display text-[clamp(2.2rem,6vw,4.6rem)] text-on-gold text-balance"
            >
              Rent us
              <br />
              by the day
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed opacity-80 md:text-lg">
              Our HD814 dump trailer goes out on your schedule. Load it with
              roofing, soil, green waste, or remodel debris and take it to the
              transfer station yourself — or let us handle the round trip.
            </p>

            <ul className="mt-9 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {trailerFeatures.map((f) => (
                <li key={f.title} className="flex gap-3">
                  <span
                    className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-on-gold"
                    aria-hidden
                  />
                  <span>
                    <span className="block text-[0.95rem] font-semibold">
                      {f.title}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed opacity-75">
                      {f.body}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <motion.a
                href="/dumpster-rentals"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 420, damping: 26 }}
                className="dim-label inline-flex items-center justify-center gap-2 bg-on-gold px-7 py-4 text-on-ink"
              >
                See HD814 details
                <span aria-hidden>→</span>
              </motion.a>
              <a
                href={business.phoneHref}
                className="dim-label link-underline justify-center text-on-gold"
              >
                Call {business.phone}
              </a>
            </div>
          </div>

          <div className="trailer-figure lg:col-span-6">
            <div className="cut-corner relative overflow-hidden bg-ink">
              <Image
                src={media.trailer}
                alt="Dump trailer ready for rental on a roadside"
                width={1400}
                height={1000}
                className="h-[300px] w-full object-cover md:h-[460px]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-ink/25" />
              <div className="absolute left-5 top-5 bg-gold px-4 py-2">
                <p className="display text-xl text-on-gold">HD814</p>
              </div>
              <div className="absolute right-5 top-5 bg-on-gold px-4 py-2">
                <p className="display text-xl text-on-gold">Rent Me</p>
              </div>
            </div>

            <div className="mt-6 border-t border-on-gold/30 pt-6">
              <p className="dim-label mb-4 opacity-70">Great for</p>
              <ul className="flex flex-wrap gap-2">
                {trailerUses.map((u) => (
                  <li
                    key={u}
                    className="dim-label border border-on-gold/35 px-3 py-1.5"
                  >
                    {u}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
