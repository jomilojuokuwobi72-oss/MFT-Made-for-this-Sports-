export default function HeroDetails() {
  return (
    <section className="py-48 bg-black text-white relative border-t border-white/5 noise-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-16">
          <p className="max-w-2xl text-white/50 text-xl md:text-2xl lg:text-3xl leading-snug font-sans tracking-tight">
            A football community built to spotlight talent. We’re building an app
            that tracks player stats, highlights growth, and helps the right people
            discover the right players.
          </p>

          <div className="flex flex-col gap-8">
            <div className="flex gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center border border-white/20 px-12 py-5 font-bold tracking-widest text-xs text-white transition-all hover:bg-white/10 active:scale-95 rounded-none"
              >
                Get Scouted
              </a>
            </div>

            <div className="flex items-center gap-12 pt-6 border-t border-white/10">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">Status</span>
                <span className="text-sm font-bold uppercase tracking-widest">Global Network</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">Established</span>
                <span className="text-sm font-bold uppercase tracking-widest">MMXXV</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
