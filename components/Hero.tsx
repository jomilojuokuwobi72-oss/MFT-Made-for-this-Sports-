import Image from "next/image";
import WaitlistForm from "@/components/WaitlistForm";
import MFTScene from "@/components/MFTScene";

export default function Hero() {
  return (
    <section
      id="home"
      className="hero-section relative flex min-h-screen items-center justify-center overflow-hidden bg-black pt-28 pb-16 md:pt-32 md:pb-24"
    >
      <MFTScene />

      {/* Background Effects & Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.png"
          alt="MFT Training Arena"
          fill
          className="object-cover opacity-50 mix-blend-lighten"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/80 via-background/50 to-background" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary-violet/10 blur-[120px]" />
        <div className="absolute left-1/4 top-1/4 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-[100px]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* LEFT: Text & Waitlist Form */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left mt-8 md:mt-0">
            <h1 className="font-sans font-black tracking-tighter leading-[0.9] text-6xl sm:text-7xl md:text-8xl lg:text-[7rem]">
              <span className="block text-white">MADE FOR</span>
              <span className="block text-primary-violet">THIS</span>
              <span className="block text-white">SPORTS.</span>
            </h1>

            <p className="mt-8 max-w-xl text-slate-300 text-lg sm:text-xl leading-relaxed font-medium">
              A premium football community built to spotlight talent. We’re tracking player stats, highlighting growth, and helping the right people discover you.
            </p>

            <div className="mt-12 w-full max-w-sm">
              <WaitlistForm />
            </div>
          </div>

          {/* RIGHT: Visuals/3D Placeholder */}
          <div className="relative flex items-center justify-center lg:h-[700px]">
            {/* The 3D scene is now global via MFTScene View Overlay */}
          </div>
        </div>
      </div>
    </section>
  );
}
