"use client";

import { type FormEvent, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, CircleCheck, Handshake, Layers3, Mail, MapPin } from "lucide-react";
import { InstagramIcon } from "../components/Icons";

if (typeof window !== "undefined") gsap.registerPlugin(useGSAP);

type FormState = "idle" | "submitting" | "success" | "error";

const formMessages: Record<FormState, string> = {
  idle: "Your enquiry will be sent directly to kashthot@gmail.com.",
  submitting: "Sending your enquiry…",
  success: "Thank you — your enquiry has been sent. We’ll get back to you soon.",
  error: "We couldn’t send this right now. Please try again or use the email option below.",
};

export default function ContactPage() {
  const root = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState<FormState>("idle");

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.from(".contact-page-hero > *, .contact-form-card, .contact-choice", { y: 46, autoAlpha: 0, duration: .9, stagger: .09, ease: "power3.out" });
  }, { scope: root });

  const submitEnquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get("_honey") ?? "").trim()) {
      form.reset();
      setFormState("success");
      return;
    }

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    setFormState("submitting");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch("https://formsubmit.co/ajax/kashthot@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          _subject: `New Kashung Enterprise enquiry from ${name}`,
          _template: "table",
          _url: window.location.href,
        }),
        signal: controller.signal,
      });
      const result = await response.json().catch(() => null) as { success?: boolean | string } | null;
      const rejected = result?.success === false || result?.success === "false";
      if (!response.ok || rejected) throw new Error("Form submission failed");

      form.reset();
      setFormState("success");
    } catch {
      setFormState("error");
    } finally {
      window.clearTimeout(timeout);
    }
  };

  return (
    <main ref={root} id="main-content" tabIndex={-1} className="inner-page contact-page">
      <section className="contact-page-hero">
        <p className="eyebrow"><i /> New business and project enquiries</p>
        <h1>Tell us what<br />you want to <em>take online.</em></h1>
        <p className="contact-lead">A business, a skill, or simply an idea—you do not need a technical brief. Tell us how you want it to work and we’ll help shape the clearest way forward.</p>
      </section>

      <section className="contact-form-shell" aria-labelledby="quick-enquiry-title">
        <form
          className="contact-form-card"
          action="https://formsubmit.co/kashthot@gmail.com"
          method="POST"
          aria-busy={formState === "submitting"}
          onInput={() => {
            if (formState === "success" || formState === "error") setFormState("idle");
          }}
          onSubmit={submitEnquiry}
        >
          <input className="contact-form-honey" type="text" name="_honey" tabIndex={-1} autoComplete="off" />
          <input type="hidden" name="_subject" value="New Kashung Enterprise website enquiry" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_url" value="https://kashung-enterprise.onrender.com/contact" />
          <div className="contact-form-copy">
            <p className="section-label">Quick enquiry</p>
            <h2 id="quick-enquiry-title">Start with the essentials.</h2>
            <p>No technical brief needed. A few clear details are enough to begin.</p>
          </div>

          <div className="contact-form-fields">
            <label className="contact-form-field">
              <span>Name <b aria-hidden="true">*</b></span>
              <input type="text" name="name" autoComplete="name" placeholder="Your name" required />
            </label>
            <label className="contact-form-field">
              <span>Email <b aria-hidden="true">*</b></span>
              <input type="email" name="email" autoComplete="email" placeholder="you@example.com" required />
            </label>
            <label className="contact-form-field">
              <span>Phone <b aria-hidden="true">*</b></span>
              <input type="tel" name="phone" autoComplete="tel" inputMode="tel" placeholder="Your phone number" required />
            </label>
            <label className="contact-form-field contact-form-field--message">
              <span>Message <b aria-hidden="true">*</b></span>
              <textarea name="message" rows={4} placeholder="Tell us what you want to build" required />
            </label>
            <div className="contact-form-actions">
              <p data-state={formState} role={formState === "error" ? "alert" : "status"} aria-live="polite">{formMessages[formState]}</p>
              <button type="submit" disabled={formState === "submitting"}>
                {formState === "submitting" ? "Sending…" : "Send enquiry"}
                <ArrowUpRight aria-hidden="true" />
              </button>
            </div>
            <p className="contact-form-privacy">By sending this form, you agree that we may use these details to respond to your enquiry. See our <a href="/privacy">Privacy Policy</a>.</p>
          </div>
        </form>
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

        <a className="contact-choice contact-choice--instagram" href="https://www.instagram.com/kashungent/" target="_blank" rel="noopener noreferrer">
          <div>
            <span><InstagramIcon /> Instagram</span>
            <ArrowUpRight aria-hidden="true" />
          </div>
          <div className="contact-choice-icon contact-choice-icon--instagram" aria-hidden="true"><InstagramIcon /></div>
          <h2>Follow the<br />build journey.</h2>
          <p>@kashungent</p>
          <small>Ideas, work in progress, and launches from the studio.</small>
        </a>
      </section>

      <section className="contact-details">
        <div><MapPin aria-hidden="true" /><span>Based in</span><strong>Manipur, Northeast India</strong></div>
        <div><Layers3 aria-hidden="true" /><span>Building</span><strong>Websites · Software · Apps</strong></div>
        <div><Handshake aria-hidden="true" /><span>Working with</span><strong>Startups · Entrepreneurs · Teams</strong></div>
        <div className="contact-detail--phone"><span>Phone</span><strong><a href="tel:+916009686518">+91 6009686518</a></strong></div>
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
