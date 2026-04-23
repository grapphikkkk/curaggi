import { useEffect, useState } from "react";

const LETTERS = [
  { src: "/logos/C.svg", alt: "C" },
  { src: "/logos/u.svg", alt: "u" },
  { src: "/logos/r.svg", alt: "r" },
  { src: "/logos/a.svg", alt: "a" },
  { src: "/logos/g.svg", alt: "g" },
  { src: "/logos/g_2.svg", alt: "g" },
  { src: "/logos/i.svg", alt: "i" },
];

// Stages:
// 0  letters fade in, spread evenly across viewport, opacity 0.3
// 1  letters converge toward center, container shrinks to logo.svg aspect
// 2  crossfade letters → logo.svg at center
// 3  logo moves to top, scales to full viewport width (90vw)
// 4  rows 2 and 3 fade in below at the same size (opacity 0.6, 1.0)
// 5  loop: each row's opacity smoothly drifts between 0.1 and 1.0

const TIMING = {
  toConverge: 1500,
  toLogo: 2600,
  toTop: 2900,
  toStack: 3800,
  toLoop: 5200,
};

export function LogoAnimation() {
  const [stage, setStage] = useState(0);
  const [rowOpacity, setRowOpacity] = useState<[number, number, number]>([0.3, 0.6, 1.0]);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
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
      setRowOpacity([
        0.15 + Math.random() * 0.7,
        0.15 + Math.random() * 0.7,
        0.3 + Math.random() * 0.7,
      ]);
    };
    tick();
    const interval = window.setInterval(tick, 2800);
    return () => window.clearInterval(interval);
  }, [stage]);

  const lettersOpacity = stage < 2 ? 1 : 0;
  const logoOpacity = stage >= 2 ? 1 : 0;

  // Top row opacity
  const row1 = stage >= 5 ? rowOpacity[0] : 0.3;
  const row2 = stage >= 5 ? rowOpacity[1] : stage >= 4 ? 0.6 : 0;
  const row3 = stage >= 5 ? rowOpacity[2] : stage >= 4 ? 1.0 : 0;

  return (
    <section
      aria-label="Curaggi logo animation"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        background: "#ffffff",
      }}
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
          width: stage === 0 ? "90vw" : "min(60vw, 720px)",
          gap: 0,
          opacity: lettersOpacity,
          pointerEvents: "none",
          transition:
            "width 1.1s cubic-bezier(0.65,0,0.35,1), opacity 0.35s ease",
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
              animation: `curaggi-fade-in 0.7s ${i * 0.13}s forwards`,
            }}
          />
        ))}
      </div>

      {/* Logo + stacked rows layer (stages ≥2) */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: stage >= 3 ? "calc(80px + 4vh)" : "50%",
          transform: stage >= 3 ? "none" : "translateY(-50%)",
          padding: "0 5vw",
          opacity: logoOpacity,
          transition:
            "top 0.9s cubic-bezier(0.65,0,0.35,1), transform 0.9s cubic-bezier(0.65,0,0.35,1), opacity 0.4s ease",
        }}
      >
        <img
          src="/logos/logo.svg"
          alt="Curaggi"
          style={{
            display: "block",
            width: stage >= 3 ? "90vw" : "min(60vw, 720px)",
            height: "auto",
            margin: "0 auto",
            opacity: row1,
            transition:
              "width 0.9s cubic-bezier(0.65,0,0.35,1), opacity 2.4s ease",
          }}
        />
        <img
          src="/logos/logo.svg"
          alt=""
          aria-hidden="true"
          style={{
            display: "block",
            width: "90vw",
            height: "auto",
            margin: "3vh auto 0",
            opacity: row2,
            transition: "opacity 2.4s ease",
          }}
        />
        <img
          src="/logos/logo.svg"
          alt=""
          aria-hidden="true"
          style={{
            display: "block",
            width: "90vw",
            height: "auto",
            margin: "3vh auto 0",
            opacity: row3,
            transition: "opacity 2.4s ease 0.15s",
          }}
        />
      </div>

      <style>{`
        @keyframes curaggi-fade-in {
          from { opacity: 0; }
          to { opacity: 0.3; }
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
