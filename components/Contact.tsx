export default function Contact() {
  return (
    <section id="contact" className="py-48 bg-black text-white relative noise-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-none border border-white/10 bg-linear-to-b from-white/5 to-transparent p-12 md:p-24 relative overflow-hidden">
          {/* Background Highlight */}
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 blur-[120px] rounded-full" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-24 items-start">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.5em] text-white/30 mb-8 block">
                Get Scouted // Partner With Us
              </span>
              <h2 className="text-6xl md:text-8xl lg:text-9xl mb-12 tracking-tighter font-secondary leading-[0.9]">
                Ready For <br /> Your Moment?
              </h2>
              <p className="text-white/50 text-xl md:text-2xl leading-snug max-w-md font-sans tracking-tight">
                Whether you're a player looking for a trial, a scout seeking talent, 
                or a brand interested in the MFT culture — we want to hear from you.
              </p>
              
              <div className="mt-16 flex flex-col gap-6">
                <div className="flex items-center gap-6 text-sm font-bold tracking-widest opacity-60 transition-opacity hover:opacity-100 cursor-pointer">
                  <div className="w-12 h-px bg-white/30" />
                  Instagram: @made4thisports
                </div>
                <div className="flex items-center gap-6 text-sm font-bold tracking-widest opacity-60 transition-opacity hover:opacity-100 cursor-pointer">
                  <div className="w-12 h-px bg-white/30" />
                  Email: info@mft-sports.com
                </div>
              </div>
            </div>

            <form className="flex flex-col gap-8 bg-white/2 p-8 md:p-12 border border-white/5 backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-2">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your name"
                    className="bg-white/5 border border-white/10 rounded-none px-8 py-5 text-sm font-bold tracking-widest focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-2">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="bg-white/5 border border-white/10 rounded-none px-8 py-5 text-sm font-bold tracking-widest focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-2">Message // Request</label>
                <textarea 
                  placeholder="How can we help?" 
                  rows={5}
                  className="bg-white/5 border border-white/10 rounded-none px-8 py-5 text-sm font-bold tracking-widest focus:outline-none focus:border-white transition-colors"
                />
              </div>
              <button className="w-full py-6 rounded-none bg-white text-black font-bold tracking-[0.2em] text-xs hover:bg-neutral-200 transition-all active:scale-95 mt-4">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
