import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

export function KineticDNA({ position = [0, 0, 0], scale = 1 }: { position?: [number, number, number]; scale?: number }) {
    const groupRef = useRef<THREE.Group>(null);

    // Create DNA structure
    const points = 30;
    const radius = 1;
    const height = 6;

    const strands = useMemo(() => {
        const s1 = [];
        const s2 = [];
        const connections = [];

        for (let i = 0; i < points; i++) {
            const t = i / points;
            const angle = t * Math.PI * 4; // Two full turns
            const y = (t - 0.5) * height;

            const x1 = Math.cos(angle) * radius;
            const z1 = Math.sin(angle) * radius;

            const x2 = Math.cos(angle + Math.PI) * radius;
            const z2 = Math.sin(angle + Math.PI) * radius;

            s1.push(<mesh key={`s1-${i}`} position={[x1, y, z1]}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshPhysicalMaterial color="#00D1FF" emissive="#0055ff" emissiveIntensity={0.8} metalness={0.5} roughness={0.2} />
            </mesh>);

            s2.push(<mesh key={`s2-${i}`} position={[x2, y, z2]}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshPhysicalMaterial color="#7000FF" emissive="#3300ff" emissiveIntensity={0.8} metalness={0.5} roughness={0.2} />
            </mesh>);

            // Add connection rungs
            if (i % 2 === 0) {
                const dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(z2 - z1, 2));
                connections.push(
                    <mesh key={`conn-${i}`} position={[0, y, 0]} rotation={[0, -angle, 0]}>
                        <cylinderGeometry args={[0.03, 0.03, dist, 8]} />
                        <meshStandardMaterial color="#ffffff" transparent opacity={0.3} />
                    </mesh>
                );
            }
        }

        return { s1, s2, connections };
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1}>
            <group position={position} scale={scale} ref={groupRef}>
                {strands.s1}
                {strands.s2}
                {strands.connections}
            </group>
        </Float>
    );
}
