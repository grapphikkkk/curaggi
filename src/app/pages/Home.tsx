import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Seo } from "../components/Seo";
import { LogoAnimation } from "../components/home/LogoAnimation";
import { Hero } from "../components/home/Hero";
import { Highlights } from "../components/home/Highlights";
import { ShortContext } from "../components/home/ShortContext";

export function Home() {
  return (
    <div>
      <Seo
        title="Curaggi クラッヂ | あきらめない世界をつくる"
        description="AI活用とUXデザインで意思決定とカイゼンを最速2週間で。自社プロダクトも展開。"
        path="/"
        rawTitle
      />
      <Header />
      <main>
        <LogoAnimation />
        <Hero />
        <Highlights />
        <ShortContext />
      </main>
      <Footer />
    </div>
  );
}
