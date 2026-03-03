import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

export function PulseOrb({ position = [0, 0, 0], scale = 1 }: { position?: [number, number, number]; scale?: number }) {
    const coreRef = useRef<THREE.Mesh>(null);
    const ringRef1 = useRef<THREE.Mesh>(null);
    const ringRef2 = useRef<THREE.Mesh>(null);
    const fragmentsRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (coreRef.current) {
            coreRef.current.rotation.y = t * 0.2;
            coreRef.current.rotation.x = t * 0.1;
            // Pulsing effect
            const s = 1 + Math.sin(t * 2) * 0.05;
            coreRef.current.scale.set(s, s, s);
        }
        if (ringRef1.current) {
            ringRef1.current.rotation.x = t * 0.5;
            ringRef1.current.rotation.y = t * 0.3;
        }
        if (ringRef2.current) {
            ringRef2.current.rotation.x = -t * 0.4;
            ringRef2.current.rotation.z = t * 0.2;
        }
        if (fragmentsRef.current) {
            fragmentsRef.current.rotation.y = t * 0.1;
            fragmentsRef.current.children.forEach((child, i) => {
                child.rotation.x += 0.01 * (i % 2 === 0 ? 1 : -1);
                child.rotation.y += 0.02 * (i % 3 === 0 ? 1 : -1);
            });
        }
    });

    // Create random fragments
    const fragments = Array.from({ length: 15 }).map((_, i) => {
        const radius = 2.5 + Math.random() * 1.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        return (
            <mesh key={i} position={[x, y, z]} rotation={[Math.random(), Math.random(), Math.random()]}>
                <icosahedronGeometry args={[0.2, 0]} />
                <meshPhysicalMaterial
                    color="#00D1FF"
                    metalness={0.8}
                    roughness={0.2}
                    emissive="#0055ff"
                    emissiveIntensity={0.5}
                />
            </mesh>
        );
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
            <group position={position} scale={scale}>
                {/* The Core */}
                <mesh ref={coreRef}>
                    <icosahedronGeometry args={[1.5, 2]} />
                    <MeshTransmissionMaterial
                        backside
                        samples={4}
                        thickness={2}
                        chromaticAberration={1}
                        anisotropy={0.5}
                        distortion={0.5}
                        distortionScale={0.5}
                        temporalDistortion={0.1}
                        color="#ffffff"
                        emissive="#ffffff"
                        emissiveIntensity={0.1}
                    />
                </mesh>

                {/* Orbiting Rings */}
                <mesh ref={ringRef1} rotation={[Math.PI / 4, 0, 0]}>
                    <torusGeometry args={[2, 0.02, 16, 100]} />
                    <meshBasicMaterial color="#00D1FF" transparent opacity={0.6} />
                </mesh>

                <mesh ref={ringRef2} rotation={[-Math.PI / 4, 0, 0]}>
                    <torusGeometry args={[2.2, 0.02, 16, 100]} />
                    <meshBasicMaterial color="#7000FF" transparent opacity={0.6} />
                </mesh>

                {/* Fragments */}
                <group ref={fragmentsRef}>
                    {fragments}
                </group>

                {/* Magical Sparkles */}
                <Sparkles count={100} scale={6} size={2} speed={0.4} opacity={0.5} color="#00D1FF" />
            </group>
        </Float>
    );
}
