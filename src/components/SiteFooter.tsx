"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { WolfMark } from "@/components/Logo";
import { business, navLinks, services, serviceAreas } from "@/lib/data";
import Image from "next/image";

const companyLinks = [
  { label: "Home", href: "/" },
  { label: "All Services", href: "/services" },
  { label: "Dumpster Rentals", href: "/dumpster-rentals" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Contact", href: "/contact" },
];

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-line-invert bg-ink-2 text-on-ink">
      <WolfMark
        className="pointer-events-none absolute -right-16 -top-10 hidden h-[26rem] w-[26rem] text-white/[0.035] md:block"
        title=""
      />

      {/* Closing call to action */}
      <div className="relative border-b border-line-invert">
        <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-20">
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="dim-label mb-4 text-gold">Ready when you are</p>
              <h2 className="display text-[clamp(2.1rem,5.4vw,4.1rem)] text-on-ink">
                Let us handle
                <br />
                <span className="gold-text">the junk.</span>
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="text-base leading-relaxed text-muted-invert md:text-lg">
                Send a few photos and we will send back a firm price. Most jobs
                are cleared the same day you call.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <motion.a
                  href="/contact"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 420, damping: 26 }}
                  className="dim-label inline-flex items-center justify-center gap-2 bg-gold px-7 py-4 text-on-gold"
                >
                  Get a Free Quote
                  <span aria-hidden>→</span>
                </motion.a>
                <a
                  href={business.phoneHref}
                  className="dim-label link-underline text-on-ink hover:text-gold"
                >
                  Call {business.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt={`${business.name}`} width={180} height={90} />
              {/* <WolfMark className="h-12 w-12 text-gold" />
              <span className="flex flex-col leading-none">
                <span className="wordmark text-2xl">LOBO</span>
                <span className="dim-label mt-1.5 text-[0.52rem] tracking-[0.3em] text-muted-invert">
                  Junk Removal
                </span>
              </span> */}
            </Link>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-muted-invert">
              Owner-operated junk removal and property cleanup across the Napa
              Valley, Sonoma County, and Solano. Founded by {business.founder}.
            </p>
            <div className="mt-7 space-y-2.5 text-sm">
              <a
                href={business.phoneHref}
                className="flex items-center gap-2.5 text-muted-invert transition-colors hover:text-gold"
              >
                <span className="h-1.5 w-1.5 bg-gold" aria-hidden />
                {business.phone}
              </a>
              <a
                href={business.emailHref}
                className="flex items-center gap-2.5 text-muted-invert transition-colors hover:text-gold"
              >
                <span className="h-1.5 w-1.5 bg-gold" aria-hidden />
                {business.email}
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="dim-label mb-5 text-gold">Explore</p>
            <ul className="space-y-3 text-base">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-2 text-muted-invert transition-colors hover:text-on-ink"
                  >
                    <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-3" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="dim-label mb-5 text-gold">Services</p>
            <ul className="space-y-3 text-base">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services#${s.slug}`}
                    className="group inline-flex items-center gap-2 text-muted-invert transition-colors hover:text-on-ink"
                  >
                    <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-3" />
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="dim-label mb-5 text-gold">We Serve</p>
            <ul className="space-y-3 text-base">
              {serviceAreas.map((a) => (
                <li key={a.region}>
                  <Link
                    href="/service-areas"
                    className="group inline-flex items-center gap-2 text-muted-invert transition-colors hover:text-on-ink"
                  >
                    <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-3" />
                    {a.region}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="dim-label mt-6 leading-relaxed text-muted-invert/70">
              Napa · St. Helena · Sonoma · Petaluma
              <br />
              Vallejo · Benicia · Novato
            </p>
            <Link
              href="/service-areas"
              className="dim-label mt-6 inline-flex items-center gap-2 bg-gold px-5 py-3 text-on-gold transition-colors hover:bg-gold-bright"
            >
              Check your address
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line-invert pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="dim-label text-muted-invert">
            © 2026 {business.name}. All rights reserved.
          </p>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="dim-label text-muted-invert transition-colors hover:text-gold"
              >
                {l.label}
              </Link>
            ))}
            <span className="dim-label text-muted-invert/60">
              Owner-operated · Napa Valley
            </span>
          </nav>
        </div>
      </div>
    </footer>
  );
}
