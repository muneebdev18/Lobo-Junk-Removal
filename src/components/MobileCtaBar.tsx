"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { business } from "@/lib/data";

export default function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line-invert bg-ink/95 backdrop-blur-lg sm:hidden">
      <div className="flex items-stretch gap-px p-2">
        <motion.a
          href={business.phoneHref}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 420, damping: 26 }}
          className="dim-label flex flex-1 items-center justify-center gap-2 border border-gold/50 py-3.5 text-gold"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="currentColor"
            aria-hidden
          >
            <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .58 3.6 1 1 0 0 1-.25 1l-2.23 2.2Z" />
          </svg>
          Call Now
        </motion.a>
        <motion.div
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 420, damping: 26 }}
          className="flex-1"
        >
          <Link
            href="/contact"
            className="dim-label flex h-full items-center justify-center gap-2 bg-gold py-3.5 text-on-gold"
          >
            Get a Free Quote
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
