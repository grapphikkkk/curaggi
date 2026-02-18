import { Link } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function ThankYou() {
  return (
    <div>
      <Header />
      <main style={{ paddingTop: "80px" }}>
        <section
          className="section"
          style={{
            minHeight: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="container" style={{ maxWidth: "640px", textAlign: "center" }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--curaggi-teal), var(--curaggi-blue))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto var(--space-8)",
              }}
              aria-hidden="true"
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="white" strokeWidth="3">
                <path d="M10 20l8 8 16-16" />
              </svg>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display), var(--font-jp)",
                fontSize: "clamp(1.875rem, 5vw, 2.25rem)",
                fontWeight: 700,
                color: "var(--neutral-900)",
                letterSpacing: "var(--tracking-tight)",
                marginBottom: "var(--space-4)",
              }}
            >
              お問い合わせありがとうございます
            </h1>

            <p
              style={{
                fontFamily: "var(--font-body), var(--font-jp)",
                fontSize: "var(--text-lg)",
                color: "var(--neutral-600)",
                lineHeight: "var(--leading-relaxed)",
                marginBottom: "var(--space-10)",
              }}
            >
              送信が完了しました。
              <br />
              内容を確認の上、担当者よりご連絡させていただきます。
            </p>

            <Link to="/" className="btn btn--coral btn--lg">
              ホームに戻る
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
