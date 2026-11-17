"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { business, contactChannels, jobTypes, media, pickupWindows } from "@/lib/data";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [jobType, setJobType] = useState<string>(jobTypes[0]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<File[]>([]);
  const [notesLen, setNotesLen] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  useGSAP(
    () => {
      gsap.from(".contact-reveal", {
        autoAlpha: 0,
        y: 28,
        duration: 0.7,
        stagger: 0.09,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: root },
  );

  const validate = useCallback(() => {
    const next: Record<string, string> = {};
    const form = formRef.current;
    if (!form) return false;
    const fd = new FormData(form);
    const name = (fd.get("name") as string).trim();
    const email = (fd.get("email") as string).trim();
    const phone = (fd.get("phone") as string).trim();
    const notes = (fd.get("notes") as string).trim();

    if (!name) next.name = "Your name is required.";
    if (!email && !phone) next.email = "Add a phone number or an email so we can reach you.";
    else if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "That email address does not look right.";
    if (!notes) next.notes = "Tell us what needs to go.";
    else if (notes.length < 10)
      next.notes = "A little more detail helps us price it accurately.";

    setErrors(next);
    return Object.keys(next).length === 0;
  }, []);

  const focusFirstError = () => {
    const keys = Object.keys(errors);
    if (!keys.length) return;
    const input = formRef.current?.querySelector<HTMLElement>(`[name="${keys[0]}"]`);
    input?.focus();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "notes") setNotesLen(value.length);
    if (errors[name]) {
      setErrors((prev) => {
        const n = { ...prev };
        delete n[name];
        return n;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = Array.from(e.target.files ?? []).filter(
      (f) => f.type.startsWith("image/") || f.type.includes("pdf"),
    );
    if (list.length > 5) {
      setErrors((prev) => ({ ...prev, files: "Up to 5 files, please." }));
      return;
    }
    setFiles(list);
    setErrors((prev) => {
      const n = { ...prev };
      delete n.files;
      return n;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    if (!validate()) {
      focusFirstError();
      return;
    }
    setSending(true);
    setErrors((prev) => {
      const n = { ...prev };
      delete n.submit;
      return n;
    });
    try {
      const fd = new FormData(e.currentTarget);
      const res = await fetch("/api/contact", { method: "POST", body: fd });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setErrors((prev) => ({
          ...prev,
          submit:
            data.error ??
            "Something went wrong sending your request. Please call us instead.",
        }));
        return;
      }
      setSubmitted(true);
    } catch {
      setErrors((prev) => ({
        ...prev,
        submit:
          "Could not reach the server. Check your connection or call us instead.",
      }));
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      ref={root}
      className="relative overflow-hidden bg-ink py-24 text-on-ink md:py-32"
      aria-labelledby="contact-heading"
    >
      <div className="pointer-events-none absolute left-1/2 top-10 h-[30rem] w-[30rem] -translate-x-1/2 gold-glow opacity-30" aria-hidden />

      <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        <div className="mb-12 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="contact-reveal dim-label mb-3 text-gold">Free quote</p>
            <h2
              id="contact-heading"
              className="contact-reveal display text-[clamp(2.1rem,5.4vw,4.2rem)] text-on-ink text-balance"
            >
              Send photos.
              <br />
              Get a firm price.
            </h2>
          </div>
          {/* <p className="contact-reveal  text-base leading-relaxed text-muted-invert md:text-right">
            One form, one reply. No sales sequence, no pressure — just the
            number, and a time we can be there.
          </p> */}
        </div>

        <div className="contact-reveal grid overflow-hidden border border-line-invert lg:grid-cols-12">
          {/* Rail */}
          <aside className="relative overflow-hidden bg-gold p-7 text-on-gold md:p-9 lg:col-span-4">
            <div className="slash-band absolute inset-0 opacity-30" aria-hidden />
            <div className="relative flex h-full flex-col">
              <span className="dim-label inline-flex w-fit items-center gap-2 border border-on-gold/35 px-3 py-1.5">
                <span className="h-1.5 w-1.5 bg-on-gold" aria-hidden />
                ~2 minute form
              </span>
              <h3 className="display mt-6 text-[1.7rem] leading-tight md:text-[2rem]">
                Let us handle
                <br />
                the junk.
              </h3>
              <p className="mt-4 max-w-xs text-sm leading-relaxed opacity-80">
                A few photos of the pile, the address, and what you want gone.
                That is everything we need to quote it.
              </p>

              <div className="relative mt-8 hidden lg:block">
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={media.heroCrew}
                    alt="Crew loading a truck"
                    fill
                    className="object-cover opacity-90"
                    sizes="320px"
                  />
                  <div className="absolute inset-0 bg-ink/25" />
                </div>
              </div>

              <div className="mt-auto space-y-3 pt-8">
                {contactChannels.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    className="group flex items-center justify-between gap-3 border-t border-on-gold/30 pt-3 text-sm"
                  >
                    <span className="dim-label opacity-70">{c.label}</span>
                    <span className="flex items-center gap-1.5">
                      {c.value}
                      <span
                        aria-hidden
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </aside>

          {/* Form */}
          <div className="bg-paper lg:col-span-8">
            <AnimatePresence mode="wait" initial={false}>
              {submitted ? (
                <motion.div
                  key="success"
                  role="status"
                  aria-live="polite"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="flex min-h-[420px] flex-col items-start justify-center p-8 md:p-12"
                >
                  <motion.span
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 0.12,
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    className="dim-label inline-flex items-center gap-2 border border-ink/20 bg-bone px-3 py-1.5 text-ink"
                  >
                    <span className="h-1.5 w-1.5 bg-gold" aria-hidden />
                    Request received
                  </motion.span>
                  <p className="display mt-6 text-3xl text-ink md:text-4xl">
                    We have your photos.
                  </p>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
                    You will hear back with a price shortly — usually the same
                    day. Need it handled sooner? Call{" "}
                    <a
                      href={business.phoneHref}
                      className="text-ink underline underline-offset-4"
                    >
                      {business.phone}
                    </a>
                    .
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <button
                      type="button"
                      className="dim-label border border-ink px-6 py-3 text-ink transition-colors hover:bg-ink hover:text-on-ink"
                      onClick={() => {
                        setSubmitted(false);
                        setFiles([]);
                        setNotesLen(0);
                        formRef.current?.reset();
                      }}
                    >
                      Send another request
                    </button>
                    <a
                      href="/services"
                      className="dim-label link-underline text-ink"
                    >
                      Browse services
                    </a>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="p-7 md:p-10"
                >
                  <p className="field-label mb-4">What do you need taken care of?</p>
                  <div className="flex flex-wrap gap-2">
                    {jobTypes.map((t) => {
                      const active = jobType === t;
                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setJobType(t)}
                          aria-pressed={active}
                          className={`relative border px-3.5 py-2 transition-colors ${
                            active
                              ? "border-ink"
                              : "border-line hover:border-ink/45"
                          }`}
                        >
                          {active && (
                            <motion.span
                              layoutId="contact-type-pill"
                              className="absolute inset-0 bg-ink"
                              transition={{
                                type: "spring",
                                stiffness: 420,
                                damping: 36,
                              }}
                            />
                          )}
                          <span
                            className={`dim-label relative ${active ? "text-on-ink" : "text-ink"}`}
                          >
                            {t}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <input type="hidden" name="type" value={jobType} />
                  {/* Honeypot — hidden from humans, bots fill it */}
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="pointer-events-none absolute left-[-9999px] top-[-9999px] h-0 w-0 opacity-0"
                  />

                  <div className="mt-9 grid gap-5 md:grid-cols-2">
                    <label className="field-group">
                      <span
                        className={`field-label ${errors.name ? "text-red-600" : ""}`}
                      >
                        Full name *
                      </span>
                      <input
                        required
                        name="name"
                        autoComplete="name"
                        onChange={handleChange}
                        className={`field ${errors.name ? "border-red-500" : ""}`}
                        placeholder="Jordan Lee"
                      />
                      {errors.name && (
                        <p className="mt-1 text-[11px] font-medium text-red-600">
                          {errors.name}
                        </p>
                      )}
                    </label>

                    <label className="field-group">
                      <span className="field-label">Phone</span>
                      <input
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        onChange={(e) => {
                          handleChange(
                            e as unknown as React.ChangeEvent<HTMLInputElement>,
                          );
                          e.target.value = formatPhone(e.target.value);
                        }}
                        className="field"
                        placeholder="(707) 555-0100"
                      />
                    </label>

                    <label className="field-group">
                      <span
                        className={`field-label ${errors.email ? "text-red-600" : ""}`}
                      >
                        Email
                      </span>
                      <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        onChange={handleChange}
                        className={`field ${errors.email ? "border-red-500" : ""}`}
                        placeholder="you@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-[11px] font-medium text-red-600">
                          {errors.email}
                        </p>
                      )}
                    </label>

                    <label className="field-group">
                      <span className="field-label">City or ZIP</span>
                      <input
                        name="location"
                        autoComplete="postal-code"
                        onChange={handleChange}
                        className="field"
                        placeholder="Torrance, 90503"
                      />
                    </label>
                  </div>

                  <label className="field-group mt-6">
                    <span className="field-label">When do you need it gone?</span>
                    <select
                      name="window"
                      className="field field-select"
                      defaultValue={pickupWindows[0]}
                    >
                      {pickupWindows.map((w) => (
                        <option key={w} value={w}>
                          {w}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="field-group mt-6">
                    <span
                      className={`field-label ${errors.notes ? "text-red-600" : ""}`}
                    >
                      What needs to go? *
                    </span>
                    <textarea
                      required
                      name="notes"
                      rows={4}
                      onChange={handleChange}
                      maxLength={600}
                      className={`field ${errors.notes ? "border-red-500" : ""}`}
                      placeholder="Old couch, two mattresses, and a pile of boxes in the garage…"
                    />
                    {errors.notes && (
                      <p className="mt-1 text-[11px] font-medium text-red-600">
                        {errors.notes}
                      </p>
                    )}
                    <p className="mt-1 text-right text-[11px] text-muted">
                      {notesLen}/600
                    </p>
                  </label>

                  <label className="field-group mt-4">
                    <span className="field-label">Photos (optional, up to 5)</span>
                    <input
                      type="file"
                      name="files"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="block w-full text-sm text-ink file:mr-4 file:border-0 file:bg-ink file:px-4 file:py-2 file:text-sm file:font-semibold file:text-on-ink hover:file:bg-ink-3"
                    />
                    {files.length > 0 && (
                      <p className="text-[11px] font-medium text-muted">
                        {files.map((f) => f.name).join(", ")} ({files.length} file
                        {files.length > 1 ? "s" : ""})
                      </p>
                    )}
                    {errors.files && (
                      <p className="mt-1 text-[11px] font-medium text-red-600">
                        {errors.files}
                      </p>
                    )}
                  </label>

                  {errors.submit && (
                    <p
                      role="alert"
                      className="mt-6 border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                    >
                      {errors.submit}
                    </p>
                  )}

                  <div className="mt-9 flex flex-col items-start gap-5 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-[19rem] text-xs leading-relaxed text-muted">
                      Send this and we may contact you about the job. No lists,
                      no spam, no resale of your details.
                    </p>
                    <motion.button
                      type="submit"
                      whileHover={sending ? undefined : { y: -2 }}
                      whileTap={sending ? undefined : { scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 420, damping: 26 }}
                      disabled={sending}
                      className="dim-label group inline-flex items-center justify-center gap-2 bg-gold px-7 py-4 text-on-gold transition-colors hover:bg-gold-bright disabled:opacity-70"
                    >
                      {sending ? (
                        <>
                          <span
                            className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-on-gold/30 border-t-on-gold"
                            aria-hidden
                          />
                          Sending…
                        </>
                      ) : (
                        <>
                          Get my free quote
                          <span
                            aria-hidden
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          >
                            →
                          </span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
