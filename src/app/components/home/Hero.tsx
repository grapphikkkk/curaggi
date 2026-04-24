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

function DotRow({
  count = 48,
  color = "var(--neutral-900)",
  size = 10,
  stagger = 0.025,
}: {
  count?: number;
  color?: string;
  size?: number;
  stagger?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 var(--space-6)",
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            background: color,
            display: "block",
            opacity: inView ? 1 : 0,
            transform: inView ? "scale(1)" : "scale(0.2)",
            transition: `opacity 0.25s ease ${i * stagger}s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1) ${i * stagger}s`,
          }}
        />
      ))}
    </div>
  );
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
        padding: "0 0.08em",
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
    "日常の中では、使いにくさや複雑さという壁によって、",
    "本来享受できたはずの体験にたどり着けず、",
    "その手前で諦めてしまうことがあります。",
  ],
  [
    "さらに視野を広げれば、",
    "環境や立場、置かれた状況によって、",
    "そもそも選択肢の存在を知らないまま、",
    "未来の幅を狭めてしまう人がいます。",
  ],
  [
    "デザインの力で、",
    "本来ひらかれていたはずの選択肢を取り戻し、",
    "自ら選び取れる可能性を増やしていきたい。",
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
          paddingTop: "var(--space-12)",
          paddingBottom: "var(--space-12)",
        }}
      >
        <DotRow />

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

        <DotRow />
      </section>

      {/* Description section with teal background and white markers */}
      <section
        style={{
          background: "var(--fiducia-teal)",
          paddingTop: "var(--space-24)",
          paddingBottom: "var(--space-24)",
        }}
      >
        <div className="container">
          <div
            style={{
              fontFamily: "var(--font-display), var(--font-jp)",
              fontSize: "clamp(18px, 3.3vw, 45px)",
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
                      <MarkerLine marker="#ffffff" delay={delay}>
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
