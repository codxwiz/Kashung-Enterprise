"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, CircleCheck, Handshake, Layers3, Mail, MapPin } from "lucide-react";
import { InstagramIcon } from "../components/Icons";

if (typeof window !== "undefined") gsap.registerPlugin(useGSAP);

export default function ContactPage() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.from(".contact-page-hero > *, .contact-choice", { y: 46, autoAlpha: 0, duration: .9, stagger: .09, ease: "power3.out" });
  }, { scope: root });

  return (
    <main ref={root} id="main-content" tabIndex={-1} className="inner-page contact-page">
      <section className="contact-page-hero">
        <p className="eyebrow"><i /> New business and project enquiries</p>
        <h1>Tell us what<br />you want to <em>take online.</em></h1>
        <p className="contact-lead">A business, a skill, or simply an idea—you do not need a technical brief. Tell us how you want it to work and we’ll help shape the clearest way forward.</p>
      </section>

      <section className="contact-choices" id="contact-options" aria-label="Contact options">
        <a className="contact-choice contact-choice--email" href="mailto:kashthot@gmail.com?subject=New%20project%20enquiry">
          <div>
            <span><Mail aria-hidden="true" /> Email us</span>
            <ArrowUpRight aria-hidden="true" />
          </div>
          <div className="contact-choice-icon" aria-hidden="true"><Mail /></div>
          <h2>Start a<br />conversation.</h2>
          <p>kashthot@gmail.com</p>
          <small>Best for briefs, ideas, and project enquiries.</small>
        </a>

        <a className="contact-choice contact-choice--instagram" href="https://www.instagram.com/kashung.enterprise/" target="_blank" rel="noopener noreferrer">
          <div>
            <span><InstagramIcon /> Instagram</span>
            <ArrowUpRight aria-hidden="true" />
          </div>
          <div className="contact-choice-icon contact-choice-icon--instagram" aria-hidden="true"><InstagramIcon /></div>
          <h2>Follow the<br />build journey.</h2>
          <p>@kashung.enterprise</p>
          <small>Ideas, work in progress, and launches from the studio.</small>
        </a>
      </section>

      <section className="contact-details">
        <div><MapPin aria-hidden="true" /><span>Based in</span><strong>Manipur, Northeast India</strong></div>
        <div><Layers3 aria-hidden="true" /><span>Building</span><strong>Websites · Software · Apps</strong></div>
        <div><Handshake aria-hidden="true" /><span>Working with</span><strong>Startups · Entrepreneurs · Teams</strong></div>
      </section>

      <section className="contact-promise">
        <h2 className="section-label">What happens next</h2>
        <div><CircleCheck aria-hidden="true" /><p>We read your note and understand the opportunity.</p></div>
        <div><CircleCheck aria-hidden="true" /><p>We reply with useful questions—not a generic sales pitch.</p></div>
        <div><CircleCheck aria-hidden="true" /><p>If there’s a fit, we shape the scope and build plan together.</p></div>
      </section>
    </main>
  );
}
