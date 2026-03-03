import { Bounded } from "@/components/Bounded";
import Button from "@/components/Button";

export default function News() {
  return (
    <Bounded id="news" className="relative py-24 bg-background">
      <div className="glass-container p-10 md:p-16 lg:p-20 overflow-hidden text-center md:text-left">
        {/* Background glow for the card */}
        <div className="absolute top-0 right-0 h-[300px] w-[300px] -translate-y-1/2 translate-x-1/2 rounded-full bg-primary-violet/10 blur-[80px]" />

        <div className="relative z-10 max-w-4xl mx-auto md:mx-0">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white mb-6">
            Coming Soon: <span className="text-primary-violet">The MFT App</span>
          </h2>

          <p className="mt-6 text-slate-300 text-lg md:text-xl leading-relaxed font-medium">
            We’re building the platform that helps players get seen: track your stats,
            build a verified profile, and show consistent growth over time. If you’re
            serious about football, this is for you.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button href="#waitlist" className="w-full sm:w-auto">
              Join Waitlist
            </Button>

            <a
              href="#contact"
              className="rounded-xl border border-white/20 px-8 py-4 text-center text-xl font-bold uppercase tracking-wide text-white transition-colors duration-150 hover:bg-white hover:text-black"
            >
              Partner With Us
            </a>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/5 bg-black/40 p-6 backdrop-blur-sm transition-transform hover:-translate-y-1 duration-300">
              <div className="font-bold text-xl text-white mb-3 tracking-wide">Player Profiles</div>
              <div className="text-slate-400 font-medium">
                A clean, verified profile that scouts can actually trust.
              </div>
            </div>
            <div className="rounded-2xl border border-white/5 bg-black/40 p-6 backdrop-blur-sm transition-transform hover:-translate-y-1 duration-300">
              <div className="font-bold text-xl text-white mb-3 tracking-wide">Stats Tracking</div>
              <div className="text-slate-400 font-medium">
                Log matches, track training data, and measure progress over time.
              </div>
            </div>
            <div className="rounded-2xl border border-white/5 bg-black/40 p-6 backdrop-blur-sm transition-transform hover:-translate-y-1 duration-300">
              <div className="font-bold text-xl text-white mb-3 tracking-wide">Discovery</div>
              <div className="text-slate-400 font-medium">
                Make your talent impossible to ignore with real performance metrics.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
}
