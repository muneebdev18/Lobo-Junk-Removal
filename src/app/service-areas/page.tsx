import Image from "next/image";
import Reveal from "@/components/Reveal";
import PageHero, { PageCta } from "@/components/PageShell";
import { business, media, serviceAreas } from "@/lib/data";

export const metadata = {
  title: "Service Areas — Napa Valley, Sonoma, Solano & Marin",
  description:
    "LOBO Junk Removal covers Napa Valley, Sonoma County, Solano, and Marin across the North Bay — same-day junk removal, hauling, and cleanup.",
};

export default function ServiceAreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Where we work"
        title="Based in Napa Valley,"
        highlight="all over the North Bay."
        description="We run the same route every week across Napa, Sonoma, Solano, and Marin. Same-day service where we already are, next-day everywhere else."
        image={media.areasHero}
        imageAlt="Autumn vineyard rows in Napa Valley"
        stats={[
          { value: "4", label: "Counties covered" },
          { value: "34", label: "Cities served" },
          { value: "Same-day", label: "In our home routes" },
        ]}
      />

      <section className="relative overflow-hidden bg-ink py-20 text-on-ink md:py-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {serviceAreas.map((area, i) => (
              <Reveal key={area.region} delay={i * 0.08}>
                <div className="group h-full border border-line-invert bg-ink-2 p-7 transition-colors duration-300 hover:border-gold/50 md:p-9">
                  <div className="flex items-baseline justify-between gap-4 border-b border-line-invert pb-5">
                    <h2 className="display text-3xl text-on-ink md:text-4xl">
                      {area.region}
                    </h2>
                    <span className="dim-label text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-invert md:text-[0.95rem]">
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
                  src={media.areasAutumn}
                  alt="Autumn vineyard rows near Napa"
                  width={1200}
                  height={900}
                  className="h-[300px] w-full object-cover md:h-[460px]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="dim-label text-gold">Route day</p>
                  <p className="display mt-2 text-2xl text-on-ink">
                    Napa → Sonoma → Solano
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
