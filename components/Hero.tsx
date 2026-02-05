import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="bg-black text-white pt-28 pb-16 md:pt-32 md:pb-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* LEFT: Text */}
          <div>
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

          {/* RIGHT: Logo */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-md">
              <Image
                src="/MFT BRAND OVERVIEW-01.PNG"
                alt="MFT Logo"
                width={500}
                height={500}
                priority
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
