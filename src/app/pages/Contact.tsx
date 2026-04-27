import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Seo } from "../components/Seo";
import { ContactForm } from "../components/contact/ContactForm";

export function Contact() {
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
