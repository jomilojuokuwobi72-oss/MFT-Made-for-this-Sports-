import AnimatedText from "@/components/AnimatedText";

export default function Events() {
  const events = [
    {
      id: 1,
      title: "MFT Scouting Day // Lagos",
      date: "May 24, 2025",
      location: "National Stadium",
      image: "/images/hero_action_bw.png",
      size: "large",
      tags: ["Elite", "U21"]
    },
    {
      id: 2,
      title: "Community Match // London",
      date: "Jun 12, 2025",
      location: "Hackney Marshes",
      image: "/images/mft_community_vibrant.png",
      size: "medium",
      tags: ["Culture"]
    },
    {
      id: 3,
      title: "Talent ID Session",
      date: "Jun 20, 2025",
      location: "Abuja",
      image: "/images/scouting_spotlight_bw.png",
      size: "small",
      tags: ["ID"]
    },
    {
      id: 4,
      title: "App Beta Launch",
      date: "July 2025",
      location: "Digital",
      image: "/images/hero_action_bw.png",
      size: "medium",
      tags: ["Tech"]
    }
  ];

  return (
    <section id="events" className="py-24 bg-black text-white noise-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-12 mb-40">
          <div>
            <AnimatedText
              text="Upcoming Events"
              animationClass="animate-slide-up"
              className="text-8xl md:text-[16rem] lg:text-[20rem] xl:text-[21rem] leading-[0.75] mb-12 font-secondary tracking-tighter"
              staggerDelay={0.06}
            />
            <p className="text-white/50 max-w-5xl text-2xl md:text-3xl lg:text-4xl leading-snug font-secondary tracking-normal">
              Elite trials, community matches, and cultural pop-ups. <br />
              Don't miss your moment.
            </p>
          </div>
          <div className="hidden md:block">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/10">
              Scroll to explore // View all events
            </span>
          </div>
        </div>

        {/* Abstract Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
          {/* Large Card */}
          <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-none border border-white/10 bg-white/5">
            <img
              src={events[0].image}
              alt={events[0].title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />
            <div className="absolute bottom-0 p-8 flex flex-col gap-2">
              <div className="flex gap-2">
                {events[0].tags.map(tag => (
                  <span key={tag} className="text-[8px] font-bold tracking-[0.2em] border border-white/30 px-2 py-1 rounded-none">{tag}</span>
                ))}
              </div>
              <h3 className="text-3xl md:text-4xl font-secondary leading-none">{events[0].title}</h3>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xs font-bold tracking-widest text-white/60">{events[0].date}</span>
                <span className="text-xs font-bold tracking-widest text-white/60">{events[0].location}</span>
              </div>
            </div>
          </div>

          {/* Medium Card 1 */}
          <div className="md:col-span-2 relative group overflow-hidden rounded-none border border-white/10 bg-white/5">
            <img
              src={events[1].image}
              alt={events[1].title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <h3 className="text-2xl font-secondary">{events[1].title}</h3>
              <div className="flex justify-between text-[10px] font-bold tracking-widest mt-2 text-white/60">
                <span>{events[1].date}</span>
                <span>{events[1].location}</span>
              </div>
            </div>
          </div>

          {/* Small Card */}
          <div className="md:col-span-1 relative group overflow-hidden rounded-none border border-white/10 bg-white/5">
            <img
              src={events[2].image}
              alt={events[2].title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale"
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <h3 className="text-xl font-secondary">{events[2].title}</h3>
              <span className="text-[8px] font-bold tracking-widest mt-1 text-white/40">{events[2].location}</span>
            </div>
          </div>

          {/* Medium Card 2 - Abstract Placement */}
          <div className="md:col-span-1 relative group overflow-hidden rounded-none border border-white/10 bg-white/5">
            <div className="absolute inset-0 p-8 flex flex-col justify-between bg-white text-black">
              <div className="flex flex-col gap-1">
                <span className="text-[8px] font-bold tracking-widest">Next Wave</span>
                <h3 className="text-3xl font-secondary leading-none">Join the Network</h3>
              </div>
              <p className="text-xs font-bold tracking-tighter opacity-70">
                Be first in line for the MFT Scouting App.
              </p>
              <button className="w-full py-4 border-2 border-black font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors">
                Register Interest
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
