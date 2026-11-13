# LOBO Junk Removal — Website

Marketing site for **LOBO Junk Removal**, an owner-operated junk removal and
property cleanup company serving Napa Valley, Sonoma County, Solano, and Marin.

- **Founder:** Rafael Villalobos
- **Phone:** (707) 472-9902
- **Email:** Plata.rafav@gmail.com

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

## Commands

```bash
npm run dev     # development server
npm run build   # production build
npm run lint    # eslint
npm start       # serve the production build
```
