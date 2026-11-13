"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { business, faqs } from "@/lib/data";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function FaqItem({
  q,
  a,
  index,
  isOpen,
  onToggle,
}: {
  q: string;
  a: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`faq-item border transition-colors duration-300 ${
        isOpen
          ? "border-ink bg-ink"
          : "border-line bg-paper hover:border-ink/35"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left md:px-7"
      >
        <span className="flex items-start gap-4">
          <span
            className={`dim-label mt-0.5 shrink-0 ${
              isOpen ? "text-gold" : "text-ink/35"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={`display text-lg leading-snug md:text-xl ${
              isOpen ? "text-on-ink" : "text-ink"
            }`}
          >
            {q}
          </span>
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border text-lg transition-colors ${
            isOpen
              ? "border-gold bg-gold text-on-gold"
              : "border-ink/25 text-ink"
          }`}
          aria-hidden
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-6 md:px-7">
              <p className="border-t border-line-invert pt-4 pl-[calc(1.4em+1rem)] text-base leading-relaxed text-muted-invert">
                {a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const root = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number>(0);

  useGSAP(
    () => {
      gsap.from(".faq-reveal", {
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

      ScrollTrigger.batch(".faq-item", {
        start: "top 90%",
        once: true,
        onEnter: (batch) => {
          gsap.from(batch, {
            autoAlpha: 0,
            y: 22,
            duration: 0.6,
            stagger: 0.06,
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
      id="faq"
      ref={root}
      className="relative overflow-hidden bg-paper py-24 text-ink md:py-32"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <p className="faq-reveal dim-label mb-3 text-gold-deep">
              Common questions
            </p>
            <h2
              id="faq-heading"
              className="faq-reveal display text-[clamp(2rem,4.6vw,3.4rem)] text-ink text-balance"
            >
              What clients
              <br />
              ask first
            </h2>
            <p className="faq-reveal mt-5 text-base leading-relaxed text-muted md:text-lg">
              Don&apos;t see your question? Call us — it is faster than a form,
              and you get a straight answer.
            </p>
            <div className="faq-reveal mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href={business.phoneHref}
                className="dim-label inline-flex items-center justify-center gap-2 bg-ink px-6 py-3.5 text-on-ink transition-colors hover:bg-ink-3"
              >
                Call {business.phone}
                <span aria-hidden>→</span>
              </a>
              <a
                href="/contact"
                className="dim-label inline-flex items-center justify-center gap-2 border border-ink/25 px-6 py-3.5 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-on-ink"
              >
                Send an inquiry
              </a>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <FaqItem
                  key={f.q}
                  q={f.q}
                  a={f.a}
                  index={i}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex((v) => (v === i ? -1 : i))}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
