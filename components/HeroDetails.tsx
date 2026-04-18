import AnimatedText from "./AnimatedText";

export default function HeroDetails() {
  return (
    <section className="py-48 bg-black text-white relative border-t border-white/5 noise-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-12">
          <div className="max-w-4xl">
            <AnimatedText
              text="A football community built to spotlight talent. We’re building an app that tracks player stats, highlights growth, and helps the right people discover the right players."
              animationClass="animate-slide-up"
              staggerDelay={0.015}
              className="text-white/50 text-xl md:text-2xl lg:text-3xl leading-snug font-sans tracking-tight"
            />
          </div>

          <div className="animate-slide-up opacity-0" style={{ animationDelay: '2.5s', animationFillMode: 'forwards' }}>
            <a
              href="#contact"
              className="inline-flex items-center justify-center border border-white/20 px-12 py-5 font-secondary font-bold tracking-widest text-xs text-white transition-all hover:bg-white/10 active:scale-95 rounded-none"
            >
              Get Scouted
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
