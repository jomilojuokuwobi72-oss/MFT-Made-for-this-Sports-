"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { useRef as useThreeRef, useEffect as useThreeEffect } from "react";
import * as THREE from "three";
import { ChevronRight } from "lucide-react";
import { Bounded } from "@/components/ui/Bounded";

// ── 3D Whistle ────────────────────────────────────────────────────────────────
function WhistleModel({
  scrollProgress,
  panelIndex,
}: {
  scrollProgress: React.MutableRefObject<number>;
  panelIndex: React.MutableRefObject<number>;
}) {
  const groupRef = useThreeRef<THREE.Group>(null);
  const currentX = useThreeRef(2.5);
  const { scene } = useGLTF("/models/whistle.glb");

  // X targets per panel — camera z=5 fov=45, visible half-width ≈ 2.07 units
  const TARGETS = [2.5, -2.5, 2.5, -2.5];

  useThreeEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({
          color: new THREE.Color("#FF5500"),
          roughness: 0.12,
          metalness: 0.92,
          envMapIntensity: 2.5,
        });
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const targetX = TARGETS[panelIndex.current] ?? 2.5;
    currentX.current = THREE.MathUtils.lerp(currentX.current, targetX, delta * 3.5);

    groupRef.current.position.x = currentX.current;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.06;
    groupRef.current.rotation.y = scrollProgress.current * Math.PI * 10;
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.55) * 0.03;
  });

  return (
    <group ref={groupRef} scale={[2.0, 2.0, 2.0]}>
      <primitive object={scene} />
    </group>
  );
}

// ── Fixed canvas — fully escapes all parent constraints ───────────────────────
function FixedCanvas({
  scrollProgress,
  panelIndex,
  sectionRef,
}: {
  scrollProgress: React.MutableRefObject<number>;
  panelIndex: React.MutableRefObject<number>;
  sectionRef: React.RefObject<HTMLDivElement>;
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const scroller = document.getElementById("main-scroll");
    const section = sectionRef.current;
    if (!scroller || !section) return;

    // Only render canvas while section is visible — hide outside to save GPU
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { root: scroller, rootMargin: "200px 0px" }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [sectionRef]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,                  // 0 0 0 0 — true 100vw × 100vh
        zIndex: 15,
        pointerEvents: "none",
        // NO max-width, NO padding, NO overflow — raw viewport
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse 45% 55% at 75% 55%, rgba(255,85,0,0.09) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 6, 4]} intensity={1.7} color="#ffffff" />
        <directionalLight position={[-4, 2, 2]} intensity={0.7} color="#FF6622" />
        <pointLight position={[0, -3, 2]} intensity={0.5} color="#7000FF" />
        <Environment preset="studio" />
        <WhistleModel scrollProgress={scrollProgress} panelIndex={panelIndex} />
      </Canvas>
    </div>
  );
}

// ── Panels ────────────────────────────────────────────────────────────────────
const panels = [
  {
    tag: "App In Development",
    headline: ["Next Level", "Platform."],
    body: "We're building the platform that helps players get seen. Track your stats, build a verified profile, and show consistent growth over time.",
    cta: { label: "Join Waitlist", href: "#waitlist" },
    whistleOnRight: true,
  },
  {
    tag: "01 — Player Profiles",
    headline: ["Verified.", "Trusted."],
    body: "A clean profile scouts can actually trust. Highlight key stats, position, physical metrics — all in one place.",
    cta: null,
    whistleOnRight: false,
  },
  {
    tag: "02 — Stats Tracking",
    headline: ["Track Every", "Rep."],
    body: "Log matches, training sessions, and key performance indicators. Watch your progress compound week by week.",
    cta: null,
    whistleOnRight: true,
  },
  {
    tag: "03 — Discovery",
    headline: ["Be Impossible", "To Ignore."],
    body: "Connect with scouts, coaches, and clubs actively looking for your exact profile. Your talent, amplified.",
    cta: { label: "Get Early Access", href: "#waitlist" },
    whistleOnRight: false,
  },
];

export default function News() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);
  const panelIndex = useRef(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const scroller = document.getElementById("main-scroll");
    const section = sectionRef.current;
    if (!scroller || !section) return;

    ScrollTrigger.create({
      trigger: section,
      scroller,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => { scrollProgress.current = self.progress; },
    });

    panels.forEach((_, i) => {
      const panelEl = section.querySelectorAll(".news-panel")[i];
      if (!panelEl) return;
      ScrollTrigger.create({
        trigger: panelEl,
        scroller,
        start: "top 55%",
        onEnter: () => { panelIndex.current = i; },
        onEnterBack: () => { panelIndex.current = i; },
      });
    });

    section.querySelectorAll(".news-panel").forEach((panel) => {
      const tag = panel.querySelector(".panel-tag");
      const words = panel.querySelectorAll(".panel-word");
      const body = panel.querySelector(".panel-body");
      const cta = panel.querySelector(".panel-cta");

      gsap.set([tag, ...Array.from(words), body, cta].filter(Boolean), { y: 28, opacity: 0 });
      const st = { trigger: panel, scroller, start: "top 65%", toggleActions: "play none none reverse" as const };

      if (tag) gsap.to(tag, { y: 0, opacity: 1, duration: 0.55, ease: "power3.out", scrollTrigger: st });
      if (words.length) gsap.to(words, { y: 0, opacity: 1, stagger: 0.07, duration: 0.85, ease: "power4.out", delay: 0.1, scrollTrigger: st });
      if (body) gsap.to(body, { y: 0, opacity: 1, duration: 0.65, ease: "power2.out", delay: 0.32, scrollTrigger: st });
      if (cta) gsap.to(cta, { y: 0, opacity: 1, duration: 0.55, ease: "power2.out", delay: 0.52, scrollTrigger: st });
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <Bounded
      as="section"
      id="news"
      ref={sectionRef}
      className="relative bg-brand-black text-white !px-0"
      style={{ minHeight: `${panels.length * 100}vh` }}
    >
      {/* Corner labels — inside bounded, just cosmetic */}
      <div className="sticky top-0 pointer-events-none" style={{ height: "100vh", zIndex: 5 }}>
        <div className="absolute top-10 inset-x-0 flex justify-between px-10">
          <span className="font-mono text-[10px] text-white/20 tracking-[0.3em] uppercase">MFT Platform</span>
          <span className="font-mono text-[10px] text-white/20 tracking-[0.3em] uppercase">In Development</span>
        </div>
      </div>

      {/*
        Canvas is position:fixed — raw 100vw × 100vh.
        Zero parent inheritance. Zero clipping. Zero max-width.
        IntersectionObserver mounts/unmounts it only while section is on screen.
      */}
      <FixedCanvas
        scrollProgress={scrollProgress}
        panelIndex={panelIndex}
        sectionRef={sectionRef}
      />

      {/* Content panels — z-index higher than fixed canvas (zIndex:15) */}
      <div
        className="relative"
        style={{ marginTop: "-100vh", zIndex: 20 }}
      >
        {panels.map((panel, i) => (
          <div
            key={i}
            className="news-panel relative flex items-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="w-full grid grid-cols-2" style={{ minHeight: "100vh" }}>
              {panel.whistleOnRight ? (
                <>
                  <div className="flex flex-col justify-center px-12 py-28 lg:px-16">
                    <PanelText panel={panel} />
                  </div>
                  <div />
                </>
              ) : (
                <>
                  <div />
                  <div className="flex flex-col justify-center px-12 py-28 lg:px-16">
                    <PanelText panel={panel} />
                  </div>
                </>
              )}
            </div>

            <span className="absolute bottom-10 right-10 font-mono text-[9px] text-white/15 tracking-[0.25em]">
              0{i + 1} / 04
            </span>
          </div>
        ))}
      </div>
    </Bounded>
  );
}

function PanelText({ panel }: { panel: typeof panels[0] }) {
  return (
    <>
      <div className="panel-tag mb-6">
        <span className="inline-block font-mono text-xs text-brand-violet border border-brand-violet/35 rounded-full px-4 py-1.5 tracking-[0.2em] uppercase">
          {panel.tag}
        </span>
      </div>

      <h2 className="font-black uppercase tracking-tighter leading-[0.88] text-5xl md:text-6xl xl:text-7xl mb-8">
        {panel.headline.map((line, li) => (
          <span key={li} className="block">
            {line.split(" ").map((word, wi) => (
              <span key={wi} className="panel-word inline-block overflow-hidden mr-[0.12em] last:mr-0">
                <span className="inline-block">{word}</span>
              </span>
            ))}
          </span>
        ))}
      </h2>

      <p className="panel-body text-base md:text-lg text-white/50 leading-relaxed mb-10 max-w-sm font-medium">
        {panel.body}
      </p>

      {panel.cta && (
        <div className="panel-cta">
          <a
            href={panel.cta.href}
            className="group inline-flex items-center gap-3 rounded-full bg-[#FF5500] px-8 py-4 text-sm font-black uppercase tracking-widest text-white hover:scale-105 active:scale-95 transition-transform shadow-[0_0_30px_rgba(255,85,0,0.28)]"
          >
            {panel.cta.label}
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      )}
    </>
  );
}