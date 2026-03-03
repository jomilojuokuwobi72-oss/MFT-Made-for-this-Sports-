import { Bounded } from "@/components/Bounded";

export default function Contact() {
  return (
    <Bounded id="contact" className="py-24 bg-background">
      <div className="glass-container p-10 md:p-16 lg:p-20 text-center relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white mb-6">
            Get In Touch
          </h2>

          <div className="signal-line mx-auto mb-8" />

          <p className="mt-6 text-slate-300 text-lg md:text-xl leading-relaxed font-medium">
            Want to partner, sponsor, or help build the Made For This community? Send us a message.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2 text-left">
            <div className="glass-container p-8 transition-colors hover:bg-white/5 group">
              <div className="text-sm font-bold uppercase tracking-wider text-primary-violet mb-2">Email Us</div>
              <a
                href="mailto:madeforthissports@gmail.com"
                className="block text-xl md:text-2xl font-bold text-white group-hover:text-primary-violet transition-colors"
              >
                madeforthissports@gmail.com
              </a>
            </div>

            <div className="glass-container p-8 transition-colors hover:bg-white/5 group">
              <div className="text-sm font-bold uppercase tracking-wider text-violet-400 mb-2">Call Us</div>
              <a
                href="tel:+16827252801"
                className="block text-xl md:text-2xl font-bold text-white group-hover:text-violet-300 transition-colors"
              >
                +1 (682) 725-2801
              </a>
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
}
