"use client";

import { useState } from "react";
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

  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Kashung Enterprise home">
        <Mark />
        <span>KASHUNG<small>ENTERPRISE</small></span>
      </a>
      <nav className={open ? "nav nav--open" : "nav"} aria-label="Primary navigation">
        <a href="/#services" onClick={() => setOpen(false)}>Services</a>
        <a className={pathname === "/portfolio" ? "nav-active" : ""} href="/portfolio" onClick={() => setOpen(false)}>Portfolio</a>
        <a href="/#about" onClick={() => setOpen(false)}>About</a>
        <a className={pathname === "/contact" ? "nav-active" : ""} href="/contact" onClick={() => setOpen(false)}>Contact</a>
        <a className="nav-cta" href="/contact" onClick={() => setOpen(false)}>Start a project <span>↗</span></a>
      </nav>
      <button className="menu-button" type="button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span /><span />
      </button>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <a className="brand brand--footer" href="/"><Mark /> <span>KASHUNG<small>ENTERPRISE</small></span></a>
      <p>Turning bold ideas into digital reality.</p>
      <div><span>© 2026 Kashung Enterprise</span><span><a href="/portfolio">Portfolio</a>&nbsp;&nbsp;·&nbsp;&nbsp;<a href="/contact">Contact</a></span></div>
    </footer>
  );
}
