import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

let workerPromise;

async function getWorker() {
  if (!workerPromise) {
    const workerUrl = new URL("../dist/server/index.js", import.meta.url);
    workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
    workerPromise = import(workerUrl.href).then((module) => module.default);
  }
  return workerPromise;
}

async function render(pathname) {
  const worker = await getWorker();
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

const pages = [
  { path: "/", title: "Kashung Enterprise — Your Idea. Your Business. Online.", marker: "Your business", canonical: "https://kashung-enterprise.newdiscoveryyt.chatgpt.site" },
  { path: "/services", title: "Services | Kashung Enterprise", marker: "Technology built around", canonical: "https://kashung-enterprise.newdiscoveryyt.chatgpt.site/services" },
  { path: "/about", title: "About | Kashung Enterprise", marker: "Why we started", canonical: "https://kashung-enterprise.newdiscoveryyt.chatgpt.site/about" },
  { path: "/portfolio", title: "Selected Work | Kashung Enterprise", marker: "Digital products", canonical: "https://kashung-enterprise.newdiscoveryyt.chatgpt.site/portfolio" },
  { path: "/contact", title: "Contact | Kashung Enterprise", marker: "Tell us what", canonical: "https://kashung-enterprise.newdiscoveryyt.chatgpt.site/contact" },
  { path: "/terms", title: "Terms of Service | Kashung Enterprise", marker: "50% upfront", canonical: "https://kashung-enterprise.newdiscoveryyt.chatgpt.site/terms" },
  { path: "/privacy", title: "Privacy Policy | Kashung Enterprise", marker: "Information we collect", canonical: "https://kashung-enterprise.newdiscoveryyt.chatgpt.site/privacy" },
  { path: "/refund-policy", title: "Refund Policy | Kashung Enterprise", marker: "7 calendar days", canonical: "https://kashung-enterprise.newdiscoveryyt.chatgpt.site/refund-policy" },
];

for (const page of pages) {
  test(`server-renders ${page.path}`, async () => {
    const response = await render(page.path);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    const html = await response.text();
    assert.ok(html.includes(`<title>${page.title}</title>`), `missing title for ${page.path}`);
    assert.ok(html.includes(page.marker), `missing content marker for ${page.path}`);
    assert.ok(html.includes(`rel="canonical" href="${page.canonical}"`), `missing canonical for ${page.path}`);
    assert.match(html, /<header class="site-header">/);
    assert.match(html, /<main[^>]*id="main-content"[^>]*>/);
    assert.match(html, /<\/main><footer>/);
    assert.equal((html.match(/id="main-content"/g) ?? []).length, 1);
    assert.doesNotMatch(html, /Your site is taking shape|codex-preview|SkeletonPreview/);
  });
}

test("renders complete navigation and policy links", async () => {
  const response = await render("/");
  const html = await response.text();
  for (const href of ["/services", "/about", "/portfolio", "/contact", "/terms", "/privacy", "/refund-policy"]) {
    assert.ok(html.includes(`href="${href}"`), `missing link to ${href}`);
  }
  assert.ok(html.includes("mailto:kashthot@gmail.com"));
  assert.ok(html.includes('href="https://wa.me/916009686518"'));
  assert.ok(html.includes("+91 6009686518"));
  assert.ok(html.includes('href="/services"'));
  assert.ok(html.includes('href="/about"'));
  assert.ok(html.includes('href="/services#websites"'));
  assert.ok(html.includes('href="/services#software"'));
  assert.ok(html.includes('href="/services#apps"'));
});

test("publishes the phone number on the contact page", async () => {
  const response = await render("/contact");
  const html = await response.text();
  assert.ok(html.includes('href="tel:+916009686518"'));
  assert.ok(html.includes("+91 6009686518"));
});

test("publishes social, robots, and sitemap metadata", async () => {
  const home = await render("/");
  const html = await home.text();
  assert.ok(html.includes('property="og:image" content="https://kashung-enterprise.newdiscoveryyt.chatgpt.site/og.png"'));
  assert.ok(html.includes('name="twitter:card" content="summary_large_image"'));

  const robots = await render("/robots.txt");
  assert.equal(robots.status, 200);
  assert.match(await robots.text(), /Sitemap: https:\/\/kashung-enterprise\.newdiscoveryyt\.chatgpt\.site\/sitemap\.xml/);

  const sitemap = await render("/sitemap.xml");
  assert.equal(sitemap.status, 200);
  const xml = await sitemap.text();
  assert.match(xml, /<loc>https:\/\/kashung-enterprise\.newdiscoveryyt\.chatgpt\.site\/portfolio<\/loc>/);
  assert.match(xml, /<loc>https:\/\/kashung-enterprise\.newdiscoveryyt\.chatgpt\.site\/services<\/loc>/);
  assert.match(xml, /<loc>https:\/\/kashung-enterprise\.newdiscoveryyt\.chatgpt\.site\/about<\/loc>/);
  assert.match(xml, /<loc>https:\/\/kashung-enterprise\.newdiscoveryyt\.chatgpt\.site\/refund-policy<\/loc>/);
});

test("portfolio and social images have correct file formats", async () => {
  const jpegNames = ["susbiome", "kashnom", "kashdag", "kashintel", "quickash"];
  for (const name of jpegNames) {
    const bytes = await readFile(new URL(`../public/portfolio/${name}.jpg`, import.meta.url));
    assert.deepEqual([...bytes.subarray(0, 3)], [0xff, 0xd8, 0xff]);
  }
  const social = await readFile(new URL("../public/og.png", import.meta.url));
  assert.deepEqual([...social.subarray(0, 8)], [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const hero = await readFile(new URL("../public/hero-crystal.webp", import.meta.url));
  assert.equal(hero.subarray(0, 4).toString("ascii"), "RIFF");
  assert.equal(hero.subarray(8, 12).toString("ascii"), "WEBP");
  const moon = await readFile(new URL("../public/journey-moon.webp", import.meta.url));
  assert.equal(moon.subarray(0, 4).toString("ascii"), "RIFF");
  assert.equal(moon.subarray(8, 12).toString("ascii"), "WEBP");
  for (const name of ["listen", "shape", "build", "launch"]) {
    const journey = await readFile(new URL(`../public/journey-${name}.webp`, import.meta.url));
    assert.equal(journey.subarray(0, 4).toString("ascii"), "RIFF");
    assert.equal(journey.subarray(8, 12).toString("ascii"), "WEBP");
  }
});

test("removes decorative sequence counters", async () => {
  for (const pathname of ["/", "/portfolio", "/contact", "/terms", "/privacy", "/refund-policy"]) {
    const html = await (await render(pathname)).text();
    assert.doesNotMatch(html, />0[1-9]\s*\//, `decorative section counter found on ${pathname}`);
    assert.doesNotMatch(html, /class="project-number"/, `project counter found on ${pathname}`);
  }
});
