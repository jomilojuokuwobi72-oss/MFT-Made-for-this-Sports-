import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, useGLTF } from "@react-three/drei";
import * as THREE from "three";

export function VanguardWhistle({ position = [0, 0, 0], scale = 1 }: { position?: [number, number, number]; scale?: number }) {
    const whistleRef = useRef<THREE.Group>(null);

    // Load the GLTF model the user provided
    const { scene } = useGLTF("/models/whistle.glb");

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (whistleRef.current) {
            whistleRef.current.rotation.y = Math.sin(t * 0.5) * 0.3;
            whistleRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <group position={position} scale={scale} ref={whistleRef}>
                <primitive object={scene} />
            </group>
        </Float>
    );
}

// Preload the model so it doesn't pop in
useGLTF.preload("/models/whistle.glb");
