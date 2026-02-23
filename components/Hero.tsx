export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden text-white"
    >
      {/* Background video — z-0 keeps it behind everything */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/clipage.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay — makes text readable over the footage */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Text content — sits above video and overlay */}
      <div className="relative z-20 mx-auto max-w-7xl px-6 pt-40 pb-24 md:pt-52 md:pb-32 flex flex-col justify-end min-h-screen">
        <h1 className="font-extrabold tracking-tight leading-[0.95] text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
          <span className="block">MADE FOR</span>
          <span className="block">THIS</span>
          <span className="block">SPORTS.</span>
        </h1>

        <p className="mt-6 max-w-xl text-white/80 text-base sm:text-lg leading-relaxed">
          A football community built to spotlight talent. We’re building an app
          that tracks player stats, highlights growth, and helps the right people
          discover the right players.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#about"
            className="rounded-xl bg-white text-black px-5 py-3 font-semibold hover:bg-white/90 transition"
          >
            Join Waitlist
          </a>
          <a
            href="#contact"
            className="rounded-xl border border-white/25 px-5 py-3 font-semibold text-white hover:bg-white/10 transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
