"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SiteFooter, SiteHeader } from "../components/SiteHeader";

if (typeof window !== "undefined") gsap.registerPlugin(useGSAP);

export default function ContactPage() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.from(".contact-page-hero > *, .contact-choice", { y: 46, autoAlpha: 0, duration: .9, stagger: .09, ease: "power3.out" });
  }, { scope: root });

  return (
    <main ref={root} className="inner-page contact-page">
      <a className="skip-link" href="#contact-content">Skip to content</a>
      <SiteHeader />
      <section className="contact-page-hero" id="contact-content">
        <p className="eyebrow"><i /> New project enquiries</p>
        <h1>Tell us what<br />you want to <em>make real.</em></h1>
        <p className="contact-lead">Share the idea, the problem, or even the rough sketch. We’ll help you find the clearest path forward.</p>
      </section>

      <section className="contact-choices" aria-label="Contact options">
        <a className="contact-choice contact-choice--email" href="mailto:kashthot@gmail.com?subject=New%20project%20enquiry">
          <div>
            <span>01 / Email</span>
            <b>↗</b>
          </div>
          <h2>Start a<br />conversation.</h2>
          <p>kashthot@gmail.com</p>
          <small>Best for briefs, ideas, and project enquiries.</small>
        </a>

        <a className="contact-choice contact-choice--instagram" href="https://www.instagram.com/kashung.enterprise/" target="_blank" rel="noreferrer">
          <div>
            <span>02 / Instagram</span>
            <b>↗</b>
          </div>
          <div className="instagram-icon" aria-hidden="true"><i /><b /></div>
          <h2>Follow the<br />build journey.</h2>
          <p>@kashung.enterprise</p>
          <small>Ideas, work in progress, and launches from the studio.</small>
        </a>
      </section>

      <section className="contact-details">
        <div><span>Based in</span><strong>Manipur, Northeast India</strong></div>
        <div><span>Building</span><strong>Websites · Software · Apps</strong></div>
        <div><span>Working with</span><strong>Startups · Entrepreneurs · Teams</strong></div>
      </section>

      <section className="contact-promise">
        <p className="section-label">What happens next</p>
        <div><span>01</span><p>We read your note and understand the opportunity.</p></div>
        <div><span>02</span><p>We reply with useful questions—not a generic sales pitch.</p></div>
        <div><span>03</span><p>If there’s a fit, we shape the scope and build plan together.</p></div>
      </section>
      <SiteFooter />
    </main>
  );
}
