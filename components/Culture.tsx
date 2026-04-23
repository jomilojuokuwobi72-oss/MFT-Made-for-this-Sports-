import AnimatedText from "@/components/AnimatedText";

export default function Culture() {
  const articles = [
    {
      id: 1,
      title: "MFT in Lagos: Uncovering Nigeria's hidden gems",
      category: "Tournament Recap",
      image: "/images/hero_action_bw.png",
      date: "March 2025"
    },
    {
      id: 2,
      title: "The future of scouting is data-driven",
      category: "Insights",
      image: "/images/scouting_spotlight_bw.png",
      date: "April 2025"
    },
    {
      id: 3,
      title: "Culture x Football: The new London scene",
      category: "Community",
      image: "/images/mft_community_vibrant.png",
      date: "February 2025"
    }
  ];

  return (
    <section id="culture" className="py-24 bg-black text-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col mb-16">
          <span className="text-2xl font-bold uppercase tracking-[0.4em] text-white/30 mb-4 font-display">
            Culture & Editorial
          </span>
          <AnimatedText 
            text="Stories From The Journey" 
            animationClass="animate-blur-drop" 
            className="text-5xl md:text-8xl tracking-tighter font-secondary"
            staggerDelay={0.06}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          {/* Main Article */}
          <div className="lg:col-span-7 flex flex-col group cursor-pointer">
            <div className="overflow-hidden rounded-none aspect-4/5 bg-neutral-900 border border-white/5">
              <img 
                src={articles[0].image} 
                alt={articles[0].title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 grayscale"
              />
            </div>
            <div className="mt-8">
              <span className="text-xl font-bold tracking-[0.2em] opacity-40 font-display">{articles[0].category} // {articles[0].date}</span>
              <h3 className="text-3xl md:text-5xl font-secondary leading-[0.9] mt-2 group-hover:underline underline-offset-8">
                {articles[0].title}
              </h3>
            </div>
          </div>

          {/* Side Articles */}
          <div className="lg:col-span-5 flex flex-col gap-24 pt-12">
            {articles.slice(1).map((article) => (
              <div key={article.id} className="flex flex-col group cursor-pointer">
                <div className="overflow-hidden rounded-none aspect-video bg-neutral-900 border border-white/5">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 grayscale hover:grayscale-0"
                  />
                </div>
                <div className="mt-6">
                  <span className="text-xl font-bold tracking-[0.2em] opacity-40 font-display">{article.category} // {article.date}</span>
                  <h3 className="text-2xl font-secondary leading-tight mt-1 group-hover:underline underline-offset-4">
                    {article.title}
                  </h3>
                </div>
              </div>
            ))}

            <div className="mt-auto pt-12 border-t border-white/10">
              <a href="#" className="inline-flex items-center gap-4 group">
                  <span className="text-2xl font-bold tracking-[0.3em] font-display">View Digital Archive</span>
                 <svg 
                   className="w-4 h-4 transition-transform group-hover:translate-x-2" 
                   viewBox="0 0 24 24" 
                   fill="none" 
                   stroke="currentColor" 
                   strokeWidth="2"
                 >
                   <path d="M5 12h14M12 5l7 7-7 7" />
                 </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
