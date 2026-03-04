import { Bounded } from "@/components/ui/Bounded";

export default function Vision() {
    return (
        <Bounded
            as="section"
            id="vision"
            className="relative min-h-screen overflow-visible bg-transparent text-white flex items-center justify-center pointer-events-none"
        >
            <div className="flex flex-col items-center w-full">
                {/* Centered VISION text with I-slot gap */}
                <h2 className="w-full text-[20vw] sm:text-[25vw] leading-none font-black uppercase tracking-tighter flex items-center justify-center">
                    {/* V */}
                    <span>V</span>

                    {/* I-slot: the player image animates into this gap */}
                    <span
                        className="inline-block w-[13vw] sm:w-[14vw] opacity-0 select-none shrink-0"
                        aria-hidden="true"
                        data-i-slot="true"
                    >
                        I
                    </span>

                    {/* SION */}
                    <span>SION</span>
                </h2>

                <div className="max-w-md pointer-events-auto text-center mt-12">
                    <p className="text-white/60 text-lg font-medium leading-relaxed">
                        A radical shift in how we perceive the game. The Vanguard isn&apos;t just an accessory; it&apos;s the core of the MFT philosophy.
                    </p>
                </div>
            </div>
        </Bounded>
    );
}