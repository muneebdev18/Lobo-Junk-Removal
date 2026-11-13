"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, business } from "@/lib/data";
import Logo from "@/components/Logo";
import Image from "next/image";

function NavLink({
  href,
  label,
  onClick,
  className = "",
}: {
  href: string;
  label: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`group relative inline-flex py-1 ${className}`}
    >
      <span className="text-[17px]">{label}</span>
      <span
        aria-hidden
        className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
      />
    </a>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-500 ${
        scrolled || open
          ? "border-line-invert bg-ink/92 shadow-[0_10px_40px_rgba(0,0,0,0.55)] backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[74px] max-w-[1400px] items-center justify-between gap-6 px-5 md:h-[100px] md:px-8">
        <Link
          href="/"
          className="shrink-0"
          aria-label={`${business.name} home`}
          onClick={() => setOpen(false)}
        >
          {/* <Logo className="gap-2.5" /> */}
          <Image src="/logo.png" alt={`${business.name}`} width={150} height={60} />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              className="dim-label text-muted-invert transition-colors hover:text-gold"
            />
          ))}
        </nav>

        <div className="flex text-[28px] items-center gap-3">
          <a
            href={business.phoneHref}
            className="dim-label hidden items-center !text-[15px] gap-2 text-on-ink transition-colors hover:text-gold xl:inline-flex"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 text-gold"
              fill="currentColor"
              aria-hidden
            >
              <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .58 3.6 1 1 0 0 1-.25 1l-2.23 2.2Z" />
            </svg>
            {business.phone}
          </a>

          <motion.a
            href="/contact"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 420, damping: 26 }}
            className="dim-label hidden items-center gap-2 bg-gold px-5 py-3 text-on-gold transition-colors hover:bg-gold-bright md:inline-flex"
          >
            Get a Free Quote
          </motion.a>

          <button
            type="button"
            className="dim-label flex h-11 items-center gap-2.5 border border-line-invert px-4 text-on-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
            <span className="relative block h-3 w-4" aria-hidden>
              <span
                className={`absolute inset-x-0 top-0 h-px bg-current transition-transform duration-300 ${
                  open ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute inset-x-0 top-[5px] h-px bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute inset-x-0 top-[10px] h-px bg-current transition-transform duration-300 ${
                  open ? "-translate-y-[5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line-invert bg-ink lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-6">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.08, duration: 0.35 }}
                >
                  <NavLink
                    href={link.href}
                    label={link.label}
                    onClick={() => setOpen(false)}
                    className="dim-label py-3 text-muted-invert transition-colors hover:text-gold"
                  />
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * navLinks.length + 0.1, duration: 0.35 }}
                className="mt-4 flex flex-col gap-3 border-t border-line-invert pt-6"
              >
                <a
                  href={business.phoneHref}
                  className="dim-label inline-flex items-center justify-center gap-2 border border-line-invert px-5 py-3.5 text-on-ink"
                  onClick={() => setOpen(false)}
                >
                  Call {business.phone}
                </a>
                <a
                  href="/contact"
                  className="dim-label inline-flex items-center justify-center gap-2 bg-gold px-5 py-3.5 text-on-gold"
                  onClick={() => setOpen(false)}
                >
                  Get a Free Quote
                </a>
              </motion.li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
