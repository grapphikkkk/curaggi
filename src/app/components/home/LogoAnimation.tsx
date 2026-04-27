import { useEffect, useState, type CSSProperties } from "react";

// Letter paths and bboxes extracted from /public/logos/logo.svg
// (viewBox 0 0 654 183). Used to render a 1:1 composite that exactly
// matches the official logo, while letting each letter animate
// independently for the intro.
type Letter = {
  alt: string;
  d: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

const LETTERS: Letter[] = [
  {
    alt: "C",
    d: "M70.5654 141.522C60.5311 141.522 51.2136 139.762 42.6129 136.244C34.0121 132.595 26.4539 127.578 19.9381 121.193C13.5527 114.677 8.60076 107.119 5.08227 98.5179C1.69409 89.9171 0 80.6648 0 70.7608C0 60.8569 1.69409 51.6046 5.08227 43.0038C8.60076 34.4031 13.5527 26.91 19.9381 20.5246C26.4539 14.1391 33.947 9.12202 42.4174 5.47321C51.0182 1.8244 60.4008 0 70.5654 0C81.5118 0 91.1551 1.8244 99.4952 5.47321C107.835 8.99171 115.198 13.8785 121.584 20.1336L103.6 38.117C99.821 33.947 95.1948 30.6891 89.7216 28.3434C84.2484 25.9978 77.863 24.8249 70.5654 24.8249C64.1799 24.8249 58.3158 25.9326 52.9729 28.148C47.7603 30.233 43.1993 33.3605 39.2899 37.5306C35.3804 41.5704 32.3832 46.4572 30.2981 52.191C28.2131 57.7945 27.1706 63.9845 27.1706 70.7608C27.1706 77.6675 28.2131 83.9226 30.2981 89.5262C32.3832 95.1297 35.3804 100.016 39.2899 104.187C43.1993 108.226 47.7603 111.354 52.9729 113.569C58.3158 115.785 64.1799 116.892 70.5654 116.892C78.2539 116.892 84.8348 115.719 90.308 113.374C95.9116 111.028 100.603 107.705 104.382 103.405L122.365 121.388C115.98 127.774 108.552 132.725 100.082 136.244C91.6112 139.762 81.7724 141.522 70.5654 141.522Z",
    x: 0,
    y: 0,
    w: 122.365,
    h: 141.522,
  },
  {
    alt: "u",
    d: "M171.706 141.49C163.502 141.49 156.196 139.759 149.787 136.298C143.506 132.838 138.572 128.031 134.983 121.878C131.394 115.726 129.599 108.612 129.599 100.537V46.7017H154.978V99.9598C154.978 103.805 155.619 107.138 156.901 109.958C158.183 112.649 160.106 114.7 162.669 116.11C165.233 117.52 168.245 118.225 171.706 118.225C176.961 118.225 181.063 116.623 184.011 113.419C186.959 110.214 188.433 105.728 188.433 99.9598V46.7017H213.62V100.537C213.62 108.74 211.826 115.918 208.237 122.071C204.776 128.223 199.841 133.03 193.432 136.491C187.151 139.823 179.909 141.49 171.706 141.49Z",
    x: 129.599,
    y: 46.7017,
    w: 84.021,
    h: 94.7883,
  },
  {
    alt: "r",
    d: "M226.815 141.169V46.7561H252.422V141.169H226.815ZM252.422 88.978L242.453 82.3319C243.626 70.7339 247.014 61.6119 252.618 54.9659C258.221 48.1895 266.301 44.8013 276.856 44.8013C281.417 44.8013 285.522 45.5832 289.171 47.147C292.82 48.5805 296.143 50.9913 299.14 54.3795L283.111 72.7538C281.678 71.19 279.919 70.0172 277.834 69.2353C275.879 68.4534 273.598 68.0625 270.992 68.0625C265.519 68.0625 261.023 69.8217 257.505 73.3402C254.116 76.7284 252.422 81.941 252.422 88.978Z",
    x: 226.815,
    y: 44.8013,
    w: 72.325,
    h: 96.3677,
  },
  {
    alt: "a",
    d: "M342.375 141.489C333.915 141.489 326.288 139.374 319.495 135.144C312.702 130.915 307.382 125.146 303.537 117.84C299.691 110.534 297.769 102.331 297.769 93.2301C297.769 84.0013 299.691 75.7338 303.537 68.4276C307.382 61.1214 312.702 55.3534 319.495 51.1235C326.288 46.8936 333.915 44.7787 342.375 44.7787C349.04 44.7787 355 46.1246 360.256 48.8163C365.511 51.508 369.677 55.2893 372.753 60.1601C375.958 64.9027 377.688 70.2862 377.944 76.3106V109.765C377.688 115.918 375.958 121.365 372.753 126.108C369.677 130.85 365.511 134.632 360.256 137.452C355 140.143 349.04 141.489 342.375 141.489ZM346.989 118.225C354.039 118.225 359.743 115.918 364.101 111.303C368.459 106.561 370.638 100.472 370.638 93.0378C370.638 88.1671 369.613 83.8731 367.562 80.1559C365.639 76.3106 362.883 73.3625 359.294 71.3116C355.834 69.1326 351.732 68.0431 346.989 68.0431C342.375 68.0431 338.273 69.1326 334.684 71.3116C331.223 73.3625 328.467 76.3106 326.417 80.1559C324.494 83.8731 323.533 88.1671 323.533 93.0378C323.533 98.0368 324.494 102.459 326.417 106.304C328.467 110.021 331.223 112.97 334.684 115.149C338.273 117.199 342.375 118.225 346.989 118.225ZM369.292 141.169V114.572L373.33 91.8842L369.292 69.5812V46.7014H394.287V141.169H369.292Z",
    x: 297.769,
    y: 44.7787,
    w: 96.518,
    h: 96.7103,
  },
  {
    alt: "g",
    d: "M452.159 183C442.125 183 433.263 181.176 425.575 177.527C417.886 174.008 411.761 168.991 407.2 162.475L423.425 146.251C427.073 150.552 431.113 153.81 435.544 156.025C440.105 158.371 445.578 159.543 451.963 159.543C459.913 159.543 466.168 157.523 470.729 153.484C475.42 149.444 477.766 143.84 477.766 136.673V113.021L482.066 92.301L477.961 71.581V46.7561H503.373V136.282C503.373 145.665 501.157 153.81 496.726 160.716C492.426 167.753 486.432 173.226 478.743 177.136C471.055 181.045 462.193 183 452.159 183ZM450.986 138.628C442.516 138.628 434.892 136.608 428.116 132.568C421.339 128.398 415.997 122.729 412.087 115.562C408.308 108.395 406.418 100.381 406.418 91.5191C406.418 82.6577 408.308 74.7085 412.087 67.6715C415.997 60.6346 421.339 55.0962 428.116 51.0564C434.892 46.8864 442.516 44.8013 450.986 44.8013C458.023 44.8013 464.213 46.1696 469.556 48.9062C475.029 51.6428 479.329 55.422 482.457 60.2436C485.585 64.9349 487.279 70.4733 487.539 76.8587V106.57C487.279 112.826 485.519 118.429 482.262 123.381C479.134 128.203 474.834 131.982 469.36 134.718C464.018 137.325 457.893 138.628 450.986 138.628ZM456.068 115.367C460.76 115.367 464.799 114.389 468.188 112.435C471.706 110.35 474.443 107.548 476.397 104.029C478.352 100.381 479.329 96.2756 479.329 91.7146C479.329 87.0233 478.352 82.9184 476.397 79.3999C474.443 75.8814 471.706 73.1448 468.188 71.19C464.799 69.105 460.76 68.0625 456.068 68.0625C451.377 68.0625 447.272 69.105 443.754 71.19C440.235 73.1448 437.498 75.9465 435.544 79.5953C433.589 83.1138 432.612 87.1536 432.612 91.7146C432.612 96.1453 433.589 100.185 435.544 103.834C437.498 107.352 440.235 110.154 443.754 112.239C447.272 114.324 451.377 115.367 456.068 115.367Z",
    x: 406.418,
    y: 44.8013,
    w: 96.955,
    h: 138.1987,
  },
  {
    alt: "g",
    d: "M561.111 183C551.076 183 542.215 181.176 534.526 177.527C526.838 174.008 520.713 168.991 516.152 162.475L532.376 146.251C536.025 150.552 540.065 153.81 544.495 156.025C549.056 158.371 554.53 159.543 560.915 159.543C568.864 159.543 575.119 157.523 579.68 153.484C584.372 149.444 586.717 143.84 586.717 136.673V113.021L591.018 92.301L586.913 71.581V46.7561H612.324V136.282C612.324 145.665 610.109 153.81 605.678 160.716C601.378 167.753 595.383 173.226 587.695 177.136C580.006 181.045 571.145 183 561.111 183ZM559.938 138.628C551.467 138.628 543.844 136.608 537.068 132.568C530.291 128.398 524.948 122.729 521.039 115.562C517.26 108.395 515.37 100.381 515.37 91.5191C515.37 82.6577 517.26 74.7085 521.039 67.6715C524.948 60.6346 530.291 55.0962 537.068 51.0564C543.844 46.8864 551.467 44.8013 559.938 44.8013C566.975 44.8013 573.165 46.1696 578.508 48.9062C583.981 51.6428 588.281 55.422 591.409 60.2436C594.536 64.9349 596.23 70.4733 596.491 76.8587V106.57C596.23 112.826 594.471 118.429 591.213 123.381C588.086 128.203 583.785 131.982 578.312 134.718C572.969 137.325 566.844 138.628 559.938 138.628ZM565.02 115.367C569.711 115.367 573.751 114.389 577.139 112.435C580.658 110.35 583.394 107.548 585.349 104.029C587.304 100.381 588.281 96.2756 588.281 91.7146C588.281 87.0233 587.304 82.9184 585.349 79.3999C583.394 75.8814 580.658 73.1448 577.139 71.19C573.751 69.105 569.711 68.0625 565.02 68.0625C560.329 68.0625 556.224 69.105 552.705 71.19C549.187 73.1448 546.45 75.9465 544.495 79.5953C542.541 83.1138 541.563 87.1536 541.563 91.7146C541.563 96.1453 542.541 100.185 544.495 103.834C546.45 107.352 549.187 110.154 552.705 112.239C556.224 114.324 560.329 115.367 565.02 115.367Z",
    x: 515.37,
    y: 44.8013,
    w: 96.954,
    h: 138.1987,
  },
  {
    alt: "i",
    d: "M625.77 141.169V46.7558H651.572V141.169H625.77ZM638.671 31.509C634.501 31.509 631.047 30.1407 628.311 27.4041C625.574 24.5372 624.206 21.0187 624.206 16.8486C624.206 12.8089 625.574 9.35553 628.311 6.48862C631.047 3.62169 634.501 2.18823 638.671 2.18823C642.971 2.18823 646.424 3.62169 649.031 6.48862C651.767 9.35553 653.136 12.8089 653.136 16.8486C653.136 21.0187 651.767 24.5372 649.031 27.4041C646.424 30.1407 642.971 31.509 638.671 31.509Z",
    x: 624.206,
    y: 2.18823,
    w: 28.93,
    h: 138.98077,
  },
];

const VB_W = 654;
const VB_H = 183;
// How far each letter fans out from center while spread (additional
// horizontal offset = (cx - center) * SPREAD_FACTOR). Smaller scale on
// phones so the rightmost letters never escape the device width.
const SPREAD_FACTOR_DESKTOP = 0.55;
const SPREAD_SCALE_DESKTOP = 0.7;
const SPREAD_FACTOR_MOBILE = 0.05;
const SPREAD_SCALE_MOBILE = 0.55;

// logo.svg aspect ratio = 654 / 183 ≈ 3.5714
const ROW_WIDTH = "min(92vw, 100vh)";
const ROW_HEIGHT = "calc(min(92vw, 100vh) / 3.5714)";
const ROW_OVERLAP = "calc(min(92vw, 100vh) / 3.5714 * -0.22)";
const CENTER_TRANSLATE_Y = "calc(33vh - 80px)";

// Animation stages:
// 0  letters appear at spread positions (rotate-in + fade)
// 1  letters converge to their natural logo positions (forms the logo)
// 2  composite flips on X axis and grows/translates to row 1
// 3  rows 2 & 3 fade in below
// 4  idle loop — each row's opacity drifts smoothly
const TIMING = {
  toConverge: 1300,
  toFlipGrow: 2200,
  toStack: 3000,
  toLoop: 4200,
};

type Phase = "hidden" | "spread" | "converge";

// Static logo (rows 2 / 3): inherits the parent's `color` so each row
// can be tinted independently to a brand color.
function LogoStaticSvg() {
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ width: "100%", height: "auto", display: "block" }}
      aria-hidden="true"
    >
      {LETTERS.map((l, i) => (
        <path key={i} d={l.d} fill="currentColor" />
      ))}
    </svg>
  );
}

export function LogoAnimation() {
  const [stage, setStage] = useState(0);
  const [phase, setPhase] = useState<Phase>("hidden");
  const [isMobile, setIsMobile] = useState(false);
  const [rowOp, setRowOp] = useState<[number, number, number]>([
    0.3, 0.6, 1.0,
  ]);
  // Each row occasionally flips into one of the brand colors.
  const COLOR_POOL = [
    "#1A1816",
    "var(--curaggi-pink)",
    "var(--scintilla-yellow)",
    "var(--fiducia-teal)",
    "var(--visione-purple)",
  ];
  const [rowColors, setRowColors] = useState<[string, string, string]>([
    "#1A1816",
    "#1A1816",
    "#1A1816",
  ]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const SPREAD_FACTOR = isMobile ? SPREAD_FACTOR_MOBILE : SPREAD_FACTOR_DESKTOP;
  const SPREAD_SCALE = isMobile ? SPREAD_SCALE_MOBILE : SPREAD_SCALE_DESKTOP;

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setStage(4);
      setPhase("converge");
      return;
    }
    // Kick off entrance one tick after mount so the transition runs.
    const enter = window.setTimeout(() => setPhase("spread"), 30);
    const timers = [
      window.setTimeout(() => {
        setStage(1);
        setPhase("converge");
      }, TIMING.toConverge),
      window.setTimeout(() => setStage(2), TIMING.toFlipGrow),
      window.setTimeout(() => setStage(3), TIMING.toStack),
      window.setTimeout(() => setStage(4), TIMING.toLoop),
    ];
    return () => {
      window.clearTimeout(enter);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  useEffect(() => {
    if (stage < 4) return;
    const pickColor = () =>
      COLOR_POOL[Math.floor(Math.random() * COLOR_POOL.length)];
    const tick = () => {
      setRowOp([
        0.15 + Math.random() * 0.7,
        0.2 + Math.random() * 0.7,
        0.3 + Math.random() * 0.7,
      ]);
      setRowColors([pickColor(), pickColor(), pickColor()]);
    };
    tick();
    const interval = window.setInterval(tick, 2800);
    return () => window.clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  const row1Op = stage >= 4 ? rowOp[0] : stage >= 1 ? 0.3 : 1;
  const row2Op = stage >= 4 ? rowOp[1] : stage >= 3 ? 0.6 : 0;
  const row3Op = stage >= 4 ? rowOp[2] : stage >= 3 ? 1.0 : 0;

  const rowBase: CSSProperties = {
    display: "block",
    width: "var(--row-w)",
    height: "auto",
  };

  const compositeTransform =
    stage >= 2
      ? "translateY(0) rotateX(720deg)"
      : `translateY(${CENTER_TRANSLATE_Y}) rotateX(0deg)`;

  return (
    <section
      aria-label="Curaggi logo animation"
      style={
        {
          position: "relative",
          width: "100%",
          // Two heights need to fit: the stacked-rows layout, and the
          // spread state where row 1 is translated down by ~33vh. We
          // take the max so neither gets clipped on tall portrait
          // viewports nor wide landscape ones.
          minHeight:
            "max(calc(80px + 3vh + min(92vw, 100vh) / 3.5714 * 2.56 + 4vh), calc(40vh + min(92vw, 100vh) / 3.5714 + 6vh))",
          overflow: "hidden",
          background: "#ffffff",
          ["--row-w" as string]: ROW_WIDTH,
          ["--row-h" as string]: ROW_HEIGHT,
        } as CSSProperties
      }
      className="curaggi-logo-anim"
    >
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
        {/* Row 1 — composite of 7 letter paths from logo.svg.
            At stage 0 each letter is offset/scaled to spread positions;
            at stage 1+ they snap back to the natural logo layout, so the
            row 1 result is pixel-identical to logo.svg. */}
        <div
          style={{
            width: "var(--row-w)",
            transformOrigin: "center center",
            transform: compositeTransform,
            opacity: stage >= 4 ? row1Op : 1,
            color: rowColors[0],
            transition:
              "transform 0.65s cubic-bezier(0.45, 0.05, 0.2, 1), opacity 0.35s ease, color 1.6s ease",
            willChange: "transform, opacity",
            backfaceVisibility: "visible",
          }}
        >
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            preserveAspectRatio="xMidYMid meet"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              overflow: "visible",
            }}
          >
            {LETTERS.map((l, i) => {
              const cx = l.x + l.w / 2;
              const offset = (cx - VB_W / 2) * SPREAD_FACTOR;
              const spreadTf = `translate(${offset}px, 0) scale(${SPREAD_SCALE})`;
              const transform =
                phase === "hidden"
                  ? `${spreadTf} rotateZ(-180deg)`
                  : phase === "spread"
                  ? `${spreadTf} rotateZ(0deg)`
                  : "translate(0,0) scale(1) rotateZ(0deg)";
              const opacity = phase === "hidden" ? 0 : 1;
              const transitionDelay =
                phase === "converge" ? "0s" : `${i * 0.07}s`;
              // Anchor each letter's scale/rotate origin to the shared
              // baseline (y = 141 in viewBox units) so the bottoms of
              // u / r / a / i / C and the body bottom of g all line up
              // when the spread scale is applied.
              const BASELINE_Y = 141;
              const originX = cx - l.x;
              const originY = BASELINE_Y - l.y;
              return (
                <g
                  key={i}
                  className="logo-letter"
                  style={
                    {
                      transformBox: "fill-box",
                      transformOrigin: `${originX}px ${originY}px`,
                      transform,
                      opacity,
                      transition:
                        "transform 0.7s cubic-bezier(0.2,0.8,0.2,1), opacity 0.35s ease",
                      transitionDelay,
                    } as CSSProperties
                  }
                >
                  <path d={l.d} fill="currentColor" />
                </g>
              );
            })}
          </svg>
        </div>

        {stage >= 3 && (
          <>
            <div
              aria-hidden
              style={{
                ...rowBase,
                marginTop: ROW_OVERLAP,
                opacity: row2Op,
                color: rowColors[1],
                transition: "opacity 2.4s ease, color 1.6s ease",
                animation: "curaggi-row-in 0.45s both",
              }}
            >
              <LogoStaticSvg />
            </div>
            <div
              aria-hidden
              style={{
                ...rowBase,
                marginTop: ROW_OVERLAP,
                opacity: row3Op,
                color: rowColors[2],
                transition: "opacity 2.4s ease 0.2s, color 1.6s ease",
                animation: "curaggi-row-in 0.45s 0.2s both",
              }}
            >
              <LogoStaticSvg />
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes curaggi-row-in {
          from { opacity: 0; }
        }
        @media (max-width: 767px) {
          .curaggi-logo-anim {
            min-height: max(calc(80px + 3vh + min(92vw, 100vh) / 3.5714 * 2.56 + 4vh), calc(40vh + min(92vw, 100vh) / 3.5714 + 6vh)) !important;
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
