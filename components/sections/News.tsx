"use client";

import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
  const currentX = useThreeRef(2.2);
  // Slightly inside viewport so model is always fully visible
  const TARGETS = [2.0, -2.0, 2.0, -2.0];
  const { scene } = useGLTF("/models/whistle.glb");

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
    currentX.current = THREE.MathUtils.lerp(
      currentX.current,
      TARGETS[panelIndex.current] ?? 2.2,
      delta * 2.8
    );
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

// ── Portal canvas — renders into document.body, scrolls with section via translateY ─
function WhistlePortal({
  scrollProgress,
  panelIndex,
  wrapperRef,
}: {
  scrollProgress: React.MutableRefObject<number>;
  panelIndex: React.MutableRefObject<number>;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return createPortal(
    <div
      ref={wrapperRef as React.RefObject<HTMLDivElement>}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 15,
        pointerEvents: "none",
        // opacity/translateY driven imperatively via ref — no React state lag
        opacity: 0,
        willChange: "transform, opacity",
      }}
    >
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 45% 55% at 75% 55%, rgba(255,85,0,0.09) 0%, transparent 70%)",
      }} />
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: "100%", height: "100%", pointerEvents: "none" }}
        onCreated={({ gl }) => {
          const canvas = gl.domElement;
          canvas.style.pointerEvents = "none";
          canvas.style.touchAction = "auto";
          // Forward any wheel events that somehow reach the canvas to the scroller
          canvas.addEventListener("wheel", (e) => {
            const scroller = document.getElementById("main-scroll");
            if (scroller) scroller.scrollTop += e.deltaY;
          }, { passive: true });
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 6, 4]} intensity={1.7} color="#ffffff" />
        <directionalLight position={[-4, 2, 2]} intensity={0.7} color="#FF6622" />
        <pointLight position={[0, -3, 2]} intensity={0.5} color="#7000FF" />
        <Environment preset="studio" />
        <WhistleModel scrollProgress={scrollProgress} panelIndex={panelIndex} />
      </Canvas>
    </div>,
    document.body
  );
}

// ── Panels ────────────────────────────────────────────────────────────────────
const panels = [
  { tag: "App In Development", headline: ["Next Level", "Platform."], body: "We're building the platform that helps players get seen. Track your stats, build a verified profile, and show consistent growth over time.", cta: { label: "Join Waitlist", href: "#waitlist" }, whistleOnRight: true },
  { tag: "01 — Player Profiles", headline: ["Verified.", "Trusted."], body: "A clean profile scouts can actually trust. Highlight key stats, position, physical metrics — all in one place.", cta: null, whistleOnRight: false },
  { tag: "02 — Stats Tracking", headline: ["Track Every", "Rep."], body: "Log matches, training sessions, and key performance indicators. Watch your progress compound week by week.", cta: null, whistleOnRight: true },
  { tag: "03 — Discovery", headline: ["Be Impossible", "To Ignore."], body: "Connect with scouts, coaches, and clubs actively looking for your exact profile. Your talent, amplified.", cta: { label: "Get Early Access", href: "#waitlist" }, whistleOnRight: false },
];

export default function News() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);
  const panelIndex = useRef(0);
  // Ref to the portal wrapper div — driven imperatively so no React state lag
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const scroller = document.getElementById("main-scroll");
    const section = sectionRef.current;
    if (!scroller || !section) return;

    // ── rAF loop: drives opacity + translateY on the portal wrapper ─────────────
    // Logic mirrors how Hero.tsx scrolls the player image with the Vision section:
    //  • Before section: hidden
    //  • Section entering → section bottom at viewport bottom: fully visible, translateY = 0
    //  • Section bottom scrolls above viewport bottom (entering Contact): translateY offsets
    //    upward so the whistle appears to scroll away with the section
    //  • Section fully above viewport: hidden
    let rafId: number;
    const tick = () => {
      const wrapper = wrapperRef.current;
      if (wrapper) {
        const sr = scroller.getBoundingClientRect();
        const se = section.getBoundingClientRect();
        const vh = sr.height;

        // Has section started entering from below?
        const hasEntered = se.top < sr.bottom;
        // Is section still at least partially on-screen from above?
        const notGoneAbove = se.bottom > sr.top;

        if (!hasEntered || !notGoneAbove) {
          // Hidden — either not yet reached or fully scrolled past
          wrapper.style.opacity = "0";
          wrapper.style.visibility = "hidden";
        } else {
          wrapper.style.opacity = "1";
          wrapper.style.visibility = "visible";

          // ── Entry: section top scrolling down into viewport ──────────────────
          // While section top hasn't reached viewport top yet, the first panel
          // is still entering. Offset whistle DOWN by that distance so it scrolls
          // in from below, arriving at panel-0 (right side) right as panel fills screen.
          const entryOffset = Math.max(0, se.top - sr.top);

          // ── Exit: section bottom scrolling above viewport bottom ─────────────
          // Once section bottom rises above viewport bottom (Contact entering),
          // offset whistle UP so it appears to scroll away with the section.
          const exitOffset = Math.max(0, sr.bottom - se.bottom);

          const translateY = entryOffset > 0 ? entryOffset : -exitOffset;

          wrapper.style.transform = translateY !== 0
            ? `translateY(${translateY}px)`
            : "";
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // ── Scroll progress for spin ─────────────────────────────────────────────
    ScrollTrigger.create({
      trigger: section, scroller,
      start: "top top", end: "bottom bottom",
      onUpdate: (self) => { scrollProgress.current = self.progress; },
    });

    // ── Panel index for left/right position ──────────────────────────────────
    panels.forEach((_, i) => {
      const panelEl = section.querySelectorAll(".news-panel")[i];
      if (!panelEl) return;
      ScrollTrigger.create({
        trigger: panelEl, scroller, start: "top 55%",
        onEnter: () => { panelIndex.current = i; },
        onEnterBack: () => { panelIndex.current = i; },
      });
    });

    // ── Per-panel text reveals ────────────────────────────────────────────────
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

    return () => {
      cancelAnimationFrame(rafId);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <Bounded
      as="section"
      id="news"
      ref={sectionRef}
      className="relative bg-brand-black text-white !px-0"
      style={{ minHeight: `${panels.length * 100}vh` }}
    >
      {/* Labels */}
      <div className="sticky top-0 pointer-events-none" style={{ height: "100vh", zIndex: 5 }}>
        <div className="absolute top-10 inset-x-0 flex justify-between px-10">
          <span className="font-mono text-[10px] text-white/20 tracking-[0.3em] uppercase">MFT Platform</span>
          <span className="font-mono text-[10px] text-white/20 tracking-[0.3em] uppercase">In Development</span>
        </div>
      </div>

      {/* Portal canvas — lives in document.body, scrolls away with section via rAF */}
      <WhistlePortal
        scrollProgress={scrollProgress}
        panelIndex={panelIndex}
        wrapperRef={wrapperRef}
      />

      {/* Content panels */}
      <div className="relative" style={{ marginTop: "-100vh", zIndex: 20 }}>
        {panels.map((panel, i) => (
          <div key={i} className="news-panel relative flex items-center" style={{ minHeight: "100vh" }}>
            <div className="w-full grid grid-cols-2" style={{ minHeight: "100vh" }}>
              {panel.whistleOnRight ? (
                <>
                  <div className="flex flex-col justify-center px-12 py-28 lg:px-16"><PanelText panel={panel} /></div>
                  <div />
                </>
              ) : (
                <>
                  <div />
                  <div className="flex flex-col justify-center px-12 py-28 lg:px-16"><PanelText panel={panel} /></div>
                </>
              )}
            </div>
            <span className="absolute bottom-10 right-10 font-mono text-[9px] text-white/15 tracking-[0.25em]">0{i + 1} / 04</span>
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
        <span className="inline-block font-mono text-xs text-brand-violet border border-brand-violet/35 rounded-full px-4 py-1.5 tracking-[0.2em] uppercase">{panel.tag}</span>
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
      <p className="panel-body text-base md:text-lg text-white/50 leading-relaxed mb-10 max-w-sm font-medium">{panel.body}</p>
      {panel.cta && (
        <div className="panel-cta">
          <a href={panel.cta.href} className="group inline-flex items-center gap-3 rounded-full bg-[#FF5500] px-8 py-4 text-sm font-black uppercase tracking-widest text-white hover:scale-105 active:scale-95 transition-transform shadow-[0_0_30px_rgba(255,85,0,0.28)]">
            {panel.cta.label}
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      )}
    </>
  );
}