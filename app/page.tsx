"use client";

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Vision from "@/components/sections/Vision";
import ImageStack from "@/components/sections/ImageStack";
import Customizer from "@/components/sections/Customizer";
// import CustomizerButton from "@/components/ui/CustomizerButton";
import About from "@/components/sections/About";
import News from "@/components/sections/News";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
// import SceneContainer from "@/components/3d/SceneContainer";
import { useGLTF } from "@react-three/drei";

// Preload 3D model at page load so it's cached before user scrolls to News
useGLTF.preload("/models/whistle.glb");

export default function HomePage() {
  return (
    <main className="absolute bg-black inset-0 text-white selection:bg-brand-violet selection:text-white">
      {/* 3D Global Layer (Stationary Background) */}
      {/* UI Content Layer (Scroller) */}
      {/* Navbar Overlay - Absolute top so it stays fixed to the viewport top but inside the rounded layout */}
      <div className="absolute top-0 left-0 right-0 z-50 pointer-events-auto">
        <Navbar />
      </div>

      {/* UI Content Layer (Scroller) - Must receive pointer events to be scrollable by mouse wheel */}
      <div
        id="main-scroll"
        className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden pointer-events-auto flex flex-col w-full scroll-smooth pt-20"
      >
        <Hero />
        <Vision />
        <ImageStack />

        {/* Sections that obscure the canvas must be pointer-events-auto */}
        <div className="pointer-events-auto relative z-20">
          <About />
          <News />
          <Contact />
          <Footer />
        </div>
      </div>

      {/* Global Slide-Over Customizer */}
      {/* <CustomizerButton /> */}
      <Customizer />
    </main>
  );
}