"use client";

import { useRef } from "react";
import { ArrowUpRight, CalendarCheck, CreditCard, LayoutDashboard, LayoutTemplate, ShoppingBag, Smartphone, Store, Workflow, Zap } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(useGSAP, ScrollTrigger);

const services = [
  {
    id: "websites",
    icon: LayoutTemplate,
    eyebrow: "Websites and commerce",
    title: "Turn attention into action.",
    copy: "We create fast, high-converting digital experiences that help customers discover, trust, buy, enquire, or book—on any screen.",
    deliverables: [
      { icon: Store, label: "Business and company websites" },
      { icon: ShoppingBag, label: "Online stores and catalogues" },
      { icon: CalendarCheck, label: "Booking and service platforms" },
    ],
  },
  {
    id: "software",
    icon: Workflow,
    eyebrow: "Business software",
    title: "Make the business work better.",
    copy: "We build custom systems around your real operations so customers, payments, information, and teams move with less friction.",
    deliverables: [
      { icon: LayoutDashboard, label: "Dashboards and admin systems" },
      { icon: CreditCard, label: "Payments and customer workflows" },
      { icon: Zap, label: "Automation and internal tools" },
    ],
  },
  {
    id: "apps",
    icon: Smartphone,
    eyebrow: "Mobile and web apps",
    title: "Build the product people return to.",
    copy: "From an early idea to a working platform, we design and engineer custom mobile and web apps that are intuitive, scalable, and ready for real users.",
    deliverables: [
      { icon: Smartphone, label: "Mobile apps for iOS and Android" },
      { icon: LayoutTemplate, label: "Web apps and digital products" },
      { icon: ShoppingBag, label: "Marketplaces and custom platforms" },
    ],
  },
];

export default function ServicesPage() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.from(".services-page-hero > *", { y: 48, autoAlpha: 0, duration: .9, stagger: .09, ease: "power3.out" });
    gsap.utils.toArray<HTMLElement>(".service-detail, .services-guidance").forEach((element) => {
      gsap.from(element, { y: 60, autoAlpha: 0, duration: .9, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 84%", once: true } });
    });
  }, { scope: root });

  return (
    <main ref={root} id="main-content" tabIndex={-1} className="inner-page services-page">
      <section className="services-page-hero">
        <p className="eyebrow"><i /> What we build</p>
        <h1>Technology built around<br /><em>how your business works.</em></h1>
        <div className="services-hero-foot">
          <p>Website, store, booking system, business software, app, or something completely new—we shape the right digital product around the opportunity.</p>
          <a className="text-link" href="/contact">Discuss your idea <ArrowUpRight aria-hidden="true" /></a>
        </div>
      </section>

      <section className="service-detail-list" aria-label="Services">
        {services.map(({ id, icon: Icon, eyebrow, title, copy, deliverables }) => (
          <article className="service-detail" id={id} key={id}>
            <div className="service-detail-visual" aria-hidden="true"><i /><i /><span><Icon /></span></div>
            <div className="service-detail-copy">
              <p className="section-label">{eyebrow}</p>
              <h2>{title}</h2>
              <p>{copy}</p>
              <ul>{deliverables.map(({ icon: ItemIcon, label }) => <li key={label}><ItemIcon aria-hidden="true" /><span>{label}</span></li>)}</ul>
              <a className="project-link" href="/contact#contact-options">Talk about this service <ArrowUpRight aria-hidden="true" /></a>
            </div>
          </article>
        ))}
      </section>

      <section className="services-guidance">
        <p className="section-label">Not sure what you need?</p>
        <div>
          <h2>Describe the business.<br />We’ll help define the technology.</h2>
          <p>You do not need a technical brief. Tell us what you sell, provide, teach, organise, or want to start—and how you want it to work. We’ll help turn that into the right scope.</p>
        </div>
      </section>

      <section className="services-cta">
        <p className="section-label">Your idea. Your business.</p>
        <h2>Let’s take it<br /><em>online.</em></h2>
        <a className="button button--primary" href="/contact">Start the conversation <ArrowUpRight aria-hidden="true" /></a>
      </section>
    </main>
  );
}
