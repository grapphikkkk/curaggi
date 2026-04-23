import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { LogoAnimation } from "../components/home/LogoAnimation";
import { Hero } from "../components/home/Hero";
import { ShortContext } from "../components/home/ShortContext";

export function Home() {
  return (
    <div>
      <Header />
      <main>
        <LogoAnimation />
        <Hero />
        <ShortContext />
      </main>
      <Footer />
    </div>
  );
}
