"use client";

import { Bounded } from "@/components/ui/Bounded";
import { TextSplitter } from "@/components/ui/TextSplitter";
import { useStore } from "@/store/useStore";
import clsx from "clsx";

const colors = [
    { name: "Silver", value: "#e2e8f0" },
    { name: "Gold", value: "#fbbf24" },
    { name: "Cyan", value: "#00D1FF" },
    { name: "Violet", value: "#7000FF" },
    { name: "Crimson", value: "#dc2626" },
    { name: "Midnight", value: "#0f172a" },
];

const finishes = [
    { name: "Matte", roughness: 0.8, metalness: 0.2 },
    { name: "Gloss", roughness: 0.1, metalness: 0.9 },
    { name: "Brushed", roughness: 0.4, metalness: 0.6 },
];

const environments = [
    { name: "Studio", preset: "studio" },
    { name: "City Room", preset: "city" },
    { name: "Sunset", preset: "sunset" },
];

export default function Customizer() {
    const {
        activeColor, setActiveColor,
        activeRoughness, setActiveRoughness,
        setActiveMetalness,
        activeEnv, setActiveEnv,
        isCustomizerOpen, setCustomizerOpen
    } = useStore();

    return (
        <>
            {/* Backdrop */}
            <div
                className={clsx(
                    "fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-500",
                    isCustomizerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setCustomizerOpen(false)}
            />

            {/* Slide-out Drawer Panel */}
            <aside
                id="customizer"
                className={clsx(
                    "fixed top-0 right-0 h-full w-full md:w-[500px] lg:w-[600px] bg-[#0d0402]/90 backdrop-blur-xl border-l border-white/10 z-50 text-white overflow-y-auto pointer-events-auto transition-transform duration-500 ease-in-out p-8 md:p-12 pb-24 shadow-2xl",
                    isCustomizerOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                {/* Close Button */}
                <button
                    onClick={() => setCustomizerOpen(false)}
                    className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors shadow-none border-0 group"
                >
                    <span className="text-xl leading-none group-hover:scale-110 transition-transform">X</span>
                </button>

                <div className="flex flex-col gap-10 w-full mt-10">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-2">
                            <TextSplitter text="DESIGN YOUR" />
                            <br />
                            <span className="text-white/50"><TextSplitter text="LEGACY" /></span>
                        </h2>
                        <p className="text-white/60 font-medium">Customize the MFT Vanguard Whistle.</p>
                    </div>

                    {/* Color Palette */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Base Color</h3>
                        <div className="flex flex-wrap gap-4">
                            {colors.map((c) => (
                                <button
                                    key={c.name}
                                    onClick={() => setActiveColor(c.value)}
                                    className={clsx(
                                        "w-10 h-10 rounded-full border-2 transition-all hover:scale-110",
                                        activeColor === c.value ? "border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.5)]" : "border-transparent"
                                    )}
                                    style={{ backgroundColor: c.value }}
                                    title={c.name}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Material Finish */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Material Texture</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {finishes.map((f) => (
                                <button
                                    key={f.name}
                                    onClick={() => {
                                        setActiveRoughness(f.roughness);
                                        setActiveMetalness(f.metalness);
                                    }}
                                    className={clsx(
                                        "px-4 py-3 rounded-xl border font-bold text-sm tracking-wide transition-all",
                                        activeRoughness === f.roughness
                                            ? "bg-white text-brand-black border-white"
                                            : "bg-transparent border-white/20 text-white hover:bg-white/10"
                                    )}
                                >
                                    {f.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Lighting Environment */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Lighting Environment</h3>
                        <div className="flex gap-6 border-b border-white/10 pb-2">
                            {environments.map((env) => (
                                <button
                                    key={env.name}
                                    onClick={() => setActiveEnv(env.preset)}
                                    className={clsx(
                                        "text-xs font-bold uppercase tracking-widest pb-2 border-b-2 transition-all",
                                        activeEnv === env.preset
                                            ? "border-brand-cyan text-brand-cyan"
                                            : "border-transparent text-white/40 hover:text-white"
                                    )}
                                >
                                    {env.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button className="mt-8 bg-[#FF5500] hover:bg-[#ff7733] text-white font-black uppercase tracking-widest py-5 rounded-lg transition-transform hover:scale-[1.02] active:scale-95">
                        Save Configuration
                    </button>
                </div>

            </aside>
        </>
    );
}
