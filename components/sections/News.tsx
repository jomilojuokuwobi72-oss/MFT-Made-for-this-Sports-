"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { useRef as useThreeRef, useEffect as useThreeEffect } from "react";
import * as THREE from "three";
import { ChevronRight } from "lucide-react";

// ── Whistle ───────────────────────────────────────────────────────────────────
function WhistleModel({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const groupRef = useThreeRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/whistle.glb");

  useThreeEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({
          color: new THREE.Color("#FF5500"),
          roughness: 0.12,
          metalness: 0.92,
          envMapIntensity: 2.2,
        });
      }
    });
  }, [scene]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const p = scrollProgress.current;
    const idleY = Math.sin(state.clock.elapsedTime * 0.8) * 0.07;
    const idleTilt = Math.sin(state.clock.elapsedTime * 0.5) * 0.03;
    const spinY = p * Math.PI * 10; // continuous spin across all panels

    groupRef.current.position.y = idleY;
    groupRef.current.rotation.y = spinY;
    groupRef.current.rotation.z = idleTilt;
  });

  return (
    <group ref={groupRef} scale={[2.4, 2.4, 2.4]}>
      <primitive object={scene} />
    </group>
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
  const canvasColRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const scroller = document.getElementById("main-scroll");
    const section = sectionRef.current;
    const canvasCol = canvasColRef.current;
    if (!scroller || !section || !canvasCol) return;

    // Track overall scroll progress for whistle spin
    ScrollTrigger.create({
      trigger: section,
      scroller,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => { scrollProgress.current = self.progress; },
    });

    // Slide canvas col left ↔ right as each panel enters
    panels.forEach((panel, i) => {
      const panelEl = section.querySelectorAll(".news-panel")[i];
      if (!panelEl) return;

      ScrollTrigger.create({
        trigger: panelEl,
        scroller,
        start: "top 55%",
        onEnter: () => gsap.to(canvasCol, { left: panel.whistleOnRight ? "40%" : "-10%", duration: 0.8, ease: "power3.inOut" }),
        onEnterBack: () => gsap.to(canvasCol, { left: panel.whistleOnRight ? "40%" : "-10%", duration: 0.8, ease: "power3.inOut" }),
      });
    });

    // Per-panel text reveals
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
    // Full bleed — NO Bounded wrapper so nothing clips
    <section
      id="news"
      ref={sectionRef}
      className="relative bg-brand-black text-white w-screen overflow-visible"
      style={{ minHeight: `${panels.length * 100}vh` }}
    >
      {/* ── Sticky layer: canvas on exactly one half ── */}
      <div
        className="sticky top-0 w-full pointer-events-none z-10"
        style={{ height: "100vh", overflow: "visible" }}
      >
        {/* Corner labels */}
        <div className="absolute top-10 inset-x-0 flex justify-between px-12 z-30 pointer-events-none">
          <span className="font-mono text-[10px] text-white/20 tracking-[0.3em] uppercase">MFT Platform</span>
          <span className="font-mono text-[10px] text-white/20 tracking-[0.3em] uppercase">In Development</span>
        </div>

        {/* Canvas occupies 60% but centered in its half so whistle can bleed */}
        <div
          ref={canvasColRef}
          className="absolute top-0 bottom-0"
          style={{ left: "40%", width: "60%", willChange: "left", overflow: "visible" }}
        >
          {/* Glow behind whistle */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 90% 70% at 50% 55%, rgba(255,85,0,0.10) 0%, transparent 70%)" }}
          />

          <Canvas
            camera={{ position: [0, 0, 5], fov: 42 }}
            gl={{ antialias: true, alpha: true }}
            style={{ width: "100%", height: "100%", display: "block" }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 6, 4]} intensity={1.6} color="#ffffff" />
            <directionalLight position={[-4, 2, 2]} intensity={0.7} color="#FF6622" />
            <pointLight position={[0, -3, 2]} intensity={0.5} color="#7000FF" />
            <Environment preset="studio" />
            <WhistleModel scrollProgress={scrollProgress} />
          </Canvas>
        </div>
      </div>

      {/* ── Content panels (z-20 so text is above canvas) ── */}
      <div className="relative z-20" style={{ marginTop: "-100vh" }}>
        {panels.map((panel, i) => (
          <div
            key={i}
            className="news-panel relative flex items-center min-h-screen w-full"
          >
            {/* True full-width grid — padding only on the text side */}
            <div className="w-full grid grid-cols-2" style={{ minHeight: "100vh" }}>

              {panel.whistleOnRight ? (
                <>
                  {/* Text LEFT */}
                  <div className="flex flex-col justify-center pl-14 pr-10 py-28 lg:pl-20 lg:pr-12">
                    <PanelText panel={panel} />
                  </div>
                  {/* Empty RIGHT — canvas is here */}
                  <div />
                </>
              ) : (
                <>
                  {/* Empty LEFT — canvas is here */}
                  <div />
                  {/* Text RIGHT */}
                  <div className="flex flex-col justify-center pl-10 pr-14 py-28 lg:pl-12 lg:pr-20">
                    <PanelText panel={panel} />
                  </div>
                </>
              )}
            </div>

            {/* Panel counter */}
            <span className="absolute bottom-10 right-12 font-mono text-[9px] text-white/15 tracking-[0.25em]">
              0{i + 1} / 04
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Reusable panel text ───────────────────────────────────────────────────────
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