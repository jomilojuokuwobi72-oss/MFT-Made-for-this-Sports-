import AnimatedText from "@/components/AnimatedText";

export default function About() {
  const pillars = [
    {
      title: "Scouting",
      description: "We identify raw talent and provide a platform for exposure to global professional networks.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      )
    },
    {
      title: "Community",
      description: "A football culture built on 'The Journey'. We empower players through collective growth and scouting matches.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      title: "Technology",
      description: "Our upcoming app tracks performance metrics, allowing scouts to see verified player progression.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <path d="M12 18h.01" />
        </svg>
      )
    }
  ];

  return (
    <section id="about" className="py-24 bg-black text-white noise-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:items-center">
          <div className="lg:w-1/2">
            <span className="text-2xl font-bold uppercase tracking-[0.4em] text-white/70 mb-4 block font-display">
              Our Mission
            </span>
            <AnimatedText 
              text="Beyond The Pitch" 
              animationClass="animate-blur-drop" 
              className="text-5xl md:text-7xl mb-8 tracking-tighter font-secondary"
              staggerDelay={0.06}
            />
            <p className="text-white/90 text-3xl leading-relaxed font-sans max-w-xl">
              Made For This is more than a scouting platform. It’s a movement born from 
              the raw energy of urban football. We bridge the gap between talent 
              and opportunity through culture, community, and cutting-edge tech.
            </p>
          </div>

          <div className="lg:w-1/2 relative">
             <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 blur-[100px] rounded-full" />
             <div className="grid grid-cols-1 gap-6">
                {pillars.map((pillar, idx) => (
                  <div 
                    key={pillar.title} 
                    className="p-8 rounded-none border border-white/5 bg-white/2 backdrop-blur-sm transition-all hover:bg-white/5 hover:border-white/10 group"
                  >
                     <div className="flex items-start gap-6">
                        <div className="p-3 bg-white/5 rounded-none text-white group-hover:scale-110 transition-transform">
                          {pillar.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-secondary mb-2">{pillar.title}</h3>
                          <p className="text-white/70 text-xl leading-relaxed">{pillar.description}</p>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
