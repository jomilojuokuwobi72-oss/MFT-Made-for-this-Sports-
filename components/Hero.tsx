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
      <div className="relative z-20 mx-auto max-w-7xl px-6 pt-40 pb-40 md:pt-52 md:pb-52 flex flex-col justify-end min-h-screen">

        <div className="flex flex-col w-fit group">
          <div className="font-display leading-[0.8] text-8xl sm:text-9xl md:text-[11rem] lg:text-[14rem] xl:text-[17rem] tracking-tighter">
            <AnimatedText
              text="Made For"
              animationClass="animate-slide-up"
              className="block italic"
            />
            <div className="flex flex-wrap items-baseline gap-x-8">
              <AnimatedText
                text="This"
                animationClass="animate-slide-up"
                className="[-webkit-text-stroke:1px_rgba(255,255,255,0.3)] text-transparent"
                staggerDelay={0.06}
              />
              <AnimatedText
                text="Sports."
                animationClass="animate-slide-up"
                staggerDelay={0.07}
              />
            </div>
          </div>

          <div className="mt-8 self-start animate-slide-up" style={{ animationDelay: '1s', opacity: 0, animationFillMode: 'forwards' }}>
            <a
              href="#events"
              className="group relative inline-flex items-center justify-center bg-white text-black px-12 py-5 font-bold tracking-[0.2em] text-xs transition-all hover:bg-white/90 active:scale-95 rounded-none"
            >
              Join the Journey
              <svg
                className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
