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

type MarkerLineProps = {
  children: React.ReactNode;
  marker: string;
  delay?: number;
  textColor?: string;
};

function MarkerLine({
  children,
  marker,
  delay = 0,
  textColor = "#0A0A0B",
}: MarkerLineProps) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  return (
    <span
      ref={ref}
      style={{
        display: "inline-block",
        color: textColor,
        backgroundImage: `linear-gradient(${marker}, ${marker})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        backgroundSize: inView ? "100% 100%" : "0% 100%",
        padding: 0,
        borderRadius: "5px",
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

type Highlight = {
  bg: string;
  markerColor: string;
  textColor: string;
  tagColor: string;
  tag: string;
  heading: string[];
  body: string[][];
  image: string;
  imageAlt: string;
};

const HIGHLIGHTS: Highlight[] = [
  {
    bg: "var(--visione-purple)",
    markerColor: "#ffffff",
    textColor: "#0A0A0B",
    tagColor: "#ffffff",
    tag: "爆速プロトタイピング支援",
    heading: ["机上の空論に、", "早くおさらば。"],
    body: [
      [
        "パワーポイントの議論だけでは、",
        "新規事業や新機能の合意形成はなかなか進みません。",
      ],
      [
        "ユーザーテストやヒアリングも、",
        "実際に動くプロトタイプがあってこそ",
        "本質的なフィードバックが得られます。",
      ],
      [
        "構想からプロトタイピングまで最短2週間。",
        "発注側の要件イメージを早期に固め、",
        "実装後の「思っていたものと違う」をなくします。",
      ],
    ],
    image: "/images/osaraba.png",
    imageAlt: "Prototype sketchbook",
  },
  {
    bg: "var(--fiducia-teal)",
    markerColor: "#ffffff",
    textColor: "#0A0A0B",
    tagColor: "#0A0A0B",
    tag: "AI活用支援 / AI活用セミナー",
    heading: ["AI時代は設計力。", "つくれるから、", "設計できるへ。"],
    body: [
      [
        "AIで「作れる」はもはや当たり前の時代に。",
        "だからこそ問われるのは、",
        "何を・なぜ・どう作るかという設計力です。",
      ],
      [
        "ユーザー起点の思考とAIを掛け合わせ、",
        "本当に価値あるアウトプットを生み出す",
        "実践的な方法論をお伝えします。",
      ],
    ],
    image: "/images/service-seminar.jpg",
    imageAlt: "Seminar presentation",
  },
  {
    bg: "var(--scintilla-yellow)",
    markerColor: "#ffffff",
    textColor: "#0A0A0B",
    tagColor: "#0A0A0B",
    tag: "自社開発サービス",
    heading: [
      "偶然を設計し、",
      "失われつつあるリアルの",
      "つながりを取りもどす。",
    ],
    body: [
      [
        "オンラインで完結する日常のなかで、",
        "人と人が偶然に出会い、",
        "深く関わる機会は確実に減っています。",
      ],
      [
        "少人数のリアルな体験を自ら企画し、",
        "実装・運用まで自社で手がけることで、",
        "つながりを取りもどすサービスを育てています。",
      ],
    ],
    image: "/images/service-community.jpg",
    imageAlt: "Small group meeting",
  },
];

function HighlightBlock({
  h,
  showTopCurve,
  noBottomPad,
  noTopPad,
}: {
  h: Highlight;
  showTopCurve?: boolean;
  noBottomPad?: boolean;
  noTopPad?: boolean;
}) {
  let counter = 0;
  return (
    <section
      style={{
        position: "relative",
        background: h.bg,
        paddingTop: noTopPad
          ? 0
          : showTopCurve
          ? "clamp(80px, 14vw, 200px)"
          : "var(--space-24)",
        paddingBottom: noBottomPad ? 0 : "var(--space-24)",
        overflow: "hidden",
      }}
    >
      {showTopCurve && (
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "clamp(80px, 14vw, 220px)",
            display: "block",
          }}
        >
          <rect x="0" y="0" width="1440" height="220" fill="var(--fiducia-teal)" />
          <path
            d="M0,120 C240,200 480,40 720,120 C960,200 1200,40 1440,120 L1440,220 L0,220 Z"
            fill="var(--visione-purple)"
          />
        </svg>
      )}

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            position: "relative",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {/* Decorative background image behind heading */}
          <div
            aria-hidden="true"
            className="highlight-image"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "min(46%, 460px)",
              aspectRatio: "4 / 5",
              backgroundImage: `url(${h.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "grayscale(100%) contrast(1.05)",
              opacity: 0.92,
              zIndex: 0,
              pointerEvents: "none",
            }}
          />

          <h2
            className="highlight-heading"
            style={{
              position: "relative",
              zIndex: 1,
              fontFamily: "var(--font-display), var(--font-jp)",
              fontSize: "clamp(40px, 7.5vw, 96px)",
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: h.textColor,
              margin: 0,
              marginBottom: "var(--space-8)",
            }}
          >
            {h.heading.map((line, i) => {
              const delay = counter * 0.08;
              counter += 1;
              return (
                <span key={i}>
                  <MarkerLine
                    marker={h.markerColor}
                    delay={delay}
                    textColor={h.textColor}
                  >
                    {line}
                  </MarkerLine>
                  {i < h.heading.length - 1 && <br />}
                </span>
              );
            })}
          </h2>

          {/* Tag */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              display: "inline-block",
              border: `2px solid ${h.tagColor}`,
              padding: "0.45em 0.9em",
              marginBottom: "var(--space-10)",
              fontFamily: "var(--font-display), var(--font-jp)",
              fontSize: "var(--text-sm)",
              fontWeight: 700,
              color: h.tagColor,
              letterSpacing: "0.02em",
              background: "transparent",
            }}
          >
            {h.tag}
          </div>

          {/* Body */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              fontFamily: "var(--font-display), var(--font-jp)",
              fontSize: "clamp(16px, 2.2vw, 26px)",
              fontWeight: 800,
              lineHeight: 1.7,
              letterSpacing: "-0.005em",
              color: h.textColor,
            }}
          >
            {h.body.map((group, gi) => (
              <p
                key={gi}
                style={{
                  margin: 0,
                  marginBottom: gi < h.body.length - 1 ? "1.2em" : 0,
                }}
              >
                {group.map((line, li) => {
                  const delay = counter * 0.08;
                  counter += 1;
                  return (
                    <span key={li}>
                      <MarkerLine
                        marker={h.markerColor}
                        delay={delay}
                        textColor={h.textColor}
                      >
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
      </div>

      <style>{`
        @media (max-width: 768px) {
          .highlight-image {
            width: 60% !important;
            opacity: 0.35 !important;
          }
        }
      `}</style>
    </section>
  );
}

export function Highlights() {
  return (
    <>
      <HighlightBlock h={HIGHLIGHTS[0]} showTopCurve />
      <HighlightBlock h={HIGHLIGHTS[1]} />
      <HighlightBlock h={HIGHLIGHTS[2]} />
    </>
  );
}
