import type { Metadata } from "next";
import { Manrope, Outfit } from "next/font/google";
import "./globals.css";
import { SiteFooter, SiteHeader } from "./components/SiteHeader";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], display: "swap" });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://kashung-enterprise.newdiscoveryyt.chatgpt.site"),
  title: {
    default: "Kashung Enterprise — Your Idea. Your Business. Online.",
    template: "%s | Kashung Enterprise",
  },
  description: "Websites, online stores, booking systems, business software, and apps for businesses and entrepreneurs across Northeast India.",
  applicationName: "Kashung Enterprise",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Kashung Enterprise — Your Idea. Your Business. Let’s Take It Online.",
    description: "Websites, online stores, booking systems, business software, and apps for businesses and entrepreneurs across Northeast India.",
    url: "/",
    siteName: "Kashung Enterprise",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "Kashung Enterprise — Your idea. Your business. Let’s take it online." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kashung Enterprise — Your Idea. Your Business. Let’s Take It Online.",
    description: "Websites, online stores, booking systems, business software, and apps for businesses and entrepreneurs across Northeast India.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/favicon.svg?v=black-lime-jade", type: "image/svg+xml" }],
    shortcut: "/favicon.svg?v=black-lime-jade",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${manrope.variable}`}>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
