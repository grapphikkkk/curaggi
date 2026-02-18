import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ContactForm } from "../components/contact/ContactForm";

export function Contact() {
  return (
    <div>
      <Header />
      <main style={{ paddingTop: "80px" }}>
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
