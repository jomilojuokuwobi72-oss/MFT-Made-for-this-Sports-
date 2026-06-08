import AnimatedText from "@/components/AnimatedText";
import ScrollReveal from "@/components/ScrollReveal";
import RippleImage from "@/components/RippleImage";

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
    <section id="culture" className="py-28 sm:py-40 md:py-48 bg-black text-white relative border-t border-white/5 noise-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col mb-24">
          <ScrollReveal animation="fade-in">
            <span className="text-3xl font-bold uppercase text-white/50 mb-6 font-secondary tracking-widest">
              Culture & Editorial // 002
            </span>
            <AnimatedText 
              text="Stories From The Journey" 
              animationClass="animate-blur-drop" 
              className="text-h1 font-display italic leading-none"
              staggerDelay={0.08}
            />
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          {/* Main Article */}
          <div className="lg:col-span-7">
            <ScrollReveal animation="blur-in">
              <div className="flex flex-col group cursor-pointer">
                <div className="overflow-hidden rounded-none aspect-4/5 bg-neutral-900 border border-white/5">
                  <RippleImage
                    src={articles[0].image} 
                    alt={articles[0].title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 grayscale"
                  />
                </div>
                <div className="mt-10">
                  <span className="text-xl font-bold opacity-60 font-display uppercase tracking-widest">{articles[0].category} // {articles[0].date}</span>
                  <h3 className="text-h2 font-secondary leading-[0.9] mt-4 group-hover:underline underline-offset-8">
                    {articles[0].title}
                  </h3>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Side Articles */}
          <div className="lg:col-span-5 flex flex-col gap-24 pt-12">
            {articles.slice(1).map((article, idx) => (
              <ScrollReveal key={article.id} animation="slide-up" delay={idx * 0.2}>
                <div className="flex flex-col group cursor-pointer">
                  <div className="overflow-hidden rounded-none aspect-video bg-neutral-900 border border-white/5">
                    <RippleImage
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 grayscale hover:grayscale-0"
                    />
                  </div>
                  <div className="mt-8">
                    <span className="text-xl font-bold opacity-60 font-display uppercase tracking-widest">{article.category} // {article.date}</span>
                    <h3 className="text-h3 font-secondary leading-tight mt-2 group-hover:underline underline-offset-4">
                      {article.title}
                    </h3>
                  </div>
                </div>
              </ScrollReveal>
            ))}

            <div className="mt-auto pt-12 border-t border-white/10">
              <ScrollReveal animation="fade-in">
                <a href="#" className="inline-flex items-center gap-4 group">
                    <span className="text-2xl font-bold font-display uppercase tracking-wider">View Digital Archive</span>
                   <svg 
                     className="w-6 h-6 transition-transform group-hover:translate-x-3" 
                     viewBox="0 0 24 24" 
                     fill="none" 
                     stroke="currentColor" 
                     strokeWidth="2"
                   >
                     <path d="M5 12h14M12 5l7 7-7 7" />
                   </svg>
                </a>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
