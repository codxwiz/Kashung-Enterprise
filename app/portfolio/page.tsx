"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(useGSAP, ScrollTrigger);

const projects = [
  {
    name: "SusBiome",
    url: "https://susbiome.com/",
    image: "/portfolio/susbiome.jpg",
    width: 1695,
    height: 888,
    color: "#dfbd52",
    category: "Climate intelligence · Agritech",
    description: "A science-led agricultural consultancy and climate-risk platform helping Northeast India make more resilient decisions for soil, farmers, and the future.",
    capabilities: ["Product strategy", "Climate analytics", "Web platform"],
  },
  {
    name: "KashNom",
    url: "https://kashnom.com/",
    image: "/portfolio/kashnom.jpg",
    width: 1695,
    height: 833,
    color: "#dfb66d",
    category: "Restaurant technology · SaaS",
    description: "A connected restaurant operating platform bringing guest ordering, table service, kitchen workflows, and business insights into one clear rhythm.",
    capabilities: ["SaaS product", "Realtime systems", "Experience design"],
    available: false,
  },
  {
    name: "KashDAG",
    url: "https://kashdag.com/",
    image: "/portfolio/kashdag.jpg",
    width: 1695,
    height: 833,
    color: "#6ca2ff",
    category: "Blockchain · Layer 1 infrastructure",
    description: "A validator-based DAG Layer 1 testnet with deterministic execution and checkpoint-backed finality, presented through a deeply technical cinematic experience.",
    capabilities: ["Protocol experience", "3D interaction", "Technical storytelling"],
  },
  {
    name: "Kashintel",
    url: "https://kashintel.com/",
    image: "/portfolio/kashintel.jpg",
    width: 1695,
    height: 833,
    color: "#a879ff",
    category: "AI revenue operations · SaaS",
    description: "An AI Revenue Operating System for service businesses that keeps every commercial handoff connected—from first opportunity to final payment.",
    capabilities: ["AI product", "Revenue workflows", "Brand system"],
  },
  {
    name: "Quickash",
    url: "https://quickash.in/",
    image: "/portfolio/quickash.jpg",
    width: 1695,
    height: 833,
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
    <main ref={root} id="main-content" tabIndex={-1} className="inner-page portfolio-page">
      <section className="portfolio-hero">
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
            {project.available === false ? (
              <div className="project-media project-media--offline">
                <Image src={project.image} alt={`${project.name} website homepage preview`} width={project.width} height={project.height} sizes="(max-width: 980px) calc(100vw - 44px), 62vw" unoptimized />
                <span className="project-visit project-visit--static">Live site temporarily unavailable <b>—</b></span>
              </div>
            ) : (
              <a className="project-media" href={project.url} target="_blank" rel="noreferrer" aria-label={`Visit ${project.name}`}>
                <Image src={project.image} alt={`${project.name} website homepage preview`} width={project.width} height={project.height} sizes="(max-width: 980px) calc(100vw - 44px), 62vw" unoptimized />
                <span className="project-visit">View live site <b>↗</b></span>
              </a>
            )}
            <div className="project-info">
              <div className="project-number">0{index + 1}</div>
              <p>{project.category}</p>
              <h2>{project.name}</h2>
              <p className="project-description">{project.description}</p>
              <ul>{project.capabilities.map((item) => <li key={item}>{item}</li>)}</ul>
              {project.available === false ? <span className="project-link project-link--offline">Hosting temporarily unavailable <span>—</span></span> : <a className="project-link" href={project.url} target="_blank" rel="noreferrer">Explore {project.name} <span>↗</span></a>}
            </div>
          </article>
        ))}
      </section>

      <section className="portfolio-cta">
        <p className="section-label">Your product could be next.</p>
        <h2>Let’s build something<br /><em>worth showing.</em></h2>
        <Link className="button button--primary" href="/contact">Start a project <span>↗</span></Link>
      </section>
    </main>
  );
}
