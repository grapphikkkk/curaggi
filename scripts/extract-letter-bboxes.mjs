import { readFileSync } from "node:fs";
import { svgPathBbox } from "svg-path-bbox";

const svg = readFileSync("public/logos/logo.svg", "utf8");
const paths = [...svg.matchAll(/<path d="([^"]+)"/g)].map((m) => m[1]);

const items = paths.map((d, i) => {
  const [x0, y0, x1, y1] = svgPathBbox(d);
  return { i, d, x0, y0, x1, y1, w: x1 - x0, h: y1 - y0 };
});

// Sort by x0 to recover left-to-right order
items.sort((a, b) => a.x0 - b.x0);
const labels = ["C", "u", "r", "a", "g", "g_2", "i"];
items.forEach((it, idx) => {
  console.log(
    `${labels[idx]}: x0=${it.x0.toFixed(2)} y0=${it.y0.toFixed(2)} x1=${it.x1.toFixed(2)} y1=${it.y1.toFixed(2)} w=${it.w.toFixed(2)} h=${it.h.toFixed(2)}`
  );
});

// Emit JSON for the React component
const exported = items.map((it, idx) => ({
  alt: labels[idx].replace("_2", ""),
  d: it.d,
  x: it.x0,
  y: it.y0,
  w: it.w,
  h: it.h,
}));
console.log("\nJSON:\n" + JSON.stringify(exported, null, 2).slice(0, 400) + "...");
process.stdout.write(
  "\nFULL_JSON:" + JSON.stringify(exported)
);
