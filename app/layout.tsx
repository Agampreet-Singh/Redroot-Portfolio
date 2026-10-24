import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SITE_URL } from "@/lib/site";

// Self-hosted: Archivo variable (weight + width axes) and IBM Plex Mono.
const archivo = localFont({
  src: "./fonts/archivo-var.woff2",
  weight: "100 900",
  variable: "--font-archivo",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});

const plexMono = localFont({
  src: [
    { path: "./fonts/plex-mono-400.woff2", weight: "400" },
    { path: "./fonts/plex-mono-500.woff2", weight: "500" },
    { path: "./fonts/plex-mono-600.woff2", weight: "600" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "RedRoot | Penetration testing course and 1:1 mentorship",
    template: "%s | RedRoot",
  },
  description:
    "Learn professional penetration testing with Agampreet Singh (RedRoot): network, web, wireless and AI pentesting plus Red Team exercises. Or book a 1:1 cyber security career session.",
  authors: [{ name: "Agampreet Singh" }],
  openGraph: {
    type: "website",
    siteName: "RedRoot",
    title: "RedRoot | Penetration testing course and 1:1 mentorship",
    description:
      "Professional Penetration Testing course and 1:1 career mentorship from Agampreet Singh (RedRoot).",
    images: [{ url: "/images/framework.jpg", width: 1536, height: 1024 }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#15202b",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-red focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
