import { ParticleCanvas } from "./ParticleCanvas";
import { useState, useEffect } from "react";

export function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        paddingTop: "80px",
        zIndex: 2,
      }}
    >
      <ParticleCanvas />

      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: "var(--space-8)",
        }}
      >
        {/* Vision */}
        <div
          style={{
            marginTop: "150px",
            marginBottom: "var(--space-12)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-xs)",
              fontWeight: 600,
              color: "var(--a11y-coral)",
              letterSpacing: "var(--tracking-wider)",
              textTransform: "uppercase",
              marginBottom: "var(--space-4)",
            }}
          >
            Vision
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display), var(--font-jp)",
              fontSize: isMobile ? "clamp(2rem, 7vw, 3.5rem)" : "clamp(2.5rem, 8vw, 4.5rem)",
              fontWeight: 700,
              color: "var(--neutral-900)",
              lineHeight: "var(--leading-tight)",
              letterSpacing: "var(--tracking-tight)",
              marginBottom: "var(--space-8)",
            }}
          >
            あきらめなくていい
            <br />
            世界をつくる
          </h1>
        </div>

        {/* Mission */}
        <div
          style={{
            marginBottom: "var(--space-24)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-xs)",
              fontWeight: 600,
              color: "var(--a11y-teal)",
              letterSpacing: "var(--tracking-wider)",
              textTransform: "uppercase",
              marginBottom: "var(--space-4)",
            }}
          >
            Mission
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display), var(--font-jp)",
              fontSize: "clamp(1.5rem, 5vw, 2.25rem)",
              fontWeight: 600,
              color: "var(--neutral-800)",
              lineHeight: "var(--leading-snug)",
              letterSpacing: "var(--tracking-tight)",
              marginBottom: "var(--space-6)",
            }}
          >
            選択肢と勇気をデザインする
          </h2>
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-body), var(--font-jp)",
            fontSize: "16px",
            color: "var(--neutral-700)",
            lineHeight: "var(--leading-relaxed)",
            maxWidth: "640px",
            margin: "0 auto",
            textAlign: "left",
          }}
        >
          知らず知らずのうちに、選択肢を失ってしまう場面がある。<br/><br/>
          日常の中では、使いにくさや複雑さという壁によって、本来享受できたはずの体験にたどり着けず、その手前で諦めてしまうことがある。
          さらに視野を広げれば、環境や立場、置かれた状況によって、そもそも選択肢の存在を知らないまま、未来の幅を狭めてしまう人がいる。<br/><br/> 
          デザインの力で、本来ひらかれていたはずの選択肢を取り戻し、自ら選び取れる可能性を増やしていきたい。選択肢を持つことが、一歩先へ進む勇気になる。 
          
        </p>

        {/* Service Link Button */}
        <div style={{ marginTop: "var(--space-12)", textAlign: "center" }}>
          <a href="/service" className="btn btn--gradient btn--lg">
            事業領域へ
          </a>
        </div>
      </div>
    </section>
  );
}
