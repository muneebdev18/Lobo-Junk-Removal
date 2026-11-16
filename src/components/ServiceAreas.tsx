"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { media, serviceAreas } from "@/lib/data";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ServiceAreas() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".areas-head", {
        autoAlpha: 0,
        y: 30,
        duration: 0.7,
        scrollTrigger: {
          trigger: root.current,
          start: "top 76%",
          toggleActions: "play none none none",
        },
      });

      ScrollTrigger.batch(".area-block", {
        start: "top 92%",
        once: true,
        onEnter: (batch) => {
          gsap.from(batch, {
            autoAlpha: 0,
            y: 30,
            duration: 0.65,
            stagger: 0.09,
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
      id="areas"
      ref={root}
      className="relative bg-paper py-24 text-ink md:py-32"
      aria-labelledby="areas-heading"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="areas-head mb-14 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="dim-label mb-4 text-gold-deep">Service Areas</p>
            <h2
              id="areas-heading"
              className="display text-[clamp(2.1rem,5.4vw,4.2rem)] text-ink text-balance"
            >
              We cover the
              <br />
              South Bay
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="text-base leading-relaxed text-muted md:text-lg">
              The South Bay is home. We run out across the San Fernando Valley,
              the beach cities, and Ventura every week — and if you are just
              outside the list, call anyway. We probably cover you too.
            </p>
            <Link
              href="/service-areas"
              className="group dim-label mt-5 inline-flex items-center gap-2 text-gold-deep"
            >
              Check your address
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <div className="cut-corner relative overflow-hidden lg:sticky lg:top-[140px]">
              <Image
                src={media.areasCoast}
                alt="Pacific coastline and cliffs above Malibu"
                width={1000}
                height={1250}
                className="h-[300px] w-full object-cover md:h-[420px] lg:h-[560px]"
                sizes="(max-width: 1024px) 100vw, 32vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="dim-label text-gold">Home base</p>
                <p className="display mt-2 text-2xl text-on-ink">
                  South Bay, California
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-8">
            {serviceAreas.map((area, i) => (
              <article
                key={area.region}
                className="area-block group flex flex-col border-t-2 border-ink transition-colors duration-300 hover:border-gold"
              >
                <div className="relative mt-6 h-[210px] w-full overflow-hidden">
                  <Image
                    src={area.image}
                    alt={area.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 32vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-transparent" />
                  <span className="dim-label absolute right-4 top-4 text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display absolute inset-x-0 bottom-0 p-5 text-2xl text-on-ink">
                    {area.region}
                  </h3>
                </div>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
                  {area.note}
                </p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {area.cities.map((city) => (
                    <li
                      key={city}
                      className="dim-label border border-line bg-bone px-2.5 py-1.5 text-ink/75"
                    >
                      {city}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
