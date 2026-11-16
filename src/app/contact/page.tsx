import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageShell";
import Contact from "@/components/Contact";
import { business, contactChannels, media } from "@/lib/data";

export const metadata = {
  title: "Contact — Get a Free Junk Removal Quote",
  description:
    "Call LOBO Junk Removal at (707) 472-9902 or send photos for a free junk removal, hauling, and property cleanup quote across the South Bay, the San Fernando Valley, and Ventura.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let us handle"
        highlight="the junk."
        description="Call and talk to the person doing the work, or send a few photos and the address and we will come back with a firm price."
        image={media.contactHero}
        imageAlt="Movers loading a truck on a sunny day"
        stats={[
          { value: "Same-day", label: "Most start times" },
          { value: "Free", label: "Quotes, no obligation" },
          { value: "Owner", label: "Runs every job" },
        ]}
      />

      {/* Quick ways */}
      <section className="relative border-b border-line-invert bg-ink-2 py-10">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <ul className="grid gap-px bg-line-invert sm:grid-cols-3">
            {contactChannels.map((c) => (
              <li key={c.label} className="bg-ink-2 py-2 sm:px-6 sm:first:pl-0">
                <a
                  href={c.href}
                  className="group flex flex-col gap-1 py-4 transition-colors hover:text-gold sm:py-5"
                >
                  <span className="dim-label text-gold">{c.label}</span>
                  <span className="text-lg text-on-ink transition-colors group-hover:text-gold">
                    {c.value}
                  </span>
                  <span className="text-xs text-muted-invert">{c.note}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Contact />

      {/* What happens next */}
      <section className="relative overflow-hidden bg-paper py-20 text-ink md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <div className="grid gap-10 md:grid-cols-12 md:items-center">
            <div className="md:col-span-5">
              <p className="dim-label mb-3 text-gold-deep">What happens next</p>
              <h2 className="display text-[clamp(1.9rem,4.2vw,3rem)] text-ink">
                No sales pitch.
                <br />
                Just a price.
              </h2>
            </div>
            <div className="md:col-span-7">
              <ul className="grid gap-8 sm:grid-cols-3">
                {[
                  {
                    t: "We look at the photos",
                    b: "Volume, access, stairs, and how far the pile sits from the truck.",
                  },
                  {
                    t: "You get a flat price",
                    b: "One number, agreed before we set off. No hourly billing, no weight surprises.",
                  },
                  {
                    t: "We clear it and sweep up",
                    b: "Loaded, hauled, sorted, and the area swept before we pull away.",
                  },
                ].map((s) => (
                  <Reveal key={s.t}>
                    <div className="border-t-2 border-ink pt-5 transition-colors duration-300 hover:border-gold">
                      <h3 className="display text-xl text-ink">{s.t}</h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-muted">
                        {s.b}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </ul>
              <p className="mt-10 text-sm text-muted">
                Prefer to talk it through? Call{" "}
                <a
                  href={business.phoneHref}
                  className="text-ink underline underline-offset-4"
                >
                  {business.phone}
                </a>{" "}
                — {business.founder} answers the phone.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
