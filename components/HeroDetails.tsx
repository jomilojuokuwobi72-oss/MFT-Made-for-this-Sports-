export default function HeroDetails() {
  return (
    <section className="py-24 bg-black text-white relative border-t border-white/5 noise-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <p className="max-w-md text-white/50 text-sm sm:text-base leading-relaxed font-sans">
            A football community built to spotlight talent. We’re building an app
            that tracks player stats, highlights growth, and helps the right people
            discover the right players.
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center border border-white/20 px-8 py-4 font-bold tracking-widest text-xs text-white transition-all hover:bg-white/10 active:scale-95 rounded-none"
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
