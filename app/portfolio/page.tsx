"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiteFooter, SiteHeader } from "../components/SiteHeader";

if (typeof window !== "undefined") gsap.registerPlugin(useGSAP, ScrollTrigger);

const projects = [
  {
    name: "SusBiome",
    url: "https://susbiome.com/",
    image: "/portfolio/susbiome.png",
    color: "#dfbd52",
    category: "Climate intelligence · Agritech",
    description: "A science-led agricultural consultancy and climate-risk platform helping Northeast India make more resilient decisions for soil, farmers, and the future.",
    capabilities: ["Product strategy", "Climate analytics", "Web platform"],
  },
  {
    name: "KashNom",
    url: "https://kashnom.com/",
    image: "/portfolio/kashnom.png",
    color: "#dfb66d",
    category: "Restaurant technology · SaaS",
    description: "A connected restaurant operating platform bringing guest ordering, table service, kitchen workflows, and business insights into one clear rhythm.",
    capabilities: ["SaaS product", "Realtime systems", "Experience design"],
  },
  {
    name: "KashDAG",
    url: "https://kashdag.com/",
    image: "/portfolio/kashdag.png",
    color: "#6ca2ff",
    category: "Blockchain · Layer 1 infrastructure",
    description: "A validator-based DAG Layer 1 testnet with deterministic execution and checkpoint-backed finality, presented through a deeply technical cinematic experience.",
    capabilities: ["Protocol experience", "3D interaction", "Technical storytelling"],
  },
  {
    name: "Kashintel",
    url: "https://kashintel.com/",
    image: "/portfolio/kashintel.png",
    color: "#a879ff",
    category: "AI revenue operations · SaaS",
    description: "An AI Revenue Operating System for service businesses that keeps every commercial handoff connected—from first opportunity to final payment.",
    capabilities: ["AI product", "Revenue workflows", "Brand system"],
  },
  {
    name: "Quickash",
    url: "https://quickash.in/",
    image: "/portfolio/quickash.png",
    color: "#70a867",
    category: "Hyperlocal commerce · Delivery",
    description: "A fast, locality-aware grocery marketplace connecting consumers, sellers, riders, and administrators in one mobile-first delivery ecosystem.",
    capabilities: ["Marketplace", "Multi-role platform", "Commerce UX"],
  },
];

export default function PortfolioPage() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.from(".portfolio-hero > *", { y: 48, autoAlpha: 0, duration: .9, stagger: .1, ease: "power3.out" });
    gsap.utils.toArray<HTMLElement>(".project-row").forEach((row) => {
      gsap.from(row, { y: 70, autoAlpha: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: row, start: "top 82%", once: true } });
    });
  }, { scope: root });

  return (
    <main ref={root} className="inner-page portfolio-page">
      <a className="skip-link" href="#portfolio-content">Skip to content</a>
      <SiteHeader />
      <section className="portfolio-hero" id="portfolio-content">
        <p className="eyebrow"><i /> Selected work · 2026</p>
        <h1>Digital products<br /><em>with a pulse.</em></h1>
        <div className="portfolio-hero-foot">
          <p>Five ambitious products. Five different industries. One standard of strategy, craft, and engineering.</p>
          <span>05 / SELECTED PROJECTS</span>
        </div>
      </section>

      <section className="project-list" aria-label="Selected projects">
        {projects.map((project, index) => (
          <article className="project-row" key={project.name} style={{ "--project-color": project.color } as React.CSSProperties}>
            <a className="project-media" href={project.url} target="_blank" rel="noreferrer" aria-label={`Visit ${project.name}`}>
              <img src={project.image} alt={`${project.name} website homepage preview`} width="1710" height="840" loading={index > 1 ? "lazy" : "eager"} />
              <span className="project-visit">View live site <b>↗</b></span>
            </a>
            <div className="project-info">
              <div className="project-number">0{index + 1}</div>
              <p>{project.category}</p>
              <h2>{project.name}</h2>
              <p className="project-description">{project.description}</p>
              <ul>{project.capabilities.map((item) => <li key={item}>{item}</li>)}</ul>
              <a className="project-link" href={project.url} target="_blank" rel="noreferrer">Explore {project.name} <span>↗</span></a>
            </div>
          </article>
        ))}
      </section>

      <section className="portfolio-cta">
        <p className="section-label">Your product could be next.</p>
        <h2>Let’s build something<br /><em>worth showing.</em></h2>
        <a className="button button--primary" href="/contact">Start a project <span>↗</span></a>
      </section>
      <SiteFooter />
    </main>
  );
}
