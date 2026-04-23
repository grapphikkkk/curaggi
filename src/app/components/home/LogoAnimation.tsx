import { useEffect, useState, type CSSProperties } from "react";

const LETTERS = [
  { src: "/logos/C.svg", alt: "C" },
  { src: "/logos/u.svg", alt: "u" },
  { src: "/logos/r.svg", alt: "r" },
  { src: "/logos/a.svg", alt: "a" },
  { src: "/logos/g.svg", alt: "g" },
  { src: "/logos/g_2.svg", alt: "g" },
  { src: "/logos/i.svg", alt: "i" },
];

// Animation stages:
// 0  letters fade in spread across viewport at opacity 0.3
// 1  letters converge — container shrinks toward logo.svg width, letters shrink
// 2  row 1 logo appears at same size/position as the converged letters
// 3  row 1 logo grows to full size (min(92vw,100vh)) while sliding to top
// 4  rows 2 and 3 fade in below at opacity 0.6 / 1.0 (tightly overlapping)
// 5  idle loop — each row's opacity drifts smoothly at random

const TIMING = {
  toConverge: 1500,
  toLogo: 2600,
  toTop: 2900,
  toStack: 3800,
  toLoop: 5400,
};

// logo.svg aspect ratio = 654 / 183 ≈ 3.5714
// Row width is capped by both viewport width and height so 3 rows always fit vertically.
const ROW_WIDTH = "min(92vw, 100vh)";
const ROW_HEIGHT = "calc(min(92vw, 100vh) / 3.5714)";
// negative margin between rows for a tight, overlapping feel
const ROW_OVERLAP = "calc(min(92vw, 100vh) / 3.5714 * -0.18)";

// Scale used while the single logo sits in the middle before moving up.
const CENTER_SCALE = 0.4;

export function LogoAnimation() {
  const [stage, setStage] = useState(0);
  const [rowOp, setRowOp] = useState<[number, number, number]>([0.3, 0.6, 1.0]);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setStage(5);
      return;
    }
    const timers = [
      window.setTimeout(() => setStage(1), TIMING.toConverge),
      window.setTimeout(() => setStage(2), TIMING.toLogo),
      window.setTimeout(() => setStage(3), TIMING.toTop),
      window.setTimeout(() => setStage(4), TIMING.toStack),
      window.setTimeout(() => setStage(5), TIMING.toLoop),
    ];
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  useEffect(() => {
    if (stage < 5) return;
    const tick = () => {
      setRowOp([
        0.15 + Math.random() * 0.7,
        0.2 + Math.random() * 0.7,
        0.3 + Math.random() * 0.7,
      ]);
    };
    tick();
    const interval = window.setInterval(tick, 2800);
    return () => window.clearInterval(interval);
  }, [stage]);

  const row1Op = stage >= 5 ? rowOp[0] : stage >= 2 ? 0.3 : 0;
  const row2Op = stage >= 5 ? rowOp[1] : stage >= 4 ? 0.6 : 0;
  const row3Op = stage >= 5 ? rowOp[2] : stage >= 4 ? 1.0 : 0;

  // Stage-1 container width: approximately the width of logo.svg at CENTER_SCALE
  // — row width is 100vh wide on desktop, so at 0.4 scale that is 40vh.
  // This is the "各文字の幅をlogo.png と同じ幅" value.
  const convergedWidth = "min(40vh, 92vw)";

  // Shared row image style, using CSS var --row-w so margins scale responsively.
  const rowBase: CSSProperties = {
    display: "block",
    width: "var(--row-w)",
    height: "auto",
  };

  return (
    <section
      aria-label="Curaggi logo animation"
      style={
        {
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          overflow: "hidden",
          background: "#ffffff",
          ["--row-w" as string]: ROW_WIDTH,
          ["--row-h" as string]: ROW_HEIGHT,
        } as CSSProperties
      }
    >
      {/* Spread-letters layer (stages 0–1) */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          width: stage === 0 ? "92vw" : convergedWidth,
          gap: 0,
          opacity: stage < 2 ? 1 : 0,
          pointerEvents: "none",
          transition:
            "width 1.0s cubic-bezier(0.65,0,0.35,1), opacity 0.3s ease",
        }}
      >
        {LETTERS.map((l, i) => (
          <img
            key={i}
            src={l.src}
            alt={l.alt}
            style={{
              height:
                stage >= 1 ? "clamp(42px, 8.5vh, 90px)" : "clamp(56px, 11vh, 112px)",
              opacity: 0,
              animation: `curaggi-fade-in 0.7s ${i * 0.13}s forwards`,
              transition: "height 1.0s cubic-bezier(0.65,0,0.35,1)",
            }}
          />
        ))}
      </div>

      {/* Stacked logos wrapper (stages ≥ 2).
          Row 1 sits at the top of this wrapper; during stage 2 it is translated
          down + scaled down via transform so it appears centered in the viewport.
          Rows 2 and 3 only render from stage 4 onward so they never steal layout
          space from row 1's positioning. */}
      <div
        style={{
          position: "absolute",
          top: "calc(80px + 3vh)",
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src="/logos/logo.svg"
          alt="Curaggi"
          style={{
            ...rowBase,
            transformOrigin: "center top",
            transform:
              stage >= 3
                ? "scale(1)"
                : `translateY(calc(50vh - 80px - 3vh - var(--row-h) * ${CENTER_SCALE} / 2)) scale(${CENTER_SCALE})`,
            opacity: row1Op,
            transition:
              "transform 0.95s cubic-bezier(0.65,0,0.35,1), opacity 2.4s ease",
          }}
        />

        {stage >= 4 && (
          <>
            <img
              src="/logos/logo.svg"
              alt=""
              aria-hidden
              style={{
                ...rowBase,
                marginTop: ROW_OVERLAP,
                opacity: row2Op,
                transition: "opacity 2.4s ease",
                animation: "curaggi-row-in 0.6s both",
              }}
            />
            <img
              src="/logos/logo.svg"
              alt=""
              aria-hidden
              style={{
                ...rowBase,
                marginTop: ROW_OVERLAP,
                opacity: row3Op,
                transition: "opacity 2.4s ease 0.2s",
                animation: "curaggi-row-in 0.6s 0.25s both",
              }}
            />
          </>
        )}
      </div>

      <style>{`
        @keyframes curaggi-fade-in {
          from { opacity: 0; }
          to { opacity: 0.3; }
        }
        @keyframes curaggi-row-in {
          from { opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          [aria-label="Curaggi logo animation"] *,
          [aria-label="Curaggi logo animation"] *::before,
          [aria-label="Curaggi logo animation"] *::after {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
