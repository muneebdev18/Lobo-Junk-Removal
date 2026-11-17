# LOBO Junk Removal — Website

Marketing site for **LOBO Junk Removal**, an owner-operated junk removal and
property cleanup company serving Napa Valley, Sonoma County, Solano, and Marin.

- **Founder:** Rafael Villalobos
- **Phone:** (707) 472-9902
- **Email:** lobojunkremover@gmail.com

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS v4 · GSAP ·
Framer Motion · Embla Carousel · TypeScript

## Design system

| Token | Value | Use |
| --- | --- | --- |
| `ink` | `#0a0a0b` | Primary background |
| `ink-2` / `ink-3` / `ink-4` | `#121214` → `#26262b` | Elevated black surfaces |
| `gold` / `gold-bright` / `gold-deep` | `#f5b419` → `#ffcb47` → `#c2840a` | Accent |
| `paper` / `bone` | `#ffffff` / `#f4f4f1` | Readable content surfaces |

Typography pairs **Anton** (display), **Inter** (body), and **Barlow Condensed**
(utility labels). The brand mark is a custom SVG howling wolf (`src/components/Logo.tsx`),
and the recurring diagonal "claw slash" motif is implemented as `.slash-band`
and `.cut-corner` utilities in `src/app/globals.css`.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Hero, services, why choose us, about, process, HD814 rental, service areas, testimonials, FAQ, quote form |
| `/services` | All eight service lines in detail |
| `/dumpster-rentals` | HD814 dump trailer rental |
| `/service-areas` | Coverage by county and city |
| `/contact` | Quote form and contact channels |

## Editing content

Business copy, services, FAQs, testimonials, service areas, and imagery URLs all
live in `src/lib/data.ts`.

## Contact form email

The quote form posts to `src/app/api/contact/route.ts`, which emails every
submission (with photo attachments) to **lobojunkremover@gmail.com** via
[Resend](https://resend.com). To enable it:

1. Sign up at resend.com using **lobojunkremover@gmail.com** and create an
   API key (free tier: 3,000 emails/month).
2. Copy `.env.example` to `.env.local` and paste the key into
   `RESEND_API_KEY`.
3. Restart the dev server / redeploy.

The default sender (`onboarding@resend.dev`) only delivers to the Resend
account owner's address, which is exactly where the mail needs to go. To
send from your own domain, verify it in Resend and set `CONTACT_FROM_EMAIL`.

Submissions are validated server-side, honeypot-protected against bots, and
capped at 5 files / 5 MB each.

## Commands

```bash
npm run dev     # development server
npm run build   # production build
npm run lint    # eslint
npm start       # serve the production build
```
