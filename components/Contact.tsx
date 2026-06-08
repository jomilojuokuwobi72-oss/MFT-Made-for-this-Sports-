import { Instagram, Mail } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="py-28 sm:py-40 md:py-48 bg-black text-white relative noise-bg overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="rounded-none border border-white/5 bg-white/[0.02] p-8 md:p-20 relative overflow-hidden backdrop-blur-3xl">
          {/* Background Highlight */}
          <div className="absolute -bottom-24 -left-24 w-[32rem] h-[32rem] bg-white/[0.02] blur-[150px] rounded-full" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-20 xl:gap-32 items-start">
            <div>
              <ScrollReveal animation="fade-in">
                <span className="text-2xl font-bold uppercase text-white/70 mb-8 block font-display">
                  Get Scouted // Partner With Us
                </span>
                <h2 className="text-5xl sm:text-6xl md:text-7xl mb-10 font-secondary leading-[0.9] uppercase">
                  Ready For <br /> Your Moment?
                </h2>
                <p className="text-white/80 text-xl sm:text-2xl leading-snug max-w-lg font-sans">
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
                    <div className="flex flex-col min-w-0">
                      <span className="text-lg sm:text-xl uppercase text-white/70 font-display">Follow the Journey</span>
                      <span className="text-xl sm:text-2xl font-bold wrap-break-word group-hover:translate-x-1 transition-transform">@made4thisports</span>
                    </div>
                  </a>
                </ScrollReveal>

                <ScrollReveal animation="blur-in" delay={0.3}>
                  <a 
                    href="mailto:info@mft-sports.com"
                    className="flex items-center gap-6 group"
                  >
                    <div className="w-14 h-14 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all rounded-none">
                      <Mail className="w-5 h-5 shrink-0" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-lg sm:text-xl uppercase text-white/70 font-display">Direct Contact</span>
                      <span className="text-xl sm:text-2xl font-bold wrap-break-word group-hover:translate-x-1 transition-transform">info@mft-sports.com</span>
                    </div>
                  </a>
                </ScrollReveal>
              </div>
            </div>

            <ScrollReveal animation="slide-up" delay={0.4} className="h-full">
              <ContactForm />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
