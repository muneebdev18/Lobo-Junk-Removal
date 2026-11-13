import type { Metadata } from "next";
import { Anton, Inter, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CursorTrail from "@/components/CursorTrail";
import MobileCtaBar from "@/components/MobileCtaBar";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lobojunkremoval.com"),
  title: {
    default: "LOBO Junk Removal — Junk Removal & Property Cleanup | Napa Valley",
    template: "%s | LOBO Junk Removal",
  },
  description:
    "LOBO Junk Removal clears junk, cleans properties, hauls materials, clears gutters, rakes leaves, removes brush, and does light demolition across Napa, Sonoma, and Solano. Same-day service. Call (707) 472-9902.",
  keywords: [
    "junk removal Napa",
    "property cleanup Napa Valley",
    "material hauling Napa",
    "gutter cleanup Napa",
    "leaf removal Napa",
    "brush removal Napa",
    "light demolition Napa",
    "dumpster trailer rental HD814",
  ],
  openGraph: {
    title: "LOBO Junk Removal — Let Us Handle the Junk!",
    description:
      "Junk removal, property cleanup, hauling, and dumpster trailer rentals across Napa Valley. Same-day service, affordable pricing, eco-friendly disposal.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://images.pexels.com/photos/29174548/pexels-photo-29174548.jpeg?auto=compress&cs=tinysrgb&w=1200",
        width: 1200,
        height: 800,
        alt: "LOBO dump truck on a job site",
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable} ${barlow.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ink text-on-ink">
        <CursorTrail />
        <SiteHeader />
        <main className="flex-1 pb-[4.25rem] sm:pb-0">{children}</main>
        <SiteFooter />
        <MobileCtaBar />
      </body>
    </html>
  );
}
