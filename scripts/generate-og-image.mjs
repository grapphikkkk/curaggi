import { readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

// 1200x630 brand OG card: Visione Purple background + centered logo + tagline.
// Uses logo.svg directly (already brand-compliant).
const W = 1200;
const H = 630;
const PURPLE = "#9D35E4";
const WHITE = "#FFFFFF";

const logoSvg = readFileSync("public/logos/logo.svg", "utf8");
// Strip the wrapping <svg> and grab inner content + viewBox.
const viewBoxMatch = logoSvg.match(/viewBox="([^"]+)"/);
const innerMatch = logoSvg.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
const viewBox = viewBoxMatch?.[1] ?? "0 0 654 183";
const inner = innerMatch?.[1] ?? "";

// Recolor logo paths to white (replace any fill="..." with white).
const whiteLogo = inner.replace(/fill="[^"]*"/g, `fill="${WHITE}"`);

const compositeSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${PURPLE}"/>
  <g transform="translate(${(W - 700) / 2}, ${(H - 700 / 3.5714) / 2 - 30})">
    <svg width="700" height="${700 / 3.5714}" viewBox="${viewBox}">${whiteLogo}</svg>
  </g>
  <g transform="translate(${W / 2}, ${H - 110})" text-anchor="middle">
    <text font-family="Outfit, sans-serif" font-size="32" font-weight="600" fill="${WHITE}" letter-spacing="0.08em">
      AKIRAMENAKUTE-II SEKAI WO TSUKURU
    </text>
    <text y="42" font-family="Noto Sans JP, sans-serif" font-size="22" font-weight="500" fill="${WHITE}" opacity="0.85">
      あきらめなくていい世界をつくる
    </text>
  </g>
</svg>`;

writeFileSync("public/og-image.svg", compositeSvg);

await sharp(Buffer.from(compositeSvg))
  .png()
  .toFile("public/og-image.png");

console.log("✓ Generated public/og-image.png and public/og-image.svg (1200x630)");
