"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Float } from "@react-three/drei";
import { useRef as useThreeRef, useState } from "react";
import * as THREE from "three";
import { Bounded } from "@/components/ui/Bounded";
import { ChevronRight } from "lucide-react";

// ── 3D Whistle Model ─────────────────────────────────────────────────────────
function WhistleModel({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const groupRef = useThreeRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/whistle.glb");

  // Clone and apply orange material
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color("#FF5500"),
          roughness: 0.2,
          metalness: 0.85,
          envMapIntensity: 1.5,
        });
        mesh.castShadow = true;
      }
    });
  }, [scene]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const p = scrollProgress.current; // 0 → 1 across entire section

    // X: left (-4) → center (0) → right (4) → center again (0) → left again (-3)
    // Using a multi-keyframe approach
    let x = 0, y = 0, rotY = 0, rotX = 0;

    if (p < 0.25) {
      // Panel 1: enter from left
      const t = p / 0.25;
      x = gsap.utils.interpolate(-5, -1, t);
      rotY = gsap.utils.interpolate(Math.PI * 2, 0, t); // full spin on entry
      y = Math.sin(t * Math.PI) * 0.3;
    } else if (p < 0.5) {
      // Panel 2: drift right
      const t = (p - 0.25) / 0.25;
      x = gsap.utils.interpolate(-1, 2, t);
      rotY = gsap.utils.interpolate(0, -Math.PI, t); // spin right → left
      y = Math.sin(t * Math.PI) * 0.2;
    } else if (p < 0.75) {
      // Panel 3: sweep left
      const t = (p - 0.5) / 0.25;
      x = gsap.utils.interpolate(2, -2, t);
      rotY = gsap.utils.interpolate(-Math.PI, Math.PI, t); // full spin
      y = Math.sin(t * Math.PI) * 0.25;
    } else {
      // Panel 4: come back center-right
      const t = (p - 0.75) / 0.25;
      x = gsap.utils.interpolate(-2, 0.5, t);
      rotY = gsap.utils.interpolate(0, Math.PI * 0.5, t);
      y = Math.sin(t * Math.PI) * 0.15;
    }

    // Idle float
    const idleFloat = Math.sin(state.clock.elapsedTime * 0.8) * 0.04;
    const idleTilt = Math.sin(state.clock.elapsedTime * 0.6) * 0.05;

    groupRef.current.position.x = x;
    groupRef.current.position.y = y + idleFloat;
    groupRef.current.rotation.y = rotY;
    groupRef.current.rotation.x = idleTilt + rotX;
  });

  return (
    <group ref={groupRef} scale={[2.2, 2.2, 2.2]}>
      <primitive object={scene} />
    </group>
  );
}

// ── Panel content ─────────────────────────────────────────────────────────────
const panels = [
  {
    tag: "App In Development",
    headline: ["Next Level", "Platform."],
    body: "We're building the platform that helps players get seen. Track your stats, build a verified profile, and show consistent growth over time.",
    cta: { label: "Join Waitlist", href: "#waitlist" },
    align: "left" as const,
  },
  {
    tag: "01 — Player Profiles",
    headline: ["Verified.", "Trusted."],
    body: "A clean profile scouts can actually trust. Highlight key stats, position, physical metrics — all in one place.",
    cta: null,
    align: "right" as const,
  },
  {
    tag: "02 — Stats Tracking",
    headline: ["Track Every", "Rep."],
    body: "Log matches, training sessions, and key performance indicators. Watch your progress compound week by week.",
    cta: null,
    align: "left" as const,
  },
  {
    tag: "03 — Discovery",
    headline: ["Be", "Impossible\nTo Ignore."],
    body: "Connect with scouts, coaches, and clubs that are actively looking for your exact profile. Your talent, amplified.",
    cta: { label: "Get Early Access", href: "#waitlist" },
    align: "right" as const,
  },
];

export default function News() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const scroller = document.getElementById("main-scroll");
    const section = sectionRef.current;
    if (!scroller || !section) return;

    // ── Pin the canvas as we scroll through panels ──────────────────────────
    ScrollTrigger.create({
      trigger: section,
      scroller,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });

    // ── Panel text reveals ───────────────────────────────────────────────────
    const panelEls = section.querySelectorAll(".news-panel");
    panelEls.forEach((panel) => {
      const words = panel.querySelectorAll(".panel-word");
      const body = panel.querySelector(".panel-body");
      const cta = panel.querySelector(".panel-cta");

      gsap.set([words, body, cta].filter(Boolean), { y: 40, opacity: 0 });

      gsap.to(words, {
        y: 0, opacity: 1,
        stagger: 0.06,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: panel,
          scroller,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      if (body) gsap.to(body, {
        y: 0, opacity: 1, duration: 0.7, ease: "power2.out", delay: 0.2,
        scrollTrigger: { trigger: panel, scroller, start: "top 70%", toggleActions: "play none none reverse" },
      });

      if (cta) gsap.to(cta, {
        y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.4,
        scrollTrigger: { trigger: panel, scroller, start: "top 70%", toggleActions: "play none none reverse" },
      });
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <Bounded
      as="section"
      id="news"
      ref={sectionRef}
      className="relative bg-brand-black text-white overflow-visible"
      style={{ minHeight: `${panels.length * 100}vh` }}
    >

      {/* ── Sticky canvas — whistle lives here ── */}
      <div
        ref={canvasWrapRef}
        className="sticky top-0 w-full pointer-events-none z-20"
        style={{ height: "100vh" }}
      >
        {/* Ambient glow behind whistle */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full blur-[120px]"
            style={{ background: "radial-gradient(circle, rgba(255,85,0,0.12) 0%, transparent 70%)" }} />
        </div>

        <Canvas
          camera={{ position: [0, 0, 7], fov: 40 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
          <directionalLight position={[-5, 2, 3]} intensity={0.5} color="#FF5500" />
          <pointLight position={[0, -3, 2]} intensity={0.3} color="#7000FF" />
          <Environment preset="studio" />
          <WhistleModel scrollProgress={scrollProgress} />
        </Canvas>

        {/* Section label top */}
        <div className="absolute top-10 left-0 right-0 flex justify-between px-10 pointer-events-none">
          <span className="font-mono text-xs text-white/25 tracking-[0.3em] uppercase">MFT Platform</span>
          <span className="font-mono text-xs text-white/25 tracking-[0.3em] uppercase">In Development</span>
        </div>
      </div>

      {/* ── Content panels — stacked below, scroll drives them ── */}
      <div className="relative z-10" style={{ marginTop: "-100vh" }}>
        {panels.map((panel, i) => (
          <div
            key={i}
            className="news-panel relative flex items-center min-h-screen px-8 md:px-16 lg:px-24"
            style={{ justifyContent: panel.align === "right" ? "flex-end" : "flex-start" }}
          >
            <div className={`max-w-md lg:max-w-lg ${panel.align === "right" ? "text-right" : "text-left"}`}>

              {/* Tag */}
              <div className="panel-word mb-6">
                <span className="font-mono text-xs text-brand-violet tracking-[0.25em] uppercase border border-brand-violet/30 rounded-full px-4 py-1.5">
                  {panel.tag}
                </span>
              </div>

              {/* Headline — each word is a panel-word */}
              <h2 className="font-black uppercase tracking-tighter leading-[0.88] text-5xl md:text-6xl lg:text-7xl mb-8">
                {panel.headline.map((line, li) => (
                  <span key={li} className="block">
                    {line.split(" ").map((word, wi) => (
                      <span key={wi} className="panel-word inline-block mr-[0.15em] overflow-hidden">
                        <span className="inline-block">{word}</span>
                      </span>
                    ))}
                  </span>
                ))}
              </h2>

              {/* Body */}
              <p className="panel-body text-lg text-white/55 leading-relaxed mb-8 font-medium">
                {panel.body}
              </p>

              {/* CTA */}
              {panel.cta && (
                <a
                  href={panel.cta.href}
                  className="panel-cta group inline-flex items-center gap-3 rounded-full bg-brand-violet px-8 py-4 text-base font-black uppercase tracking-wide text-white transition-transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(112,0,255,0.35)]"
                >
                  {panel.cta.label}
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              )}
            </div>

            {/* Panel number */}
            <div className="absolute bottom-12 right-10 font-mono text-[10px] text-white/15 tracking-[0.2em]">
              0{i + 1} / 04
            </div>
          </div>
        ))}
      </div>
    </Bounded>
  );
}