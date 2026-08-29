"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ArrowDown, ArrowUpRight, LayoutTemplate, Smartphone, Workflow } from "lucide-react";
import { Mark } from "./components/SiteHeader";
import { InteractiveGlobe } from "./components/InteractiveGlobe";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
}

const services = [
  {
    slug: "website",
    icon: LayoutTemplate,
    title: "Web experiences",
    copy: "Conversion-led websites, online stores, and booking experiences that turn attention into real business.",
    tags: ["Business websites", "Online stores", "Bookings"],
  },
  {
    slug: "software",
    icon: Workflow,
    title: "Software systems",
    copy: "Purpose-built systems for operations, payments, customers, and workflows—designed around how you actually work.",
    tags: ["Business software", "Automation", "Platforms"],
  },
  {
    slug: "apps",
    icon: Smartphone,
    title: "Apps people keep",
    copy: "Fast, intuitive mobile and web apps that help your service, skill, or new venture reach people anywhere.",
    tags: ["Mobile apps", "Web apps", "Custom products"],
  },
];

const steps = [
  { slug: "listen", art: "/journey-listen.webp", title: "Listen", copy: "Tell us how you want the business to work. We translate the idea into a clear brief." },
  { slug: "shape", art: "/journey-shape.webp", title: "Shape", copy: "We define the right product, customer journey, features, and visual direction." },
  { slug: "build", art: "/journey-build.webp", title: "Build", copy: "Design and engineering move together in focused, visible sprints." },
  { slug: "launch", art: "/journey-launch.webp", title: "Launch", copy: "We review, refine, deploy, and help you take the business online." },
];

function HeroScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const pointerArea = scene?.parentElement;
    if (!scene || !pointerArea || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const xTo = gsap.quickTo(scene, "rotationY", { duration: 0.9, ease: "power3.out" });
    const yTo = gsap.quickTo(scene, "rotationX", { duration: 0.9, ease: "power3.out" });
    let bounds = pointerArea.getBoundingClientRect();
    const measure = () => { bounds = pointerArea.getBoundingClientRect(); };
    const move = (event: PointerEvent) => {
      xTo(((event.clientX - bounds.left) / bounds.width - 0.5) * 9);
      yTo(-((event.clientY - bounds.top) / bounds.height - 0.5) * 7);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    pointerArea.addEventListener("pointerenter", measure, { passive: true });
    pointerArea.addEventListener("pointermove", move, { passive: true });
    pointerArea.addEventListener("pointerleave", leave);
    window.addEventListener("resize", measure, { passive: true });
    return () => {
      pointerArea.removeEventListener("pointerenter", measure);
      pointerArea.removeEventListener("pointermove", move);
      pointerArea.removeEventListener("pointerleave", leave);
      window.removeEventListener("resize", measure);
      gsap.killTweensOf(scene);
    };
  }, []);

  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="scene-glow" />
      <div className="scene" ref={sceneRef}>
        <div className="orbit orbit--one" />
        <div className="orbit orbit--two" />
        <div className="idea-crystal">
          <div className="crystal-rotor">
            <span className="crystal-depth crystal-depth--rear" />
            <span className="crystal-depth crystal-depth--middle" />
            <Image src="/hero-crystal.webp" alt="" fill priority sizes="(max-width: 980px) 70vw, 38vw" />
          </div>
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
        .from(split.lines, { yPercent: 115, duration: 1.15, stagger: 0.11 }, 0.12)
        .from(".hero-kicker, .hero-copy, .hero-actions", { y: 26, autoAlpha: 0, duration: 0.75, stagger: 0.1 }, 0.45)
        .from(".hero-visual", { scale: 0.84, rotationY: -14, autoAlpha: 0, duration: 1.35 }, 0.2)
        .from(".hero-proof", { y: 24, autoAlpha: 0, duration: 0.7 }, 0.85);

      const floatingScene = gsap.to(".scene", {
        y: -22,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      const hero = root.current?.querySelector<HTMLElement>(".hero");
      const syncFloatingScene = () => {
        if (document.hidden || (hero && !ScrollTrigger.isInViewport(hero, 0.05))) floatingScene.pause();
        else floatingScene.play();
      };
      if (hero) ScrollTrigger.create({ trigger: hero, start: "top bottom", end: "bottom top", onToggle: syncFloatingScene });
      document.addEventListener("visibilitychange", syncFloatingScene);

      const crystalFlip = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
      crystalFlip
        .to(".crystal-rotor", { rotationX: 180, rotationY: 24, rotationZ: -3, scaleX: 1.18, scaleY: 0.97, yPercent: 3, duration: 0.5, ease: "none" })
        .to(".crystal-rotor", { rotationX: 360, rotationY: 0, rotationZ: 0, scaleX: 1, scaleY: 1, yPercent: 5, duration: 0.5, ease: "none" });

      ScrollTrigger.create({
        trigger: ".marquee",
        start: "top bottom",
        end: "bottom top",
        toggleClass: { targets: ".marquee", className: "is-visible" },
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

      const processStage = root.current?.querySelector<HTMLElement>(".process-stage");
      const processTrack = root.current?.querySelector<HTMLElement>(".process-track");
      if (processStage && processTrack) {
        const distance = () => Math.max(0, processTrack.scrollWidth - processStage.clientWidth);
        gsap.to(processTrack, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: processStage,
            start: "top top",
            end: () => `+=${Math.max(distance(), window.innerHeight)}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
      }

      const regionMotion = gsap.matchMedia();
      regionMotion.add("(min-width: 621px)", () => {
        gsap.fromTo(
          ".region-globe-motion",
          { y: 70, scale: 0.88 },
          {
            y: -35,
            scale: 1.04,
            ease: "none",
            scrollTrigger: { trigger: ".region", start: "top bottom", end: "bottom top", scrub: 1 },
          },
        );
      });

      return () => {
        document.removeEventListener("visibilitychange", syncFloatingScene);
        regionMotion.revert();
        split.revert();
      };
    },
    { scope: root },
  );

  return (
    <main ref={root} id="main-content" tabIndex={-1}>
      <section className="hero" id="top">
        <div className="noise" />
        <div className="hero-copy-block">
          <p className="eyebrow hero-kicker"><i /> For businesses and founders across Northeast India</p>
          <h1 className="hero-title hero-title--campaign">Your idea.<br /><em>Your business.</em><br />Let’s take it online.</h1>
          <p className="hero-copy">
            You do not need to understand coding. Tell us how your business should work—we’ll build the website, app, store, booking system, or software to make it possible.
          </p>
          <div className="hero-actions">
            <a className="button button--primary" href="/contact">Take your idea online <ArrowUpRight aria-hidden="true" /></a>
            <a className="text-link" href="#services">See what we can build <ArrowDown aria-hidden="true" /></a>
          </div>
        </div>

        <HeroScene />

        <div className="hero-proof">
          <p>No technical knowledge needed.<br />Just bring the idea.</p>
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
          <p className="section-label">What we believe</p>
          <blockquote>
            Your business can start from <em>home.</em><br />Its customers can come from <em>anywhere.</em>
          </blockquote>
        </div>
      </section>

      <section className="services" id="services">
        <div className="section-heading" data-reveal>
          <div>
            <p className="section-label">Capabilities</p>
            <h2>Built to move<br />business forward.</h2>
          </div>
          <p>One senior team from first question to final release. No relay race between strategy, design, and development.</p>
        </div>
        <div className="services-grid">
          {services.map((service) => {
            const ServiceIcon = service.icon;
            return (
            <a className="service-card" href={`/services#${service.slug === "website" ? "websites" : service.slug}`} key={service.slug} aria-label={`${service.title}: learn more`}>
              <div className="service-top"><span>Built for your idea</span><ArrowUpRight aria-hidden="true" /></div>
              <div className={`service-art service-art--${service.slug}`} aria-hidden="true">
                <i /><i /><i /><i />
                <span className="service-icon"><ServiceIcon /></span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
              <div className="service-footer">
                <ul>{service.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                <span className="service-cta">Explore this service <ArrowUpRight aria-hidden="true" /></span>
              </div>
            </a>
          )})}
        </div>
      </section>

      <section className="process" id="process">
        <div className="process-intro" data-reveal>
          <p className="section-label">The journey</p>
          <h2>From “what if?”<br />to “it’s live.”</h2>
          <p>A clear, collaborative process designed to turn momentum into a product.</p>
        </div>
        <div className="process-stage">
          <div className="process-track">
            <div className="process-origin">
              <span>START HERE</span>
              <div className="origin-sphere" aria-hidden="true">
                <Image src="/journey-moon.webp" alt="" fill sizes="(max-width: 620px) 210px, 280px" />
                <i />
              </div>
              <strong>AN IDEA</strong>
            </div>
            {steps.map(({ slug, art, title, copy }) => (
              <article className="process-step" key={title}>
                <div className={`step-glyph step-glyph--${slug}`} aria-hidden="true">
                  <i /><i />
                  <Image className="journey-art" src={art} alt="" width={320} height={320} sizes="(max-width: 620px) 230px, 320px" />
                </div>
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
        <div className="region-globe-motion">
          <InteractiveGlobe />
        </div>
        <div className="region-content" data-reveal>
          <p className="section-label">Rooted here</p>
          <h2>Global quality.<br /><em>Northeast perspective.</em></h2>
          <p>
            From Manipur, Nagaland, Mizoram, Meghalaya, Arunachal Pradesh, Assam, Tripura, and Sikkim, we help local ideas become digital businesses with reach far beyond their location.
          </p>
          <div className="region-stats">
            <div><strong>8</strong><span>states<br />one ecosystem</span></div>
            <div><strong>1:1</strong><span>senior team<br />collaboration</span></div>
            <div><strong>Local</strong><span>context<br />global ambition</span></div>
          </div>
        </div>
      </section>

      <section className="principles">
        <h2 className="section-label" data-reveal>How we work</h2>
        <div className="principle-list">
          <article data-reveal><h3>No technical knowledge needed.</h3><p>You explain the idea in your own words. We turn it into a clear digital plan.</p></article>
          <article data-reveal><h3>Designed around your business.</h3><p>No generic feature checklist—only technology that fits how you sell, serve, book, or operate.</p></article>
          <article data-reveal><h3>Built to reach further.</h3><p>Your location should shape your perspective, not limit your customers.</p></article>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-grid" aria-hidden="true" />
        <p className="section-label" data-reveal>Your idea. Your business.</p>
        <h2 data-reveal>Let’s take it<br /><em>online.</em></h2>
        <a className="contact-button" href="/contact">
          <span>Tell us about your idea</span><ArrowUpRight aria-hidden="true" />
        </a>
        <div className="contact-meta">
          <span>Manipur · Northeast India</span>
          <a href="mailto:kashthot@gmail.com">kashthot@gmail.com</a>
        </div>
      </section>

    </main>
  );
}
