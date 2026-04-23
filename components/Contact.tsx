import { Instagram, Mail } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function Contact() {
  return (
    <section id="contact" className="py-48 bg-black text-white relative noise-bg overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="rounded-none border border-white/5 bg-white/[0.02] p-8 md:p-20 relative overflow-hidden backdrop-blur-3xl">
          {/* Background Highlight */}
          <div className="absolute -bottom-24 -left-24 w-[32rem] h-[32rem] bg-white/[0.02] blur-[150px] rounded-full" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-20 xl:gap-32 items-start">
            <div>
              <ScrollReveal animation="fade-in">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.5em] text-white/30 mb-8 block">
                  Get Scouted // Partner With Us
                </span>
                <h2 className="text-6xl md:text-8xl lg:text-9xl mb-12 tracking-tighter font-secondary leading-[0.85]">
                  Ready For <br /> Your Moment?
                </h2>
                <p className="text-white/40 text-xl md:text-2xl leading-snug max-w-lg font-sans tracking-tight">
                  Whether you're a player looking for a trial, a scout seeking talent, 
                  or a brand interested in the MFT culture — we want to hear from you.
                </p>
              </ScrollReveal>
              
              <div className="mt-20 flex flex-col gap-8">
                <ScrollReveal animation="blur-in" delay={0.2}>
                  <a 
                    href="https://instagram.com/made4thisports" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-6 group"
                  >
                    <div className="w-14 h-14 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all rounded-none">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-widest text-white/30">Follow the Journey</span>
                      <span className="text-sm font-bold tracking-widest group-hover:translate-x-1 transition-transform">@made4thisports</span>
                    </div>
                  </a>
                </ScrollReveal>

                <ScrollReveal animation="blur-in" delay={0.3}>
                  <a 
                    href="mailto:info@mft-sports.com"
                    className="flex items-center gap-6 group"
                  >
                    <div className="w-14 h-14 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all rounded-none">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-widest text-white/30">Direct Transmission</span>
                      <span className="text-sm font-bold tracking-widest group-hover:translate-x-1 transition-transform">info@mft-sports.com</span>
                    </div>
                  </a>
                </ScrollReveal>
              </div>
            </div>

            <ScrollReveal animation="slide-up" delay={0.4} className="h-full">
              <form className="flex flex-col gap-8 h-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-3">
                    <label className="text-xs uppercase tracking-[0.3em] text-white/20 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Your name"
                      className="bg-white/5 border border-white/10 rounded-none px-8 py-6 text-sm font-bold tracking-widest focus:outline-none focus:border-white/40 transition-all placeholder:text-white/10"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-xs uppercase tracking-[0.3em] text-white/20 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="Your email"
                      className="bg-white/5 border border-white/10 rounded-none px-8 py-6 text-sm font-bold tracking-widest focus:outline-none focus:border-white/40 transition-all placeholder:text-white/10"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3 flex-grow">
                  <label className="text-xs uppercase tracking-[0.3em] text-white/20 ml-1">Message // Request</label>
                  <textarea 
                    placeholder="How can we help you reach your peak?" 
                    rows={6}
                    className="bg-white/5 border border-white/10 rounded-none px-8 py-6 text-sm font-bold tracking-widest focus:outline-none focus:border-white/40 transition-all placeholder:text-white/10 resize-none h-full min-h-[200px]"
                  />
                </div>
                <button className="w-full py-8 rounded-none bg-white text-black font-bold tracking-[0.3em] text-sm hover:bg-neutral-200 transition-all active:scale-[0.98] mt-4 shadow-2xl">
                  Submit Application
                </button>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
