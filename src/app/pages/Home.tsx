import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Hero } from "../components/home/Hero";
import { ShortContext } from "../components/home/ShortContext";
import { BusinessSummary } from "../components/home/BusinessSummary";

export function Home() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <ShortContext />
        <BusinessSummary />
      </main>
      <Footer />
    </div>
  );
}
