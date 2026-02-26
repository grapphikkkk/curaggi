import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Hero } from "../components/home/Hero";
import { ShortContext } from "../components/home/ShortContext";

export function Home() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <ShortContext />
      </main>
      <Footer />
    </div>
  );
}
