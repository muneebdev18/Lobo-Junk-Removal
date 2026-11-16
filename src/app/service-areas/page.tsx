import Image from "next/image";
import Reveal from "@/components/Reveal";
import PageHero, { PageCta } from "@/components/PageShell";
import { business, media, serviceAreas } from "@/lib/data";

export const metadata = {
  title: "Service Areas — South Bay, San Fernando Valley & Ventura",
  description:
    "LOBO Junk Removal covers the South Bay, the San Fernando Valley, and Ventura — Calabasas, Ventura, San Fernando, Canoga Park, North Hollywood, Van Nuys, Malibu, and Porter Ranch. Same-day junk removal, hauling, and cleanup.",
};

export default function ServiceAreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Where we work"
        title="Based in the South Bay,"
        highlight="all over Los Angeles."
        description="We run the same route every week across the South Bay, the San Fernando Valley, and Ventura. Same-day service where we already are, next-day everywhere else."
        image={media.areasHero}
        imageAlt="Aerial view of the Los Angeles basin and surrounding suburbs"
        stats={[
          { value: "9", label: "Areas covered" },
          { value: "60+", label: "Neighborhoods served" },
          { value: "Same-day", label: "In our home routes" },
        ]}
      />

      <section className="relative overflow-hidden bg-ink py-20 text-on-ink md:py-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <div className="mb-14 max-w-2xl">
            <p className="dim-label mb-4 text-gold">Where the truck goes</p>
            <h2 className="display text-[clamp(1.9rem,4.4vw,3.2rem)] text-on-ink">
              Every town we cover, with the neighborhoods around it.
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {serviceAreas.map((area, i) => (
              <Reveal key={area.region} delay={(i % 2) * 0.08}>
                <article className="group h-full border border-line-invert bg-ink-2 transition-colors duration-300 hover:border-gold/50">
                  <div className="relative h-[240px] w-full overflow-hidden">
                    <Image
                      src={area.image}
                      alt={area.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-ink/35 to-transparent" />
                    <span className="dim-label absolute right-5 top-5 text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="display absolute inset-x-0 bottom-0 p-6 text-3xl text-on-ink md:text-4xl">
                      {area.region}
                    </h2>
                  </div>
                  <div className="p-7 md:p-9">
                    <p className="max-w-md text-sm leading-relaxed text-muted-invert md:text-[0.95rem]">
                      {area.note}
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-1.5">
                      {area.cities.map((city) => (
                        <li
                          key={city}
                          className="dim-label border border-line-invert px-2.5 py-1.5 text-muted-invert"
                        >
                          {city}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-paper py-20 text-ink md:py-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <p className="dim-label mb-3 text-gold-deep">Outside the list?</p>
              <h2 className="display text-[clamp(1.9rem,4.4vw,3.2rem)] text-ink">
                Call anyway. We probably
                <br />
                already cover you.
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-muted md:text-lg">
                We add routes as the work comes in, and a short drive outside our
                usual territory is often still worth it. Send photos and we
                will tell you straight away — no trip charge surprises once we
                are on the way.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={business.phoneHref}
                  className="dim-label inline-flex items-center justify-center gap-2 bg-ink px-7 py-4 text-on-ink transition-colors hover:bg-ink-3"
                >
                  Call {business.phone}
                  <span aria-hidden>→</span>
                </a>
                <a
                  href="/contact"
                  className="dim-label link-underline justify-center text-ink"
                >
                  Send photos instead
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="cut-corner relative overflow-hidden">
                <Image
                  src={media.areasShore}
                  alt="Aerial view of the South Bay coastline and beach cities"
                  width={1200}
                  height={900}
                  className="h-[300px] w-full object-cover md:h-[460px]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="dim-label text-gold">Route day</p>
                  <p className="display mt-2 text-2xl text-on-ink">
                    South Bay → Valley → Ventura
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PageCta
        eyebrow="Next step"
        title="Found your town? Let's get it cleared."
        body="Same-day starts across our home routes. Send photos of the pile and we will confirm the price before we load."
        secondaryLabel="See all services"
        secondaryHref="/services"
      />
    </>
  );
}
