import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import PageHero, { PageCta } from "@/components/PageShell";
import {
  business,
  media,
  trailerFeatures,
  trailerUses,
} from "@/lib/data";

export const metadata = {
  title: "Dumpster Trailer Rentals — HD814 Model | Napa Valley",
  description:
    "Rent the LOBO HD814 dump trailer by the day. Delivered to your driveway across Napa Valley, Sonoma, and Solano — with or without haul service.",
};

export default function DumpsterRentalsPage() {
  return (
    <>
      <PageHero
        eyebrow={business.trailerLabel}
        title="Rent us by the day."
        highlight="HD814 dump trailer."
        description="Our HD814 goes out on your schedule. Load it with roofing, soil, green waste, or remodel debris and take it to the transfer station yourself — or let us handle the round trip."
        image={media.trailerHero}
        imageAlt="Dump truck carrying cut branches away from a property"
        stats={[
          { value: "HD814", label: "Tandem-axle dump trailer" },
          { value: "Daily", label: "Rental rate" },
          { value: "Incl.", label: "Delivery & pickup" },
        ]}
      />

      {/* The trailer */}
      <section className="relative overflow-hidden bg-ink py-20 text-on-ink md:py-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              <div className="cut-corner relative overflow-hidden border border-line-invert">
                <Image
                  src={media.trailer}
                  alt="Dump trailer ready for rental"
                  width={1200}
                  height={900}
                  className="h-[300px] w-full object-cover md:h-[460px]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                <div className="absolute left-5 top-5 bg-gold px-4 py-2">
                  <p className="display text-xl text-on-gold">HD814</p>
                </div>
                <div className="absolute right-5 top-5 bg-on-ink px-4 py-2">
                  <p className="display text-xl text-ink">Rent Me</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-6">
              <p className="dim-label text-gold">What you get</p>
              <h2 className="display mt-4 text-[clamp(1.9rem,4.4vw,3.2rem)] text-on-ink">
                Built for the loads
                <br />
                nobody wants to touch
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-invert md:text-lg">
                Green waste, roofing debris, soil, and remodel material — the
                stuff that is too heavy for a pickup bed and too awkward to
                borrow a truck for.
              </p>

              <ul className="mt-9 grid gap-6 sm:grid-cols-2">
                {trailerFeatures.map((f) => (
                  <li key={f.title} className="border-t border-line-invert pt-5">
                    <h3 className="display text-lg text-on-ink">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-invert">
                      {f.body}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Uses + booking */}
      <section className="relative overflow-hidden bg-paper py-20 text-ink md:py-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="dim-label mb-3 text-gold-deep">Great for</p>
              <h2 className="display text-[clamp(1.9rem,4.4vw,3.2rem)] text-ink">
                The jobs that fill a
                <br />
                trailer in one load
              </h2>
              <ul className="mt-8 border-t border-line">
                {trailerUses.map((u) => (
                  <li
                    key={u}
                    className="flex items-center gap-3 border-b border-line py-3.5"
                  >
                    <span
                      className="h-2 w-2 shrink-0 rotate-45 bg-gold"
                      aria-hidden
                    />
                    <span className="text-[0.95rem] text-ink">{u}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7">
              <div className="border border-line bg-bone p-7 md:p-10">
                <p className="dim-label text-gold-deep">How booking works</p>
                <ol className="mt-7 space-y-7">
                  {[
                    {
                      t: "Tell us the job",
                      b: "What you are loading, roughly how much of it, and where the trailer needs to sit.",
                    },
                    {
                      t: "We confirm the day and rate",
                      b: "Delivery, the day rate, and whether you want haul service or want to make the transfer station run yourself.",
                    },
                    {
                      t: "Trailer delivered to your driveway",
                      b: "We drop it, set the ramps, and hand over the keys. Load it at your own pace.",
                    },
                    {
                      t: "We pick it up",
                      b: "When the rental ends we collect it — or take the load to the transfer station for you.",
                    },
                  ].map((s, i) => (
                    <li key={s.t} className="flex gap-5">
                      <span className="display flex h-11 w-11 shrink-0 items-center justify-center bg-ink text-lg text-gold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="display text-xl text-ink">{s.t}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          {s.b}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-9 flex flex-col gap-3 border-t border-line pt-7 sm:flex-row sm:items-center">
                  <Link
                    href="/contact"
                    className="dim-label inline-flex items-center justify-center gap-2 bg-gold px-7 py-4 text-on-gold transition-colors hover:bg-gold-deep hover:text-on-ink"
                  >
                    Book the HD814
                    <span aria-hidden>→</span>
                  </Link>
                  <a
                    href={business.phoneHref}
                    className="dim-label link-underline justify-center text-ink"
                  >
                    Call {business.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PageCta
        eyebrow="Also available"
        title="Need a crew instead of a trailer?"
        body="Most jobs are faster if we just come and clear it. Same-day starts, firm price before we load, and the floor swept when we leave."
        primaryLabel="Get a free quote"
        secondaryLabel="See all services"
        secondaryHref="/services"
      />
    </>
  );
}
