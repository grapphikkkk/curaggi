import { Helmet } from "react-helmet-async";

const SITE = "https://www.curaggi.jp";
const SITE_NAME = "Curaggi";
const DEFAULT_OG = `${SITE}/og-image.png`;

type SeoProps = {
  /** Page title. By default the site name is appended; set
   *  `rawTitle` to use this value as-is. */
  title: string;
  description: string;
  /** Path on this site, e.g. "/news" or "/news/rapid-prototyping". Leading slash required. */
  path?: string;
  /** Override OG image URL (defaults to brand OG). */
  image?: string;
  /** When true, render `title` exactly as given (no `｜Curaggi` suffix). */
  rawTitle?: boolean;
  /** Article-specific JSON-LD payload (optional). */
  article?: {
    publishedTime: string;
    modifiedTime?: string;
    tags?: string[];
    category?: string;
  };
};

export function Seo({
  title,
  description,
  path = "/",
  image,
  rawTitle,
  article,
}: SeoProps) {
  const fullTitle = rawTitle ? title : `${title}｜${SITE_NAME}`;
  const url = `${SITE}${path === "/" ? "" : path}`;
  const ogImage = image ?? DEFAULT_OG;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="ja_JP" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Article tags */}
      {article && (
        <meta property="article:published_time" content={article.publishedTime} />
      )}
      {article?.modifiedTime && (
        <meta property="article:modified_time" content={article.modifiedTime} />
      )}
      {article?.category && (
        <meta property="article:section" content={article.category} />
      )}
      {article?.tags?.map((t) => (
        <meta key={t} property="article:tag" content={t} />
      ))}
    </Helmet>
  );
}
