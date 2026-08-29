"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function Mark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand-mark ${compact ? "brand-mark--compact" : ""}`} aria-hidden="true">
      <i /><i /><i />
    </span>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Kashung Enterprise home" onClick={closeMenu}>
        <Mark />
        <span>KASHUNG<small>ENTERPRISE</small></span>
      </Link>
      <nav id="primary-navigation" className={open ? "nav nav--open" : "nav"} aria-label="Primary navigation">
        <Link href="/#services" onClick={closeMenu}>Services</Link>
        <Link className={pathname === "/portfolio" ? "nav-active" : ""} href="/portfolio" aria-current={pathname === "/portfolio" ? "page" : undefined} onClick={closeMenu}>Portfolio</Link>
        <Link href="/#about" onClick={closeMenu}>About</Link>
        <Link className={pathname === "/contact" ? "nav-active" : ""} href="/contact" aria-current={pathname === "/contact" ? "page" : undefined} onClick={closeMenu}>Contact</Link>
        <Link className="nav-cta" href="/contact" onClick={closeMenu}>Start a project <span>↗</span></Link>
      </nav>
      <button className="menu-button" type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen((current) => !current)}>
        <span /><span />
      </button>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <Link className="brand brand--footer" href="/"><Mark /> <span>KASHUNG<small>ENTERPRISE</small></span></Link>
      <p>Turning bold ideas into digital reality.</p>
      <div><span>© 2026 Kashung Enterprise</span><span className="footer-links"><Link href="/portfolio">Portfolio</Link><i aria-hidden="true">·</i><Link href="/contact">Contact</Link><i aria-hidden="true">·</i><Link href="/terms">Terms</Link><i aria-hidden="true">·</i><Link href="/privacy">Privacy</Link><i aria-hidden="true">·</i><Link href="/refund-policy">Refunds</Link></span></div>
    </footer>
  );
}
