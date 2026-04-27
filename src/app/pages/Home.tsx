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
        title="爆速プロトタイピング × AI活用 UXデザイン"
        description="動くプロトタイプを最短2週間で形にし、意思決定と改善を高速化する UXデザイン × AI活用の専門スタジオ。あきらめなくていい世界をつくる。"
        path="/"
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
