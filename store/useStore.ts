import { create } from "zustand";

interface StoreState {
    activeColor: string;
    activeRoughness: number;
    activeMetalness: number;
    activeEnv: string;
    isCustomizerOpen: boolean;
    setActiveColor: (color: string) => void;
    setActiveRoughness: (roughness: number) => void;
    setActiveMetalness: (metalness: number) => void;
    setActiveEnv: (env: string) => void;
    setCustomizerOpen: (isOpen: boolean) => void;
    isWaitlistModalOpen: boolean;
    setWaitlistModalOpen: (isOpen: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
    activeColor: "#e2e8f0", // Silver by default
    activeRoughness: 0.8,   // Matte
    activeMetalness: 0.2,   // Matte
    activeEnv: "studio",
    isCustomizerOpen: false,

    setActiveColor: (color) => set({ activeColor: color }),
    setActiveRoughness: (roughness) => set({ activeRoughness: roughness }),
    setActiveMetalness: (metalness) => set({ activeMetalness: metalness }),
    setActiveEnv: (env) => set({ activeEnv: env }),
    setCustomizerOpen: (isOpen) => set({ isCustomizerOpen: isOpen }),

    isWaitlistModalOpen: false,
    setWaitlistModalOpen: (isOpen) => set({ isWaitlistModalOpen: isOpen }),
}));
