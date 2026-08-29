"use client";

import { useRef } from "react";
import { ArrowUpRight, CalendarCheck, GraduationCap, Lightbulb, ShoppingBag, Store, Wrench } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(useGSAP, ScrollTrigger);

const audiences = [
  { icon: ShoppingBag, title: "Selling products", copy: "Online stores and commerce experiences that make buying simple." },
  { icon: CalendarCheck, title: "Providing services", copy: "Booking, enquiry, payment, and customer systems built around your workflow." },
  { icon: GraduationCap, title: "Teaching or freelancing", copy: "Digital platforms that package your knowledge, skill, or independent practice." },
  { icon: Store, title: "Growing a local business", copy: "Websites and software that help established businesses operate and reach further." },
];

export default function AboutPage() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.from(".about-hero > *", { y: 48, autoAlpha: 0, duration: .9, stagger: .09, ease: "power3.out" });
    gsap.utils.toArray<HTMLElement>("[data-about-reveal]").forEach((element) => {
      gsap.from(element, { y: 52, autoAlpha: 0, duration: .85, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 86%", once: true } });
    });
  }, { scope: root });

  return (
    <main ref={root} id="main-content" tabIndex={-1} className="inner-page about-page">
      <section className="about-hero">
        <p className="eyebrow"><i /> About Kashung Enterprise</p>
        <h1>Built here.<br /><em>Made to reach further.</em></h1>
        <div className="about-hero-foot">
          <p>We are a Manipur-based digital product studio helping Northeast businesses, entrepreneurs, and skilled professionals turn practical ideas into websites, software, and apps.</p>
          <span>NORTHEAST INDIA · DIGITAL PRODUCT STUDIO</span>
        </div>
      </section>

      <section className="about-story" data-about-reveal>
        <p className="section-label">Why we started</p>
        <div className="about-story-copy">
          <h2>A business no longer needs a big office to have a big opportunity.</h2>
          <div>
            <p>People now discover businesses, order products, book services, learn, pay, and work online. Yet too many promising ideas across Northeast India still feel held back by the belief that technology is expensive, complicated, or only for large companies.</p>
            <p>Kashung Enterprise exists to close that gap. You bring the business idea and explain how you want it to work. We translate it into a clear plan, design the experience, build the technology, and help take it online.</p>
          </div>
        </div>
      </section>

      <section className="about-audience" data-about-reveal>
        <div className="about-section-heading">
          <div><p className="section-label">Who we build for</p><h2>Real people.<br />Real ways to earn and grow.</h2></div>
          <p>You do not need to know coding, design terminology, or technical architecture. You only need to understand the opportunity you want to create.</p>
        </div>
        <div className="audience-grid">
          {audiences.map(({ icon: Icon, title, copy }) => (
            <article key={title}><Icon aria-hidden="true" /><h3>{title}</h3><p>{copy}</p></article>
          ))}
        </div>
      </section>

      <section className="about-region" data-about-reveal>
        <div className="about-region-mark" aria-hidden="true">NE</div>
        <div>
          <p className="section-label">Rooted in the Northeast</p>
          <h2>Local context is an advantage.</h2>
          <p>We build for people in Manipur, Nagaland, Mizoram, Meghalaya, Arunachal Pradesh, Assam, Tripura, and Sikkim—and for Northeast founders reaching customers anywhere in the world.</p>
          <div className="state-list" aria-label="Northeast states served">
            {[
              "Manipur", "Nagaland", "Mizoram", "Meghalaya", "Arunachal Pradesh", "Assam", "Tripura", "Sikkim",
            ].map((state) => <span key={state}>{state}</span>)}
          </div>
        </div>
      </section>

      <section className="about-values" data-about-reveal>
        <p className="section-label">How we partner</p>
        <div className="about-value-grid">
          <article><Lightbulb aria-hidden="true" /><h3>Clarity first</h3><p>We explain decisions in plain language and turn uncertainty into a focused build plan.</p></article>
          <article><Wrench aria-hidden="true" /><h3>Custom fit</h3><p>Every product is shaped around the business—not forced into a generic template.</p></article>
          <article><ArrowUpRight aria-hidden="true" /><h3>Built for momentum</h3><p>We focus on what creates useful progress now while leaving room for the business to grow.</p></article>
        </div>
      </section>

      <section className="about-cta">
        <p className="section-label">Your idea. Your business.</p>
        <h2>Let’s take it<br /><em>online.</em></h2>
        <a className="button button--primary" href="/contact">Tell us what you’re building <ArrowUpRight aria-hidden="true" /></a>
      </section>
    </main>
  );
}
