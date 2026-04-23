import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CompanyInfo } from "../components/company/CompanyInfo";
import { ProfileSection } from "../components/company/ProfileSection";

export function Company() {
  return (
    <div>
      <Header />
      <main style={{ paddingTop: "80px", background: "#ffffff", color: "#0A0A0B" }}>
        <section
          style={{
            paddingTop: "var(--space-20)",
            paddingBottom: "var(--space-16)",
          }}
        >
          <div className="container">
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-xs)",
                fontWeight: 600,
                letterSpacing: "var(--tracking-wider)",
                textTransform: "uppercase",
                marginBottom: "var(--space-4)",
              }}
            >
              — Company
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display), var(--font-jp)",
                fontSize: "clamp(3rem, 14vw, 12rem)",
                fontWeight: 800,
                lineHeight: 0.9,
                letterSpacing: "-0.05em",
                marginBottom: "var(--space-8)",
              }}
            >
              Company
            </h1>
            <p
              style={{
                fontFamily: "var(--font-body), var(--font-jp)",
                fontSize: "var(--text-lg)",
                color: "#44444F",
                lineHeight: 1.9,
                maxWidth: "720px",
              }}
            >
              会社のご案内と、代表プロフィールをご紹介します。
            </p>
          </div>
        </section>

        <CompanyInfo />
        <ProfileSection />
      </main>
      <Footer />
    </div>
  );
}
