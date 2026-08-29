import type { Metadata } from "next";
import { Manrope, Outfit } from "next/font/google";
import "./globals.css";
import { SiteFooter, SiteHeader } from "./components/SiteHeader";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], display: "swap" });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://kashung-enterprise.newdiscoveryyt.chatgpt.site"),
  title: {
    default: "Kashung Enterprise — Ideas Into Digital Reality",
    template: "%s | Kashung Enterprise",
  },
  description: "Premium website, software, and app development for startups and entrepreneurs across Northeast India.",
  applicationName: "Kashung Enterprise",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Kashung Enterprise — Ideas Into Digital Reality",
    description: "Premium website, software, and app development for startups and entrepreneurs across Northeast India.",
    url: "/",
    siteName: "Kashung Enterprise",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "Kashung Enterprise — Ideas deserve to become real" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kashung Enterprise — Ideas Into Digital Reality",
    description: "Premium website, software, and app development for startups and entrepreneurs across Northeast India.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
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
