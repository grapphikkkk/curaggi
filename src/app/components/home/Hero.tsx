import { Link } from "react-router";
import { useState, useEffect } from "react";

export function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        paddingTop: "80px",
        paddingBottom: "var(--space-20)",
        background: "#ffffff",
        color: "#0A0A0B",
      }}
    >
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
        }}
      >
        {/* VISION — giant typography */}
        <div style={{ marginTop: isMobile ? "80px" : "120px" }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-xs)",
              fontWeight: 600,
              letterSpacing: "var(--tracking-wider)",
              textTransform: "uppercase",
              marginBottom: "var(--space-4)",
              color: "#0A0A0B",
            }}
          >
            — Vision
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display), var(--font-jp)",
              fontSize: "clamp(3rem, 13vw, 11rem)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              color: "#0A0A0B",
              marginBottom: "var(--space-16)",
            }}
          >
            あきらめなくていい
            <br />
            世界をつくる。
          </h1>
        </div>

        {/* MISSION */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: "var(--space-12)",
            marginBottom: "var(--space-20)",
            alignItems: "start",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-xs)",
                fontWeight: 600,
                letterSpacing: "var(--tracking-wider)",
                textTransform: "uppercase",
                marginBottom: "var(--space-4)",
                color: "#0A0A0B",
              }}
            >
              — Mission
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display), var(--font-jp)",
                fontSize: "clamp(2rem, 6vw, 4rem)",
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "#0A0A0B",
              }}
            >
              選択肢と勇気を
              <br />
              デザインする。
            </h2>
          </div>

          <p
            style={{
              fontFamily: "var(--font-body), var(--font-jp)",
              fontSize: "var(--text-base)",
              color: "#44444F",
              lineHeight: 1.9,
              maxWidth: "520px",
              paddingTop: isMobile ? 0 : "var(--space-8)",
            }}
          >
            知らず知らずのうちに、選択肢を失ってしまう場面がある。
            <br />
            <br />
            日常の中では、使いにくさや複雑さという壁によって、本来享受できたはずの体験にたどり着けず、その手前で諦めてしまうことがある。
            さらに視野を広げれば、環境や立場、置かれた状況によって、そもそも選択肢の存在を知らないまま、未来の幅を狭めてしまう人がいる。
            <br />
            <br />
            デザインの力で、本来ひらかれていたはずの選択肢を取り戻し、自ら選び取れる可能性を増やしていきたい。選択肢を持つことが、一歩先へ進む勇気になる。
          </p>
        </div>

        {/* CTA */}
        <div>
          <Link
            to="/service"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-4)",
              fontFamily: "var(--font-display), var(--font-jp)",
              fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
              fontWeight: 600,
              color: "#0A0A0B",
              textDecoration: "none",
              borderBottom: "2px solid #0A0A0B",
              paddingBottom: "var(--space-2)",
              letterSpacing: "-0.01em",
              transition: "opacity var(--duration-fast) var(--ease-out)",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.55")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          >
            View Services
            <span aria-hidden="true" style={{ fontSize: "1.2em" }}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
