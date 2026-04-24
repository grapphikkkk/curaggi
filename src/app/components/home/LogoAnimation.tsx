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
// 3  rows 2 and 3 fade in below at opacity 0.6 / 1.0
// 4  idle loop — each row's opacity drifts smoothly at random

const TIMING = {
  toCrossfade: 800,
  toFlipGrow: 1500,
  toStack: 2300,
  toLoop: 3500,
};

// logo.svg aspect ratio = 654 / 183 ≈ 3.5714
const ROW_WIDTH = "min(92vw, 100vh)";
const ROW_HEIGHT = "calc(min(92vw, 100vh) / 3.5714)";
// Mild overlap so descenders visually "connect" with the next row's caps
// without the rows looking like they collide.
const ROW_OVERLAP = "calc(min(92vw, 100vh) / 3.5714 * -0.22)";
// Scale used while the single logo sits in the middle before flipping/growing.
const CENTER_SCALE = 0.35;
const CENTER_TRANSLATE_Y = "calc(33vh - 80px)";

// Letter sizing: C is rendered at full size; the other (lowercase) letters
// are rendered at ~80% so the initial "Curaggi" row looks balanced rather
// than C-dominated. Heights are also clamped by viewport width so the
// seven letters always fit within 92vw on mobile without overlapping.
const H_CAPITAL = "clamp(48px, min(11vh, 16vw), 112px)";
const H_LOWER = "clamp(38px, min(8.8vh, 12.8vw), 90px)";
// g has a descender inside its SVG, so we scale it up so the body matches
// the other lowercase letters, then translate it down so the descender
// hangs slightly below the shared baseline.
const H_G = `calc(${H_LOWER} * 1.32)`;
// i spans from the dot (ascender) to baseline, so its stem renders small
// at H_LOWER. Scale it up so the stem roughly matches lowercase x-height.
const H_I = `calc(${H_LOWER} * 1.4)`;

export function LogoAnimation() {
  const [stage, setStage] = useState(0);
  const [rowOp, setRowOp] = useState<[number, number, number, number]>([
    0.2, 0.4, 0.7, 1.0,
  ]);

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
        0.1 + Math.random() * 0.55,
        0.2 + Math.random() * 0.6,
        0.35 + Math.random() * 0.55,
        0.55 + Math.random() * 0.45,
      ]);
    };
    tick();
    const interval = window.setInterval(tick, 2800);
    return () => window.clearInterval(interval);
  }, [stage]);

  const row1Op = stage >= 4 ? rowOp[0] : stage >= 1 ? 0.2 : 0;
  const row2Op = stage >= 4 ? rowOp[1] : stage >= 3 ? 0.45 : 0;
  const row3Op = stage >= 4 ? rowOp[2] : stage >= 3 ? 0.75 : 0;
  const row4Op = stage >= 4 ? rowOp[3] : stage >= 3 ? 1.0 : 0;

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
      className="curaggi-logo-anim"
    >
      {/* Spread-letters layer (stage 0 → converges while fading out at stage 1) */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          width: stage < 1 ? "92vw" : "min(40vh, 80vw)",
          gap: 0,
          opacity: stage < 1 ? 1 : 0,
          pointerEvents: "none",
          transition:
            "width 0.95s cubic-bezier(0.65,0,0.35,1), opacity 0.7s ease 0.35s",
        }}
      >
        {LETTERS.map((l, i) => {
          const isG = l.alt === "g";
          const isI = l.alt === "i";
          const height =
            i === 0 ? H_CAPITAL : isG ? H_G : isI ? H_I : H_LOWER;
          return (
            <span
              key={i}
              style={{
                display: "inline-flex",
                transform: isG ? "translateY(18%)" : undefined,
              }}
            >
              <img
                src={l.src}
                alt={l.alt}
                style={{
                  height,
                  opacity: 0,
                  transformOrigin: "center center",
                  animation: `curaggi-rotate-in 0.32s ${i * 0.06}s cubic-bezier(0.2,0.8,0.2,1) forwards`,
                }}
              />
            </span>
          );
        })}
      </div>

      {/* Stacked logos wrapper (stages ≥ 1) */}
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
            <img
              src="/logos/logo.svg"
              alt=""
              aria-hidden
              style={{
                ...rowBase,
                marginTop: ROW_OVERLAP,
                opacity: row4Op,
                transition: "opacity 2.4s ease 0.4s",
                animation: "curaggi-row-in 0.45s 0.4s both",
              }}
            />
          </>
        )}
      </div>

      <style>{`
        @keyframes curaggi-rotate-in {
          from { opacity: 0; transform: rotateZ(-180deg); }
          to   { opacity: 0.3; transform: rotateZ(0deg); }
        }
        @keyframes curaggi-row-in {
          from { opacity: 0; }
        }
        /* On narrow viewports the rows become shorter (height-limited by the
           width cap), so we shrink the section so there is no big empty gap
           at the bottom. */
        @media (max-width: 767px) {
          .curaggi-logo-anim {
            min-height: calc(80px + 3vh + min(92vw, 100vh) / 3.5714 * 3.34 + 6vh) !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .curaggi-logo-anim *,
          .curaggi-logo-anim *::before,
          .curaggi-logo-anim *::after {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
