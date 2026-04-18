export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-black text-white relative noise-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-none border border-white/10 bg-linear-to-b from-white/5 to-transparent p-8 md:p-16 relative overflow-hidden">
          {/* Background Highlight */}
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 blur-[120px] rounded-full" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 mb-6 block">
                Get Scouted // Partner With Us
              </span>
              <h2 className="text-5xl md:text-7xl mb-8 tracking-tighter font-secondary">
                Ready For <br /> Your Moment?
              </h2>
              <p className="text-white/50 text-base leading-relaxed max-w-md font-sans">
                Whether you're a player looking for a trial, a scout seeking talent, 
                or a brand interested in the MFT culture — we want to hear from you.
              </p>
              
              <div className="mt-12 flex flex-col gap-4">
                <div className="flex items-center gap-4 text-xs font-bold tracking-widest opacity-80">
                  <div className="w-8 h-px bg-white/30" />
                  Instagram: @made4thisports
                </div>
                <div className="flex items-center gap-4 text-xs font-bold tracking-widest opacity-80">
                  <div className="w-8 h-px bg-white/30" />
                  Email: info@mft-sports.com
                </div>
              </div>
            </div>

            <form className="flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Name"
                  className="bg-white/5 border border-white/10 rounded-none px-6 py-4 text-xs font-bold tracking-widest focus:outline-none focus:border-white transition-colors"
                />
                <input 
                  type="email" 
                  placeholder="Email"
                  className="bg-white/5 border border-white/10 rounded-none px-6 py-4 text-xs font-bold tracking-widest focus:outline-none focus:border-white transition-colors"
                />
              </div>
              <textarea 
                placeholder="Message" 
                rows={4}
                className="bg-white/5 border border-white/10 rounded-none px-6 py-4 text-xs font-bold tracking-widest focus:outline-none focus:border-white transition-colors"
              />
              <button className="w-full py-5 rounded-none bg-white text-black font-bold tracking-[0.1em] text-xs hover:scale-[1.02] transition-transform active:scale-95">
                Send Transmission
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
