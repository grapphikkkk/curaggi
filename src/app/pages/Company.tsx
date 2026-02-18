import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CompanyInfo } from "../components/company/CompanyInfo";
import { ProfileSection } from "../components/company/ProfileSection";

export function Company() {
  return (
    <div>
      <Header />
      <main style={{ paddingTop: "80px" }}>
        {/* Page Header */}
        <section className="section">
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "var(--space-16)" }}>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 6vw, 3rem)",
                  fontWeight: 700,
                  color: "var(--neutral-900)",
                  letterSpacing: "var(--tracking-tight)",
                  marginBottom: "var(--space-4)",
                }}
              >
                Company
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-body), var(--font-jp)",
                  fontSize: "var(--text-lg)",
                  color: "var(--neutral-600)",
                  lineHeight: "var(--leading-relaxed)",
                }}
              >
                選択肢と勇気をデザインする
              </p>
            </div>
          </div>
        </section>

        <CompanyInfo />
        <ProfileSection />
      </main>
      <Footer />
    </div>
  );
}
