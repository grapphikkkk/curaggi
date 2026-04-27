import { useEffect, useRef, useState } from "react";

function useInView<T extends Element>(threshold = 0.35) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function WaveRow({
  color = "#0A0A0B",
  delayMs = 3500,
}: {
  color?: string;
  delayMs?: number;
}) {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setRevealed(true);
      return;
    }
    const t = window.setTimeout(() => setRevealed(true), delayMs);
    return () => window.clearTimeout(t);
  }, [delayMs]);
  // A row of dots arranged along one sine period; the SVG tiles via
  // repeat-x and slides rightward on a seamless loop once in view.
  const PERIOD = 320;
  const HEIGHT = 60;
  const DOTS = 8;
  const AMP = 16;
  const SQ_BIG = 10;
  const SQ_SMALL = 5;
  // Every 5th square shrinks to 5x5 — adds rhythm to the dot wave.
  const squares = Array.from({ length: DOTS }, (_, i) => {
    const sq = (i + 1) % 5 === 0 ? SQ_SMALL : SQ_BIG;
    const cx = (i + 0.5) * (PERIOD / DOTS);
    const cy = HEIGHT / 2 + AMP * Math.sin((cx / PERIOD) * Math.PI * 2);
    const x = cx - sq / 2;
    const y = cy - sq / 2;
    return `<rect x='${x.toFixed(2)}' y='${y.toFixed(2)}' width='${sq}' height='${sq}' fill='${color}'/>`;
  }).join("");
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${PERIOD} ${HEIGHT}'>${squares}</svg>`;
  const dataUrl = `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
  // Soft-edge wipe from the left. Mask is 3x element width with the
  // black region 0-33%, fade 33-50%, transparent 50-100% — so at
  // position 100% the visible window lands fully in the transparent
  // zone (no leakage) and at position 0% it lands fully in the black
  // zone (fully revealed).
  const maskImage =
    "linear-gradient(90deg, #000 0%, #000 33%, transparent 50%, transparent 100%)";
  return (
    <div
      aria-hidden="true"
      className="wave-row"
      style={{
        height: `${HEIGHT}px`,
        width: "100%",
        backgroundImage: dataUrl,
        backgroundRepeat: "repeat-x",
        backgroundPosition: "0 50%",
        backgroundSize: `${PERIOD}px ${HEIGHT}px`,
        imageRendering: "pixelated",
        WebkitMaskImage: maskImage,
        maskImage: maskImage,
        WebkitMaskSize: "300% 100%",
        maskSize: "300% 100%",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: revealed ? "0% 0" : "100% 0",
        maskPosition: revealed ? "0% 0" : "100% 0",
        transition:
          "mask-position 1.4s cubic-bezier(0.65,0,0.35,1), -webkit-mask-position 1.4s cubic-bezier(0.65,0,0.35,1)",
        animation: revealed
          ? "wave-scroll-right 6s linear infinite"
          : "none",
      }}
    />
  );
}

type MarkerLineProps = {
  children: React.ReactNode;
  marker: string;
  delay?: number;
  textColor?: string;
  radius?: number;
};

function MarkerLine({
  children,
  marker,
  delay = 0,
  textColor = "#0A0A0B",
  radius = 5,
}: MarkerLineProps) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  return (
    <span
      ref={ref}
      style={{
        display: "inline-block",
        color: textColor,
        lineHeight: 1,
        backgroundImage: `linear-gradient(${marker}, ${marker})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        backgroundSize: inView ? "100% 100%" : "0% 100%",
        padding: "1px 0 0 0",
        borderRadius: `${radius}px`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(0.25em)",
        transition: [
          `opacity 0.35s ease ${delay}s`,
          `transform 0.4s cubic-bezier(0.2,0.8,0.2,1) ${delay}s`,
          `background-size 0.75s cubic-bezier(0.65,0,0.35,1) ${delay + 0.28}s`,
        ].join(", "),
      }}
    >
      {children}
    </span>
  );
}

const DESCRIPTION_GROUPS: string[][] = [
  ["知らず知らずのうちに、", "選択肢を失ってしまう場面があります。"],
  [
    "日常の中では、",
    "複雑さの壁によって、",
    "本来享受できたはずの体験ができず、",
    "あきらめてしまうことがあります。",
  ],
  [
    "さらに視野を広げれば、",
    "環境や立場、置かれた状況によって、",
    "そもそも選択肢の存在を知らないまま、",
    "未来の幅を狭めてしまう人がいます。",
  ],
  [
    "デザインの力で、",
    "本来拓かれていたはずの",
    "選択肢を取り戻し、",
    "自ら選び取れる可能性を、",
    "増やしていきたい。",
  ],
  ["選択肢を持つことが、", "一歩先へ進む勇気になります。"],
];

export function Hero() {
  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-display)",
    fontSize: "var(--text-sm)",
    fontWeight: 700,
    color: "#0A0A0B",
    marginBottom: "var(--space-6)",
    letterSpacing: "0.02em",
  };

  const visionHeadingStyle: React.CSSProperties = {
    fontFamily: "var(--font-display), var(--font-jp)",
    fontSize: "clamp(48px, 11vw, 140px)",
    fontWeight: 900,
    lineHeight: 1.12,
    letterSpacing: "-0.02em",
    color: "#0A0A0B",
  };

  const missionHeadingStyle: React.CSSProperties = {
    fontFamily: "var(--font-display), var(--font-jp)",
    fontSize: "clamp(40px, 7.5vw, 96px)",
    fontWeight: 900,
    lineHeight: 1.15,
    letterSpacing: "-0.02em",
    color: "#0A0A0B",
  };

  // running marker delay counter for sequential reveal
  let descCounter = 0;

  return (
    <>
      <section
        style={{
          background: "#ffffff",
          paddingTop: 0,
          paddingBottom: "var(--space-12)",
        }}
      >
        <WaveRow />

        <div
          className="container"
          style={{
            paddingTop: "var(--space-20)",
            paddingBottom: "var(--space-20)",
          }}
        >
          {/* Vision */}
          <div style={{ marginBottom: "var(--space-24)" }}>
            <p style={labelStyle}>Vision</p>
            <h2 style={visionHeadingStyle}>
              <MarkerLine marker="var(--curaggi-pink)">あきらめなくて</MarkerLine>
              <br />
              <MarkerLine marker="var(--curaggi-pink)" delay={0.12}>
                いい
              </MarkerLine>
              <br />
              <MarkerLine marker="var(--curaggi-pink)" delay={0.24}>
                世界をつくる
              </MarkerLine>
            </h2>
          </div>

          {/* Mission */}
          <div>
            <p style={labelStyle}>Mission</p>
            <h2 style={missionHeadingStyle}>
              <MarkerLine marker="var(--scintilla-yellow)">選択肢と勇気を</MarkerLine>
              <br />
              <MarkerLine marker="var(--scintilla-yellow)" delay={0.12}>
                デザインする
              </MarkerLine>
            </h2>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes wave-scroll-right {
          from { background-position-x: 0px; }
          to   { background-position-x: 320px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .wave-row {
            animation: none !important;
          }
        }
      `}</style>

      {/* Description section with teal background and white markers */}
      <section
        style={{
          position: "relative",
          background: "var(--fiducia-teal)",
          paddingTop: "clamp(120px, 18vw, 260px)",
          paddingBottom: "var(--space-24)",
          overflow: "hidden",
        }}
      >
        {/* Top wave — a single white-filled shape that covers the upper
            portion of this section. Below the wave the path is empty
            so the section's own teal bg shows through. No rect, so
            there's no element-boundary seam. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 260"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            top: "-1px",
            left: 0,
            width: "100%",
            height: "calc(clamp(120px, 18vw, 260px) + 1px)",
            display: "block",
            shapeRendering: "geometricPrecision",
          }}
        >
          <path
            d="M0,-1 L1441,-1 L1441,180 C1200,236 960,35 720,55 C460,35 220,236 0,180 Z"
            fill="#ffffff"
          />
        </svg>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              fontFamily: "var(--font-display), var(--font-jp)",
              fontSize: "clamp(18px, 5vw, 40px)",
              fontWeight: 900,
              lineHeight: 1.55,
              letterSpacing: "-0.005em",
              color: "#0A0A0B",
            }}
            className="description-body"
          >
            {DESCRIPTION_GROUPS.map((group, gi) => (
              <p
                key={gi}
                style={{
                  margin: 0,
                  marginBottom:
                    gi < DESCRIPTION_GROUPS.length - 1 ? "1.3em" : 0,
                }}
              >
                {group.map((line, li) => {
                  const delay = descCounter * 0.08;
                  descCounter += 1;
                  return (
                    <span key={li}>
                      <MarkerLine marker="#ffffff" delay={delay} radius={2}>
                        {line}
                      </MarkerLine>
                      {li < group.length - 1 && <br />}
                    </span>
                  );
                })}
              </p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
