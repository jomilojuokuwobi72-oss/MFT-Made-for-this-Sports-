"use client";

import { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, ContactShadows } from "@react-three/drei";
import { VanguardWhistle } from "./VanguardWhistle";
import { useStore } from "@/store/useStore";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

export default function SceneContainer() {
    const { activeColor, activeRoughness, activeMetalness, activeEnv } = useStore();
    const groupRef = useRef<THREE.Group>(null);

    useEffect(() => {
        if (!groupRef.current) return;

        const ctx = gsap.context(() => {
            // Initially hide the whistle
            gsap.set(groupRef.current!, { opacity: 0, scale: 0 });

            const mm = gsap.matchMedia();

            mm.add("(min-width: 1024px)", () => { // Desktop
                gsap.set(groupRef.current!.position, { x: 0, y: 0, z: 2 });

                // 1. Hero -> Vision (Shrink, stand vertically to become 'I')
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: "#vision",
                        scroller: "#main-scroll",
                        start: "top bottom",
                        end: "top center",
                        scrub: 1,
                    }
                });
                tl.to(groupRef.current!, { opacity: 1, scale: 1.5, duration: 0.3 })
                    .to(groupRef.current!.position, { x: -0.9, y: 0, z: 0, ease: "power2.inOut" }, "<")
                    .to(groupRef.current!.rotation, { z: -Math.PI / 2, ease: "power1.inOut" }, "<");

                // 2. Vision -> Image Stack (Float above images, rotate horizontally again)
                const tl2 = gsap.timeline({
                    scrollTrigger: {
                        trigger: "#imagestack",
                        scroller: "#main-scroll",
                        start: "top bottom",
                        end: "top center",
                        scrub: 1,
                    }
                });
                tl2.to(groupRef.current!.position, { x: 0, y: 0, z: 1.5, ease: "power2.inOut" })
                    .to(groupRef.current!.scale, { x: 2, y: 2, z: 2 }, "<")
                    .to(groupRef.current!.rotation, { z: 0, y: Math.PI, duration: 1 }, "<");

            });

            mm.add("(max-width: 1023px)", () => { // Mobile/Tablet
                gsap.set(groupRef.current!, { opacity: 0, scale: 0 });
                gsap.set(groupRef.current!.position, { x: 0, y: 0.5, z: 0 });
                gsap.set(groupRef.current!.scale, { x: 2.5, y: 2.5, z: 2.5 });
            });
        });

        return () => ctx.revert();
    }, []);


    return (
        <div className="absolute inset-0 z-0 pointer-events-auto">
            <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={1.5} />
                <directionalLight position={[10, 10, 10]} intensity={3} castShadow shadow-mapSize={1024} />
                <pointLight position={[-10, 0, -10]} intensity={2} color="#00D1FF" />

                <group ref={groupRef}>
                    <VanguardWhistle
                        color={activeColor}
                        roughness={activeRoughness}
                        metalness={activeMetalness}
                    />
                </group>

                <ContactShadows
                    position={[0, -2, 0]}
                    opacity={0.8}
                    scale={15}
                    blur={2}
                    color="#000000"
                    far={10}
                />

                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <Environment preset={activeEnv as any} background={false} blur={0.8} />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate={false}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 1.5}
                />
            </Canvas>
        </div>
    );
}
