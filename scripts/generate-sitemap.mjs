import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SITE = "https://www.curaggi.jp";

// Static pages — keep in sync with src/app/routes.ts.
const staticPages = ["/", "/news", "/company", "/contact"];

// Article slugs are pulled from filenames in articles/ matching
// "YYYY-MM-DD_slug.tsx" (template/types are skipped).
const articlesDir = "src/app/components/news/articles";
const articleFiles = readdirSync(articlesDir).filter(
  (f) => f.endsWith(".tsx") && !f.startsWith("_") && f !== "types.ts",
);

const articleEntries = articleFiles.map((file) => {
  const path = join(articlesDir, file);
  const src = readFileSync(path, "utf8");
  const dateMatch = src.match(/date:\s*"(\d{4}-\d{2}-\d{2})"/);
  const slugMatch = src.match(/slug:\s*"([^"]+)"/);
  return {
    loc: `${SITE}/news/${slugMatch?.[1] ?? "unknown"}`,
    lastmod: dateMatch?.[1] ?? new Date().toISOString().slice(0, 10),
  };
});

const today = new Date().toISOString().slice(0, 10);
const urls = [
  ...staticPages.map((p) => ({
    loc: `${SITE}${p === "/" ? "" : p}`,
    lastmod: today,
  })),
  ...articleEntries,
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n  </url>`,
  )
  .join("\n")}
</urlset>
`;

writeFileSync("public/sitemap.xml", xml);
console.log(`✓ Generated public/sitemap.xml (${urls.length} URLs)`);
