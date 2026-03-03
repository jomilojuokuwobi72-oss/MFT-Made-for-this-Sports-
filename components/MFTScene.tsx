"use client";

import { useRef } from "react";
import { Environment, OrbitControls, View } from "@react-three/drei";
import { Group } from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PulseOrb } from "./PulseOrb";
import { KineticDNA } from "./KineticDNA";
import { VanguardWhistle } from "./VanguardWhistle";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function MFTScene() {
    const whistleRef = useRef<Group>(null);
    const sceneGroupRef = useRef<Group>(null);

    useGSAP(() => {
        if (!whistleRef.current || !sceneGroupRef.current) return;

        // Intro Animation
        gsap.set(whistleRef.current.position, { x: 0, y: -5, z: 0 });
        gsap.set(whistleRef.current.rotation, { x: 0, y: 0, z: 0 });

        gsap.to(whistleRef.current.position, {
            y: 0,
            x: 2.5,
            duration: 2,
            ease: "back.out(1.2)",
            delay: 0.2
        });

        gsap.to(whistleRef.current.rotation, {
            x: 0.2,
            y: -0.4,
            z: 0.1,
            duration: 2.5,
            ease: "power2.out",
        });

        // 1) Hero -> About Scroll
        const aboutTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#about",
                start: "top bottom",
                end: "top top",
                scrub: 1.5,
            },
        });

        aboutTl
            .to(whistleRef.current.position, { x: -2.5, y: -0.5, z: 1.5 }, 0)
            .to(whistleRef.current.rotation, { x: -0.2, y: Math.PI + 0.5, z: -0.2 }, 0)
            .to(sceneGroupRef.current.rotation, { y: Math.PI / 4 }, 0);

        // 2) About -> News Scroll
        const newsTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#news",
                start: "top bottom",
                end: "top top",
                scrub: 1.5,
            },
        });

        newsTl
            .to(whistleRef.current.position, { x: 2.5, y: -1, z: 0.5 }, 0)
            .to(whistleRef.current.rotation, { x: 0.5, y: Math.PI * 2, z: 0.4 }, 0)
            .to(sceneGroupRef.current.rotation, { y: -Math.PI / 4 }, 0);

        // 3) News -> Contact Scroll
        const contactTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#contact",
                start: "top bottom",
                end: "center center",
                scrub: 1.5,
            },
        });

        contactTl
            .to(whistleRef.current.position, { x: 0, y: 0.5, z: 3 }, 0)
            .to(whistleRef.current.rotation, { x: -0.3, y: Math.PI * 3, z: 0 }, 0)
            .to(sceneGroupRef.current.rotation, { y: 0 }, 0);

    });

    return (
        <View className="fixed inset-0 z-50 pointer-events-none h-screen w-screen hidden md:block">
            <group ref={sceneGroupRef}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00D1FF" />
                <directionalLight position={[-10, -10, -5]} intensity={1} color="#7000FF" />

                <Environment files="/hdr/field.hdr" environmentIntensity={1.5} />

                <PulseOrb position={[0, 0, 0]} scale={0.7} />

                <group ref={whistleRef}>
                    <VanguardWhistle scale={0.4} />
                </group>

                <KineticDNA position={[3, 2, -3]} scale={0.3} />
            </group>
        </View>
    );
}
