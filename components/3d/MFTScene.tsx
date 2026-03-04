"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function MFTScene() {
    const orbRef = useRef<THREE.Mesh>(null);
    const groupRef = useRef<THREE.Group>(null);

    useEffect(() => {
        if (!groupRef.current) return;

        const ctx = gsap.context(() => {
            // Intro Animation
            gsap.fromTo(groupRef.current!.scale, {
                x: 0,
                y: 0,
                z: 0,
            }, {
                x: 1,
                y: 1,
                z: 1,
                duration: 2,
                ease: "power4.out",
            });

            gsap.fromTo(groupRef.current!.position, {
                y: -5,
            }, {
                y: 0,
                duration: 2,
                ease: "power4.out",
            });

            // Scroll Animation (Moves orb as you scroll down)
            const scrollTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".hero-section",
                    scroller: "#main-scroll",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.5,
                },
            });

            scrollTl
                .to(groupRef.current!.position, {
                    x: 3,
                    y: -1,
                    z: -2,
                    ease: "power2.inOut",
                })
                .to(
                    groupRef.current!.scale,
                    {
                        x: 1.5,
                        y: 1.5,
                        z: 1.5,
                    },
                    0
                );
        });

        return () => ctx.revert();
    }, []);


    return (
        <group ref={groupRef}>
            <Float speed={2} rotationIntensity={2} floatIntensity={2}>
                <Sphere ref={orbRef} args={[1, 64, 64]} scale={1.2}>
                    <MeshDistortMaterial
                        color="#00D1FF"
                        emissive="#7000FF"
                        emissiveIntensity={0.5}
                        clearcoat={1}
                        clearcoatRoughness={0.1}
                        roughness={0.2}
                        metalness={0.8}
                        distort={0.4}
                        speed={2}
                    />
                </Sphere>
            </Float>
            <Environment preset="city" />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
            <spotLight position={[-10, 10, 10]} intensity={2} color="#7000FF" />
        </group>
    );
}
