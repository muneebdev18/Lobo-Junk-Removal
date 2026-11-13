"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type PageHeroProps = {
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
  image: string;
  imageAlt: string;
  stats?: { value: string; label: string }[];
};

export default function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  image,
  imageAlt,
  stats = [],
}: PageHeroProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".hero-line", {
        autoAlpha: 0,
        y: 48,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
      });
      gsap.fromTo(
        ".hero-bg img",
        { scale: 1.16, yPercent: -4 },
        { scale: 1.04, yPercent: 0, duration: 1.6, ease: "power2.out" },
      );
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="grain relative isolate overflow-hidden bg-ink text-on-ink"
    >
      <div className="hero-bg absolute inset-0" aria-hidden>
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/80" />
      </div>

      <div className="slash-band absolute inset-y-0 right-0 w-[40vw] opacity-50" aria-hidden />

      <div className="relative mx-auto flex min-h-[68svh] max-w-[1400px] flex-col justify-end px-5 pb-16 pt-32 md:px-8 md:pb-20 md:pt-40">
        <div className="max-w-3xl">
          <p className="hero-line dim-label mb-5 flex items-center gap-2.5 text-gold">
            <span className="h-1.5 w-1.5 bg-gold" aria-hidden />
            {eyebrow}
          </p>
          <h1 className="hero-line display text-[clamp(2.4rem,7vw,5rem)] text-on-ink">
            {title}
            {highlight && (
              <>
                <br />
                <span className="gold-text">{highlight}</span>
              </>
            )}
          </h1>
          <p className="hero-line mt-6 max-w-2xl text-base leading-relaxed text-muted-invert md:text-lg">
            {description}
          </p>

          {stats.length > 0 && (
            <dl className="hero-line mt-10 flex flex-wrap gap-x-10 gap-y-6 border-t border-line-invert pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="display text-2xl text-gold md:text-3xl">
                    {s.value}
                  </dd>
                  <p className="dim-label mt-1.5 text-muted-invert">{s.label}</p>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>

      <motion.div
        aria-hidden
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="dim-label text-muted-invert/60">Scroll</span>
      </motion.div>
    </section>
  );
}

export function PageCta({
  eyebrow = "Next step",
  title,
  body,
  primaryLabel = "Get a Free Quote",
  primaryHref = "/contact",
  secondaryLabel,
  secondaryHref,
}: {
  eyebrow?: string;
  title: string;
  body: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gold text-on-gold">
      <div className="slash-band absolute inset-0 opacity-35" aria-hidden />
      <div className="relative mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-24">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="dim-label mb-4 opacity-70">{eyebrow}</p>
            <h2 className="display text-[clamp(2rem,5vw,3.6rem)] text-on-gold">
              {title}
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="text-base leading-relaxed opacity-85 md:text-lg">
              {body}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={primaryHref}
                className="dim-label inline-flex items-center gap-2 bg-on-gold px-7 py-4 text-on-ink transition-colors hover:bg-ink hover:text-on-ink"
              >
                {primaryLabel}
                <span aria-hidden>→</span>
              </Link>
              {secondaryLabel && secondaryHref && (
                <Link
                  href={secondaryHref}
                  className="dim-label inline-flex items-center gap-2 border border-on-gold/50 px-7 py-4 text-on-gold transition-colors hover:border-on-gold"
                >
                  {secondaryLabel}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
