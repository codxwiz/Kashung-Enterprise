"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Mark, SiteFooter, SiteHeader } from "./components/SiteHeader";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
}

const services = [
  {
    number: "01",
    title: "Web experiences",
    copy: "High-converting websites that make ambitious brands feel impossible to ignore.",
    tags: ["Strategy", "UX/UI", "Development"],
  },
  {
    number: "02",
    title: "Software systems",
    copy: "Purpose-built platforms that remove friction, connect teams, and scale with your vision.",
    tags: ["Product design", "Engineering", "Cloud"],
  },
  {
    number: "03",
    title: "Apps people keep",
    copy: "Fast, intuitive mobile and web apps built around real users—not feature checklists.",
    tags: ["iOS & Android", "Web apps", "Launch"],
  },
];

const steps = [
  ["Listen", "We get close to the problem, the people, and the opportunity."],
  ["Shape", "We turn ambiguity into a sharp product strategy and visual direction."],
  ["Build", "Design and engineering move together in focused, visible sprints."],
  ["Launch", "We ship, learn, improve, and stay for the next version."],
];

function HeroScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const xTo = gsap.quickTo(scene, "rotationY", { duration: 0.9, ease: "power3.out" });
    const yTo = gsap.quickTo(scene, "rotationX", { duration: 0.9, ease: "power3.out" });
    const move = (event: PointerEvent) => {
      const rect = scene.getBoundingClientRect();
      xTo(((event.clientX - rect.left) / rect.width - 0.5) * 9);
      yTo(-((event.clientY - rect.top) / rect.height - 0.5) * 7);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    scene.parentElement?.addEventListener("pointermove", move);
    scene.parentElement?.addEventListener("pointerleave", leave);
    return () => {
      scene.parentElement?.removeEventListener("pointermove", move);
      scene.parentElement?.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="scene-glow" />
      <div className="scene" ref={sceneRef}>
        <div className="orbit orbit--one" />
        <div className="orbit orbit--two" />
        <div className="idea-core">
          <div className="core-face core-face--front">
            <span>YOUR</span>
            <strong>IDEA</strong>
          </div>
          <div className="core-face core-face--back" />
          <div className="core-face core-face--left" />
          <div className="core-face core-face--right" />
          <div className="core-face core-face--top" />
          <div className="core-face core-face--bottom" />
        </div>
        <div className="signal signal--a">STRATEGY</div>
        <div className="signal signal--b">DESIGN</div>
        <div className="signal signal--c">CODE</div>
        <div className="signal signal--d">REALITY</div>
        <div className="terrain terrain--one" />
        <div className="terrain terrain--two" />
        <div className="terrain terrain--three" />
      </div>
      <div className="coordinate coordinate--a">24.8170° N</div>
      <div className="coordinate coordinate--b">93.9368° E</div>
    </div>
  );
}

export default function Home() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      const split = SplitText.create(".hero-title", {
        type: "lines",
        mask: "lines",
        aria: "auto",
      });

      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro
        .from(".site-header", { y: -32, autoAlpha: 0, duration: 0.8 })
        .from(split.lines, { yPercent: 115, duration: 1.15, stagger: 0.11 }, 0.12)
        .from(".hero-kicker, .hero-copy, .hero-actions", { y: 26, autoAlpha: 0, duration: 0.75, stagger: 0.1 }, 0.45)
        .from(".hero-visual", { scale: 0.84, rotationY: -14, autoAlpha: 0, duration: 1.35 }, 0.2)
        .from(".hero-proof", { y: 24, autoAlpha: 0, duration: 0.7 }, 0.85);

      gsap.to(".scene", {
        y: -22,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 56,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        });
      });

      gsap.from(".service-card", {
        y: 90,
        rotationX: -8,
        autoAlpha: 0,
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".services-grid", start: "top 78%", once: true },
      });

      gsap.to(".process-track", {
        xPercent: -72,
        ease: "none",
        scrollTrigger: {
          trigger: ".process-stage",
          start: "top top",
          end: "+=2400",
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      gsap.fromTo(
        ".region-orb",
        { rotation: -12, scale: 0.82 },
        {
          rotation: 18,
          scale: 1.08,
          ease: "none",
          scrollTrigger: { trigger: ".region", start: "top bottom", end: "bottom top", scrub: 1 },
        },
      );

      return () => split.revert();
    },
    { scope: root },
  );

  return (
    <main ref={root}>
      <a className="skip-link" href="#main-content">Skip to content</a>

      <SiteHeader />

      <section className="hero" id="top">
        <div className="noise" />
        <div className="hero-copy-block" id="main-content">
          <p className="eyebrow hero-kicker"><i /> Digital product studio · Northeast India</p>
          <h1 className="hero-title">Ideas deserve<br /><em>to become real.</em></h1>
          <p className="hero-copy">
            We design and build exceptional websites, software, and apps for the founders shaping tomorrow’s Northeast.
          </p>
          <div className="hero-actions">
            <a className="button button--primary" href="/contact">Bring us your idea <span>↗</span></a>
            <a className="text-link" href="#services">Explore our capabilities <span>↓</span></a>
          </div>
        </div>

        <HeroScene />

        <div className="hero-proof">
          <p>From the first sketch<br />to the first real user.</p>
          <div className="proof-line" />
          <span>Based in Manipur<br />Building across the Northeast</span>
        </div>
      </section>

      <section className="manifesto" aria-label="Company promise">
        <div className="marquee" aria-hidden="true">
          <div>WEBSITE <b>•</b> SOFTWARE <b>•</b> APPS <b>•</b> STRATEGY <b>•</b> DESIGN <b>•</b> ENGINEERING <b>•</b>&nbsp;</div>
          <div>WEBSITE <b>•</b> SOFTWARE <b>•</b> APPS <b>•</b> STRATEGY <b>•</b> DESIGN <b>•</b> ENGINEERING <b>•</b>&nbsp;</div>
        </div>
        <div className="manifesto-inner" data-reveal>
          <p className="section-label">01 / What we believe</p>
          <blockquote>
            The next category-defining company can come from <em>anywhere.</em><br />We make sure its technology can go <em>everywhere.</em>
          </blockquote>
        </div>
      </section>

      <section className="services" id="services">
        <div className="section-heading" data-reveal>
          <div>
            <p className="section-label">02 / Capabilities</p>
            <h2>Built to move<br />business forward.</h2>
          </div>
          <p>One senior team from first question to final release. No relay race between strategy, design, and development.</p>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <div className="service-top"><span>{service.number}</span><span>↗</span></div>
              <div className={`service-art service-art--${service.number}`} aria-hidden="true">
                <i /><i /><i /><i />
              </div>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
              <ul>{service.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="process" id="process">
        <div className="process-intro" data-reveal>
          <p className="section-label">03 / The journey</p>
          <h2>From “what if?”<br />to “it’s live.”</h2>
          <p>A clear, collaborative process designed to turn momentum into a product.</p>
        </div>
        <div className="process-stage">
          <div className="process-track">
            <div className="process-origin">
              <span>START HERE</span>
              <div className="origin-sphere"><i /></div>
              <strong>AN IDEA</strong>
            </div>
            {steps.map(([title, copy], index) => (
              <article className="process-step" key={title}>
                <span>0{index + 1}</span>
                <div className="step-glyph" aria-hidden="true"><i /><i /></div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
            <div className="process-destination">
              <Mark compact />
              <span>READY FOR THE WORLD</span>
              <strong>REALITY.</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="region" id="about">
        <div className="region-orb" aria-hidden="true">
          <i className="region-ring region-ring--one" />
          <i className="region-ring region-ring--two" />
          <i className="region-ring region-ring--three" />
          <span>NE</span>
        </div>
        <div className="region-content" data-reveal>
          <p className="section-label">04 / Rooted here</p>
          <h2>Global quality.<br /><em>Northeast perspective.</em></h2>
          <p>
            We understand the resourcefulness, ambition, and context of founders building from this region. That proximity makes the work sharper—and the partnership stronger.
          </p>
          <div className="region-stats">
            <div><strong>8</strong><span>states<br />one ecosystem</span></div>
            <div><strong>1:1</strong><span>senior team<br />collaboration</span></div>
            <div><strong>∞</strong><span>possibilities<br />worth building</span></div>
          </div>
        </div>
      </section>

      <section className="principles">
        <p className="section-label" data-reveal>05 / How we work</p>
        <div className="principle-list">
          <article data-reveal><span>01</span><h3>Clarity over complexity.</h3><p>Technology should unlock the idea, not overshadow it.</p></article>
          <article data-reveal><span>02</span><h3>Craft in every detail.</h3><p>People feel quality long before they can explain it.</p></article>
          <article data-reveal><span>03</span><h3>Partners, not vendors.</h3><p>We share the ambition, the hard questions, and the outcome.</p></article>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-grid" aria-hidden="true" />
        <p className="section-label" data-reveal>Have something worth building?</p>
        <h2 data-reveal>Let’s make it<br /><em>real.</em></h2>
        <a className="contact-button" href="mailto:kashthot@gmail.com">
          <span>Tell us about your idea</span><b>↗</b>
        </a>
        <div className="contact-meta">
          <span>Manipur · Northeast India</span>
          <a href="mailto:kashthot@gmail.com">kashthot@gmail.com</a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
