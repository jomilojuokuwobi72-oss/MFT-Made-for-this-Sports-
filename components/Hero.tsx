import AnimatedText from "@/components/AnimatedText";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden text-white noise-bg"
    >
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 grayscale opacity-40"
      >
        <source src="/clipage.mp4" type="video/mp4" />
      </video>

      {/* Grid Overlay for Technical Look */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,black_90%)]" />
      <div className="absolute inset-0 z-10 opacity-20 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-size-[40px_40px]" />

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-7xl px-6 pt-40 pb-24 md:pt-52 md:pb-32 flex flex-col justify-end min-h-screen">
        {/* Technical Label */}
        <div className="flex items-center gap-2 mb-6">
          <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">
            System Online // Live Scouting Feed
          </span>
        </div>

        <div className="font-display leading-[0.85] text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[13rem] tracking-tighter">
          <AnimatedText 
            text="Made For" 
            animationClass="animate-blur-in-right" 
            className="block italic"
          />
          <AnimatedText 
            text="This" 
            animationClass="animate-blur-in-right" 
            className="block [-webkit-text-stroke:1px_rgba(255,255,255,0.3)] text-transparent"
            staggerDelay={0.06}
          />
          <AnimatedText 
            text="Sports." 
            animationClass="animate-blur-in-right" 
            className="block"
            staggerDelay={0.07}
          />
        </div>

        <div className="mt-12 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <p className="max-w-md text-white/50 text-sm sm:text-base leading-relaxed font-sans">
            A football community built to spotlight talent. We’re building an app
            that tracks player stats, highlights growth, and helps the right people
            discover the right players.
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <a
                href="#events"
                className="group relative inline-flex items-center justify-center rounded-full bg-white text-black px-8 py-4 font-bold tracking-widest text-xs transition-all hover:scale-105 active:scale-95"
              >
                Join the Journey
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 font-bold tracking-widest text-xs text-white transition-all hover:bg-white/10 active:scale-95"
              >
                Get Scouted
              </a>
            </div>
            
            <div className="flex items-center gap-8 pt-4 border-t border-white/10">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-white/40">Status</span>
                <span className="text-xs font-bold uppercase tracking-widest">Global Network</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-white/40">Established</span>
                <span className="text-xs font-bold uppercase tracking-widest">MMXXV</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
