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
// 0  letters fade in spread across the viewport at opacity 0.3
// 1  letters fade out, logo.svg fades in at centered small size
// 2  logo flips on X-axis (split-flap feel) while scaling up and moving to top
// 3  rows 2 and 3 fade in below at opacity 0.6 / 1.0 (tightly overlapping)
// 4  idle loop — each row's opacity drifts smoothly at random

const TIMING = {
  toCrossfade: 650,
  toFlipGrow: 1050,
  toStack: 1800,
  toLoop: 3000,
};

// logo.svg aspect ratio = 654 / 183 ≈ 3.5714
// Row width is capped by both viewport width and height so 3 rows always fit vertically.
const ROW_WIDTH = "min(92vw, 100vh)";
const ROW_HEIGHT = "calc(min(92vw, 100vh) / 3.5714)";
const ROW_OVERLAP = "calc(min(92vw, 100vh) / 3.5714 * -0.18)";

// Scale used while the single logo sits in the middle before flipping/growing.
const CENTER_SCALE = 0.35;
// Natural unscaled center of row 1 in viewport terms is 80px + 3vh + row_h/2.
// row_h on wide screens = 100vh / 3.5714 ≈ 28vh, so center is 80px + 17vh.
// Target visible center at stage 1 is 50vh, so translateY = 50vh - 80px - 17vh = 33vh - 80px.
const CENTER_TRANSLATE_Y = "calc(33vh - 80px)";

export function LogoAnimation() {
  const [stage, setStage] = useState(0);
  const [rowOp, setRowOp] = useState<[number, number, number]>([0.3, 0.6, 1.0]);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setStage(4);
      return;
    }
    const timers = [
      window.setTimeout(() => setStage(1), TIMING.toCrossfade),
      window.setTimeout(() => setStage(2), TIMING.toFlipGrow),
      window.setTimeout(() => setStage(3), TIMING.toStack),
      window.setTimeout(() => setStage(4), TIMING.toLoop),
    ];
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  useEffect(() => {
    if (stage < 4) return;
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

  const row1Op = stage >= 4 ? rowOp[0] : stage >= 1 ? 0.3 : 0;
  const row2Op = stage >= 4 ? rowOp[1] : stage >= 3 ? 0.6 : 0;
  const row3Op = stage >= 4 ? rowOp[2] : stage >= 3 ? 1.0 : 0;

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
      {/* Spread-letters layer (stage 0). Fades out at stage ≥ 1. */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          width: "92vw",
          gap: 0,
          opacity: stage < 1 ? 1 : 0,
          pointerEvents: "none",
          transition: "opacity 0.3s ease",
        }}
      >
        {LETTERS.map((l, i) => (
          <img
            key={i}
            src={l.src}
            alt={l.alt}
            style={{
              height: "clamp(56px, 11vh, 112px)",
              opacity: 0,
              animation: `curaggi-fade-in 0.25s ${i * 0.04}s forwards`,
            }}
          />
        ))}
      </div>

      {/* Stacked logos wrapper (stages ≥ 1).
          Row 1 sits at the top of this wrapper. During stage 1 it is
          translated down + scaled down via transform so it appears centered.
          At stage 2 it flips on the X-axis while scaling to full size and
          settling at its natural position (top of wrapper = top of viewport). */}
      <div
        style={{
          position: "absolute",
          top: "calc(80px + 3vh)",
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          perspective: "1400px",
          perspectiveOrigin: "50% 35%",
        }}
      >
        <img
          src="/logos/logo.svg"
          alt="Curaggi"
          style={{
            ...rowBase,
            transformOrigin: "center center",
            transform:
              stage >= 2
                ? "translateY(0) scale(1) rotateX(720deg)"
                : `translateY(${CENTER_TRANSLATE_Y}) scale(${CENTER_SCALE}) rotateX(0deg)`,
            opacity: stage >= 1 ? row1Op : 0,
            transition:
              "transform 0.65s cubic-bezier(0.45, 0.05, 0.2, 1), opacity 0.35s ease",
            willChange: "transform, opacity",
            backfaceVisibility: "visible",
          }}
        />

        {stage >= 3 && (
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
                animation: "curaggi-row-in 0.45s both",
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
                animation: "curaggi-row-in 0.45s 0.2s both",
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
