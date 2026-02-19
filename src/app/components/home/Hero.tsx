import { BackgroundShapes } from "./BackgroundShapes";

export function Hero() {
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
      <BackgroundShapes />

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
              fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
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
            marginBottom: "var(--space-16)",
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
            fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
            color: "var(--neutral-700)",
            lineHeight: "var(--leading-relaxed)",
            maxWidth: "640px",
            margin: "0 auto",
          }}
        >
          生まれや環境によって、選択肢が狭まってしまう人がいる。
          <br />
          Curaggiはデザインの力で、選べる未来と踏み出す勇気を増やします。
        </p>
      </div>
    </section>
  );
}
