export type PolicySection = {
  title: string;
  paragraphs?: string[];
  points?: string[];
};

export function PolicyPage({ eyebrow, title, intro, updatedAt, sections }: { eyebrow: string; title: string; intro: string; updatedAt: string; sections: PolicySection[] }) {
  return (
    <main id="main-content" tabIndex={-1} className="inner-page policy-page">
      <header className="policy-hero">
        <p className="eyebrow"><i /> {eyebrow}</p>
        <h1>{title}</h1>
        <div className="policy-intro">
          <p>{intro}</p>
          <span>Last updated {updatedAt}</span>
        </div>
      </header>
      <div className="policy-shell">
        <aside aria-label="Policy summary">
          <span>Kashung Enterprise</span>
          <strong>Websites · Software · Apps</strong>
          <a href="mailto:kashthot@gmail.com">Questions? Email us ↗</a>
        </aside>
        <article className="policy-content">
          {sections.map((section, index) => (
            <section key={section.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2>{section.title}</h2>
                {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}
              </div>
            </section>
          ))}
        </article>
      </div>
      <div className="policy-contact">
        <p>Need clarification before starting a project?</p>
        <a href="mailto:kashthot@gmail.com">kashthot@gmail.com <span>↗</span></a>
      </div>
    </main>
  );
}
