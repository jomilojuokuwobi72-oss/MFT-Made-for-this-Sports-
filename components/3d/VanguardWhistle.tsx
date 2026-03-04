import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, useGLTF } from "@react-three/drei";
import * as THREE from "three";

type WhistleProps = {
    position?: [number, number, number];
    scale?: number;
    color?: string;
    roughness?: number;
    metalness?: number;
};

export function VanguardWhistle({
    position = [0, 0, 0],
    scale = 1,
    color = "#ffffff",
    roughness = 0.2,
    metalness = 0.8
}: WhistleProps) {
    const whistleRef = useRef<THREE.Group>(null);

    // Load the GLTF model the user provided
    const { scene } = useGLTF("/models/whistle.glb");

    // Deep clone scene so we can mutate materials safely without affecting other instances
    const clone = useMemo(() => {
        const clonedScene = scene.clone();
        clonedScene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                // Create a fresh material derived from the original
                const baseMat = mesh.material as THREE.MeshStandardMaterial;
                mesh.material = new THREE.MeshStandardMaterial({
                    ...baseMat,
                    color: new THREE.Color(color),
                    roughness: roughness,
                    metalness: metalness
                });
            }
        });
        return clonedScene;
    }, [scene, color, roughness, metalness]);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (whistleRef.current) {
            // Constant spinning
            whistleRef.current.rotation.y += 0.01;
            // Float bobbing effect
            whistleRef.current.position.y = Math.sin(t * 2) * 0.1;
        }
    });

    return (
        <group position={position} scale={scale} ref={whistleRef}>
            <primitive object={clone} />
        </group>
    );
}

// Preload the model so it doesn't pop in
useGLTF.preload("/models/whistle.glb");
