export default function News() {
  return (
    <section id="news" className="bg-black text-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Coming Soon: The MFT App
            </h2>

            <p className="mt-4 text-white/80 leading-relaxed">
              We’re building the platform that helps players get seen: track your stats,
              build a verified profile, and show consistent growth over time. If you’re
              serious about football, this is for you.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#waitlist"
                className="rounded-xl bg-white text-black px-5 py-3 font-semibold hover:bg-white/90 transition"
              >
                Join Waitlist
              </a>

              <a
                href="#contact"
                className="rounded-xl border border-white/25 px-5 py-3 font-semibold text-white hover:bg-white/10 transition"
              >
                Partner With Us
              </a>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <div className="font-bold">Player Profiles</div>
                <div className="mt-2 text-white/70 text-sm">
                  A clean profile scouts can actually trust.
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <div className="font-bold">Stats Tracking</div>
                <div className="mt-2 text-white/70 text-sm">
                  Track matches, training, and progress.
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <div className="font-bold">Discovery</div>
                <div className="mt-2 text-white/70 text-sm">
                  Make your talent impossible to ignore.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
