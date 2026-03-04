import { Bounded } from "@/components/ui/Bounded";

export default function ImageStack() {
    return (
        <Bounded
            as="section"
            id="imagestack"
            className="relative min-h-[150vh] overflow-hidden bg-transparent text-white pointer-events-auto flex items-center py-20"
        >
            <div className="w-full max-w-5xl mx-auto flex items-start justify-center gap-6 sm:gap-10 md:gap-16 px-4">
                {/* Left Image */}
                <div className="w-1/3 aspect-3/5 relative rounded-xl md:rounded-3xl overflow-hidden mt-0 shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-white/5">
                    <img
                        src="/images/athlete_preparation_1772618686160.png"
                        alt="Athlete preparing"
                        className="w-full h-full object-cover grayscale opacity-80"
                    />
                </div>

                {/* Middle Image - offset down */}
                <div className="w-1/3 aspect-3/5 relative rounded-2xl md:rounded-3xl overflow-hidden mt-[10vh] md:mt-[15vh] shadow-2xl">
                    <img
                        src="/images/athlete_action_1772618445997.png"
                        alt="Athlete in action"
                        className="w-full h-full object-cover grayscale opacity-80"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-6 bg-linear-to-t from-black/80 to-transparent">
                        <p className="font-bold text-lg md:text-2xl uppercase tracking-wider">Focus</p>
                    </div>
                </div>

                {/* Right Image - further offset down */}
                <div className="w-1/3 aspect-3/5 relative rounded-2xl md:rounded-3xl overflow-hidden mt-[20vh] md:mt-[30vh] shadow-2xl">
                    <img
                        src="/images/athlete_celebration_1772618704087.png"
                        alt="Athlete celebrating"
                        className="w-full h-full object-cover grayscale opacity-80"
                    />
                </div>
            </div>
        </Bounded>
    );
}
