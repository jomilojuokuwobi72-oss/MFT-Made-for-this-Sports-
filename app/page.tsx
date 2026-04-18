import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HeroDetails from "@/components/HeroDetails";
import About from "@/components/About";
import Events from "@/components/Events";
import Culture from "@/components/Culture";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />
      <Hero />
      <HeroDetails />
      <Events />
      <Culture />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
