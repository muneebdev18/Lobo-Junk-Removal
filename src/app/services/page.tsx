import Image from "next/image";
import Reveal from "@/components/Reveal";
import PageHero, { PageCta } from "@/components/PageShell";
import { business, media, services, tickerWords } from "@/lib/data";

export const metadata = {
  title: "Services — Junk Removal, Hauling, Cleanup & Demo",
  description:
    "Junk removal, property cleanup, material hauling, gutter cleanup, leaf removal, brush removal, light demolition, and HD814 dumpster trailer rentals across the South Bay, the San Fernando Valley, and Ventura.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="Everything we clear,"
        highlight="loaded and hauled."
        description="Eight service lines, one crew, one truck. Whether it is a single couch or a full estate cleanout, the price you get is the price we work for."
        image={media.servicesHero}
        imageAlt="Crew loading boxed appliances onto a truck"
        stats={[
          { value: "8", label: "Service lines" },
          { value: "Same-day", label: "Most jobs" },
          { value: "HD814", label: "Trailer rental" },
        ]}
      />

      {/* Service index strip */}
      <div className="relative border-b border-line-invert bg-ink-2">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 py-5">
            {services.map((s) => (
              <li key={s.slug}>
                <a
                  href={`#${s.slug}`}
                  className="dim-label group inline-flex items-center gap-2 text-muted-invert transition-colors hover:text-gold"
                >
                  <span className="text-gold/70">{s.code}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {services.map((s, i) => {
        const flip = i % 2 === 1;
        return (
          <section
            key={s.slug}
            id={s.slug}
            className={`relative overflow-hidden py-20 md:py-24 ${
              i % 2 === 0 ? "bg-ink text-on-ink" : "bg-ink-2 text-on-ink"
            }`}
          >
            <div className="mx-auto max-w-[1400px] px-5 md:px-8">
              <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
                <Reveal
                  className={`lg:col-span-6 ${flip ? "lg:order-2" : ""}`}
                >
                  <div className="cut-corner relative overflow-hidden border border-line-invert">
                    <Image
                      src={s.image}
                      alt={s.imageAlt}
                      width={1200}
                      height={900}
                      className="h-[300px] w-full object-cover md:h-[440px]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                    <span className="display absolute left-5 top-5 text-5xl text-gold/85 md:text-6xl">
                      {s.code}
                    </span>
                  </div>
                </Reveal>

                <Reveal
                  delay={0.1}
                  className={`lg:col-span-6 ${flip ? "lg:order-1" : ""}`}
                >
                  <p className="dim-label text-gold">{s.tagline}</p>
                  <h2 className="display mt-4 text-[clamp(1.9rem,4.4vw,3.2rem)] text-on-ink">
                    {s.title}
                  </h2>
                  <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-invert md:text-lg">
                    {s.body}
                  </p>

                  <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span
                          className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-gold"
                          aria-hidden
                        />
                        <span className="text-sm leading-relaxed text-muted-invert md:text-[0.95rem]">
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-9 flex flex-wrap items-center gap-5">
                    <a
                      href="/contact"
                      className="dim-label inline-flex items-center gap-2 bg-gold px-6 py-3.5 text-on-gold transition-colors hover:bg-gold-bright"
                    >
                      Get a quote for {s.title.toLowerCase()}
                      <span aria-hidden>→</span>
                    </a>
                    <a
                      href={business.phoneHref}
                      className="dim-label link-underline text-on-ink hover:text-gold"
                    >
                      Call {business.phone}
                    </a>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}

      {/* What we take */}
      <section className="relative overflow-hidden bg-paper py-20 text-ink md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="dim-label mb-3 text-gold-deep">What we take</p>
              <h2 className="display text-[clamp(1.9rem,4.4vw,3.2rem)] text-ink">
                If it is in your way,
                <br />
                it goes in the truck
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
                Send photos of the pile and we will tell you straight away
                whether we can take it, what it costs, and when we can be
                there.
              </p>
            </div>
            <div className="lg:col-span-7">
              <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {[
                  "Furniture and mattresses",
                  "Appliances and white goods",
                  "Electronics and e-waste",
                  "Hot tubs and sheds",
                  "Scrap metal and cardboard",
                  "Yard waste and leaf piles",
                  "Construction and demo debris",
                  "Dead vehicles",
                  "Hot tubs, pools, and spas",
                  "Office and restaurant equipment",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 border-b border-line py-3">
                    <span
                      className="h-2 w-2 shrink-0 rotate-45 bg-gold"
                      aria-hidden
                    />
                    <span className="text-[0.95rem] text-ink">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-muted">
                We do not take hazardous materials — paint, solvents, asbestos,
                or chemicals. We will point you to the right facility.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PageCta
        eyebrow="Next step"
        title="Get a firm price before we roll the truck."
        body="Send a few photos and the address. We will reply with a flat price and the next opening on our route."
        secondaryLabel="See service areas"
        secondaryHref="/service-areas"
      />

      <div className="border-b border-line-invert bg-ink-2 py-8">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {tickerWords.map((w) => (
              <li key={w} className="dim-label text-muted-invert">
                {w}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
