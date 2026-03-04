import { Bounded } from "@/components/ui/Bounded";

export default function Vision() {
    return (
        <Bounded
            as="section"
            id="vision"
            className="relative min-h-screen overflow-hidden bg-transparent text-white flex items-center justify-center pointer-events-none"
        >
            <div className="flex flex-col items-center">
                <h2 className="text-[20vw] sm:text-[25vw] leading-none font-black uppercase tracking-tighter flex items-center justify-center">
                    <span className="translate-x-[5vw]">V</span>
                    {/* Invisible gap for the 3D Whistle 'I' */}
                    <span className="w-[12vw] sm:w-[15vw] opacity-0 block">I</span>
                    <span className="-translate-x-[2vw]">SION</span>
                </h2>

                <div className="max-w-md pointer-events-auto text-center mt-8">
                    <p className="text-white/60 text-lg font-medium leading-relaxed">
                        A radical shift in how we perceive the game. The Vanguard isn&apos;t just an accessory; it&apos;s the core of the MFT philosophy.
                    </p>
                </div>
            </div>
        </Bounded>
    );
}
