"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Mail, Menu, X } from "lucide-react";
import { InstagramIcon, KashungMark, WhatsAppIcon } from "./Icons";

export function Mark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand-mark ${compact ? "brand-mark--compact" : ""}`} aria-hidden="true">
      <KashungMark />
    </span>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    navRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      {/* Native navigation is intentional: vinext production routing can swallow client-side Link transitions. */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a className="brand" href="/" aria-label="Kashung Enterprise home" onClick={closeMenu}>
        <Mark />
        <span>KASHUNG<small>ENTERPRISE</small></span>
      </a>
      <nav ref={navRef} id="primary-navigation" className={open ? "nav nav--open" : "nav"} aria-label="Primary navigation">
        <a className={pathname === "/services" ? "nav-active" : ""} href="/services" aria-current={pathname === "/services" ? "page" : undefined} onClick={closeMenu}>Services</a>
        <a className={pathname === "/portfolio" ? "nav-active" : ""} href="/portfolio" aria-current={pathname === "/portfolio" ? "page" : undefined} onClick={closeMenu}>Portfolio</a>
        <a className={pathname === "/about" ? "nav-active" : ""} href="/about" aria-current={pathname === "/about" ? "page" : undefined} onClick={closeMenu}>About</a>
        <a className={pathname === "/contact" ? "nav-active" : ""} href="/contact" aria-current={pathname === "/contact" ? "page" : undefined} onClick={closeMenu}>Contact</a>
        <a className="nav-cta" href="/contact" onClick={closeMenu}>Start a project <ArrowUpRight aria-hidden="true" /></a>
      </nav>
      <button ref={menuButtonRef} className="menu-button" type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen((current) => !current)}>
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <div className="footer-intro">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a className="brand brand--footer" href="/"><Mark /> <span>KASHUNG<small>ENTERPRISE</small></span></a>
        <p>Turning bold ideas into digital reality across Northeast India.</p>
      </div>
      <div className="footer-connect">
        <a href="mailto:kashthot@gmail.com"><Mail aria-hidden="true" /> Email us</a>
        <a href="https://www.instagram.com/kashung.enterprise/" target="_blank" rel="noopener noreferrer"><InstagramIcon /> Instagram</a>
        <a className="footer-connect--whatsapp" href="https://wa.me/916009686518" target="_blank" rel="noopener noreferrer" aria-label="Message Kashung Enterprise on WhatsApp at +91 6009686518">
          <WhatsAppIcon />
          <span>WhatsApp<small>+91 6009686518</small></span>
        </a>
      </div>
      <div className="footer-meta"><span>© 2026 Kashung Enterprise · Earth imagery: NASA/GSFC</span><nav className="footer-links" aria-label="Footer navigation"><a href="/services">Services</a><i aria-hidden="true">·</i><a href="/about">About</a><i aria-hidden="true">·</i><a href="/portfolio">Portfolio</a><i aria-hidden="true">·</i><a href="/contact">Contact</a><i aria-hidden="true">·</i><a href="/terms">Terms</a><i aria-hidden="true">·</i><a href="/privacy">Privacy</a><i aria-hidden="true">·</i><a href="/refund-policy">Refunds</a></nav></div>
    </footer>
  );
}
