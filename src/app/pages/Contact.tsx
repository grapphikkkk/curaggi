import { useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Seo } from "../components/Seo";
import { ContactForm } from "../components/contact/ContactForm";
import { CONTACT_URL } from "../config";

export function Contact() {
  // The on-site form has been retired in favor of an external Google
  // Form. Anyone landing on /contact via an old link is forwarded.
  useEffect(() => {
    window.location.replace(CONTACT_URL);
  }, []);

  return (
    <div>
      <Seo
        title="お問い合わせ"
        description="プロトタイピング支援・AI活用セミナー・自社サービスに関するお問い合わせはこちらから。"
        path="/contact"
      />
      <Header />
      <main style={{ paddingTop: "80px" }}>
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
