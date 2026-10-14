import Intro from "@/components/Intro";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Manifesto from "@/components/Manifesto";
import Categories from "@/components/Categories";
import SlabGallery from "@/components/SlabGallery";
import Catalogue from "@/components/Catalogue";
import FinishLab from "@/components/FinishLab";
import Spaces from "@/components/Spaces";
import Builders from "@/components/Builders";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="grain">
      <Intro />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Manifesto />
        <Categories />
        <SlabGallery />
        <Catalogue />
        <FinishLab />
        <Spaces />
        <Builders />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
