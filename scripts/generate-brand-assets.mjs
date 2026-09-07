import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const outputDir = path.join(projectRoot, "public", "brand");
const fontPath = path.join(
  projectRoot,
  "dist",
  "client",
  "_next",
  "static",
  "_vinext_fonts",
  "outfit-e425a954def7",
  "outfit-c8e7a734.woff2",
);

await mkdir(outputDir, { recursive: true });

const fontData = await readFile(fontPath);
const embeddedFont = fontData.toString("base64");

function logoSvg({ primary, secondary }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="400" viewBox="0 0 1200 400" role="img" aria-labelledby="title description">
  <title id="title">Kashung Enterprise</title>
  <desc id="description">The Kashung Enterprise geometric brand mark and wordmark on a transparent background.</desc>
  <style>
    @font-face {
      font-family: "Outfit Embedded";
      src: url("data:font/woff2;base64,${embeddedFont}") format("woff2");
      font-style: normal;
      font-weight: 100 900;
    }
    .wordmark { font-family: "Outfit Embedded", Outfit, Arial, sans-serif; }
  </style>
  <g transform="translate(40 40) scale(8.4210526316)" shape-rendering="geometricPrecision">
    <path d="M1.5 8.8 11.7 4v26.2L1.5 35V8.8Z" fill="${primary}"/>
    <path d="m11.9 4 10.2-3v26.2l-10.2 3V4Z" fill="#D6FF3F"/>
    <path d="m22.3 5.6 10.2-3v26.2l-10.2 3V5.6Z" fill="#53E0BE"/>
  </g>
  <g class="wordmark" text-rendering="geometricPrecision">
    <text x="380" y="183" fill="${primary}" font-size="132" font-weight="700" letter-spacing="8">KASHUNG</text>
    <text x="386" y="292" fill="${secondary}" font-size="54" font-weight="600" letter-spacing="17">ENTERPRISE</text>
  </g>
</svg>`;
}

function markSvg({ firstPanel = "#F1F0E9" } = {}) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="2048" height="2048" viewBox="0 0 48 48" role="img" aria-labelledby="title description">
  <title id="title">Kashung Enterprise mark</title>
  <desc id="description">The three-panel Kashung Enterprise geometric mark in ivory, electric lime, and jade on a transparent background.</desc>
  <g transform="translate(7 5)" shape-rendering="geometricPrecision">
    <path d="M1.5 8.8 11.7 4v26.2L1.5 35V8.8Z" fill="${firstPanel}"/>
    <path d="m11.9 4 10.2-3v26.2l-10.2 3V4Z" fill="#D6FF3F"/>
    <path d="m22.3 5.6 10.2-3v26.2l-10.2 3V5.6Z" fill="#53E0BE"/>
  </g>
</svg>`;
}

const variants = [
  {
    name: "kashung-enterprise-logo-transparent",
    svg: logoSvg({ primary: "#F1F0E9", secondary: "#A1A39A" }),
  },
  {
    name: "kashung-enterprise-logo-transparent-dark",
    svg: logoSvg({ primary: "#070807", secondary: "#575A53" }),
  },
];

for (const variant of variants) {
  const svgPath = path.join(outputDir, `${variant.name}.svg`);
  const pngPath = path.join(outputDir, `${variant.name}.png`);
  await writeFile(svgPath, variant.svg, "utf8");
  await sharp(Buffer.from(variant.svg))
    .resize({ width: 2400, height: 800, fit: "fill" })
    .png({ compressionLevel: 9, palette: false })
    .toFile(pngPath);
}

const markName = "kashung-enterprise-mark-transparent";
const standaloneMark = markSvg();
await writeFile(path.join(outputDir, `${markName}.svg`), standaloneMark, "utf8");
await sharp(Buffer.from(standaloneMark))
  .resize({ width: 2048, height: 2048, fit: "fill" })
  .png({ compressionLevel: 9, palette: false })
  .toFile(path.join(outputDir, `${markName}.png`));

const blackMarkName = "kashung-enterprise-mark-transparent-black";
const blackStandaloneMark = markSvg({ firstPanel: "#070807" });
await writeFile(path.join(outputDir, `${blackMarkName}.svg`), blackStandaloneMark, "utf8");
await sharp(Buffer.from(blackStandaloneMark))
  .resize({ width: 2048, height: 2048, fit: "fill" })
  .png({ compressionLevel: 9, palette: false })
  .toFile(path.join(outputDir, `${blackMarkName}.png`));

console.log(`Generated ${variants.length * 2 + 4} logo assets in ${outputDir}`);
